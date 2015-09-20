/// <reference path="../kiosk/registry.ts" />
var uplight;
(function (uplight) {
    var Menu = (function () {
        function Menu(view, conn, model) {
            var _this = this;
            this.view = view;
            this.conn = conn;
            this.model = model;
            this.menu = $('#Menu');
            this.menu.find('[data-id=btnClose]').click(function () { return _this.hideMenu(); });
            this.listP = this.view.find('[data-id=listP]:first');
            this.listC = this.view.find('[data-id=listC]:first');
            this.content = this.view.find('[data-id=content]:first');
            this.btnMenu = this.view.find('[data-id=btnMenu]:first').click(function () { return _this.toggleMenu(); });
            var cats = model.getCategories();
            var d1 = $.Deferred();
            if (!cats) {
                model.dispatcher.on(model.READY, function () {
                    cats = model.getCategories();
                    d1.resolve(cats);
                });
            }
            else
                d1.resolve(cats);
            $.when(d1).then(function (cats) {
                console.log(cats);
                var out = '';
                var ar = cats;
                for (var i = 0, n = ar.length; i < n; i++)
                    for (var i = 0, n = ar.length; i < n; i++)
                        out += '<a class="u-brand list-group-item" href="#category/' + ar[i].id + '"><span class="' + ar[i].icon + '"></span> ' + ar[i].label + '</a>';
                _this.listC.html(out);
            });
            var p0 = conn.getPages().done(function (res) {
                // console.log(res);
                var out = '';
                var ar = res;
                for (var i = 0, n = ar.length; i < n; i++)
                    out += '<a class="u-brand list-group-item" href="#page/' + ar[i].id + '"><span class="' + ar[i].icon + '"></span> ' + ar[i].label + '</a>';
                _this.listP.html(out);
            });
            this.slider = this.view.find('[data-id=SearchSlider]:first');
            console.log(this.slider);
            this.view.find('[data-id=btnSearch]').click(function () { return _this.toggleSearch(); });
            this.tiSearch = this.view.find('[data-id=tiSearch]:first').on('input', function () {
                console.log(_this.tiSearch.val());
                if (_this.onSearchType)
                    _this.onSearchType(_this.tiSearch.val());
            });
            // $.when(p0,d1).then((pages,cats)=>{
            //    console.log(pages,cats);
            // })
            //  conn.getCategories((data) => this.onCatData(data));
        }
        Menu.prototype.showMenu = function () {
            var _this = this;
            if (this.isHiddenMenu) {
                clearTimeout(this.timeoutMenu);
                this.isHiddenMenu = false;
                this.menu.removeClass('closed');
                this.timeoutMenu = setTimeout(function () {
                    if (_this.onMenuON)
                        _this.onMenuON();
                }, 500);
            }
        };
        Menu.prototype.hideAll = function () {
            this.hideMenu();
            this.hideSearch();
        };
        Menu.prototype.hideMenu = function () {
            if (!this.isHiddenMenu) {
                clearTimeout(this.timeoutMenu);
                this.isHiddenMenu = true;
                this.menu.addClass('closed');
            }
        };
        Menu.prototype.toggleMenu = function () {
            console.log('toggleMenu');
            if (this.isHiddenMenu)
                this.showMenu();
            else
                this.hideMenu();
        };
        Menu.prototype.hideSearch = function () {
            if (this.isSearch) {
                this.tiSearch.val('');
                this.isSearch = false;
                this.slider.animate({ scrollTop: 0 });
                clearTimeout(this.timeoutSearchFocus);
                clearTimeout(this.timeoutON);
            }
        };
        Menu.prototype.showSearch = function () {
            var _this = this;
            if (!this.isSearch) {
                clearTimeout(this.timeoutON);
                this.isSearch = true;
                this.slider.animate({ scrollTop: 30 });
                this.timeoutON = setTimeout(function () {
                    if (_this.onSearchON)
                        _this.onSearchON();
                }, 500);
                this.timeoutSearchFocus = setTimeout(function () { return _this.focusSearch(); }, 1000);
            }
        };
        Menu.prototype.focusSearch = function () {
            this.tiSearch.focus();
            if (this.onSearchFocus)
                this.onSearchFocus();
        };
        Menu.prototype.toggleSearch = function () {
            if (this.isSearch)
                this.hideSearch();
            else
                this.showSearch();
        };
        return Menu;
    })();
    uplight.Menu = Menu;
})(uplight || (uplight = {}));
//# sourceMappingURL=menu.js.map