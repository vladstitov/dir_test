/// <reference path="../kiosk/registry.ts" />
/// <reference path="../../typing/jquery.d.ts" />
var mobile;
(function (mobile) {
    var InfoPage = (function () {
        function InfoPage(id, conn) {
            //////////////////////////////////////////////////////////////////////////////////
            this.cache = {};
            this.view = $(id);
            this.content = $(id + ' [data-id=content]');
            this.title = $(id + ' [data-id=title]');
            this.connector = conn;
        }
        InfoPage.prototype.reset = function () {
            this.cache = {};
        };

        InfoPage.prototype.getPage = function (page) {
            var id = page.id;
            this.title.text(page.label);
            if (!this.cache[id]) {
                this.cache[id] = 'Loading....';
                this.loadPage(id.toString());
            }
            this.content.html(this.cache[id]);
            return this.view;
        };

        InfoPage.prototype.loadPage = function (id) {
            var _this = this;
            this.pageid = id;
            this.connector.getPage(function (res) {
                return _this.onPageLoaded(res);
            }, id);
        };

        InfoPage.prototype.onPageLoaded = function (res) {
            this.cache[this.pageid] = res;
            this.content.html(res);
        };
        return InfoPage;
    })();
    mobile.InfoPage = InfoPage;
})(mobile || (mobile = {}));
//# sourceMappingURL=InfoPage.js.map
