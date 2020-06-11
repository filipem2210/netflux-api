module.exports = {
  apps: [{
    name: 'netflux',
    script: './src/server.js',
    watch: true,
    ignore_watch: ['node_modules', 'uploads'],
    instances: 0,
    exec_mode: 'cluster',
  }, {
    name: 'queue',
    script: './src/queue.js',
    watch: true,
    ignore_watch: ['node_modules', 'uploads'],
    instances: 0,
    exec_mode: 'cluster',
  }],
};
