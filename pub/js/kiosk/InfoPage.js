/// <reference path="Registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var InfoPage = (function () {
        function InfoPage() {
            this.prev = -2;
            this.current = -1;
            this.view = $('[data-id=Pages]:first');
            this.view.css('overfow', 'hidden');
            this.width = this.view.width();
            this.list = $('<div>').appendTo(this.view);
        }
        InfoPage.prototype.loadData = function (item) {
            $.get(item.url).done(function (data) {
                //   console.log(data);
                item.$div = $('<div>').html(data);
            });
        };
        InfoPage.prototype.setData = function (data) {
            var ar = data;
            for (var i = 0, n = ar.length; i < n; i++) {
                this.loadData(ar[i]);
            }
            this.data = data;
        };
        InfoPage.prototype._showPage = function (i) {
        };
        InfoPage.prototype.showPage = function (i) {
            var _this = this;
            if (this.inTrans)
                return;
            if (i == this.current)
                return;
            var item = this.data[i];
            this.list.append(item.$div);
            if (this.list.children().length > 1) {
                this.inTrans = true;
                this.view.animate({ scrollLeft: this.width }, function () {
                    _this.list.children().first().remove();
                    _this.view.scrollLeft(0);
                    _this.inTrans = false;
                });
            }
        };
        /*
        getPage(page:VOItem): JQuery {
            if (!this.cache[page.id]) this.cache[page.id] = this.createPage(page);
            return this.cache[page.id];
        }
      
        private createPage(page: VOItem): JQuery {
            var p:JQuery = $('<div class="view"><div class="mytitle">'+page.label+'</div></div>');
            this.content = $('<div class="view-content">Loading</div>').appendTo(p);
            this.loadPage(page.id.toString());
            return p;

        }

        */
        InfoPage.prototype.onPageLoaded = function (res) {
            // this.content.html(res);
        };
        return InfoPage;
    })();
    uplight.InfoPage = InfoPage;
})(uplight || (uplight = {}));
//# sourceMappingURL=infopage.js.map