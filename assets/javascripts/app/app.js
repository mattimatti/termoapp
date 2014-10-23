define(function(require, exports, module) {
    "use strict";

    // External dependencies.
    var _ = require("lodash");

    var $ = require("jquery");

    var Backbone = require("backbone");

    var Layout = require("layoutmanager");

    var Relational = require("backbone-relational");

    // Alias the module for easier identification.
    var app = module.exports;

    // API endpoint.
    app.api = "http://beconcierge.local/v1/";

    // A model storage
    app.dataModel = {};

    // hold all the modules/routers
    app.modules = {};

    // The root path to run the application through.
    app.root = "/";

    // Extend Backbone Events for event triggering
    _.extend(app, Backbone.Events);

});