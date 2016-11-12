const execFile = require('child_process').execFile;

var portSet = function(port, fn) {
    var net = require('net')
    var tester = net.createServer()
    .once('error', function (err) { if (err.code != 'EADDRINUSE') return fn(err); fn(null, true) })
    .once('listening', function() {
        tester.once('close', function() { fn(null, false) })
        .close()
    })
    .listen(port)
}

module.exports = function (file, cb) {
    const randPort = Math.floor(Math.random() * (60000 - 10 + 1)) + 10;

    portSet(randPort, function (err, yn) {
        if (!yn) {
            const child = execFile('node', [ file ], { env: {port: randPort} },(error, stdout, stderr) => {
                if (error) {
                    cb(true, randPort, 'err');
                } else {
                    cb(false, randPort, stdout);
                    console.log(stdout);
                }
            });
        } else {
            cb(true, randPort, 'err');
        }
    });
}
