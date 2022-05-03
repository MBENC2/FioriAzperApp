sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
    

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter, Massagebox, JSONModel) {
        "use strict";

        return Controller.extend("freestyle.controller.View1", { 
                formatter: formatter,

            onInit: function () {

            },


            handleCreation(){
                
                if (!this._createFragment) {
                    this._createFragment = sap.ui.xmlfragment(this.getView().getId(),
                        "freestyle.view.fragments.create", this);
                    this.getView().addDependent(this._createFragment)
                }
                this._createFragment.open()
    
              
            },

            onCancel() {
                this._createFragment.close()
            },



            onCreate(oEvent) {
                debugger
                var bp = this.getView().byId("bpName"),
                    category = this.getView().byId("bpCategory"),
                    that = this;
    
                    oModel = this.getModel(this)
                
    
                var oPayload = {
                    BusinessPartnerCategory : category.getSelectedKey(), 
                    OrganizationBPName1 : bp.getValue(), 
                    to_BusinessPartnerAddress : [ { Country : "DE", StreetName : "Dietmar-Hopp-Allee 16", PostalCode : "69190", CityName : "Walldorf", to_AddressUsage : [ { AddressUsage : "XXDEFAULT" } ] } ], 
                    to_BusinessPartnerTax : [ { BPTaxType:"DE0", BPTaxNumber: "DE012345678" }] 
                }
    
    
                oModel.create("/A_BusinessPartner", oPayload, 
                {
                    success:function(oData,oResponse){
                            that._createFragment.close()
                            MessageBox.success(`The business partner ${oData.OrganizationBPName1} with business partner id ${oData.BusinessPartner} was successfully created`);
                            that.getView().byId("businessPartnerList").updateBindings(true);                    
                        },
                    error: function(oError){
                            MessageBox.error("Error");
                        }
                    });
    
            },
    
    
    
    
        });
    });
