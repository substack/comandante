var through = require('through');
var spawn = require('child_process').spawn;

module.exports = function (cmd, args) {
    if (Array.isArray(cmd)) {
        args = cmd.slice(1);
        cmd = cmd[0];
    }
    
    var ps = spawn(cmd, args);
    var err = '';
    ps.stderr.on('data', function (buf) { err += buf });
    
    ps.on('exit', function (code) {
        if (code === 0) return;
        tr.emit('error', 'non-zero exit code ' + code + ': ' + err);
    });
    
    var tr = ps.stdout.pipe(through());
    return tr;
};
