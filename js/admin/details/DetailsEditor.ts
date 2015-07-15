/// <reference path="../RegA.ts" />
/// <reference path="DetailsForm.ts" />
/// <reference path="DetailsList.ts" />
/// <reference path="DetailsCategory.ts" />

module uplight{
    export class DetailsEditor{

        R:RegA

        constructor(container:JQuery) {
            container.load('js/admin/details/DetailsEditor.htm',()=>this.init());
            this.R=RegA.getInstance();
            if (!this.R.model) this.R.model = new DestinantionsModel();

        }


        private view: JQuery;

        private btnAdd: JQuery;
        private btnDel: JQuery;
        private btnEdit: JQuery;
        private btnSave: JQuery;

        private detailsForm:DetailsForm
        private list:DetailsList;


        private init(): void {
            this.view = $('#DetailsEditor');

            this.list = new DetailsList($('#DetailsList'));
            this.detailsForm = new DetailsForm($('#DetailsForm'));
            this.detailsForm.view.find('.panel-heading .fa-close:first').on(CLICK,()=>{
               this.hideForm();
            })
            this.detailsForm.hide();
            this.list.dispatcher.on(this.list.SELECTED,(evt,data)=>{
                this.detailsForm.setDestibation(data);

            })

            this.btnAdd = this.view.find('[data-id=btnAdd]:first').on(CLICK, () => this.onBtnAddClick());
            this.btnDel = this.view.find('[data-id=btnDel]:first').on(CLICK, () => this.onBtnDelClick());

            this.btnEdit = this.view.find('[data-id=btnEdit]:first').on(CLICK, () => this.onBtnEditClick());
            this.btnSave = this.detailsForm.view.find('[data-id=btnSave]:first').on(CLICK, () => this.onBtnSaveClick());
            //this.showForm();
        }

        private showForm(){
            this.detailsForm.show();
            this.list.hide();
        }

        private hideForm():void{
            this.detailsForm.hide();
            this.list.show();
        }

       private onBtnAddClick(): void {
                var dest: VODestination = new VODestination({id:0});
                this.detailsForm.setDestibation(dest);
           this.list.hide();
           this.detailsForm.show();
           this.detailsForm.focusName();
        }



        private onBtnEditClick():void{
          var dest:VODestination = this.list.getSelectedItem();
            if(dest){
                this.detailsForm.setDestibation(dest);
                this.list.hide();
                this.detailsForm.show();
                this.detailsForm.focusName();
            }

        }


        private onSave(res): void {
            console.log(res);

            if(res.success){
                if(res.success=='insert'){
                    this.detailsForm.setID( Number(res.result));

                    var dest= this.detailsForm.getDestination();
                    this.list.setSelectedItem(dest);
                }
                this.R.alert('Record Saved', this.btnSave.parent());

            }  else this.R.alert('ERROR ', this.btnSave.parent());



        }

        private onBtnSaveClick(): void {
           // if (this.btnSave.hasClass(DISABLED)) return;
            console.log('click');
            var dest = this.detailsForm.getDestination();
            if (!dest) return;

            this.R.model.saveDestination((res) => this.onSave(res),dest,this.detailsForm.getPages());

        }
      ////////////////////////////////////////////////////////////////////////////////////////////////
        private onDelete(res): void {
            this.R.alert('Record deleted', this.btnDel);
            this.list.selectedItem=null;
            this.detailsForm.setDestibation(null);
        }
       // private onDeleteConfirmed(): void {
           // this.R.vo.deleteDestination(this.detailsForm., (res) => this.onDelete(res));
        //}

        private onBtnDelClick(): void {
             var dest:VODestination = this.list.getSelectedItem();
            if(dest) {
                var isdel = confirm('You want to delete '+dest.name+' from database?');
                if(isdel){
                    this.R.model.deleteDestination(dest,(res)=>this.onDelete(res));
                }


            }

               // showAlert('You want to delete record: ' + name + '?', () => this.onDeleteConfirmed(),'Delete');
        }




    }

}
