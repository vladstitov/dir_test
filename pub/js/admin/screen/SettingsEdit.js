/**
 * Created by VladHome on 7/20/2015.
 */
///<reference path="../RegA"/>
var uplight;
(function (uplight) {
    var SettingsEdit = (function () {
        function SettingsEdit(container) {
            var _this = this;
            this.container = container;
            container.load('js/admin/screen/SettingsEdit.htm', function () {
                setTimeout(function () {
                    _this.init();
                }, 50);
            });
            this.R = uplight.RegA.getInstance();
        }
        SettingsEdit.prototype.init = function () {
            var _this = this;
            this.view = $('#SettingsEdit');
            var table = $('<table>').addClass('table').appendTo(this.view.find('[data-id=list]:first'));
            this.list = $('<tbody>').on(CLICK, 'tr .fa-edit', function (evt) { return _this.onEditClick(evt); }).appendTo(table);
            var editor = this.view.find('[data-id=labelEditor]:first');
            editor.hide();
            editor.find('.fa-close').on(CLICK, function () {
                $('#cover').hide();
                _this.editor.hide();
                _this.selectedItem = null;
            });
            this.editor = editor;
            this.btnSave = editor.find('[data-id=btnSave]').on(CLICK, function () { return _this.onSaveClick(); });
            ;
            this.tiValue = editor.find('input:first');
            this.lblIndex = editor.find('[data-id=lblIndex]');
            var self = this;
            this.selTime = editor.find('[data-id=selTime]');
            var out = '';
            var ampm = 'AM';
            var m = -1;
            for (var i = 0; i < 24; i++) {
                var h = i;
                if (h == 0) {
                    h = 12;
                }
                if (i > 11)
                    ampm = 'PM';
                if (h > 12) {
                    h = h - 12;
                }
                // out+='<option>'+((h<10)?'&nbsp;&nbsp;':'')+h+':00 '+ampm+'</option>';
                // out+='<option>'+((h<10)?'&nbsp;&nbsp;':'')+h+':30 '+ampm+'</option>';
                out += '<option>' + h + ':00 ' + ampm + '</option>';
                out += '<option>' + h + ':30 ' + ampm + '</option>';
            }
            this.selTime.html(out).on(CHANGE, function () {
                _this.tiValue.val(_this.selTime.val());
            });
            this.refreshData();
        };
        SettingsEdit.prototype.onEditClick = function (evt) {
            var el = $(evt.currentTarget).parent().parent();
            var i = Number(el.data('i'));
            if (isNaN(i))
                return;
            var item = this.data[i];
            if (!item)
                return;
            this.selectedItem = item;
            this.openEditor();
        };
        SettingsEdit.prototype.openEditor = function () {
            switch (this.selectedItem.type) {
                case 'time':
                    this.tiValue.hide();
                    this.selTime.val(this.selectedItem.value);
                    this.selTime.show();
                    break;
                default:
                    this.tiValue.val(this.selectedItem.value);
                    this.tiValue.show();
                    this.selTime.hide();
                    break;
            }
            this.lblIndex.text(this.selectedItem.label);
            this.editor.show();
        };
        SettingsEdit.prototype.hideEditor = function () {
            this.editor.hide();
        };
        SettingsEdit.prototype.refreshData = function () {
            var _this = this;
            this.R.connector.getData('settings.json').done(function (res) {
                _this.data = JSON.parse(res);
                _this.render();
            });
        };
        SettingsEdit.prototype.renderItem = function (item, i) {
            var img = 0;
            return '<tr  data-id="' + item.id + '" data-i="' + i + '" class="' + item.type + '" ><td class="index">' + item.label + '</td><td class="value">' + item.value + '</td><td><span class=" btn fa fa-edit"></span></td></tr>';
        };
        SettingsEdit.prototype.render = function () {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            // console.log(out);
            this.list.html(out);
            this.container.show();
        };
        SettingsEdit.prototype.onSaveClick = function () {
            var _this = this;
            console.log('save');
            this.selectedItem.value = this.tiValue.val();
            this.R.connector.saveData(JSON.stringify(this.data), 'settings.json').done(function (res) {
                _this.render();
                console.log(res);
            });
        };
        return SettingsEdit;
    })();
    uplight.SettingsEdit = SettingsEdit;
})(uplight || (uplight = {}));
//# sourceMappingURL=SettingsEdit.js.map