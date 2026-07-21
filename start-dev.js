const { spawn } = require('child_process');
const path = require('path');

const frontend = spawn('npm', ['run', 'dev:frontend'], {
  cwd: path.join(__dirname),
  shell: true,
  stdio: 'inherit'
});

const backend = spawn('npm', ['run', 'dev:backend'], {
  cwd: path.join(__dirname),
  shell: true,
  stdio: 'inherit'
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
