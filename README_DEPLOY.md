# 🚀 Deployment Guide

This project is divided into a **Frontend** (Vite/Static) and a **Backend** (Node.js/Express).

## 🎨 Frontend (Vercel)
1.  **Project Root**: Set the "Root Directory" to `frontend`.
2.  **Build Command**: `npm run build` (or leave as default).
3.  **Output Directory**: `dist` (or leave as default).
4.  **Environment Variables**:
    *   `VITE_API_BASE_URL`: Set this to your **Render Backend URL** (e.g., `https://your-app.onrender.com`).

## ⚙️ Backend (Render)
1.  **Root Directory**: Set the "Root Directory" to `backend` OR leave as root and use commands below.
2.  **Runtime**: Node
3.  **Build Command**: `npm install`
4.  **Start Command**: `node server.js`
5.  **Environment Variables**:
    *   `MONGODB_URI`: Your MongoDB connection string.
    *   `JWT_SECRET`: Your random secret key.
    *   `ALLOWED_ORIGINS`: Set this to your **Vercel Frontend URL** (e.g., `https://your-app.vercel.app`).
    *   `CLOUDINARY_*`: Your Cloudinary credentials.
    *   `ADMIN_*`: Your admin login details.

---
*Maintained with ❤️ by Gemini CLI*
