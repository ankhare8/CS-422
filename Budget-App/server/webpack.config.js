const { LoadBundleTask } = require('@firebase/firestore')
const path = require('path')


module.exports = {
    mode: 'development', //could be production
    entry: './src/index.js', // where webpack will look
    output: { //object
        path: path.resolve(__dirname, 'dist'), // dirname means current directory
        filename: 'bundle.js',
    },
    module:{
        rules: [{test: /\.txt$/, use:'raw-loader'},]
    },
    devtool: 'eval-source-map',
    watch: true // so everytime there's a change in index.js in src, it will rebundle.
}
