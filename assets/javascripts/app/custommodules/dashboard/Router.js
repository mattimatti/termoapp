define(function(require, exports, module) {
    "use strict";

    var app = require('app');

    var logger = require('lib/console');

    var Backbone = require('backbone');

    var DashBoardView = require("./list/view");


    var Router = Backbone.Router.extend({

        cached: {},

        view: null,

        el: '.main',

        initialize: function() {
            console.debug('initialize');

            //app.dataModel.address = new Collection();

            // Listen to app events
            // this.listenTo(app, '', this.onEvent, this);

        },

        routes: {
            '': 'indexAction'
        },

        /**
         * show dashboard
         */
        indexAction: function() {
            logger.debug('indexAction');
            app.view.setView(this.el, new DashBoardView({})).render();
        }

    });

    module.exports = Router;
});