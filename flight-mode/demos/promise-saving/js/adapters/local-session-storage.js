(function (global) {
    'use strict';

    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    var Store = function (storeName, storage, onSuccess) {
        this.storeName = storeName;

        var store = JSON.parse(storage.getItem(storeName));

        if (!store) {
            store = [];
            storage.setItem(storeName, JSON.stringify(store));
        }

        this.storage = storage;
        this.store = store;

        setTimeout(onSuccess, 0);
    };

    Store.prototype.destroy = function() {
        this.store.map(this.remove.bind(this));

        this.storage.removeItem(this.storeName);
    };

    Store.prototype.add = function(obj) {
        var d = Q.defer();
        setTimeout(function () {
            var id = guid();
            obj.__id__ = id;
            this.storage.setItem(id, JSON.stringify(obj));
            this.store.push(id);
            this.storage.setItem(this.storeName, JSON.stringify(this.store));

            Q.resolve(id);
        }.bind(this), 0);

        return d.promise;
    };

    Store.prototype.remove = function(id) {
        var d = Q.defer();
        setTimeout(function () {
            var index = this.store.indexOf(id)
            if (!~index) {
                throw 'The id "' + id + '" was not found in the store';
            }

            this.storage.removeItem(id);
            this.store = this.store.slice(0, index).concat(this.store.slice(index + 1));
            this.storage.setItem(this.storeName, JSON.stringify(this.store));

            Q.resolve();
        }.bind(this), 0);

        return d.promise;
    };

    Store.prototype.get = function(id) {
        var d = Q.defer();
        setTimeout(function () {
            d.resolve(JSON.parse(this.storage.getItem(id)));
        }.bind(this), 0);

        return d.promise;
    };

    Store.prototype.getAll = function() {
        var d = Q.defer();
        setTimeout(function () {
            var promises = this.store.map(this.get.bind(this)); 
            Q.all(promises).then(function (items) {
                d.resolve(items);
            });
        }.bind(this), 0);

        return d.promise;
    };

    Store.prototype.getBy = function(property, value) {
        var d = Q.defer();
        setTimeout(function () {
            this.getAll()
                .then(function (items) {
                    items = items.filter(function (item) {
                        return item[property] === value;
                    });
                    d.resolve(items);
                });
        }.bind(this), 0);

        return d.promise;
    };

    var createAdapter = function (storage, adapterName) {
        return global.FlightMode.adapters[adapterName] = {
            init: function (storeName, complete) {
                return new Store(storeName, storage, complete);
            }
        };
    };

    global.FlightMode.defaultAdapter = createAdapter(global.localStorage, 'localStorage');
    createAdapter(global.sessionStorage, 'sessionStorage');

})(window);