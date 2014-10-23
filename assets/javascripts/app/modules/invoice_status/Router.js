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

            this.collection = app.dataModel.invoice_status = new Collection();

            // Listen to app events
            // this.listenTo(app, '', this.onEvent, this);

        },

        routes: {
            'invoice_status/list': 'listAction',
            'invoice_status/create': 'createAction',
            'invoice_status/edit/:id': 'editAction',
            'invoice_status/:id': 'viewAction'
        },

        /**
         * url update causes to show all invoice_status
         */
        listAction: function() {
            logger.debug('listAction');
            this.cached = {
                state: 'invoice_status:viewall'
            };

            app.trigger('invoice_status:viewall');

            this.render(ListView, {
                collection: this.collection
            });
            this.collection.fetch();

        },

        /**
         * url update causes to edit one invoice_status
         * @param id
         */
        viewAction: function(id) {
            logger.debug('viewAction');
            this.cached = {
                state: 'invoice_status:edit',
                id: id
            };
            app.trigger('invoice_status:edit', id);

            var viewModel = this.collection.get(id);

            this.render(ItemView, {
                model: viewModel
            }, true);
        },

        /**
         * url update cause to create a new invoice_status
         */
        createAction: function() {
            logger.debug('createAction');
            this.cached = {
                state: 'invoice_status:create'
            };
            app.trigger('invoice_status:create');

            this.render(CreateView, {
                model: new Model({})
            }, true);
        },

        /**
         * url update cause to edit a  invoice_status
         * @param id
         */
        editAction: function(id) {
            logger.debug('editAction');
            this.cached = {
                state: 'invoice_status:create'
            };
            app.trigger('invoice_status:create');

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