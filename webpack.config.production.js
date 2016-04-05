/** WEBPACK CONFIG for production*/

/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  // Entry point for the bundle.
  entry: './src/main',
  // If you pass an array - the modules are loaded on startup. The last one is exported.
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  // Array of file extensions used to resolve modules.
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },

  plugins: [
    // Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids.
    // This make ids predictable, reduces to total file size and is recommended.
    new webpack.optimize.OccurenceOrderPlugin(),
    // 'NODE_ENV'
    // React relies on process.env.NODE_ENV based optimizations.
    // If we force it to production, React will get in an optimized manner.
    // This will disable some checks (eg. property type checks) and give you a smaller build and improved performance.
    //    Note: That JSON.stringify is needed as webpack will perform string replace "as is".
    //    In this case we'll want to end up with strings as that's what various comparisons expect, not just production.
    //    Latter would just cause an error.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    //  Minimize all JavaScript output of chunks. Loaders are switched into minimizing mode.
    //  - 'compress'
    //  Compressor is a tree transformer which reduces the code size by applying various optimizations on the AST.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /jquery\.js$/,
        loader: 'expose?$'
      },
      {
        test: /jquery\.js$/,
        loader: 'expose?jQuery'
      },
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      },
      // Babel enables the use of ES6 today by transpiling your ES6 JavaScript into equivalent ES5 source
      // that is actually delivered to the end user browser.
      {
        test: /\.jsx?$/,
        loaders: [ 'babel' ],
        include: path.join(__dirname, 'src')
      },
      // css etc required to run bootstrap
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
};
