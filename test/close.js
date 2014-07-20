var test = require('tap').test;
var run = require("../");

test('single close event', function(t) {
    t.plan(1);
    run("ls").on("close", function() {
        t.ok(true);
    });
});
