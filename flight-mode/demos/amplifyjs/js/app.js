(function( window ) {
    'use strict';

    var guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    var newItem = document.getElementById('new-todo');

    newItem.addEventListener('keydown', function (e) {
        if (e.keyCode == 13 && newItem.value) {
            var id = guid();
            amplify.store(id, {
                __id__: id,
                text: newItem.value, 
                completed: false
            });
            newItem.value = '';
            refreshItems();
        }
    });

    var list = document.getElementById('todo-list');
    var itemCount = document.getElementById('todo-count');
    var refreshItems = function (state) {
        var items;
        if (state == undefined) {
            items = amplify.store();
        } else {
            items = amplify.store().filter(function (item) {
                return item.completed == state;
            });
        }

        items = Object.keys(items).reduce(function (arr, key) {
            arr.push(items[key]);
            return arr;
        }, [])

        var html = items.map(function (item) {
            var el = document.createElement('li');
            el.className = item.completed ? 'completed' : '';

            el.item = item;

            el.innerHTML = 
                    '<div class="view">' +
                        '<input type="checkbox" class="toggle"' + (item.completed ? ' checked' : '') + '>' +
                        '<label>' + item.text + '</label>' +
                        '<button class="destroy"></button>' +
                    '</div><input class="edit" value="Create a TodoMVC template">';

            return el;
        });

        list.innerHTML = '';
        html.reduce(function (el, li) {
            el.appendChild(li);
            return el;
        }, list);
        refreshCount();
    };

    var refreshCount = function () {
        var count = list.children.length;
        itemCount.innerHTML = count + ' item' + (count !== 1 ? 's' : '') + ' left';
    };

    refreshItems();

    list.addEventListener('change', function (e) {
        var li = e.target.parentElement.parentElement;
        var item = li.item;

        item.completed = e.target.checked;

        li.className = item.completed ? 'completed' : '';

        amplify.store(item.__id__, item);
    });

    list.addEventListener('click', function (e) {
        if (e.target.className == 'destroy') {
            var li = e.target.parentElement.parentElement;
            var item = li.item;

            amplify.store(item.__id__, item, { expires: -1 });
            list.removeChild(li);
            refreshCount();
        }
    });

    window.addEventListener('hashchange', function (e) {
        switch (document.location.hash) {
            case '#/active':
                refreshItems(false);
                break;

            case '#/completed':
                refreshItems(true);
                break;

            default:
                refreshItems();
                break;
        }
    });

})( window );
