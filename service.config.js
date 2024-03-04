module.exports = {
  name: 'mobile-site-associations',
  resourceName: 'mobile-site-associations',
  deployAs: 'lambda',
  backendBasePath: '/mobile-site-associations',
  port: 7784,
  app: {
    script: 'yarn dev',
    watch: 'src',
    wait_ready: false,
  },
};
