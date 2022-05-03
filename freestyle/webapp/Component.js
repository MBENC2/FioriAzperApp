sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "freestyle/model/models"
    ],
    function (UIComponent, Device, models, ErrorHandler) {
        "use strict";

        return UIComponent.extend("freestyle.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                
            // set the device model
			this.setModel(new sap.ui.model.json.JSONModel, "Settings");

			// create the views based on the url/hash
			this.getRouter().initialize();

                
            }
        });
    }
);