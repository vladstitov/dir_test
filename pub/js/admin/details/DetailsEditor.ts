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

        private detailsForm:DetailsForm;
        private list:DetailsList;

        private btnDrop:JQuery;

        private init(): void {
            this.view = $('#DetailsEditor');

            this.list = new DetailsList($('#DetailsList'));

            this.detailsForm = new DetailsForm($('#DetailsForm'));

            this.detailsForm.onClose = ()=>this.hideForm();
            this.detailsForm.onSave = ()=>this.onBtnSaveClick();
            this.detailsForm.hide();


            if(this.R.isSuper) this.btnDrop = $('<a>').addClass('btn').html('<span class="fa fa-bolt"> Drop Table</span>').appendTo(this.list.view.find('[data-id=tools]:first')).click(()=>this.onDrop());

                //= this.view.find('[data-id=btnDrop]:first').click(()=>this.onDrop())
            this.btnAdd = this.view.find('[data-id=btnAdd]:first').on(CLICK, () => this.onBtnAddClick());
            this.btnDel = this.view.find('[data-id=btnDel]:first').on(CLICK, () => this.onBtnDelClick());

            this.btnEdit = this.view.find('[data-id=btnEdit]:first').on(CLICK, () => this.onBtnEditClick());

            //this.showForm();
        }

        private onDrop():void{
            if(confirm('You want to delete whole table tenats?')) this.R.connector.dropTable('tenants').done(()=>{this.R.model.refreshData()});
        }
       // private showForm(){
          ///  this.detailsForm.show();
           // this.list.hide();
     //   }

        private hideForm():void{
            this.detailsForm.hide();
            this.list.show();
        }

       private onBtnAddClick(): void {
                var dest: VODestination = new VODestination({id:0,cats:[],imgs:''});
                this.detailsForm.setDestination(dest);
           this.detailsForm.render();
           this.list.hide();
           this.detailsForm.show();
           this.detailsForm.focusName();
        }



        private onBtnEditClick():void{
          var dest:VODestination = this.list.getSelectedItem();
            if(dest){
                this.detailsForm.setDestination(dest);
                this.detailsForm.render();
                this.list.hide();
                this.detailsForm.show();
                this.detailsForm.focusName();
            }

        }


        private onSave(res): void {
            console.log(res);

            if(res.success){
                if(res.success=='inserted'){
                    this.detailsForm.setID( Number(res.result));
                    var dest= this.detailsForm.getDestination();
                    this.list.setSelectedItem(dest);
                }
                this.R.msg('Record Saved', this.detailsForm.btnSave);
            }  else this.R.msg('ERROR Saving record', this.detailsForm.btnSave);

            this.R.model.refreshData();
        }

        private onBtnSaveClick(): void {
            var vo:VODestination = this.detailsForm.getDestination();
            if (!vo) return;
            if(!vo.uid) vo.uid =  DestinantionsModel.encodeUID(vo.name)
            var out=JSON.stringify(vo);
            this.R.connector.saveDestination(out).done((res)=>this.onSave(res));
            //this.R.model.saveDestination((res) => this.onSave(res),dest,this.detailsForm.getPages());
        }
      ////////////////////////////////////////////////////////////////////////////////////////////////
        private onDelete(res): void {
            this.R.msg('Record deleted', this.btnDel);
            this.list.selectedItem=null;
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
