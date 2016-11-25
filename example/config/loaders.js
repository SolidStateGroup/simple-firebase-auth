module.exports = [
    {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
    },
    {
        test: /\.js?/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
    },
    {
        test: /\.html$/,
        loader: 'html-loader?attrs[]=source:src&attrs[]=img:src'
    },
    {
        test: /\.(jpe?g|png|gif|svg|mp4|webm)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack'
        ]
    }
];