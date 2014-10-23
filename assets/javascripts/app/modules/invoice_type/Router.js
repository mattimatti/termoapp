define(function(require, exports, module) {
    "use strict";

    var app = require('app');

    var logger = require("lib/console");

    var Backbone = require('backbone');

    var Collection = require("./Collection");

    var Model = require("./Model");

    var ItemView = require("./item/view");

    var EditView = require("./edit/view");

    var CreateView = require("./create/view");

    var ListView = require("./list/view");

    var Router = Backbone.Router.extend({

        cached: {},

        view: null,

        el: '.main',

        initialize: function() {

            this.collection = app.dataModel.invoice_type = new Collection();

            // Listen to app events
            // this.listenTo(app, '', this.onEvent, this);

        },

        routes: {
            'invoice_type/list': 'listAction',
            'invoice_type/create': 'createAction',
            'invoice_type/edit/:id': 'editAction',
            'invoice_type/:id': 'viewAction'
        },

        /**
         * url update causes to show all invoice_type
         */
        listAction: function() {
            logger.debug('listAction');
            this.cached = {
                state: 'invoice_type:viewall'
            };

            app.trigger('invoice_type:viewall');

            this.render(ListView, {
                collection: this.collection
            });
            this.collection.fetch();

        },

        /**
         * url update causes to edit one invoice_type
         * @param id
         */
        viewAction: function(id) {
            logger.debug('viewAction');
            this.cached = {
                state: 'invoice_type:edit',
                id: id
            };
            app.trigger('invoice_type:edit', id);

            var viewModel = this.collection.get(id);

            this.render(ItemView, {
                model: viewModel
            }, true);
        },

        /**
         * url update cause to create a new invoice_type
         */
        createAction: function() {
            logger.debug('createAction');
            this.cached = {
                state: 'invoice_type:create'
            };
            app.trigger('invoice_type:create');

            this.render(CreateView, {
                model: new Model({})
            }, true);
        },

        /**
         * url update cause to edit a  invoice_type
         * @param id
         */
        editAction: function(id) {
            logger.debug('editAction');
            this.cached = {
                state: 'invoice_type:create'
            };
            app.trigger('invoice_type:create');

            var editableModel = this.collection.get(id);

            this.render(EditView, {
                model: editableModel
            }, true);
        },

        /**
         * Render a view
         */
        render: function(ViewClass, dataObj, renderNow) {
            this.view = app.view.setView(this.el, new ViewClass(dataObj));
            if (renderNow === true) {
                this.view.render();
            }
        }

    });

    module.exports = Router;
});