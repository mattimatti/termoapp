define(function(require, exports, module) {
    "use strict";

    var app = require("app");

    var logger = require("lib/console");

    var MainLayout = require("view/layout");

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        initialize: function() {

            logger.debug('initialize');

            this.initLayout();

            this.initModules();

        },

        // Initialize modules or routers or bundles
        // and set a reference to the app.
        initModules: function() {

            logger.debug('initModules');

            //app.modules.dashboard = require("custommodules/dashboard/Module");

            // Every module router

            app.modules.address = require("modules/address/Module");

            app.modules.category = require("modules/category/Module");

            app.modules.client = require("modules/client/Module");

            app.modules.contact = require("modules/contact/Module");

            app.modules.country = require("modules/country/Module");

            app.modules.currency = require("modules/currency/Module");

            app.modules.estimate = require("modules/estimate/Module");

            app.modules.estimateContacts = require("modules/estimate_contacts/Module");

            app.modules.estimateLine = require("modules/estimate_line/Module");

            app.modules.estimateStatus = require("modules/estimate_status/Module");

            app.modules.expense = require("modules/expense/Module");

            app.modules.invoice = require("modules/invoice/Module");

            app.modules.invoiceLine = require("modules/invoice_line/Module");

            app.modules.invoiceStatus = require("modules/invoice_status/Module");

            app.modules.invoiceType = require("modules/invoice_type/Module");

            app.modules.language = require("modules/language/Module");

            app.modules.office = require("modules/office/Module");

            app.modules.officeData = require("modules/office_data/Module");

            app.modules.role = require("modules/role/Module");

            app.modules.staff = require("modules/staff/Module");

            app.modules.tax = require("modules/tax/Module");

            app.modules.user = require("modules/user/Module");

        },

        // initilaize the layout.
        initLayout: function() {

            logger.debug('initLayout');

            // Use main layout and set Views.
            var main = new MainLayout();

            app.view = main;
            $("body").empty().append(main.el);
            main.render();

        },

        //routes: {
        //  "/": "indexAction"
        //},

        //indexAction: function() {
        //  console.debug('indexAction');
        //  // Reset the state and render.
        //  this.reset();
        //},

        // Shortcut for building a url.
        go: function() {
            return this.navigate(_.toArray(arguments).join("/"), true);
        },

        reset: function() {
            // Reset collections to initial state.

            _.each(app.dataModel, function(collection) {
                collection.fetch({
                    cache: true
                });
            });

            // Reset active model.
            app.active = false;
            //this.commits.repo = false;
        }

    });

    module.exports = Router;
});