/**
 * Created by VladHome on 7/20/2015.
 */
///<reference path="../RegA"/>
var uplight;
(function (uplight) {
    var TimeEditor = (function () {
        function TimeEditor(view) {
            this.view = view;
            this.init();
        }
        TimeEditor.prototype.setData = function (item) {
            this.current = item;
            return this;
        };
        TimeEditor.prototype.hide = function () {
            this.view.hide();
        };
        TimeEditor.prototype.show = function () {
            this.view.show();
        };
        TimeEditor.prototype.render = function () {
            this.lblInfo.text(this.current.label);
            this.selTime.val(this.current.value);
            return this;
        };
        TimeEditor.prototype.init = function () {
            var _this = this;
            this.lblInfo = this.view.find('[data-id=lblInfo]:first');
            this.btnSave = this.view.find('[data-id=btnSave]').click(function () {
                _this.btnSave.prop('disabled', true);
                setTimeout(function () {
                    _this.btnSave.prop('disabled', false);
                }, 3000);
                if (_this.onSave)
                    _this.onSave(_this.current);
            });
            this.view.find('[data-id=btnClose]').click(function () {
                _this.hide();
                _this.current = null;
            });
            this.selTime = this.view.find('[data-id=selTime]');
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
                _this.current.value = _this.selTime.val();
            });
        };
        return TimeEditor;
    })();
    uplight.TimeEditor = TimeEditor;
    var ValueEditor = (function () {
        function ValueEditor(view) {
            var _this = this;
            this.view = view;
            this.view.find('[data-id=btnClose]').click(function () {
                _this.hide();
                _this.current = null;
            });
            this.btnSave = this.view.find('[data-id=btnSave]').click(function () {
                _this.btnSave.prop('disabled', true);
                setTimeout(function () {
                    _this.btnSave.prop('disabled', false);
                }, 3000);
                _this.current.value = _this.tiValue.val();
                if (_this.onSave)
                    _this.onSave(_this.current);
            });
            this.tiValue = this.view.find('[data-id=tiValue]');
            this.lblInfo = this.view.find('[data-id=lblInfo]');
        }
        ValueEditor.prototype.show = function () {
            this.view.show();
            console.log(this.view);
        };
        ValueEditor.prototype.render = function () {
            var item = this.current;
            if (!item)
                return this;
            this.tiValue.val(item.value);
            this.lblInfo.text(item.label);
            return this;
        };
        ValueEditor.prototype.hide = function () {
            this.view.hide();
        };
        ValueEditor.prototype.setData = function (item) {
            this.current = item;
            return this;
        };
        return ValueEditor;
    })();
    uplight.ValueEditor = ValueEditor;
    var SettingsEdit = (function () {
        // data:VOItem[];
        function SettingsEdit(container) {
            var _this = this;
            this.container = container;
            // console.log('SettingsEdit');
            container.load('htms/admin/SettingsEdit.htm', function () {
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
            //this.list = $('<tbody>').on(CLICK, 'tr .fa-edit', (evt) => this.onEditClick(evt)).appendTo(table);
            this.list = $('<tbody>').on(CLICK, '[data-id=btnEdit]', function (evt) { return _this.onEditClick(evt); }).appendTo(table);
            this.refreshData();
        };
        SettingsEdit.prototype.onEditClick = function (evt) {
            var el = $(evt.currentTarget).parent().parent();
            var i = Number(el.data('i'));
            console.log(i);
            if (isNaN(i))
                return;
            this.selectedIndex = i;
            this.openEditor();
        };
        SettingsEdit.prototype.openEditor = function () {
            var _this = this;
            var item = this.data[this.selectedIndex];
            switch (item.type) {
                case 'time':
                    if (!this.timeEditor)
                        this.timeEditor = new TimeEditor(this.view.find('[data-ctr=TimeEditor]:first'));
                    this.editor = this.timeEditor;
                    break;
                default:
                    if (!this.valueEditor)
                        this.valueEditor = new ValueEditor(this.view.find('[data-ctr=ValueEditor]:first'));
                    this.editor = this.valueEditor;
                    break;
            }
            console.log(this.editor);
            this.editor.setData(item).render().show();
            this.editor.onSave = function (item) {
                _this.data[_this.selectedIndex] = item;
                _this.save();
            };
            //this.lblIndex.text(this.selectedItem.label);
            this.editor.show();
        };
        SettingsEdit.prototype.hideEditor = function () {
            this.editor.hide();
        };
        SettingsEdit.prototype.refreshData = function () {
            var _this = this;
            this.R.connector.getData(this.R.settingsURL).done(function (res) {
                _this.R.settings = JSON.parse(res);
                _this.data = _this.R.settings.props;
                _this.render();
            });
        };
        SettingsEdit.prototype.renderItem = function (item, i) {
            var img = 0;
            return '<tr  data-id="' + item.id + '" data-i="' + i + '" class="' + item.type + '" ><td class="index">' + item.label + '</td><td class="value">' + item.value + '</td><td><span data-id="btnEdit" class=" btn fa fa-edit"></span></td></tr>';
        };
        SettingsEdit.prototype.render = function () {
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderItem(ar[i], i);
            }
            // console.log(out);
            this.list.html(out);
        };
        SettingsEdit.prototype.save = function () {
            var _this = this;
            var sett = this.R.settings;
            sett.props = this.data;
            this.R.connector.saveData(JSON.stringify(sett), this.R.settingsURL).done(function (res) {
                if (res.success) {
                    _this.R.msg('Data saved', _this.editor.btnSave);
                }
                _this.refreshData();
            });
        };
        return SettingsEdit;
    })();
    uplight.SettingsEdit = SettingsEdit;
})(uplight || (uplight = {}));
//# sourceMappingURL=SettingsEdit.js.map