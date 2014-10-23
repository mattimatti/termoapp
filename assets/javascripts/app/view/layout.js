define(function(require, exports, module) {
    "use strict";

    var logger = require("lib/console");

    var Navigation = require("view/navigation");

    var Layout = Backbone.View.extend({

        /************ Backbone.LayoutManager *****************/

        manage: true,

        template: require("ldsh!../templates/main"),

        views: {
            '.navigation': new Navigation()
        },

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