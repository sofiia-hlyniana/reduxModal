var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        './src/app.js'
    ],
    output: {
        filename: 'requestModal.js',
        path: '../src/assets/scripts/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }, {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    }
};