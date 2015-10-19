module.exports = {
    entry: "./public/app/index.js",
    output: {
        path: __dirname + '/public/dist/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.hbs$/, loader: "handlebars-loader" },
            { test: /\.json$/, loader: "json-loader" },
            
            // Fonts by Bootstrap
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            
            // Makes jQuery plugins work
            {
                test: /jquery\.js$/,
                loader: 'expose?jQuery',
                },
            {
                test: /jquery\.js$/,
                loader: 'expose?$',
            },
            {
                test: /jquery\..*\.js/,
                loader: "imports?$=jquery,jQuery=jquery,this=>window"
            }
        ]
    },
//  resolve: {
//    alias: {
////      // Bind version of jquery
////      jquery: "jquery-2.0.3",
//      // Bind version of jquery-ui
//      "jquery-ui": "jquery-ui-1.10.3",
//      // jquery-ui doesn't contain an index file
//      // bind module to the complete module
//      "jquery-ui-1.10.3$": "jquery-ui-1.10.3/ui/jquery-ui.js",
//    }
//  },
    node: {
        fs: "empty"
    }
};