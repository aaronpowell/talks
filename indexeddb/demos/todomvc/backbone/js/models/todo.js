/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false
		},

		// Save all of the todo items under the `"todos"` store
		database: {
			id: 'todos-backbone',
			description: 'Storage for the TodoMVC demo app',
			 migrations: [{
				version: 1,
				migrate: function (transaction, next) {
					var store = transaction.db.createObjectStore("todos");
					next();
				}
			}]
		},
		storeName: 'todos',

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		}
	});
})();
