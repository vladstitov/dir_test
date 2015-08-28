/// <reference path="../kiosk/registry.ts" />
var mobile;
(function (mobile) {
    var Menu = (function () {
        function Menu(id, conn) {
            var _this = this;
            this.id = id;
            this.view = $(id);
            this.list = $(id + ' [data-id=list]');
            conn.getCategories(function (data) {
                return _this.onCatData(data);
            });
            this.connector = conn;
        }
        Menu.prototype.getCategoryById = function (id) {
            var data = this.cats;
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].catid == id)
                    return data[i];
            return null;
        };
        Menu.prototype.getPageById = function (id) {
            var data = this.pages;
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].id == id)
                    return data[i];
            return null;
        };

        Menu.prototype.onCatData = function (resp) {
            var _this = this;
            // console.log(resp);
            var data = JSON.parse(resp);
            if (!$.isArray(data)) {
                console.error(data);
                return;
            }
            this.cats = data;
            var out = '';
            for (var i = 0, n = data.length; i < n; i++) {
                out += this.renderCat(data[i]);
            }

            this.list.html(out);
            this.connector.getPagesList(function (data) {
                return _this.onPagesData(data);
            });
        };
        Menu.prototype.onPagesData = function (resp) {
            var data = JSON.parse(resp);
            if (!$.isArray(data)) {
                console.error(data);
                return;
            }
            this.pages = data;

            //  var color: string = this.R.settings.color;;
            var out = '';
            for (var i = 0, n = data.length; i < n; i++) {
                out += this.renderPage(data[i]);
            }
            this.list.append(out);
        };
        Menu.prototype.renderCat = function (item) {
            return '<a class="u-brand" href="#category/' + item.catid + '">' + item.label + '</a>';
        };
        Menu.prototype.renderPage = function (item) {
            return '<a  class="u-brand" href="#page/' + item.id + '">' + item.label + '</a>';
        };
        return Menu;
    })();
    mobile.Menu = Menu;
})(mobile || (mobile = {}));
//# sourceMappingURL=Menu.js.map
