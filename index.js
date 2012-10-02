var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

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
        dup.emit('error', 'non-zero exit code ' + code + ': ' + err);
    });
    
    var dup = duplexer(ps.stdin, ps.stdout);
    return dup;
};
