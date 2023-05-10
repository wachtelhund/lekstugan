module.exports = {
  apps: [
    {
      name: 'auth-service:3000',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production'
      },
      interpreter: 'none',
      watch: false
    }
  ]
}
