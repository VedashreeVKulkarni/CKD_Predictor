# MediGuard AI - Frontend

A modern React-based web application for kidney disease detection using CT scans and clinical data analysis.

## 🚀 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS 4** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **Axios** - HTTP client

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend API running (see Backend directory)

## 🛠️ Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your backend URL:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📦 Project Structure

```
Frontend/
├── src/
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── ClinicalData.jsx # Clinical data form
│   │   └── ...
│   ├── layouts/             # Layout components
│   │   ├── AuthLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── pages/               # Page components
│   ├── config/              # Configuration files
│   │   └── api.js          # API configuration
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── public/                  # Static assets
├── vercel.json             # Vercel deployment config
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 🚀 Deployment

### Deploy to Vercel

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

**Quick steps:**
1. Push code to Git repository
2. Import project to Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy!

Or use the workflow:
```bash
# From project root
/deploy-vercel
```

## 🔧 Configuration

### API Configuration

API endpoints are configured in `src/config/api.js`. The base URL is controlled by the `VITE_API_URL` environment variable.

### Proxy Configuration

During development, API requests to `/api/*` are proxied to the backend server (configured in `vite.config.js`).

In production (Vercel), the proxy is handled by `vercel.json`.

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

**Note:** All environment variables must be prefixed with `VITE_` to be exposed to the client.

## 📱 Features

- **Authentication** - Login and registration
- **CT Scan Analysis** - Upload and analyze CT scans with Grad-CAM visualization
- **Clinical Assessment** - Input clinical parameters for AI-powered risk assessment
- **Dashboard** - View patient history and analysis results
- **Responsive Design** - Works on desktop and mobile devices

## 🔒 Security

- Environment variables for sensitive configuration
- CORS protection
- Secure headers configured in `vercel.json`
- Input validation and sanitization

## 🐛 Troubleshooting

**API calls failing:**
- Check that backend is running
- Verify `VITE_API_URL` is set correctly
- Check browser console for CORS errors

**Build errors:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

**Environment variables not working:**
- Ensure variables are prefixed with `VITE_`
- Restart dev server after changing `.env`

## 📄 License

This project is part of MediGuard AI - Kidney Disease Detection System.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For issues and questions, please check the main project documentation or create an issue in the repository.

