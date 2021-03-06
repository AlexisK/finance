// Helper: root(), and rootDir() are defined at the bottom
var path    = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var CopyWebpackPlugin  = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV    = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {
        context : __dirname,
        devtool : 'source-map',
        debug   : !isProd || !isTest
    };

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    config.entry = isTest ? {} : {
        'polyfills' : './src/polyfills.ts',
        'vendor'    : './src/vendor.ts',
        'app'       : './src/main.ts'
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = isTest ? {} : {
        path          : root('build'),
        //publicPath    : isProd ? '/' : 'http://localhost:5001/',
        publicPath    : '/',
        filename      : isProd ? 'js/[name].[hash].js' : 'js/[name].js',
        chunkFilename : isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
    };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        cache              : !isTest,
        root               : root(),
        // only discover files that have those extensions
        extensions         : ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
        alias              : {
            'public' : 'src/public'
        },
        modulesDirectories : ['web_modules', 'node_modules', 'app_modules']
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        preLoaders  : isTest ? [] : [
            {test : /\.ts$/, loader : 'tslint'},
            {
                test   : /.ts$/,
                loader : 'string-replace-loader',
                query  : {
                    search  : 'moduleId: module.id,',
                    replace : '',
                    flags   : 'g'
                }
            }
        ],
        loaders     : [
            // Support for .ts files.
            {
                test    : /\.ts$/,
                loaders : ['ts', 'angular2-template-loader'],
                exclude : [/node_modules\/(?!(ng2-.+))/]
            },

            // copy those assets to output
            {test : /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)$/, loader : 'file?name=static/[name].[hash].[ext]?'},

            // Support for *.json files.
            {test : /\.json$/, loader : 'json'},

            // Support for CSS as raw text
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test    : /\.css$/,
                exclude : root('src', 'mobile'),
                loader  : isTest ? 'null' : 'raw!postcss'
            },
            // all css required in src/app files will be merged in js files
            {test : /\.css$/, include : root('src', 'mobile'), loader : 'raw!postcss'},

            // support for .scss files
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test    : /\.scss$/,
                exclude : root('src'),
                loader  : isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass!import-glob')
            },
            // all css required in src/app files will be merged in js files
            {test : /\.scss$/, exclude : root('src', 'style'), loader : 'raw!postcss!sass'},

            // support for .html as raw text
            // todo: change the loader to something that adds a hash to images
            {test : /\.html$/, loader : 'raw'}
        ],
        postLoaders : [],
        noParse     : [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
    };

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        new webpack.DefinePlugin({
            'process.env' : {
                ENV : JSON.stringify(ENV)
            }
        }),

        new CopyWebpackPlugin([{
            from : root('src/public'),
            to   : root('build')
        }], {
            ignore : [root('src/build/index.html')]
        })
    ];

    if ( !isTest ) {
        config.plugins.push(
            new CommonsChunkPlugin({
                name      : ['vendor', 'polyfills'],
                minChunks : Infinity
            }),
            new HtmlWebpackPlugin({
                template       : './src/public/index.html',
                chunksSortMode : 'dependency',
                excludeChunks  : []
            }),
            new ExtractTextPlugin('css/[name].[hash].css', {disable : !isProd}),
            new webpack.optimize.UglifyJsPlugin({
                beautify : false, //prod
                mangle   : {
                    screw_ie8   : true,
                    keep_fnames : true
                }, //prod
                compress : {
                    screw_ie8 : true,
                    warnings  : false
                }, //prod
                comments : false //prod
            })
        );
    }

    // Add build specific plugins
    if ( isProd ) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin()
        );
    }


    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    config.postcss = [
        require('postcss-import'),
        require('autoprefixer')({browsers : ['last 2 version']}),
        require('css-mqpacker'),
        require('cssnano')({safe : true})
    ];

    /**
     * Sass
     * Reference: https://github.com/jtangelder/sass-loader
     * Transforms .scss files to .css
     */
    config.sassLoader = {
        //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
    };

    /**
     * Apply the tslint loader as pre/postLoader
     * Reference: https://github.com/wbuchwalter/tslint-loader
     */
    config.tslint = {
        emitErrors : false,
        failOnHint : false
    };

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    //config.devServer = {
    //    contentBase        : './src/public',
    //    historyApiFallback : true,
    //    stats              : 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose
    //    proxy              : {
    //        '/api/*' : {
    //            target       : 'http://market.stucco.local',
    //            changeOrigin : true
    //        }
    //    }
    //};

    return config;
}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
