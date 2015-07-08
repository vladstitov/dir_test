/// <reference path="../../../Scripts/typings/greensock/greensock.d.ts" />
/// <reference path="registry.ts" />
/// <reference path="Connector.ts" />
/// <reference path="../../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var Menu = (function () {
        function Menu(view, width, height, connector) {
            var _this = this;
            this.view = view;
            this.connector = connector;
            view.width(width);
            this.R = uplight.Registry.getInstance();
            this.arrow = document.getElementById('myArrow');
            this.isArrow = true;
            this.list = this.view.children('ul:first'); //  $('<ul class="listHolder"></ul>').appendTo(this.listView);
            //  console.log('Menu width: ' + width);
            this.list.width(width);
            this.list.height(height);
            this.list.css('overflow-x', 'hidden');
            this.list.css('overflow-y', 'scroll');
            // setTimeout(() => this.hideArrow(), 1000);
            // if (this.R.DISPATCHER) this.R.DISPATCHER.on(SCREENSAVER_START, () => this.reset());
            this.connector.getCategories(function (data) { return _this.onCatData(data); });
        }
        Menu.prototype.getPageById = function (id) {
            if (isNaN(id))
                return null;
            for (var i = 0, n = this.pages.length; i < n; i++)
                if (this.pages[i].id == id)
                    return this.pages[i];
            return null;
        };
        Menu.prototype.getCategoryById = function (id) {
            if (isNaN(id))
                return null;
            for (var i = 0, n = this.categories.length; i < n; i++)
                if (this.categories[i].catid == id)
                    return this.categories[i];
            return null;
        };
        Menu.prototype.reset = function () {
            this.list.scrollTop(0);
            // this.hideArrow();
        };
        Menu.prototype.hideArrow = function () {
            if (this.isArrow) {
                this.isArrow = false;
                $(this.arrow).hide('fast');
            }
        };
        Menu.prototype.getView = function () {
            var _this = this;
            this.list.on(CLICK, 'li', function (data) { return _this.onListClick(data); });
            return this.view;
        };
        Menu.prototype.onCatData = function (resp) {
            var _this = this;
            // console.log(resp);
            var data = JSON.parse(resp);
            if (!$.isArray(data)) {
                console.error(data);
                return;
            }
            this.categories = data;
            this._data = data;
            var color = this.R.settings.color;
            var out = '';
            for (var i = 0, n = data.length; i < n; i++) {
                out += this.renderCat(data[i]);
            }
            this.list.html(out);
            //  this.listView.prepend(this.arrow);
            this.connector.getPagesList(function (data) { return _this.onPagesData(data); });
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
            $(out).appendTo(this.list);
            this._data = this._data.concat(data);
            this.getView();
            //  console.log(this._data);           
        };
        Menu.prototype.renderCat = function (item) {
            return '<a  class="u-brand" href="#category=' + item.catid + '"><span class="name">' + item.label + '</span></a>';
        };
        Menu.prototype.renderPage = function (item) {
            return '<a  class="u-brand"  href="#page=' + item.id + '"><span class="name">' + item.label + '</span></a>';
        };
        Menu.prototype.selecteEl = function (el) {
            if (this.selected)
                this.selected.removeClass(SELECTED);
            // if (!this.isArrow) {
            //   $(this.arrow).show();
            //  this.isArrow = true;
            // }           
            //if (this.arrow) TweenMax.to(this.arrow, 0.5, { y: (<any>el.context).offsetTop - 55 });
            this.selected = el;
            this.selected.addClass(SELECTED);
        };
        Menu.prototype.onListClick = function (evt) {
            var el = $(evt.currentTarget);
            if (el.is('li')) {
                this.selecteEl(el);
                //  try {
                //  console.log(el);
                var vo = this._data[el.index()];
                if (this.onSelect && vo)
                    this.onSelect(vo);
            }
        };
        return Menu;
    })();
    uplight.Menu = Menu;
})(uplight || (uplight = {}));
//# sourceMappingURL=Menu.js.map