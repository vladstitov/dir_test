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
            this.detailsForm.view.find('.panel-heading .fa-close:first').on(CLICK, function () {
                _this.hideForm();
            });
            this.detailsForm.hide();
            this.list.dispatcher.on(this.list.SELECTED, function (evt, data) {
                _this.detailsForm.setDestibation(data);
            });
            this.btnAdd = this.view.find('[data-id=btnAdd]:first').on(CLICK, function () { return _this.onBtnAddClick(); });
            this.btnDel = this.view.find('[data-id=btnDel]:first').on(CLICK, function () { return _this.onBtnDelClick(); });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').on(CLICK, function () { return _this.onBtnEditClick(); });
            this.btnSave = this.detailsForm.view.find('[data-id=btnSave]:first').on(CLICK, function () { return _this.onBtnSaveClick(); });
            //this.showForm();
        };
        DetailsEditor.prototype.showForm = function () {
            this.detailsForm.show();
            this.list.hide();
        };
        DetailsEditor.prototype.hideForm = function () {
            this.detailsForm.hide();
            this.list.show();
        };
        DetailsEditor.prototype.onBtnAddClick = function () {
            var dest = new uplight.VODestination({ id: 0 });
            this.detailsForm.setDestibation(dest);
            this.list.hide();
            this.detailsForm.show();
            this.detailsForm.focusName();
        };
        DetailsEditor.prototype.onBtnEditClick = function () {
            var dest = this.list.getSelectedItem();
            if (dest) {
                this.detailsForm.setDestibation(dest);
                this.list.hide();
                this.detailsForm.show();
                this.detailsForm.focusName();
            }
        };
        DetailsEditor.prototype.onSave = function (res) {
            console.log(res);
            if (res.success) {
                if (res.success == 'insert') {
                    this.detailsForm.setID(Number(res.result));
                    var dest = this.detailsForm.getDestination();
                    this.list.setSelectedItem(dest);
                }
                this.R.alert('Record Saved', this.btnSave.parent());
            }
            else
                this.R.alert('ERROR ', this.btnSave.parent());
        };
        DetailsEditor.prototype.onBtnSaveClick = function () {
            var _this = this;
            // if (this.btnSave.hasClass(DISABLED)) return;
            console.log('click');
            var dest = this.detailsForm.getDestination();
            if (!dest)
                return;
            this.R.model.saveDestination(function (res) { return _this.onSave(res); }, dest, this.detailsForm.getPages());
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////
        DetailsEditor.prototype.onDelete = function (res) {
            this.R.alert('Record deleted', this.btnDel);
            this.list.selectedItem = null;
            this.detailsForm.setDestibation(null);
        };
        // private onDeleteConfirmed(): void {
        // this.R.model.deleteDestination(this.detailsForm., (res) => this.onDelete(res));
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