# Vercel Deployment Guide

This guide will help you deploy your frontend application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
2. Your backend API deployed and accessible via HTTPS
3. Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Backend

Before deploying the frontend, ensure your backend is:
- Deployed and accessible via HTTPS
- Configured to accept CORS requests from your Vercel domain
- Note down your backend URL (e.g., `https://your-backend.herokuapp.com` or `https://your-backend.railway.app`)

### Backend CORS Configuration

Make sure your Flask backend has CORS configured to accept requests from Vercel:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",  # Local development
    "https://your-app.vercel.app",  # Your Vercel domain
    "https://*.vercel.app"  # All Vercel preview deployments
])
```

## Step 2: Update Vercel Configuration

1. Open `vercel.json` in the Frontend directory
2. Update the `destination` URL in the rewrite rule to point to your backend:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-actual-backend-url.com/:path*"
    }
  ]
}
```

Replace `https://your-backend-url.com` with your actual backend URL.

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended for first-time)

1. **Push your code to Git**
   ```bash
   cd Frontend
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository
   - Select the `Frontend` directory as the root directory
   - Vercel will auto-detect it's a Vite project

3. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add the following variable:
     - Name: `VITE_API_URL`
     - Value: Your backend URL (e.g., `https://your-backend.herokuapp.com`)
     - Environment: Production, Preview, Development (select all)

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd Frontend
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: Enter your project name
   - In which directory is your code located: `./`
   - Want to override settings: No

5. **Set Environment Variables**
   ```bash
   vercel env add VITE_API_URL
   ```
   Enter your backend URL when prompted.

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 4: Configure Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Step 5: Verify Deployment

1. Visit your deployed URL
2. Test the following:
   - ✅ Login/Register functionality
   - ✅ CT Scan upload
   - ✅ Clinical data submission
   - ✅ API calls are working

## Automatic Deployments

Once connected to Git, Vercel will automatically:
- Deploy every push to the main branch to production
- Create preview deployments for pull requests
- Show deployment status in your Git commits

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `https://api.example.com` |

## Troubleshooting

### API Calls Failing

**Problem:** API calls return 404 or CORS errors

**Solutions:**
1. Check that `VITE_API_URL` is set correctly in Vercel environment variables
2. Verify backend CORS configuration includes your Vercel domain
3. Check that `vercel.json` rewrite rule is correct
4. Ensure backend is accessible and running

### Build Failures

**Problem:** Build fails on Vercel

**Solutions:**
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Try building locally: `npm run build`
4. Check Node.js version compatibility

### Environment Variables Not Working

**Problem:** Environment variables are undefined

**Solutions:**
1. Ensure variables are prefixed with `VITE_`
2. Redeploy after adding environment variables
3. Check that variables are set for the correct environment (Production/Preview)

## Monitoring and Analytics

Vercel provides built-in analytics:
- Go to your project → "Analytics"
- View page views, performance metrics, and more
- Available on Pro plan

## Updating Your Deployment

To update your deployment:
1. Make changes to your code
2. Commit and push to Git
3. Vercel will automatically deploy the changes

Or manually trigger a deployment:
```bash
vercel --prod
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Environment Variables in Vite](https://vitejs.dev/guide/env-and-mode.html)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console for errors
3. Verify backend is accessible
4. Check CORS configuration
