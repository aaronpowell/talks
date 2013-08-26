(function( window ) {
    'use strict';

    var flightMode = new FlightMode('todomvc');

    var newItem = document.getElementById('new-todo');

    newItem.addEventListener('keydown', function (e) {
        if (e.keyCode == 13 && newItem.value) {
            flightMode.add({
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
            items = flightMode.getAll();
        } else {
            items = flightMode.getBy('completed', state);
        }

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

        flightMode.remove(item.__id__);
        flightMode.add(item);
    });

    list.addEventListener('click', function (e) {
        if (e.target.className == 'destroy') {
            var li = e.target.parentElement.parentElement;
            var item = li.item;

            flightMode.remove(item.__id__);
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
