exports.config = {
    specs: ['./e2e/**/*.e2e-spec.ts'],
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        binary: process.env.CHROME_BIN,
        args: ['--headless', '--no-sandbox']
      }
    },
    directConnect: true,
    baseUrl: 'http://localhost:8100/',
    framework: 'jasmine',
    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000,
      print: function() {}
    },
    onPrepare() {
      require('ts-node').register({
        project: 'tsconfig.e2e.json'
      });
      jasmine.getEnv().addReporter(new JasmineSpecReporter());
    }
}