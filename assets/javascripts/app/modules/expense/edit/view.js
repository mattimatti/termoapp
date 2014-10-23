define(function(require, exports, module) {
    "use strict";

    var app = require("app");

    var logger = require("lib/console");

    var SelectBox = require("lib/selectbox");

    var OptionsGrid = require("lib/optionsgrid");

    var Layout = Backbone.View.extend({

        /************ Backbone.LayoutManager *****************/

        manage: true,

        template: require("ldsh!./template"),

        beforeRender: function() {
            logger.debug('beforeRender');

        },

        afterRender: function() {
            logger.debug('afterRender');

            this.setView('.selectbox-client', new SelectBox({
                el: this.$el.find('.selectbox-client'),
                collection: app.dataModel.client
            }));

            this.setView('.selectbox-category', new SelectBox({
                el: this.$el.find('.selectbox-category'),
                collection: app.dataModel.category
            }));

            this.modelBinder.bind(this.model, this.$('.form'));

        },

        serialize: function() {
            return {
                model: this.model
            };
        },

        /************ Backbone.View *****************/

        submitForm: function() {
            logger.debug('submitForm');
            this.listenToOnce(this.model, 'sync', this.onSaveSuccess, this);
            this.model.save();
        },

        onSaveSuccess: function() {
            logger.debug('onSaveSuccess', this.model);
            app.router.navigate('expense/list', true);
        },

        initialize: function() {
            logger.debug('initialize');

            this.modelBinder = new Backbone.ModelBinder();
            logger.debug('modelBinder', this.modelBinder);

            this.listenTo(this.model, 'change', this.onModelChanged, this);
        },

        onModelChanged: function() {
            logger.debug('onModelChanged', this.model);

        },

        events: {
            "click .submitForm": "submitForm"
        }

    });

    module.exports = Layout;
});