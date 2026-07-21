const { spawn } = require('child_process');
const net = require('net');
const path = require('path');

const preferredBackendPort = Number(process.env.BACKEND_PORT || process.env.PORT || 5000);

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen(port, '0.0.0.0');
  });
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + 50; port += 1) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(`No open backend port found from ${startPort} to ${startPort + 49}.`);
}

async function main() {
  const backendPort = await findAvailablePort(preferredBackendPort);
  const backendUrl = process.env.BACKEND_URL || `http://localhost:${backendPort}`;

  if (backendPort !== preferredBackendPort) {
    console.log(`Backend port ${preferredBackendPort} is busy. Using ${backendPort} instead.`);
  }

  const backend = spawn('npm', ['run', 'dev:backend'], {
    cwd: __dirname,
    env: {
      ...process.env,
      PORT: String(backendPort),
    },
    shell: true,
    stdio: 'inherit',
  });

  const frontend = spawn('npm', ['run', 'dev:frontend'], {
    cwd: path.join(__dirname),
    env: {
      ...process.env,
      BACKEND_URL: backendUrl,
    },
    shell: true,
    stdio: 'inherit',
  });

  frontend.on('exit', (code) => {
    if (code !== 0) {
      backend.kill();
      process.exit(code || 1);
    }
  });

  backend.on('exit', (code) => {
    if (code !== 0) {
      frontend.kill();
      process.exit(code || 1);
    }
  });

  process.on('SIGINT', () => {
    frontend.kill('SIGINT');
    backend.kill('SIGINT');
    process.exit(0);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
