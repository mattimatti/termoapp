define(function(require, exports, module) {
    "use strict";

    var Namespace = {
        Router: require("./Router"),

        Views: {
            List: require("./list/view")
        }
    };

    var initialize = function() {
        var router = new Namespace.Router(Namespace);
        return router;
    };

    module.exports = initialize();

});