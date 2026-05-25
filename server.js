
import express from 'express';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logger
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()} [${req.method}] ${req.url}`);
    next();
});

// Mock Vercel API - REGISTRATION FIRST
const apiDir = path.join(__dirname, 'api');
if (fs.existsSync(apiDir)) {
    const apiFiles = fs.readdirSync(apiDir).filter(f => f.endsWith('.js') && !f.startsWith('_'));
    console.log('📦 Registering API Routes:');
    for (const file of apiFiles) {
        const route = `/api/${file.replace('.js', '')}`;
        const absolutePath = path.join(apiDir, file);
        const moduleURL = pathToFileURL(absolutePath).href;
        
        console.log(`  - ${route} -> api/${file}`);
        app.all(route, async (req, res) => {
            try {
                const handler = (await import(`${moduleURL}?update=${Date.now()}`)).default;
                await handler(req, res);
            } catch (err) {
                const errorLog = `${new Date().toISOString()} Error in ${route}: ${err.stack || err}\n`;
                fs.appendFileSync('error.log', errorLog);
                console.error(`Error in ${route}:`, err);
                res.status(500).json({ error: err.message });
            }
        });
    }
}

// Serve static files - AFTER API
app.use(express.static('public', { redirect: false }));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Rewrites for SPA-like navigation
app.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/admin/admin.html'));
});
app.get('/admin-login', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/admin/admin-login.html'));
});
app.get('/payment', (req, res) => res.sendFile(path.join(__dirname, 'public/payment.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public/dashboard.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

const PORT = 5501;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Server is running!`);
    console.log(`🔗 Local: http://localhost:${PORT}`);
    console.log(`\nPress Ctrl+C to stop.\n`);
});
