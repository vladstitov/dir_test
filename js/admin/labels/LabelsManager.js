/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var LabelsManager = (function () {
        function LabelsManager(container) {
            var _this = this;
            container.load('js/admin/labels/labelsManager.htm', function () {
                _this.init();
            });
            this.R = uplight.RegA.getInstance();
        }
        LabelsManager.prototype.init = function () {
            var _this = this;
            this.view = $('#LabelsManager');
            var table = $('<table>').addClass('table').appendTo(this.view.find('[data-id=list]:first'));
            this.list = $('<tbody>').on(CLICK, 'tr .fa-edit', function (evt) { return _this.onEditClick($(evt.currentTarget)); }).appendTo(table);
            var editor = this.view.find('[data-id=labelEditor]:first');
            editor.hide();
            editor.find('.fa-close').on(CLICK, function () {
                $('#cover').hide();
                _this.labelEditor.hide();
                _this.selectedItem = null;
            });
            this.labelEditor = editor;
            this.btnSaveLabel = editor.find('[data-id=btnSave]').on(CLICK, function () { return _this.onSaveLabelClick(); });
            ;
            this.tiValue = editor.find('input:first');
            this.imgValue = editor.find('img:first');
            var self = this;
            this.btnUpload = editor.find('[data-id=btnUpload]').on(CHANGE, function () {
                self.onFileSelected(this.files);
            });
            this.refreshData();
        };
        LabelsManager.prototype.onFileSelected = function (files) {
            var _this = this;
            if (files.length) {
                var file = files[0];
                var form = new FormData();
                form.append('file', file);
                this.R.connector.uploadTempImage(form).done(function (res) {
                    console.log(res);
                    if (res.success)
                        _this.imgValue.attr('src', res.result);
                });
            }
        };
        LabelsManager.prototype.refreshData = function () {
            var _this = this;
            this.R.connector.getLabels().done(function (res) {
                var ar = [];
                for (var str in res) {
                    var val = res[str];
                    var vo = {};
                    if (val.substr(0, 5) == 'data/')
                        vo.type = 'image';
                    else
                        vo.type = 'text';
                    vo.index = str;
                    vo.value = val;
                    ar.push(vo);
                }
                _this.renderLabels(ar);
            });
        };
        LabelsManager.prototype.onSaveLabelClick = function () {
            console.log('save');
            var item = this.selectedItem;
            if (item.type == 'image') {
                item.value = this.imgValue.attr('src');
            }
            else {
                item.value = this.tiValue.val();
            }
            console.log(item);
            this.saveLabels();
        };
        LabelsManager.prototype.saveLabels = function () {
            var _this = this;
            var obj = {};
            var ar = this.labels;
            for (var i = 0, n = ar.length; i < n; i++) {
                obj[ar[i].index] = ar[i].value;
            }
            this.R.connector.saveLabels(obj).done(function (res) {
                _this.refreshData();
                console.log(res);
            });
        };
        LabelsManager.prototype.onSaveClick = function () {
            //TODO nea data insert
            this.saveLabels();
        };
        LabelsManager.prototype.renderItem = function (item, i) {
            var img = 0;
            return '<tr  data-i="' + i + '" class="' + item.type + '" ><td class="index">' + item.index + '</td><td class="value">' + ((item.type == 'image') ? '<img src="' + item.value + '"/>' : item.value) + '</td><td><span class=" btn fa fa-edit"></span></td></tr>';
        };
        LabelsManager.prototype.renderLabels = function (ar) {
            this.labels = ar;
            console.log(ar);
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            this.list.html(out);
        };
        LabelsManager.prototype.onEditClick = function (el) {
            var row = el.parent().parent();
            var i = Number(row.data('i'));
            if (isNaN(i))
                return;
            var item = this.labels[i];
            if (!item)
                return;
            this.selectedItem = item;
            if (item.type == 'image') {
                this.labelEditor.addClass('large');
                this.btnUpload.show();
                this.tiValue.hide();
                this.imgValue.attr('src', item.value);
                this.imgValue.show();
            }
            else {
                this.labelEditor.removeClass('large');
                this.imgValue.hide();
                this.btnUpload.hide();
                this.tiValue.show();
                this.tiValue.val(item.value);
            }
            var cover = $('#cover').show();
            cover.appendTo(this.view).append(this.labelEditor);
            this.labelEditor.show();
        };
        return LabelsManager;
    })();
    uplight.LabelsManager = LabelsManager;
})(uplight || (uplight = {}));
//# sourceMappingURL=LabelsManager.js.map