define(function(require, exports, module) {
    "use strict";

    var logger = require('lib/console');
    var app = require('app');
    //var BaseModel = require('doctrine/model/UserBase');

    var Backbone = require("backbone");

    //var Model = BaseModel.extend({

    var Model = Backbone.Model.extend({

        //idAttribute: 'Id',

        url: function() {

            if (this.isNew()) {
                return app.api + 'user';
            }
            return app.api + 'user/' + this.getId();

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