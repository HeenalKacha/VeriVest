import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

// If invoked directly with plain node without tsx loader, auto-delegate with --import tsx
if (!process.env.TSX_SPAWNED && !process.execArgv.some((a) => a.includes('tsx'))) {
  const { spawn } = await import('node:child_process');
  const child = spawn(process.execPath, ['--import', 'tsx', ...process.argv.slice(1)], {
    stdio: 'inherit',
    env: { ...process.env, TSX_SPAWNED: '1' },
  });
  child.on('exit', (code) => process.exit(code ?? 0));
  await new Promise(() => {});
}

const app = (await import('./backend/app.js')).default;
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VeriVest server active on port ${PORT}`);
  });
}

startServer();
