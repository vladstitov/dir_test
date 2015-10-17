/**
 * Created by VladHome on 9/2/2015.
 */
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var IconsLibrary = (function () {
        function IconsLibrary(view) {
            var _this = this;
            this.view = view;
            this.iconsLibrary = $('<div>').appendTo(view);
            this.R = uplight.RegA.getInstance();
            this.R.connector.getIcons().done(function (data) { return _this.onIconsLoaded(data); });
            this.iconPreview = $('<div>').addClass('abs preview').appendTo(this.view);
            this.view.find('[data-id=btnCloseL]:first').click(function () { return _this.hide(); });
        }
        IconsLibrary.prototype.hide = function () {
            if (this.isVis) {
                this.view.hide('fast');
                this.isVis = false;
            }
        };
        IconsLibrary.prototype.show = function () {
            if (!this.isVis) {
                this.view.show('fast');
                this.view.removeClass(HIDDEN);
                this.isVis = true;
            }
        };
        IconsLibrary.prototype.toggle = function () {
            if (this.isVis)
                this.hide();
            else
                this.show();
        };
        IconsLibrary.prototype.renderIconsTopic = function (topic) {
            var out = '<div class="topic"><h3>' + topic[0] + '</h3><div class="list">';
            ;
            var ar = topic;
            for (var i = 1, n = ar.length; i < n; i++) {
                out += '<div class="fa fa-' + ar[i] + '" ></div>';
            }
            return out + '</div></div>';
        };
        IconsLibrary.prototype.onIconsLoaded = function (data) {
            var _this = this;
            var topics;
            var out = '';
            var ar = data;
            for (var i = 0, n = ar.length; i < n; i++) {
                out += this.renderIconsTopic(ar[i]);
            }
            this.iconsLibrary.html(out);
            this.iconsLibrary.on(CLICK, '.fa', function (evt) { return _this.onIcionLibraryClick($(evt.currentTarget)); });
            this.iconsLibrary.on(MOUSE_OVER, '.fa', function (evt) { return _this.onIcionLibraryOver($(evt.currentTarget)); });
            this.iconPreview.on(MOUSE_OUT, '.fa', function (evt) { return _this.onIcionLibraryOut($(evt.currentTarget)); });
            this.iconPreview.on(CLICK, '.fa', function (evt) { return _this.onIcionLibraryClick($(evt.currentTarget)); });
        };
        IconsLibrary.prototype.onIcionLibraryClick = function (el) {
            var cl = el.attr('class');
            if (this.onSelect)
                this.onSelect(cl);
        };
        IconsLibrary.prototype.onIcionLibraryOver = function (el) {
            this.iconPreview.html(el.clone());
            this.iconPreview.css('left', el.position().left).css('top', el.position().top);
            this.iconPreview.fadeIn();
        };
        IconsLibrary.prototype.onIcionLibraryOut = function (el) {
            this.iconPreview.hide();
        };
        return IconsLibrary;
    })();
    uplight.IconsLibrary = IconsLibrary;
    var TextEditor = (function () {
        function TextEditor(view) {
            var _this = this;
            this.view = view;
            this.R = uplight.RegA.getInstance();
            view.find('[data-id=btnCloseT]:first:first').click(function () { return _this.hide(); });
            this.editor = new nicEditor({ fullPanel: true });
            this.editor.setPanel('NicPanelPage');
            this.editor.addInstance('PageBody');
            this.content = $('#PageBody');
            this.content.width(730).height(1100);
        }
        TextEditor.prototype.show = function () {
            if (!this.isVis) {
                this.isVis = true;
                this.view.show();
                this.view.removeClass(HIDDEN);
            }
        };
        TextEditor.prototype.hide = function () {
            if (this.isVis) {
                this.isVis = false;
                this.view.hide();
            }
        };
        TextEditor.prototype.saveClicked = function () {
        };
        TextEditor.prototype.toggle = function () {
            if (this.isVis)
                this.hide();
            else
                this.show();
        };
        TextEditor.prototype.setData = function (data) {
            this.data = data;
            this.load();
        };
        TextEditor.prototype.load = function () {
            $('#PageBody').load(this.data + '?' + (new Date()).getSeconds(), function (res) {
                console.log(res);
            });
            // nicEditors.findEditor(this.contId.substr(1)).setContent(resp);
        };
        TextEditor.prototype.savePage = function (url) {
            return this.R.connector.savePage(url, this.content.html());
        };
        TextEditor.prototype.getData = function () {
            return this.data;
        };
        return TextEditor;
    })();
    uplight.TextEditor = TextEditor;
    var InfoEditor = (function () {
        function InfoEditor() {
            var _this = this;
            this.view = $('#InfoPagesEditor');
            this.view.find('[data-id=btnClose]').click(function () {
                _this.iconsLibrary.hide();
                _this.textEditor.hide();
                _this.onClose();
            });
            this.btnSave = this.view.find('[data-id=btnSave]:first').click(function () {
                _this.btnSave.prop('disabled', true);
                _this.iconsLibrary.hide();
                _this.textEditor.saveClicked();
                setTimeout(function () {
                    _this.btnSave.prop('disabled', false);
                }, 3000);
                if (_this.onSave)
                    _this.onSave();
            });
            this.selSeq = this.view.find('[data-id=selSeq]:first');
            this.icon = this.view.find('[data-id=icon]:first');
            this.btnEditIcon = this.view.find('[data-id=btnEditIcon]:first');
            this.tiName = this.view.find('[data-id=tiName]:first');
            this.chkEnabled = this.view.find('[data-id=chkEnabled]:first');
            this.iconsLibrary = new IconsLibrary(this.view.find('[data-id=iconsLibrary]:first'));
            this.iconsLibrary.onSelect = function (str) {
                _this.icon.attr('class', str);
            };
            this.btnBlankIcon = this.view.find('[data-id=btnBlankIcon]:first').click(function () {
                _this.icon.attr('class', 'fa fa-fw');
            });
            this.textEditor = new TextEditor(this.view.find('[data-ctr=TextEditor]:first'));
            this.btnEditIcon.on(CLICK, function () { return _this.onEditIconClick(); });
            this.btnEditText = this.view.find('[data-id=btnEditText]:first').click(function () {
                _this.textEditor.toggle();
                _this.iconsLibrary.hide();
            });
            this.icon.parent().on(CLICK, function () { return _this.onEditIconClick(); });
            //this.iconPreview=$('<div>').addClass('absolute preview').appendTo(this.iconsLibrary.view.parent());
        }
        InfoEditor.prototype.onEditIconClick = function () {
            this.iconsLibrary.toggle();
            this.textEditor.hide();
        };
        InfoEditor.prototype.savePage = function () {
            return this.textEditor.savePage(this.data.url);
        };
        InfoEditor.prototype.render = function () {
            this.icon.attr('class', this.data.icon);
            this.selSeq.val(this.data.seq);
            this.tiName.val(this.data.name);
            this.chkEnabled.prop('checked', this.data.enabled);
        };
        InfoEditor.prototype.setSeq = function (num) {
            var out = '';
            for (var i = 1, n = num; i < n; i++) {
                out += '<option value="' + i + '">' + i + '</option>';
            }
            this.selSeq.html(out);
        };
        InfoEditor.prototype.setData = function (data) {
            this.data = data;
            this.textEditor.setData(data.url);
            this.render();
        };
        InfoEditor.prototype.getData = function () {
            if (!this.data)
                return null;
            this.data.icon = this.icon.attr('class');
            this.data.seq = this.selSeq.val();
            this.data.name = this.tiName.val();
            this.data.enabled = this.chkEnabled.prop('checked');
            return this.data;
        };
        InfoEditor.prototype.hide = function () {
            this.view.hide();
        };
        InfoEditor.prototype.show = function () {
            this.view.show();
            this.view.removeClass('hidden');
        };
        return InfoEditor;
    })();
    uplight.InfoEditor = InfoEditor;
    var InfoPagesManager = (function () {
        function InfoPagesManager(content) {
            var _this = this;
            this.selectedIndex = -1;
            this.max = 0;
            this.R = uplight.RegA.getInstance();
            content.load('htms/admin/InfoPagesEditor.html', function () { return _this.init(); });
        }
        InfoPagesManager.prototype.init = function () {
            var _this = this;
            this.url = this.R.settings.pages;
            this.view = $('#InfoPagesView');
            this.iEditor = new InfoEditor();
            this.iEditor.onClose = function () {
                _this.iEditor.hide();
                _this.show();
            };
            this.iEditor.R = this.R;
            this.iEditor.onSave = function () { return _this.onSaveClicked(); };
            this.btnAdd = this.view.find('[data-id=btnAdd]:first').click(function () { return _this.onAddClicked(); });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(function () { return _this.onEditClicked(); });
            this.btnDelete = this.view.find('[data-id=btnDelete]').click(function () { return _this.onDelClicked(); });
            var table = $('<table>').addClass('table').html('<tr><th>ID</th><th>Icon</th><th>Name</th><th>Sequence</th><th>Enabled</th></tr>');
            this.list = $('<tbody>').appendTo(table);
            this.list.on(CLICK, 'tr', function (evt) { return _this.onListClick(evt); });
            $('#InfoPagesList').append(table);
            this.loadData();
        };
        InfoPagesManager.prototype.onListClick = function (evt) {
            var i = $(evt.currentTarget).data('i');
            if (isNaN(i))
                return;
            if (this.selected)
                this.selected.removeClass(SELECTED);
            this.selected = $(evt.currentTarget);
            this.selected.addClass(SELECTED);
            this.selectedIndex = i;
            this.iEditor.setData(this.data[i]);
        };
        InfoPagesManager.prototype.hide = function () {
            this.view.hide();
        };
        InfoPagesManager.prototype.show = function () {
            this.view.show();
        };
        InfoPagesManager.prototype.onAddClicked = function () {
            this.max++;
            var item = { id: 0, icon: '', name: '', seq: this.data.length, enabled: true };
            this.iEditor.setData(item);
            this.iEditor.show();
            this.hide();
        };
        InfoPagesManager.prototype.onSaveClicked = function () {
            var _this = this;
            var item = this.iEditor.getData();
            if (!item)
                return;
            if (item.id === 0) {
                this.max++;
                item.id = this.max;
                item.url = 'pages/page' + item.id + '.htm';
                this.data.push(item);
            }
            this.iEditor.savePage();
            this.save().done(function (res) {
                console.log(res);
                if (res.success)
                    _this.R.msg('Data saved', _this.iEditor.btnSave);
            });
        };
        InfoPagesManager.prototype.onData = function (data) {
            this.data = JSON.parse(data);
            this.render();
        };
        InfoPagesManager.prototype.render = function () {
            this.max = 0;
            var ar = this.data;
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.seq = i + 1;
                if (item.id > this.max)
                    this.max = item.id;
                out += '<tr data-i="' + i + '" class="item"><td>' + item.id + '</td><td><span class="' + item.icon + '"></span></td><td>' + item.name + '</td><td>' + item.seq + '</td><td>' + item.enabled + '</td></tr>';
            }
            this.list.html(out);
            this.iEditor.setSeq(n + 2);
            if (this.selectedIndex != -1) {
                this.list.find('[data-i=' + this.selectedIndex + ']').addClass(SELECTED);
            }
        };
        InfoPagesManager.prototype.onEditClicked = function () {
            var _this = this;
            if (this.selectedIndex == -1)
                return;
            var item = this.data[this.selectedIndex];
            this.iEditor.setData(item);
            this.iEditor.onSave = function () { return _this.onSaveClicked(); };
            this.iEditor.show();
            this.hide();
        };
        InfoPagesManager.prototype.loadData = function () {
            var _this = this;
            this.R.connector.getData(this.url).done(function (res) { return _this.onData(res); });
        };
        InfoPagesManager.prototype.onDeleteSuccess = function (res) {
            console.log(res);
            this.R.msg('Item Deleted', this.btnDelete);
            this.loadData();
        };
        InfoPagesManager.prototype.save = function () {
            var data = _.sortBy(this.data, 'seq');
            return this.R.connector.saveData(JSON.stringify(data), this.url);
        };
        InfoPagesManager.prototype.onDelClicked = function () {
            var _this = this;
            if (this.selectedIndex == -1)
                return;
            var item = this.data[this.selectedIndex];
            if (confirm('Yoy want to delete Page ' + item.name + '?')) {
                this.data.splice(this.selectedIndex, 1);
                this.selectedIndex = -1;
                this.save().done(function (res) { return _this.onDeleteSuccess(res); });
                ;
            }
        };
        return InfoPagesManager;
    })();
    uplight.InfoPagesManager = InfoPagesManager;
})(uplight || (uplight = {}));
//# sourceMappingURL=InfoPagesEditor.js.map