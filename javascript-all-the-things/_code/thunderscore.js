(function (global) {
    'use strict';
    global._ = {};

    var zip = function (array) {
        var args = arguments.length == 1 ? arguments[0] : Array.prototype.slice.call(arguments, 0);

        var len = args.map(function (x) { return x.length; }).sort()[0];

        var result = new Array(len);

        var index = -1;

        while (++index < len) {
        result[index] = args.map(function (x) { return x[index]; });
        }

        return result;
    };

    global._.zip = zip;
    global._.unzip = zip;
})(window);