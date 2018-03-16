module.exports = function(config) {
    config.set({
        basePath: '',
        proxies: {
            // '/static/templates': '/base/templates'
            '/static/': '/base/'
        },
        frameworks: [
            "jasmine" 
            //, "requirejs"
        ],
        plugins: [
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-jasmine",
            "karma-webpack"
        ],
        files: [
            {pattern: "node_modules/jquery/dist/jquery.min.js", included: true},
            {pattern: "node_modules/bootstrap/dist/js/bootstrap.min.js", included: true},
            {pattern: "node_modules/c3/c3.min.js", included: true},
            {pattern: "dist/bundle.js", included: true},

            {pattern: "templates/*.html"},
            {pattern: "templates/**/*.html"},

            {pattern: "src/*_test.ts", included: false},
            {pattern: "src/**/*_test.ts", included: false}
        ],
        preprocessors: {
            "src/test/*_test.ts": ["webpack"],
            "src/test/**/*_test.ts": ["webpack"]
        },
        webpack: {

        },
        webpackMiddleware: {
            // stats: "errors-only"
        },
        browsers: [
            "Chromium" // , "Firefox"
        ],
        autoWatch: true,
        // logLevel: config.LOG_DEBUG
        reporters: ['dots', 'progress']
    })
};
