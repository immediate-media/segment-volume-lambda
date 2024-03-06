module.exports = {
  name: 'segment-volume-lambda',
  resourceName: 'segment-volume-lambda',
  deployAs: 'lambda',
  backendBasePath: '/segment-volume-lambda',
  port: 7785,
  app: {
    script: 'yarn dev',
    watch: 'src',
    wait_ready: false,
  },
};
