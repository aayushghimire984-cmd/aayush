import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const DATA_FILE = path.join(process.cwd(), 'data.json');

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    siteContent: null,
    users: null,
    notices: null,
    adminPassword: 'Aayush@123'
  }));
}

app.get('/api/data', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    // secure password
    const { adminPassword, ...safeData } = data;
    res.json(safeData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

app.post('/api/data', (req, res) => {
  try {
    const currentData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    // prevent overriding password via this endpoint
    const { adminPassword, ...updateData } = req.body;
    const newData = { ...currentData, ...updateData };
    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.post('/api/verify-password', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const { email, password } = req.body;
    
    // Allow normal admin login
    const isNormalAdmin = email === 'admin@aayush.com' && password === data.adminPassword;
    
    // Allow 'temp123' as a temporary password for some known emails/ids
    const isTempLogin = (email === 'admin@aayush.com' || email === 'temp' || email === 'temp@aayushub.com' || email === 'admin') && password === 'temp123';
    
    const isValid = isNormalAdmin || isTempLogin;
    res.json({ isValid });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to verify password', details: error.message });
  }
});

app.post('/api/change-password', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    if (data.adminPassword !== req.body.currentPassword && req.body.currentPassword !== 'temp123') {
      return res.status(401).json({ error: 'Current password incorrect' });
    }
    data.adminPassword = req.body.newPassword;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const portObj = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  app.listen(portObj, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${portObj}`);
  });
}

startServer();
