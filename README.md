# BSF Mobile - Setup Guide

Quick setup guide to get this Ionic React project running on your local machine.

## Prerequisites

Before you start, make sure you have these installed:

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- **Git** (to clone the repository)

To check if you have them installed:

```bash
node --version
npm --version
git --version
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bsf-mobile
```

### 2. Install Dependencies

The project has two main parts that need dependencies installed:

#### Install App Dependencies (Ionic CLI)

```bash
cd app
npm install
```

#### Install Client Dependencies (React App)

```bash
cd client
npm install
```

## Running the Application

From the `client` directory, run:

```bash
npx ionic serve
```

This will:

- Start the development server
- Automatically open your browser to `http://localhost:8100`
- Enable hot-reload (changes will update automatically)

### Alternative Run Command

If `npx ionic serve` doesn't work, you can also try:

```bash
cd client
npm run dev
```

## Troubleshooting

### Port Already in Use

If port 8100 is already in use, Ionic will prompt you to use a different port or you can specify one:

```bash
npx ionic serve --port 8101
```

### Clear Cache and Reinstall

If you encounter dependency issues:

```bash
# In app directory
rm -rf node_modules package-lock.json
npm install

# In client directory
cd client
rm -rf node_modules package-lock.json
npm install
cd ..
```

### Node Version Issues

If you get errors about Node version compatibility, try using Node.js v18 LTS or v20 LTS.

## Project Structure

```
bsf-mobile/
├── app/
│   ├── client/          # React + Ionic frontend
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── package.json     # Ionic CLI dependency
└── README.md            # This file
```

## Quick Reference Commands

```bash
# Full setup from scratch
git clone <repository-url>
cd bsf-mobile/app
npm install
cd client
npm install
npx ionic serve

# Just run the app (after setup)
cd bsf-mobile/app
npx ionic serve
```

---

**That's it!** The app should now be running at `http://localhost:8100` 🚀

If you run into any issues, check the troubleshooting section above or reach out for help.
