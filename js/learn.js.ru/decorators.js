;(function () {
    var timers = {};

    function timingDecorator(f, timerName) {
        var start = performance.now();

        f.apply(this, arguments);

        if(! timers[timerName]) {
            timers[timerName] = 0;
        }

        timers[timerName] += performance.now() - start;

    };

    window.t = {
        timers: timers,
        decorator: timingDecorator
    };
}());