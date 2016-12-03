var webpack = require("webpack");

webpack(
    {
        entry: './', // Use Delegate.ts
        output: { // Output to a bundle using UMD
            libraryTarget: "umd",
            library: "quark",
            filename: 'bundle.js'
        },
        devtool: 'source-map', // Generate sourcemaps
        resolve: { // Extend module resolutions to include more file types
            extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
        },
        plugins: [ // Minify the JS code
            new webpack.optimize.UglifyJsPlugin()
        ],
        module: { // Use a module to load TypeScript
            loaders: [
                { test: /\.ts$/, loader: 'ts-loader' }
            ]
        }
    }, function() {
        console.log("Complete.");
    }
);
