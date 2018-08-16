const fs = require('fs');
const f =
  'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

  fs.writeFile(f, result, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});

// 90a4c6d7879f0a491a4ebbefe8b242d8f289509d setting sync token