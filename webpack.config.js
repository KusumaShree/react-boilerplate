// //need to mention the entry point - src/app.js
// //and output file - public/scripts/app.js
// // const path = require("path");
// // // console.log(__dirname); //contains path to current location
// // // console.log(path.join(__dirname, 'public'));
// // module.exports = {
// //     mode: "development",
// //     entry: "./src/app.js",
// //     output: {
// //         path: path.join(__dirname, 'public'), //need to be absoule path on the machine
// //         filename: "bundle.js"
// //     }
// // };
// // const TerserPlugin = require('terser-webpack-plugin');
// const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// module.exports = (env) => {
//     const isProduction = env === 'production';
//     const CSSExtract = new ExtractTextPlugin('styles.css')
//     return {
//         entry: './src/app.js',
//         output: {
//             path: path.join(__dirname, 'public', 'dist'),
//             filename: 'bundle.js'
//         },
//         module: {
//             rules:[{
//                 loader: 'babel-loader',
//                 test: /\.js$/, //only the files meet this criteria loader runs this file
//                 exclude: /node_module/,
//             },{
//                 test: /\.s?css$/, //pick only scss files
//                 // use: [      //can use multiple loaders
//                 //     'style-loader', // takes css and insert into style attributes of html element
//                 //     'css-loader', // css-loader interprets @import and url() like import/require() and will resolve them
//                 //     'sass-loader' //scss loader  - uses node sass to convert scss to css
//                 // ]
//                 use: CSSExtract.extract({
//                     use: [
//                       {
//                         loader: 'css-loader',
//                         options: {
//                           sourceMap: true
//                         }
//                       },
//                       {
//                         loader: 'sass-loader',
//                         options: {
//                           sourceMap: true
//                         }
//                       }
//                     ]
//                   })
//             }]
//         },
//         plugins: [
//             CSSExtract
//         ],
//         devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
//         devServer:{
//             contentBase: path.join(__dirname, 'public'), // path of public assets to load the server
//             historyApiFallback: true,
//             publicPath: '/dist/'
//         }
//     };
// }

// //loader - if it see any .js file do something with it
// //babel-core & babel-loader are webpack plugins
// //.babelrc is the file used for parameters passed to babel in command line



const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test'});
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development'});
}

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: ['babel-polyfill','./src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
