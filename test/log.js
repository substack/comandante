var test = require('tap').test;
var run = require('../');
var through = require('through');

test('log ok', function (t) {
    t.plan(1);
    
    var data = '';
    var ws = through(
        function (buf) { data += buf },
        function () {
            var lines = data.split('\n');
            t.ok(
                lines[lines.length - 6],
                'commit 95e4802118459f2eec942cba789bd451702e3aa4'
            );
        }
    );
    var ps = run('git', [ 'log' ]).pipe(ws);
});
