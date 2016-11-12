const containify = require('./app.js');

containify(__dirname+'/test/1.js', function (err, port, out) {
    if (err) throw err;

    console.log(out);
});
