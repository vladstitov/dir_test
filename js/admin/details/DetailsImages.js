/**
 * Created by VladHome on 7/2/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var DetailsImages = (function () {
        function DetailsImages(view, list) {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            this.list1 = $('<ul>').appendTo(list);
            this.list2 = $('<ul>').appendTo(view.find('.nano:first'));
            this.list2.on(CLICK, 'li', function (evt) { return _this.onItemClick($(evt.currentTarget)); });
            this.view = view;
            // this.editor =
            // this.editor.hide();
            this.btnUpload = $('<input>').attr('type', 'file').attr('name', 'file');
            this.uploadView = $('<div>').addClass('upload').append(this.btnUpload);
            this.uploadText = $('<span>').appendTo(this.uploadView);
            this.btnAdd = view.find('[data-id=btnAdd]:first').on(CLICK, function () { return _this.onAddClick(); });
            this.btnEdit = view.find('[data-id=btnEdit]:first').on(CLICK, function () { return _this.onEditClick(); });
            this.btnDel = view.find('[data-id=btnDel]:first').on(CLICK, function () { return _this.onDeleteClick(); });
            var panel = $('<div>');
            var image = $('<img>');
            this.content = view.find('[data-id=content]:first');
            this.title = view.find('[data-id=title]:first');
            // this.editor=$('<div>').addClass('cover').app
        }
        DetailsImages.prototype.hide = function () {
            this.view.hide();
            this.content.empty();
            this.list2.empty();
        };
        DetailsImages.prototype.show = function () {
            this.view.show();
            this.render2();
        };
        DetailsImages.prototype.resetData = function () {
            this.data = this.current.imgs ? this.current.imgs.slice(0) : null;
        };
        DetailsImages.prototype.setData = function (vo) {
            this.current = vo;
            this.resetData();
        };
        DetailsImages.prototype.getData = function () {
            return this.data;
        };
        DetailsImages.prototype.getDeleted = function () {
            return this.dataDelete;
        };
        DetailsImages.prototype.onItemClick = function (el) {
            var i = Number(el.data('i'));
            if (isNaN(i))
                return;
            this.selectedItem = this.data[i];
            if (this.selected)
                this.selected.removeClass(SELECTED);
            el.addClass(SELECTED);
            this.selected = el;
            this.content.empty();
            this.content.html(el.clone());
            this.mode = '';
        };
        DetailsImages.prototype.renderItem = function (str, i) {
            var img = '<img class="item"   src="' + str + '"/>';
            return '<li data-i="' + i + '" >' + img + '</li>';
        };
        DetailsImages.prototype.render = function () {
            var ar = this.data;
            //  console.log('rendet images   ',ar);
            if (!ar) {
                this.list1.html('');
                this.list1.parent().hide();
                return;
            }
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list1.html(out);
            this.list1.parent().show();
        };
        DetailsImages.prototype.render2 = function () {
            this.title.html(this.current.name + ' &nbsp;&nbsp;unit:' + this.current.unit);
            var ar = this.data;
            if (!ar) {
                this.list2.html('');
                return;
            }
            ;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list2.html(out);
        };
        DetailsImages.prototype.onAddClick = function () {
            var _this = this;
            this.uploadText.text('to Add File');
            this.content.prepend(this.uploadView);
            this.btnUpload.on(CHANGE, function (evt) { return _this.onFileSelected(evt.target); });
            this.mode = 'add';
        };
        DetailsImages.prototype.onEditClick = function () {
            var _this = this;
            this.uploadText.text('to Replace File');
            this.content.prepend(this.uploadView);
            this.btnUpload.on(CHANGE, function (evt) { return _this.onFileSelected(evt.target); });
            this.mode = 'update';
        };
        DetailsImages.prototype.onUploadResult = function (res) {
            console.log(res);
            if (res.success) {
                if (this.mode === 'add') {
                    if (!this.data)
                        this.data = [];
                    this.data.push(res.result);
                    var item = this.renderItem(res.result, this.data.length - 1);
                    this.content.empty();
                    this.content.html(item);
                    this.list2.append(item);
                    this.mode = '';
                }
                else if (this.mode === 'update') {
                    var i = this.selected.data('i');
                    this.data[i] = res.result;
                    this.selectedItem = this.data[i];
                    this.render2();
                    var item = this.renderItem(this.selectedItem, i);
                    this.content.empty();
                    this.content.html(item);
                    this.mode = '';
                }
            }
        };
        DetailsImages.prototype.onFileSelected = function (input) {
            var _this = this;
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                form.append('file', files[0]);
                this.R.connector.uploadDestinationImage(form, this.current.uid).done(function (res) { return _this.onUploadResult(res); });
            }
        };
        DetailsImages.prototype.onDeleteClick = function () {
            var isDel = confirm('You want to delete selected Image from records?');
            if (isDel) {
                var ind = this.data.indexOf(this.selectedItem);
                if (!this.dataDelete)
                    this.dataDelete = [];
                this.dataDelete.push(this.data.splice(ind, 1)[0]);
                this.render2();
                this.content.empty();
            }
        };
        DetailsImages.prototype.onFileChoosen = function (input) {
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                form.append('file', files[0]);
            }
        };
        return DetailsImages;
    })();
    uplight.DetailsImages = DetailsImages;
})(uplight || (uplight = {}));
//# sourceMappingURL=DetailsImages.js.map