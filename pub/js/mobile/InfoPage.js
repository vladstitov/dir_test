/// <reference path="../kiosk/registry.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />
var mobile;
(function (mobile) {
    var InfoPage = (function () {
        function InfoPage(view, connector) {
            var _this = this;
            this.view = view;
            this.connector = connector;
            this.cache = {};
            this.content = view.find('[data-id=content]');
            this.title = view.find('[data-id=title]');
            var pgs = connector.getPages().done(function (res) {
                _this.data = res;
                console.log(res);
            });
        }
        InfoPage.prototype.show = function () {
            if (this.isHidden) {
                this.isHidden = false;
                this.view.show('fast');
            }
        };
        InfoPage.prototype.hide = function () {
            if (!this.isHidden) {
                this.isHidden = true;
                this.view.hide('fast');
            }
        };
        InfoPage.prototype.showPage = function (item) {
            var _this = this;
            if (item.html)
                this.content.html(item.html);
            else {
                $.get(item.url).done(function (res) {
                    item.html = res;
                    _this.content.html(item.html);
                });
            }
            this.show();
        };
        InfoPage.prototype.showInfo = function (id) {
            var ar = this.data;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                if (item.id == id)
                    break;
            }
            console.log(item);
            if (item.id == id)
                this.showPage(item);
        };
        return InfoPage;
    })();
    mobile.InfoPage = InfoPage;
})(mobile || (mobile = {}));
//# sourceMappingURL=infopage.js.map