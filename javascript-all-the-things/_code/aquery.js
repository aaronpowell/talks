(function (global) {
    'use strict';

    var classNameRegex = /^\.\w+$/;
    var idRegex = /^\#\w+$/;

    var slice = Array.prototype.slice;
    global.$ = function (selector, context) {
        context = context || document;

        var items;

        if (classNameRegex.test(selector)) {
            items = context.getElementsByClassName(selector.replace('.', ''));
        } else if (idRegex.test(selector)) {
            items = [document.getElementById(selector.replace('#', ''))];
        } else {
            items = context.querySelectorAll(selector);
        }

        var obj = {};

        obj.length = items.length;

        /*for (var i = 0; i < items.length; i++) {
            obj[i] = items[i];
        }*/

        items = slice.call(items, 0);
        items.reduce(function (obj, x, i) {
            obj[i] = x;
            return obj;
        }, obj);

        obj.find = function (selector) {
            var matches = items.map(function (item) {
                return $(selector, item);
            });

            /*
            var ret = [];
            for (var i = 0; i < matches.length; i++) {
                for (var j = 0; j < matches[i].length; j++) {
                    ret.push(matches[i][j]);
                }
            }
            return ret;
            */

            return matches.reduce(function (ret, match) {
                var x = slice.call(match, 0);
                return ret.concat.apply(ret, x);
            }, []);
        };

        return obj;
    };
})(window);