const path = require("path");


module.exports = {
    // entry: `.${pathToFolderAndFile}`,
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        publicPath: "/build/",
        compress: true,
        port: 3001,
        historyApiFallback: true,
        open: true 
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    }
};