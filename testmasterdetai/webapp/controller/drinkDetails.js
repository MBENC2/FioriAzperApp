sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("testmasterdetai.controller.drinkDetails", {
            onInit: function () {

             

            },
            onSelectionChange: function(oEvent) {
                var sOrderId = oEvent.getSource().getSelectedItem().getBindingContext().getProperty("drinkId");
                this.getOwnerComponent().getRouter()
                    .navTo("drinkDetails", 
                        {drinkId:sOrderId}, 
                        !Device.system.phone);
            }
        });
    });
