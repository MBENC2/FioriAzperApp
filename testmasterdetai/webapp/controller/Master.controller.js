sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("testmasterdetai.controller.Master", {
            onInit: function () {
               this.getOwnerComponent().getRouter().getRoute("drinkDetails").attachPatternMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function(oEvent) {
                this._drinkId = oEvent.getParameter("arguments").drinkId;
                this.getView().bindElement("/drinks/" + this._drinkId);
              
            }
        });
    });
