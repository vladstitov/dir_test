/**
 * Created by VladHome on 9/5/2015.
 */
/// <reference path="Kiosk.ts" />
var uplight;
(function (uplight) {
    var MainMenu = (function () {
        function MainMenu(el) {
            var _this = this;
            this.view = $(el);
            this.R = uplight.Registry.getInstance();
            var d2 = $.Deferred();
            var d1 = uplight.Registry.getInstance().connector.getData('pages.json');
            var cats = uplight.Registry.getInstance().model.getCategories();
            if (cats)
                d2.resolve(cats);
            else
                this.R.model.dispatcher.on(this.R.model.READY, function () {
                    d2.resolve(_this.R.model.getCategories());
                });
            $.when(d1, d2).then(function () {
                var pages = JSON.parse(arguments[0][0]);
                var cats = arguments[1];
                _this.onData(pages, cats);
            });
            this.list = this.view.find('[data-id=list]');
            this.list.on(CLICK, 'a', function (evt) { return _this.onMenuClick(evt); });
        }
        MainMenu.prototype.onData = function (pages, categories) {
            var ar = [];
            this.data = ar.concat(pages).concat(categories);
            this.render();
        };
        MainMenu.prototype.render = function () {
            var ar = this.data;
            var out = '<ul class="nano-content">';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                out += '<li class="item btn-menu"><a data-i="' + i + '"><span class="' + item.icon + '"></span> <span> ' + (item.name || item.label) + '</span></a></li>';
            }
            out += '</ul>';
            this.list.html(out);
        };
        MainMenu.prototype.onMenuClick = function (evt) {
            //  console.log(evt);
            evt.preventDefault();
            var i = Number($(evt.currentTarget).data('i'));
            //  console.log(i);
            if (isNaN(i))
                return;
            var item = this.data[i];
            if (!item)
                return;
            if (item.url)
                this.R.events.triggerHandler(uplight.InfoPagesModel.PAGE_SELECED, item.id);
            else
                this.R.events.triggerHandler(this.R.CATEGORY_SELECTED, item.id);
            if (this.onSelect)
                this.onSelect(item);
        };
        return MainMenu;
    })();
    uplight.MainMenu = MainMenu;
    var PagesMenu = (function () {
        function PagesMenu(el) {
            var _this = this;
            this.view = $(el);
            this.R = uplight.Registry.getInstance();
            this.R.connector.getData('pages.json').done(function (data) { return _this.onData(data); });
            this.list = this.view.find('[data-id=list]');
            this.list.on(CLICK, 'a', function (evt) { return _this.onMenuClick(evt); });
        }
        PagesMenu.prototype.onMenuClick = function (evt) {
            // console.log(evt);
            evt.preventDefault();
            var i = $(evt.currentTarget).data('i');
            //  console.log(i);
            if (isNaN(i))
                return;
            var item = this.data[i];
            if (!item)
                return;
            // this.pages.showPage(i);
            if (this.onSelect)
                this.onSelect(item);
            this.R.events.triggerHandler(uplight.InfoPagesModel.PAGE_SELECED, item.id);
        };
        PagesMenu.prototype.onData = function (res) {
            // console.log(res);
            this.data = JSON.parse(res);
            // this.pages = new InfoPagesModel($('[data-id=Pages]:first'));
            // this.pages.setData(this.data);
            this.render();
        };
        PagesMenu.prototype.render = function () {
            var ar = this.data;
            var out = '<ul class="nano-content">';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                out += '<li class="item btn-menu"><a data-i="' + i + '">' + item.name + '</a></li>';
            }
            out += '</ul>';
            this.list.html(out);
        };
        return PagesMenu;
    })();
    uplight.PagesMenu = PagesMenu;
})(uplight || (uplight = {}));
//# sourceMappingURL=MainMenu.js.map