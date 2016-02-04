var ConcatSource = require('webpack-core/lib/ConcatSource');

function WormholePlugin(options) {
  this.generator = options.generator;
  this.tester = options.test;
}

WormholePlugin.prototype.apply = function(compiler) {
  var generate = this.generator;
  var test = this.tester;
  var text = '';

  compiler.plugin('compile', function() {
    text = generate();
  });

  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
      chunks.forEach(function(chunk) {
        chunk.files.forEach(function(file) {
          if (!file.match(test)) return;
          compilation.assets[file] = new ConcatSource(text, '\n', compilation.assets[file]);
        });
      });
      callback();
    });
  });
};

module.exports = WormholePlugin;
