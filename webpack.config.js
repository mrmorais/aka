const path = require('path');

module.exports = {
    target: 'node',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'aka-server.js',
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
};