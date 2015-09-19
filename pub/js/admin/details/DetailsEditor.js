/// <reference path="../RegA.ts" />
/// <reference path="DetailsForm.ts" />
/// <reference path="DetailsList.ts" />
/// <reference path="DetailsCategory.ts" />
var uplight;
(function (uplight) {
    var DetailsEditor = (function () {
        function DetailsEditor(container) {
            var _this = this;
            container.load('js/admin/details/DetailsEditor.htm', function () { return _this.init(); });
            this.R = uplight.RegA.getInstance();
            if (!this.R.model)
                this.R.model = new uplight.DestinantionsModel();
        }
        DetailsEditor.prototype.init = function () {
            var _this = this;
            this.view = $('#DetailsEditor');
            this.list = new uplight.DetailsList($('#DetailsList'));
            this.detailsForm = new uplight.DetailsForm($('#DetailsForm'));
            this.detailsForm.onClose = function () { return _this.hideForm(); };
            this.detailsForm.onSave = function () { return _this.onBtnSaveClick(); };
            this.detailsForm.hide();
            if (this.R.isSuper)
                this.btnDrop = $('<a>').addClass('btn').html('<span class="fa fa-bolt"> Drop Table</span>').appendTo(this.list.view.find('[data-id=tools]:first')).click(function () { return _this.onDrop(); });
            //= this.view.find('[data-id=btnDrop]:first').click(()=>this.onDrop())
            this.btnAdd = this.view.find('[data-id=btnAdd]:first').on(CLICK, function () { return _this.onBtnAddClick(); });
            this.btnDel = this.view.find('[data-id=btnDel]:first').on(CLICK, function () { return _this.onBtnDelClick(); });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').on(CLICK, function () { return _this.onBtnEditClick(); });
            //this.showForm();
        };
        DetailsEditor.prototype.onDrop = function () {
            var _this = this;
            if (confirm('You want to delete whole table tenats?'))
                this.R.connector.dropTable('tenants').done(function () {
                    _this.R.model.refreshData();
                });
        };
        // private showForm(){
        ///  this.detailsForm.show();
        // this.list.hide();
        //   }
        DetailsEditor.prototype.hideForm = function () {
            this.detailsForm.hide();
            this.list.show();
        };
        DetailsEditor.prototype.onBtnAddClick = function () {
            var dest = new uplight.VODestination({ id: 0, cats: [], imgs: '' });
            this.detailsForm.setDestination(dest);
            this.detailsForm.render();
            this.list.hide();
            this.detailsForm.show();
            this.detailsForm.focusName();
        };
        DetailsEditor.prototype.onBtnEditClick = function () {
            var dest = this.list.getSelectedItem();
            if (dest) {
                this.detailsForm.setDestination(dest);
                this.detailsForm.render();
                this.list.hide();
                this.detailsForm.show();
                this.detailsForm.focusName();
            }
        };
        DetailsEditor.prototype.onSave = function (res) {
            console.log(res);
            if (res.success) {
                if (res.success == 'inserted') {
                    this.detailsForm.setID(Number(res.result));
                    var dest = this.detailsForm.getDestination();
                    this.list.setSelectedItem(dest);
                }
                this.R.msg('Record Saved', this.detailsForm.btnSave);
            }
            else
                this.R.msg('ERROR Saving record', this.detailsForm.btnSave);
            this.R.model.refreshData();
        };
        DetailsEditor.prototype.onBtnSaveClick = function () {
            var _this = this;
            var vo = this.detailsForm.getDestination();
            if (!vo)
                return;
            if (!vo.uid)
                vo.uid = uplight.DestinantionsModel.encodeUID(vo.name);
            var out = JSON.stringify(vo);
            this.R.connector.saveDestination(out).done(function (res) { return _this.onSave(res); });
            //this.R.model.saveDestination((res) => this.onSave(res),dest,this.detailsForm.getPages());
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////
        DetailsEditor.prototype.onDelete = function (res) {
            this.R.msg('Record deleted', this.btnDel);
            this.list.selectedItem = null;
        };
        // private onDeleteConfirmed(): void {
        // this.R.vo.deleteDestination(this.detailsForm., (res) => this.onDelete(res));
        //}
        DetailsEditor.prototype.onBtnDelClick = function () {
            var _this = this;
            var dest = this.list.getSelectedItem();
            if (dest) {
                var isdel = confirm('You want to delete ' + dest.name + ' from database?');
                if (isdel) {
                    this.R.model.deleteDestination(dest, function (res) { return _this.onDelete(res); });
                }
            }
            // showAlert('You want to delete record: ' + name + '?', () => this.onDeleteConfirmed(),'Delete');
        };
        return DetailsEditor;
    })();
    uplight.DetailsEditor = DetailsEditor;
})(uplight || (uplight = {}));
//# sourceMappingURL=DetailsEditor.js.map