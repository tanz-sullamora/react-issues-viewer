var path = require('path');
var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
webpackConfig.output = {};

var configReporters = [
  'progress',
  'html'
];

if (process.env.NODE_ENV == 'coverage') {
  configReporters = [
    'progress',
    'coverage'
  ];
}


module.exports = function (config) {
  config.set({
    browsers: [
      'Chrome'
    ],
    browserNoActivityTimeout: 60000,
    colors: true,
    files: [
      path.resolve(__dirname, 'node_modules/react/dist/react-with-addons.js'),
      'tests/**/*.js',
      'spec.js'
    ],
    frameworks: [
      'jasmine',
      'es6-shim'
    ],
    htmlReporter: {
      outputDir: path.resolve(__dirname, 'tests_reports/html'),
      reportName: 'summary'
    },
    coverageReporter: {
      sourceMap: true,
      dir: path.resolve(__dirname, 'tests_reports/coverage'),
      reporters: [
        {
          type: 'lcov',
          subdir: 'report-lcov'
        }
      ]
    },    
    plugins: [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-es6-shim',
      'karma-html-reporter',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],    
    preprocessors: {
      'tests/**/*.js': [
        'webpack',
        'sourcemap'
      ],
      'spec.js': [
        'webpack',
        'sourcemap'
      ]
    },
    reporters: configReporters,
    singleRun: true,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
