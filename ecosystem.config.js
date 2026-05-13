module.exports = {
  apps: [
    {
      name: 'smatchroom-pulse',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --hostname 127.0.0.1 --port 3001',
      cwd: '/root/smatchroom-ecosystem/smatchroom-pulse',
      autorestart: true,
      max_memory_restart: '1G',
      env: { NODE_ENV: 'production' }
    },
    {
      name: 'pulse-seo-daily',
      script: 'dist/index.js',
      cwd: '/root/smatchroom-ecosystem/smatchroom-pulse/src/seo-engine',
      cron_restart: '0 3 * * *',
      autorestart: false,
      watch: false,
      max_memory_restart: '512M',
      env: { NODE_ENV: 'production' },
      out_file: '/root/.pm2/logs/pulse-seo-out.log',
      error_file: '/root/.pm2/logs/pulse-seo-err.log',
      time: true
    }
  ]
};
