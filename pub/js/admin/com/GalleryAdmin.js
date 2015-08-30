/**
 * Created by VladHome on 8/16/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var GalleryList = (function () {
        function GalleryList(data_url) {
            var _this = this;
            this.data_url = data_url;
            this.connector = uplight.RegA.getInstance().connector;
            this.view = $('#Template [data-ctr=GalleryList]:first').clone();
            this.list = $('<ul>').appendTo(this.view.find('.nano')).hide();
            this.btnShowImages = this.view.find('[data-id=btnShowImages]').click(function () { return _this.onShowImages(); });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(function () { return _this.onEditClick(); });
            this.loadData();
            // this.renderProp();
        }
        GalleryList.prototype.getVOAL = function () {
            return this.vo;
        };
        GalleryList.prototype.getEditorView = function () {
            return this.editor.getView();
        };
        GalleryList.prototype.onEditorClose = function () {
            this.view.show();
            this.editor.view.remove();
            this.loadData();
            if (this.onEditExit)
                this.onEditExit();
        };
        GalleryList.prototype.onEditClick = function () {
            var _this = this;
            console.log(this.data);
            if (!this.editor)
                this.editor = new GalleryAdmin({});
            this.editor.onClose = function () { return _this.onEditorClose(); };
            this.editor.setData(this.data);
            this.view.hide();
            this.editor.getView().insertAfter(this.view);
            if (this.onEdit)
                this.onEdit();
        };
        GalleryList.prototype.onShowImages = function () {
            if (this.btnShowImages.data('vis')) {
                this.list.hide('fast');
                this.btnShowImages.data('vis', false);
                this.btnShowImages.children().last().text('Show Images');
            }
            else {
                this.btnShowImages.data('vis', true);
                this.list.show('fast');
                this.btnShowImages.children().last().text('Hide Images');
            }
        };
        GalleryList.prototype.setData = function (data) {
            this.data = data;
            this.vo = data.props;
            this.renderData();
            this.renderProp();
        };
        GalleryList.prototype.renderProp = function () {
            this.view.find('[data-id=name]').text(this.vo.name);
            this.view.find('[data-id=delay]').text(this.vo.delay);
            this.view.find('[data-id=size]').text(this.vo.size);
        };
        GalleryList.prototype.renderData = function () {
            var ar = this.data.gallery;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<li data-i="' + i + '"><img src="' + ar[i] + '" /></li>';
            }
            this.list.html(out);
        };
        GalleryList.prototype.loadData = function () {
            var _this = this;
            this.connector.getData(this.data_url).done(function (res) { return _this.setData(JSON.parse(res)); });
        };
        return GalleryList;
    })();
    uplight.GalleryList = GalleryList;
    var GalleryAdmin = (function () {
        function GalleryAdmin(opt) {
            this.selector = '#Template [data-ctr=GalleryAdmin]:first';
            this.connector = uplight.RegA.getInstance().connector;
            for (var str in opt)
                this[str] = opt[str];
            this.init();
        }
        GalleryAdmin.prototype.getView = function () {
            var _this = this;
            setTimeout(function () { return _this.addListeners(); }, 100);
            ;
            this.reset();
            return this.view;
        };
        GalleryAdmin.prototype.setData = function (data) {
            this.data = data;
            this.props = data.props;
            this.gallery = data.gallery;
            this.render();
        };
        GalleryAdmin.prototype.onSaveResult = function (res) {
            if (res.success) {
                uplight.RegA.getInstance().msg('Saved', this.btnSave);
            }
            else {
                if (typeof res == 'Object')
                    res = JSON.stringify(res);
                alert(res);
            }
        };
        GalleryAdmin.prototype.onSaveClick = function () {
            var btn = this.btnSave.addClass(DISABLED);
            setTimeout(function () {
                btn.removeClass(DISABLED);
            }, 1000);
            this.save();
        };
        GalleryAdmin.prototype.save = function () {
            var _this = this;
            var del = Number(this.tiDelay.val());
            if (isNaN(del)) {
                alert('Delay has to be a number');
            }
            else {
                this.props.delay = del;
                // console.log(this.props.data_url,this.data);;
                this.connector.saveData(JSON.stringify(this.data), this.props.data_url).done(function (res) { return _this.onSaveResult(res); });
            }
        };
        GalleryAdmin.prototype.loadData = function () {
            var _this = this;
            this.connector.getData(this.props.data_url).done(function (res) { return _this.setData(JSON.parse(res)); });
            return this;
        };
        GalleryAdmin.prototype.reset = function () {
            if (this.mode == 1)
                this.viewUploadAdd.addClass('hidden');
            if (this.mode == 2)
                this.viewUploadEdit.addClass('hidden');
        };
        GalleryAdmin.prototype.renderProp = function () {
            this.selected = null;
            this.view.find('[data-id=name]').text(this.props.name);
            this.tiDelay.val(this.props.delay);
            this.view.find('[data-id=size]').text(this.props.size);
        };
        GalleryAdmin.prototype.render = function () {
            this.renderProp();
            var out = '';
            var ar = this.gallery;
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
        };
        GalleryAdmin.prototype.renderItem = function (item, i) {
            return '<li data-i="' + i + '"><img src="' + item + '" /></li>';
        };
        GalleryAdmin.prototype.getData = function () {
            return this.data;
        };
        //src:string;
        //data_url:string;
        //id:number;
        // size:string;
        GalleryAdmin.prototype.init = function () {
            this.view = $(this.selector).clone();
            this.btnAdd = this.view.find('[data-id=btnAdd]:first');
            this.btnEdit = this.view.find('[data-id=btnEdit]:first');
            this.btnDelete = this.view.find('[data-id=btnDelete]:first');
            this.viewUploadAdd = this.view.find('[data-id=viewUploadAdd]:first');
            this.btnUplaodAdd = this.view.find('[data-id=btnUploadAdd]:first');
            this.viewUploadEdit = this.view.find('[data-id=viewUploadEdit]:first');
            this.btnUploadEdit = this.view.find('[data-id=btnUploadEdit]:first');
            this.btnClose = this.view.find('[data-id=btnClose]');
            this.preview = this.view.find('[data-id=preview]:first');
            this.tiDelay = this.view.find('[data-id=delay]');
            this.btnSave = this.view.find('[data-id=btnSave]');
            this.name = this.view.find('[data-id=name]:first');
            //this.preview.width(dem[0]).height(dem[1]);
            this.list = $('<ul>').addClass('list');
            this.listView = this.view.find('.nano:first').append(this.list);
        };
        GalleryAdmin.prototype.onUploadResult = function (res) {
            if (res.success) {
                if (this.selected) {
                    var i = this.selected.data('i');
                    this.gallery[i] = res.result;
                }
                else
                    this.gallery.push(res.result);
                this.render();
            }
        };
        GalleryAdmin.prototype.onUploadResultAdd = function (res) {
            console.log(res);
            if (res.success) {
                this.data.push(res.result);
                this.render();
            }
        };
        GalleryAdmin.prototype.onFileSelected = function (evt) {
            var _this = this;
            var input = evt.target;
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                form.append('file', files[0]);
                this.connector.uploadImage(form, 'al', ('al' + this.props.id)).done(function (res) { return _this.onUploadResult(res); });
            }
            this.reset();
        };
        GalleryAdmin.prototype.onAddClick = function () {
            this.reset();
            this.mode = 1;
            this.viewUploadAdd.removeClass('hidden');
            this.resetSelected();
        };
        GalleryAdmin.prototype.onEditClick = function () {
            this.reset();
            if (!this.selected)
                return;
            this.mode = 2;
            this.viewUploadEdit.removeClass('hidden');
        };
        GalleryAdmin.prototype.onDeleteClick = function () {
            this.reset();
            if (!this.selected)
                return;
            var i = this.selected.data('i');
            if (isNaN(i))
                return;
            if (confirm('You want to remove selected image from list?')) {
                this.gallery.splice(i, 1);
                this.selected = null;
                this.render();
            }
        };
        GalleryAdmin.prototype.resetSelected = function () {
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = null;
        };
        GalleryAdmin.prototype.selectImage = function (evt) {
            this.reset();
            this.resetSelected();
            var $el = $(evt.currentTarget);
            var i = $el.data('i');
            if (isNaN(i))
                return;
            $el.addClass(SELECTED);
            this.selected = $el;
        };
        GalleryAdmin.prototype.onCloseClick = function () {
            if (this.onClose)
                this.onClose();
        };
        GalleryAdmin.prototype.addListeners = function () {
            var _this = this;
            this.btnAdd.click(function () { return _this.onAddClick(); });
            this.btnEdit.click(function () { return _this.onEditClick(); });
            this.btnDelete.click(function () { return _this.onDeleteClick(); });
            this.btnUplaodAdd.change(function (evt) { return _this.onFileSelected(evt); });
            this.btnUploadEdit.change(function (evt) { return _this.onFileSelected(evt); });
            this.list.on(CLICK, 'li', function (evt) { return _this.selectImage(evt); });
            this.btnClose.click(function () { return _this.onCloseClick(); });
            this.btnSave.click(function () { return _this.onSaveClick(); });
        };
        return GalleryAdmin;
    })();
    uplight.GalleryAdmin = GalleryAdmin;
})(uplight || (uplight = {}));
//# sourceMappingURL=GalleryAdmin.js.map