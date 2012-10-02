var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

module.exports = function (cmd, args, opts) {
    if (Array.isArray(cmd)) {
        opts = args;
        args = cmd.slice(1);
        cmd = cmd[0];
    }
    
    var ps = spawn(cmd, args, opts);
    var err = '';
    if (ps.stderr) {
        ps.stderr.on('data', function (buf) { err += buf });
    }
    
    ps.on('exit', function (code) {
        if (code === 0) return;
        dup.emit('error', new Error('non-zero exit code ' + code + ': ' + err));
    });
    
    var dup = duplexer(ps.stdin, ps.stdout);
    return dup;
};
