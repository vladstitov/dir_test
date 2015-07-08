/// <reference path="Registry.ts" />
/// <reference path="../../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var InfoPage = (function () {
        function InfoPage(connector) {
            this.connector = connector;
            this.cache = {};
        }
        InfoPage.prototype.getPage = function (page) {
            if (!this.cache[page.id])
                this.cache[page.id] = this.createPage(page);
            return this.cache[page.id];
        };
        InfoPage.prototype.createPage = function (page) {
            var p = $('<div class="view"><div class="mytitle">' + page.label + '</div></div>');
            this.content = $('<div class="view-content">Loading</div>').appendTo(p);
            this.loadPage(page.id.toString());
            return p;
        };
        InfoPage.prototype.loadPage = function (id) {
            var _this = this;
            this.connector.getPage(function (res) { return _this.onPageLoaded(res); }, id);
        };
        InfoPage.prototype.onPageLoaded = function (res) {
            this.content.html(res);
        };
        return InfoPage;
    })();
    uplight.InfoPage = InfoPage;
})(uplight || (uplight = {}));
//# sourceMappingURL=infopage.js.map