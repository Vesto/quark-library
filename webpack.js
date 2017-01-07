var webpack = require("webpack");

var compiler = webpack(
    {
        entry: [ "./src/index.ts" ],
        output: { // Output to a bundle using UMD
            libraryTarget: "umd",
            library: "quark",
            filename: "bundle.js"
        },
        devtool: "source-map", // Generate sourcemaps
        resolve: { // Extend module resolutions to include more file types
            extensions: [".webpack.js", ".web.js", ".ts", ".js"]
        },
        plugins: [ // Minify the JS code
            // new webpack.optimize.UglifyJsPlugin()
        ],
        module: { // Use a module to load TypeScript
            loaders: [
                { test: /\.ts$/, loader: "ts-loader" } // Load TS files with ts-loader
            ]
        },
        // Suppress warning about large bundle sizes
        performance: {
            hints: false
        }
    }
);

new webpack.Compiler.Watching(compiler, undefined, function(err, stats) {
    var date = new Date();
    var prefix = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ";
    if (err) {
        console.log(prefix + "Error:", err);
    } else if (stats.hasErrors()) {
        console.log(prefix + "Stats errors:", stats.compilation.errors);
    } else if (stats.hasWarnings()) {
        console.log(prefix + "Stats warnings:", stats.compilation.warnings);
    } else {
        console.log(prefix + "Compile complete.")
    }
});

