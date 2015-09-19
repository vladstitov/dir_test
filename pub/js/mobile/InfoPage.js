/// <reference path="../kiosk/registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var InfoPageMobile = (function () {
        function InfoPageMobile(view, connector) {
            var _this = this;
            this.view = view;
            this.connector = connector;
            this.cache = {};
            this.content = view.find('[data-id=content]');
            this.title = view.find('[data-id=title]');
            this.isHidden = view.hasClass(HIDE);
            var pgs = connector.getPages().done(function (res) {
                _this.data = res;
                //console.log(res);
            });
        }
        InfoPageMobile.prototype.show = function () {
            if (this.isHidden) {
                this.isHidden = false;
                this.view.removeClass(HIDE);
            }
        };
        InfoPageMobile.prototype.hide = function () {
            if (!this.isHidden) {
                this.isHidden = true;
                this.view.addClass(HIDE);
            }
        };
        InfoPageMobile.prototype.showPage = function (item) {
            var _this = this;
            if (item.html)
                this.content.html(item.html);
            else {
                $.get(item.url).done(function (res) {
                    item.html = res;
                    console.log(res);
                    _this.content.html(item.html);
                });
            }
            this.show();
        };
        InfoPageMobile.prototype.showInfo = function (id) {
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
        return InfoPageMobile;
    })();
    uplight.InfoPageMobile = InfoPageMobile;
})(uplight || (uplight = {}));
//# sourceMappingURL=infopage.js.map