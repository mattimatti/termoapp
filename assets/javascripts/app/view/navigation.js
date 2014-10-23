// Navigation
define(function(require, exports, module) {
    "use strict";

    var app = require("app");

    var logger = require("lib/console");

    var Layout = Backbone.View.extend({

        /************ Backbone.LayoutManager *****************/

        manage: true,

        template: require("ldsh!../templates/navigation"),

        el: false,

        beforeRender: function() {
            logger.debug('beforeRender');

        },

        afterRender: function() {
            logger.debug('afterRender');
        },

        initialize: function() {
            logger.debug('initialize');
        }

    });

    module.exports = Layout;
});