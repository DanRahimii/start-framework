const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
   module: {
       rules: [
           {
               test: /\.js$/,
               exclude: /node_modules/,
               loaders: ["babel"],
               include: path.join(__dirname, 'js')
           }
       ]
   }
};