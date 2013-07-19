(function (global) {
    'use strict';
    var _ = {};

    var slice = Array.prototype.slice;

    var where = function (array, fn) {
        if (array.constructor == Object) {
            var x = [];
            for (var prop in array) {
                x.push(array[prop]);
            }
            array = x;
        }

        return array.filter(fn);
    };

    var map = function (array, fn) {
        if (array.constructor == Object) {
            var x = [];
            for (var prop in array) {
                x.push(array[prop]);
            }
            array = x;
        }
        return array.map(fn);
    };

    var zip = function () {
        var args = arguments.length == 1 ? arguments[0] : slice.call(arguments, 0);

        var len = args.map(function (x) { return x.length; }).sort().reverse()[0];

        var result = new Array(len);

        var index = -1;

        while (++index < len) {
            result[index] = args.map(function (x) { return x[index]; });
        }

        return result;
    };

    var bind = function (fn, context) {
        var args = slice.call(arguments, 2);

        return function () {
            return fn.apply(context, args.concat(slice.call(arguments, 0)));
        };
    };

    var merge = function () {
        var args = slice.call(arguments, 0);
        return args.reduce(function (x, y) {
            return x.concat(y);
        });
    };

    _.where = where;
    _.filter = where;
    _.map = map;
    _.zip = zip;
    _.unzip = zip;
    _.bind = bind;
    _.merge = merge;
    global._ = _;
})(window);