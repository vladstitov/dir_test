/**
 * Created by VladHome on 8/11/2015.
 */
/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var AttractLoopEdit = (function () {
        function AttractLoopEdit(container) {
            var _this = this;
            this.ID = 'uplight.AttractLoopEdit';
            this.settingsURL = 'settings.json';
            this.R = uplight.RegA.getInstance();
            this.R.current = this;
            container.load('htms/admin/AttractLoopEdit.html', function () { return _this.init(); });
        }
        AttractLoopEdit.prototype.init = function () {
            var _this = this;
            var view = $('#AttractLoopEdit');
            this.$view = view;
            this.tools = view.find('[data-id=tools]:first');
            //this.title=view.find('[data-id=title]:first');
            this.alView = view.find('[data-id=alView]:first');
            this.iframeAL = $('#AttractLoopView');
            this.kiosk = $('#KioskView');
            var p1 = this.loadCurrent();
            $.when(p1).done(function (sett) {
                _this.settings = sett;
                // this.currentAl = al;
                _this.renderAl();
            });
            this.chkTC = view.find('[data-id=chkTC]:first');
            this.preview = view.find('[data-id=kioskPreview]:first');
            this.btnPreview = view.find('[data-id=btnPreview]:first');
            this.btnChangeType = view.find('[data-id=btnChangeType]:first');
            this.current = view.find('[data-id=current]:first');
            //this.btnSave = view.find('[data-id=btnSave]:first').click(()=>this.onSaveClick());
            this.editorView = $('#ALEditor');
            this.addListeners();
        };
        AttractLoopEdit.prototype.addListeners = function () {
            var _this = this;
            this.preview.find('[data-id=btnClose]').click(function () { return _this.preview.hide(); });
            this.btnChangeType.click(function () { return _this.onChangeTypeClick(); });
            this.btnPreview.click(function () { return _this.showPeview(); });
        };
        AttractLoopEdit.prototype.appendTo = function (cont) {
            this.$view.appendTo(cont);
            return this;
        };
        AttractLoopEdit.prototype.detach = function () {
            this.$view.detach();
        };
        AttractLoopEdit.prototype.destroy = function () {
        };
        AttractLoopEdit.prototype.getName = function () {
            return this.ID;
        };
        AttractLoopEdit.prototype.onSelectTypeClose = function () {
            this.changeType.hide();
            this.current.show();
        };
        AttractLoopEdit.prototype.onChangeTypeClick = function () {
            var _this = this;
            if (!this.changeType) {
                this.changeType = new ChangeType();
                this.changeType.onClose = function () { return _this.onSelectTypeClose(); };
                this.changeType.onSave = function (al) { return _this.save(al); };
            }
            this.changeType.setCurrent(this.currentAl);
            this.changeType.show();
            this.current.hide();
        };
        AttractLoopEdit.prototype.showPeview = function () {
            this.loadAL();
            this.preview.show();
        };
        AttractLoopEdit.prototype.hidePreview = function () {
            this.preview.hide();
            this.unloadAL();
        };
        AttractLoopEdit.prototype.loadAL = function () {
            this.iframeAL.attr('src', 'AttractLoop.php?settings=' + this.settingsURL);
        };
        AttractLoopEdit.prototype.unloadAL = function () {
            this.iframeAL.attr('src', '');
        };
        AttractLoopEdit.prototype.loadKiosk = function () {
            this.kiosk.attr('src', 'Kiosk1080.php?mode=preview');
        };
        AttractLoopEdit.prototype.uloadKiosk = function () {
            this.kiosk.attr('src', '');
        };
        AttractLoopEdit.prototype.loadCurrent = function () {
            var d1 = $.Deferred();
            var conn = this.R.connector;
            conn.getData(this.settingsURL).done(function (res) {
                //console.log(res);
                d1.resolve(JSON.parse(res));
            });
            return d1.promise();
        };
        AttractLoopEdit.prototype.render = function () {
            console.log('render attract loop');
        };
        AttractLoopEdit.prototype.onCurrentEdit = function () {
            this.tools.hide('fast');
        };
        AttractLoopEdit.prototype.onEditExit = function () {
            this.tools.show('fast');
        };
        AttractLoopEdit.prototype.renderAl = function () {
            var _this = this;
            var al = new uplight.VOAL(this.settings.attract_loop);
            this.currentAl = al;
            this.chkTC.prop(CHECKED, al.TC);
            this.alView.empty();
            if (al.type == 'gallery') {
                this.currentEditor = new uplight.GalleryList(al.data_url);
                this.currentEditor.onEdit = function () { return _this.onCurrentEdit(); };
                this.currentEditor.onEditExit = function () { return _this.onEditExit(); };
                this.currentEditor2 = null;
                this.alView.append(this.currentEditor.view);
            }
            else if (al.type == 'gallery2') {
                var urls = al.data_url.split(',');
                this.currentEditor = new uplight.GalleryList(urls[0]);
                this.currentEditor.onEdit = function () { return _this.onCurrentEdit(); };
                this.currentEditor.onEditExit = function () { return _this.onEditExit(); };
                this.currentEditor2 = new uplight.GalleryList(urls[1]);
                this.currentEditor2.onEdit = function () { return _this.onCurrentEdit(); };
                this.currentEditor2.onEditExit = function () { return _this.onEditExit(); };
                this.alView.append(this.currentEditor.view);
                this.alView.append(this.currentEditor2.view);
            }
        };
        AttractLoopEdit.prototype.save = function (newAL) {
            var _this = this;
            this.settings.attract_loop = newAL;
            console.log(this.settings);
            this.R.connector.saveData(JSON.stringify(this.settings), 'settings.json').done(function (res) {
                if (res.success) {
                    _this.renderAl();
                    uplight.RegA.getInstance().msg('New Attract loop saved', _this.changeType.btnSave);
                }
            });
        };
        return AttractLoopEdit;
    })();
    uplight.AttractLoopEdit = AttractLoopEdit;
    var ChangeType = (function () {
        function ChangeType() {
            this.R = uplight.RegA.getInstance();
            this.view = $('#ChangeType');
            this.editorView = this.view.find('[data-id=editorView]:first');
            this.btnSave = this.view.find('[data-id=btnSave]:first');
            this.chkTC = this.view.find('[data-id=chkTC]:first');
            this.loadAdmin();
        }
        ChangeType.prototype.show = function () {
            this.view.show();
        };
        ChangeType.prototype.hide = function () {
            this.view.hide();
        };
        ChangeType.prototype.setCurrent = function (vo) {
            this.currentVO = vo;
            if (this.select) {
                this.select.val(vo.id);
                this.selectTypeChage();
            }
        };
        ChangeType.prototype.onSaveClick = function () {
            var _this = this;
            var btn = this.btnSave.addClass(DISABLED);
            setTimeout(function () {
                _this.btnSave.removeClass(DISABLED);
            }, 1000);
            this.currentVO = this.selectedVOAL;
            this.currentVO.TC = this.chkTC.prop(CHECKED);
            if (this.onSave)
                this.onSave(this.currentVO);
        };
        ChangeType.prototype.loadAdmin = function () {
            var _this = this;
            this.R.connector.getData('admin.json').done(function (res) {
                var admin = JSON.parse(res);
                _this.createSelectType(admin.attract_loops);
                _this.addListeners();
                _this.select.val(_this.currentVO.id);
            });
        };
        ChangeType.prototype.createSelectType = function (als) {
            this.data = als;
            var $el = this.view.find('[data-id=selectType]:first');
            var out = '';
            var ar = als;
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<option value="' + ar[i].id + '">' + ar[i].name + '</option>';
            }
            this.select = this.view.find('select:first').html(out);
        };
        ChangeType.prototype.addListeners = function () {
            var _this = this;
            this.select.change(function () { return _this.selectTypeChage(); });
            this.view.find('[data-id=btnClose]').click(function () {
                if (_this.onClose)
                    _this.onClose();
            });
            this.btnSave.click(function () { return _this.onSaveClick(); });
        };
        ChangeType.prototype.getAlById = function (id) {
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].id == id)
                    return ar[i];
            }
            return null;
        };
        ChangeType.prototype.onCurrentEdit = function () {
        };
        ChangeType.prototype.onEditExit = function () {
        };
        ChangeType.prototype.selectTypeChage = function () {
            var _this = this;
            var al = this.getAlById(this.select.val());
            this.selectedVOAL = al;
            this.editorView.empty();
            if (al.type == 'gallery') {
                this.currentEditor = new uplight.GalleryList(al.data_url);
                this.currentEditor.onEdit = function () { return _this.onCurrentEdit(); };
                this.currentEditor.onEditExit = function () { return _this.onEditExit(); };
                this.currentEditor2 = null;
                this.editorView.append(this.currentEditor.view);
            }
            else if (al.type == 'gallery2') {
                var urls = al.data_url.split(',');
                this.currentEditor = new uplight.GalleryList(urls[0]);
                this.currentEditor.onEdit = function () { return _this.onCurrentEdit(); };
                this.currentEditor.onEditExit = function () { return _this.onEditExit(); };
                this.currentEditor2 = new uplight.GalleryList(urls[1]);
                this.currentEditor2.onEdit = function () { return _this.onCurrentEdit(); };
                this.currentEditor2.onEditExit = function () { return _this.onEditExit(); };
                this.editorView.append(this.currentEditor.view);
                this.editorView.append(this.currentEditor2.view);
            }
        };
        return ChangeType;
    })();
})(uplight || (uplight = {}));
//# sourceMappingURL=AttractLoopEdit.js.map