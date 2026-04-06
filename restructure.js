const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'fraud-frontend', 'app');
const dashboardDir = path.join(appDir, '(dashboard)');

if (!fs.existsSync(dashboardDir)) {
  fs.mkdirSync(dashboardDir, { recursive: true });
}

// Move pages
const foldersToMove = ['predict', 'history', 'analytics', 'alerts'];
foldersToMove.forEach(folder => {
  const src = path.join(appDir, folder);
  const dest = path.join(dashboardDir, folder);
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest);
  }
});

// Move Dashboard (app/page.tsx) to app/(dashboard)/dashboard/page.tsx
const dashboardPageDir = path.join(dashboardDir, 'dashboard');
if (!fs.existsSync(dashboardPageDir)) {
  fs.mkdirSync(dashboardPageDir, { recursive: true });
}

const mainPageSource = path.join(appDir, 'page.tsx');
const mainPageDest = path.join(dashboardPageDir, 'page.tsx');
if (fs.existsSync(mainPageSource)) {
  fs.renameSync(mainPageSource, mainPageDest);
}

console.log("Restructure complete.");
