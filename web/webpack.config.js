const path = require('path');

module.exports = {
    entry: './src/video_module.jsx',
    output: {
        path: path.resolve(__dirname, '../static/js'),
        filename: 'video_module.bundle.js'
    },
    mode: "development",
    //mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', 
                                { 
                                    'useBuiltIns': 'usage' 
                                }
                            ],
                                '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'linkTag'
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[path][name].[ext]'
                            name: '../css/[name].css'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
            }
        ]
    }
};