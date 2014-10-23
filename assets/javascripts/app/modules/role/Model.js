define(function(require, exports, module) {
    "use strict";

    var logger = require('lib/console');
    var app = require('app');
    //var BaseModel = require('doctrine/model/RoleBase');

    var Backbone = require("backbone");

    //var Model = BaseModel.extend({

    var Model = Backbone.Model.extend({

        //idAttribute: 'Id',

        url: function() {

            if (this.isNew()) {
                return app.api + 'role';
            }
            return app.api + 'role/' + this.getId();

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