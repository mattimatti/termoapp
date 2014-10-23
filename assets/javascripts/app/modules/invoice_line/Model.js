define(function(require, exports, module) {
    "use strict";

    var logger = require('lib/console');
    var app = require('app');
    //var BaseModel = require('doctrine/model/InvoiceLineBase');

    var Backbone = require("backbone");

    //var Model = BaseModel.extend({

    var Model = Backbone.Model.extend({

        //idAttribute: 'invoiceLineId',

        url: function() {

            if (this.isNew()) {
                return app.api + 'invoice_line';
            }
            return app.api + 'invoice_line/' + this.getId();

        },

        initialize: function() {

        },

        getId: function() {
            return this.get(this.idAttribute);
        },

        getLabel: function() {
            return this.get(this.idAttribute);
        },

        validate: function(attrs, options) {

        }

    });

    module.exports = Model;
});