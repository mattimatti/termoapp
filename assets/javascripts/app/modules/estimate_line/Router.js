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

            this.collection = app.dataModel.estimate_line = new Collection();

            // Listen to app events
            // this.listenTo(app, '', this.onEvent, this);

        },

        routes: {
            'estimate_line/list': 'listAction',
            'estimate_line/create': 'createAction',
            'estimate_line/edit/:id': 'editAction',
            'estimate_line/:id': 'viewAction'
        },

        /**
         * url update causes to show all estimate_line
         */
        listAction: function() {
            logger.debug('listAction');
            this.cached = {
                state: 'estimate_line:viewall'
            };

            app.trigger('estimate_line:viewall');

            this.render(ListView, {
                collection: this.collection
            });
            this.collection.fetch();

        },

        /**
         * url update causes to edit one estimate_line
         * @param id
         */
        viewAction: function(id) {
            logger.debug('viewAction');
            this.cached = {
                state: 'estimate_line:edit',
                id: id
            };
            app.trigger('estimate_line:edit', id);

            var viewModel = this.collection.get(id);

            this.render(ItemView, {
                model: viewModel
            }, true);
        },

        /**
         * url update cause to create a new estimate_line
         */
        createAction: function() {
            logger.debug('createAction');
            this.cached = {
                state: 'estimate_line:create'
            };
            app.trigger('estimate_line:create');

            this.render(CreateView, {
                model: new Model({})
            }, true);
        },

        /**
         * url update cause to edit a  estimate_line
         * @param id
         */
        editAction: function(id) {
            logger.debug('editAction');
            this.cached = {
                state: 'estimate_line:create'
            };
            app.trigger('estimate_line:create');

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