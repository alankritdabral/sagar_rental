# Renting Business KYC Portal

A modern, secure portal for customer verification and vehicle rental management.

## 🌟 Features
- **Automated KYC:** Multi-step form with document compression and Cloudinary integration.
- **Admin Dashboard:** Review applications, assign vehicles, and track payments.
- **Secure Auth:** JWT-based authentication with role-based access control.
- **Modern UI:** Responsive, glassmorphism design using Tailwind CSS.

## 🏗️ Project Structure
```
├── api/                # Serverless API handlers
│   ├── models/         # Mongoose schemas (User, Rental)
│   └── _utils.js       # Shared backend utilities
├── public/             # Static frontend assets (HTML, CSS)
│   ├── admin/          # Admin-specific pages
│   └── index.html      # Main KYC entry point
├── src/                # Frontend logic (JS, CSS source)
├── tests/              # Automated test suites (Vitest)
└── server.js           # Local development Express server
```

## 🛠️ Setup & Installation

1. **Clone & Install:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root based on `.env.example`:
   ```env
   MONGODB_URI=your_mongodb_atlas_uri
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Admin Credentials
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=secure_password
   ADMIN_PHONE=9999999999
   
   # Security
   JWT_SECRET=your_random_secret_key
   ```

## 🚀 Running Locally

**Start the development server:**
```bash
npm run dev
```
The application will be available at `http://localhost:5501`.

## 🧪 Testing
We use **Vitest** for automated unit testing of API logic and utilities.
```bash
# Run all tests once
npm test

# Run tests in watch mode
npx vitest
```

## 🚢 Deployment
Configure all environment variables in your hosting provider's dashboard.


---
*Maintained with ❤️ by Gemini CLI*
