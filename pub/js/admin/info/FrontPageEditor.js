/**
 * Created by VladHome on 10/3/2015.
 */
///<reference path="../DirsAdmin.ts" />
var uplight;
(function (uplight) {
    var FrontPageEditor = (function () {
        function FrontPageEditor(container) {
            var _this = this;
            container.load('htms/admin/FrontPageEditor.htm', function () { return _this.init(); });
        }
        FrontPageEditor.prototype.appendTo = function (container) {
            container.append(this.view);
            this.reloadPage();
        };
        FrontPageEditor.prototype.init = function () {
            var _this = this;
            this.view = $('#FrontPageEditor');
            this.btnAdd = this.view.find('[data-id=btnAdd]:first').click(function () { return _this.onAddClicked(); });
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(function () { return _this.onEditClicked(); });
            this.btnDelete = this.view.find('[data-id=btnDelete]').click(function () { return _this.onDelClicked(); });
            this.btnSave = this.view.find('[data-id=btnSave]').click(function () { return _this.onSaveClicked(); });
            this.editor = this.view.find('[data-id=editor]:first');
            if (uplight.RegA.getInstance().settings.front_page) {
                this.btnAdd.addClass(HIDDEN);
                this.btnDelete.addClass(HIDDEN);
            }
            else {
                this.btnDelete.addClass(HIDDEN);
                this.btnEdit.addClass(HIDDEN);
                this.btnSave.addClass(HIDDEN);
            }
            this.reloadPage();
        };
        FrontPageEditor.prototype.onAddClicked = function () {
        };
        FrontPageEditor.prototype.onEditClicked = function () {
            if (!this.nicEdit) {
                this.nicEdit = new nicEditor({ fullPanel: true });
                this.nicEdit.setPanel('NicPanelPage');
                this.nicEdit.addInstance('PageBody');
            }
        };
        FrontPageEditor.prototype.onDelClicked = function () {
        };
        FrontPageEditor.prototype.onSave = function (res) {
            console.log(res);
            ;
        };
        FrontPageEditor.prototype.onSaveClicked = function () {
            var _this = this;
            if (confirm('You want to save Front page?')) {
                var url = uplight.RegA.getInstance().settings.front_page;
                var tmp = this.list.children().detach();
                uplight.RegA.getInstance().connector.savePage(url, this.editor.html()).done(function (res) { return _this.onSave(res); });
                this.list.append(tmp);
            }
        };
        FrontPageEditor.prototype.onPages = function (data) {
            console.log(data);
            this.pages = JSON.parse(data);
            this.renderList();
        };
        FrontPageEditor.prototype.loadMenu = function () {
            var _this = this;
            var url = uplight.RegA.getInstance().settings.pages;
            if (url)
                uplight.RegA.getInstance().connector.getData(url).done(function (data) { return _this.onPages(data); });
            else
                this.renderList();
        };
        FrontPageEditor.prototype.reloadPage = function () {
            var _this = this;
            uplight.RegA.getInstance().connector.getPage(uplight.RegA.getInstance().settings.front_page).done(function (data) { return _this.onContent(data); });
        };
        FrontPageEditor.prototype.onContent = function (data) {
            this.editor.html(data);
            this.menu = this.editor.find('[data-id=menu]:first');
            this.list = this.menu.find('[data-id=list]:first');
            this.loadMenu();
        };
        FrontPageEditor.prototype.renderList = function () {
            var ar = this.pages;
            var out = '<a class="list-group-item"><span class="fa fa-search"></span> <span> Search Directory</span></a>';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.seq = i + 1;
                out += '<a class="list-group-item"><span class="' + item.icon + '"></span> <span> ' + item.name + '</span></a>';
            }
            this.list.html(out);
        };
        return FrontPageEditor;
    })();
    uplight.FrontPageEditor = FrontPageEditor;
})(uplight || (uplight = {}));
//# sourceMappingURL=FrontPageEditor.js.map