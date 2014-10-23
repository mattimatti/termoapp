define(function(require, exports, module) {
    "use strict";

    var logger = require('lib/console');
    var app = require('app');
    //var BaseModel = require('doctrine/model/StaffBase');

    var Backbone = require("backbone");

    //var Model = BaseModel.extend({

    var Model = Backbone.Model.extend({

        //idAttribute: 'staffId',

        url: function() {

            if (this.isNew()) {
                return app.api + 'staff';
            }
            return app.api + 'staff/' + this.getId();

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