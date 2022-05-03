sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/odata/v2/ODataModel',
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/util/MockServer"







], function (BaseController, JSONModel, formatter, MockServer, ResourceModel, ODataModel, Filter, FilterOperator, Fragment) {
    "use strict";

    return BaseController.extend("tstazper.controller.Worklist", {

        onInit: function () {
 


		formatter: formatter;

               
        
        },
    
		
		//GET Smart Table by Id, Don't use Smart Table ID in other places in code
		//use this function instead
		_getSmartTableById: function(){
			return this.getView().byId("devRequests");
		},
       
        onSelection(oEvent){
            
            var oTable = this.getView().byId("innerTable");
            var editButton = this.getView().byId("editButton");
          
            oTable.getSelectedIndices().length > 0 ?  editButton.setEnabled(true):  editButton.setEnabled(false);
        },
       
        handleCreation(){
            debugger
            if (!this._createFragment) {
				this._createFragment = sap.ui.xmlfragment(this.getView().getId(),
					"tstazper.view.fragments.CreateRequest", this);
				this.getView().addDependent(this._createFragment)
			}
			this._createFragment.open()

          
        },

        onCancelCreate(){
            this._createFragment.close();
        },

        onCreate(oEvent) {
debugger
            var CustomerElement = this.byId("CustomerIdSelect").getValue(),
                ProjectElement = this.byId("ProjectIdSelect").getValue(),
                DevReqElement = this.byId("devNameID").getValue(),
                DoDateElement = this.byId("DueDateSelect").getValue(),
                SpecURLElement = this.byId("SpecURLIdSelect").getValue();
            
            
                if(CustomerElement.trim() === ""){
                this.byId("CustomerIdSelect").setValueState("Error");
                this.byId("CustomerIdSelect").setValueStateText("This field cannot be empty");
                } else{
                    this.byId("CustomerIdSelect").setValueState("None");
                }

                if(ProjectElement.trim() === ""){
                    this.byId("ProjectIdSelect").setValueState("Error");
                    this.byId("ProjectIdSelect").setValueStateText("This field cannot be empty");                
                } else{
                    this.byId("ProjectIdSelect").setValueState("None");
                }         

                if(DevReqElement.trim() === ""){
                    this.byId("devNameID").setValueState("Error");
                    this.byId("devNameID").setValueStateText("This field cannot be empty");                
                } else{
                    this.byId("devNameID").setValueState("None");
                }          

                if(DoDateElement.trim() === ""){
                    this.byId("DueDateSelect").setValueState("Error");
                    this.byId("DueDateSelect").setValueStateText("This field cannot be empty");                
                } else{
                    this.byId("DueDateSelect").setValueState("None");
                }

           

                if(SpecURLElement.trim() === ""){
                    this.byId("SpecURLIdSelect").setValueState("Error");
                    this.byId("SpecURLIdSelect").setValueStateText("This field cannot be empty");                
                } else{
                    this.byId("SpecURLIdSelect").setValueState("None");
                }
                

                
            

               


         

                //Provjera svih elemenata
                if(CustomerElement.trim() != "" && ProjectElement.trim() != "" && DevReqElement.trim() != "" && DoDateElement.trim() != "" && SpecURLElement.trim() != ""){
                     
            var DoDate = this.getView().byId("DueDateSelect"),
                that = this;
            var oModel = this.getModel(),
            newDoDate =  DoDate.getValue() + 'T00:00:00'; // Promjena formata datuma '2022-02-04T00:00:00'
            

            var oPayload = {
                CustomerId: this.getView().byId("CustomerIdSelect").getSelectedKey(),
                ProjectId : this.getView().byId("ProjectIdSelect").getSelectedKey(),
                SapModule : this.getView().byId("SapModuleID").getSelectedKey(),
                DevreqName : this.getView().byId("devNameID").getValue(),
                Consultant : sap.ushell.Container.getService("UserInfo").getId(),         
                Duedate :   newDoDate,
                Note : this.getView().byId("DescriptionIdSelect").getValue(),
                SpecUrl : this.getView().byId("SpecURLIdSelect").getValue(),
                DevreqStatus : this.getView().byId("StatusID").getSelectedKey(),
                ChangedOn :  '2022-02-04T00:00:00'
            }

            oModel.create("/AzperDevelopmentRequestSet", oPayload, 
            {
                                
				success:function(oData,oResponse){
                     debugger
                        that._createFragment.close();
                        sap.m.MessageBox.success("The Development Request was successfully created");
                        that.getView().byId("devRequests").updateBindingContext;                   
                        
                    } ,
                error: function(oError){
                    sap.m.MessageBox.error("Error");
                    }
                });
            } else{
                sap.m.MessageBox.error("Please enter all mandatory fields");
            }
		},
       

        
        onFieldChange(evt) {
            debugger
            var aTableItems = this._getSmartTableById().getTable().getItems();
            let oModel = this.getModel(),
            oTable = this.getView().byId("devRequests");
            var change = evt.getParameter("changeEvent");
            if (change) {
              var newValue = change.getParameter("newValue");
              var src = change.getSource();
              // get the data binding and send the changes via your appropriate web service



              var oPayload = {
                DevreqName : newValue
              

            }
   


            oModel.update(`/AzperDevelopmentRequestSet('${src}')`, oPayload, {
            
            success:function(oData, oResponse){
                debugger
               
                sap.m.MessageBox.success("success");
                that.getModel().updateBinding(true);
                this.getModel().refresh();
                    
            },
            error(oError){
                debugger
                sap.m.MessageBox.error("error");
            }
    });

            }
          },
  


 onEdit(){
    debugger
    let oTable = this.getView().byId("innerTable"),
    selectedIndex = oTable.getSelectedIndex(),
    currentObject = this.getModel().getObject(oTable.getRows()[selectedIndex].getBindingContext().getPath());

    this.setModel(new sap.ui.model.json.JSONModel(currentObject), "SelectedObject")          


    if (!this.editDialog) {
        this.editDialog = sap.ui.xmlfragment(this.getView().getId(), "tstazper.view.fragments.editRequest", this);
        this.getView().addDependent(this.editDialog);
        }

        this.editDialog.open();
  
},

onCancel(){
    this.editDialog.close();
},

onUpdate(){
    debugger
        let oModel = this.getModel(),
        objectToUpdate = this.getModel("SelectedObject").getData()

         var oPayload = {
            DevreqName : objectToUpdate.DevreqName,
            Consultant :objectToUpdate.Consultant,   
            Duedate :   objectToUpdate.Duedate + 'T00:00:00',
            Note: objectToUpdate.Note,
            SpecUrl : objectToUpdate.SpecUrl
            
          

        }

        oModel.update(`/AzperDevelopmentRequestSet('${objectToUpdate.DevreqId}')`, oPayload, {
        
        success:function(oData, oResponse){
            debugger
           
            sap.m.MessageBox.success("success");
           // that.getModel().updateBinding(true);
            //this.getModel().refresh();
           
        


                 
        },
        error(oError){
            debugger
            sap.m.MessageBox.error("error");
        }
});




     
    this.editDialog.close();
   
}

     

    });
});
