# Twilio Email Scheduler Project

This is a Node.js application that handles email scheduling using Nodemailer and Express.

## Prerequisites

- Node.js installed
- Gmail account (for sending emails)
- Environment variables set up

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
PORT=3001
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

## Deployment Instructions

### Option 1: Heroku Deployment

1. Install Heroku CLI
2. Login to Heroku:
```bash
heroku login
```

3. Create a new Heroku app:
```bash
heroku create your-app-name
```

4. Set environment variables:
```bash
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-specific-password
```

5. Deploy:
```bash
git push heroku main
```

### Option 2: Railway Deployment

1. Create a Railway account
2. Connect your GitHub repository
3. Set up environment variables in Railway dashboard
4. Deploy from Railway dashboard

### Option 3: Render Deployment

1. Create a Render account
2. Connect your GitHub repository
3. Create a new Web Service
4. Set up environment variables
5. Deploy from Render dashboard

## API Endpoints

- POST `/schedule-email`: Schedule a new email
  - Body: `{ subject, message, time, email }`
