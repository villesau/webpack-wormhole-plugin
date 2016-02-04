# Webpack Wormhole plugin

Webpack plugin for injecting text dynamically straight to the output file.

## Usage

In your `webpack.config.js`

```javascript
var Wormhole = require('webpack-manifest-plugin');
var colors = ['#FF0000', '#0000FF'];
module.exports = {
    // ...
    plugins: [
      new Wormhole({
                       generator: function() {
                         colors.push(colors.shift());
                         return '\n.webpack-color-build-indicator { background-color: ' + colors[0] + ';}';
                       },
                       test: /\.(?:css)$/
                     })
    ]
};
```

The above example switches the background color on each build. 

**Options:**

* `generator`: The text generator function.
* `test`: matches to the output file name.