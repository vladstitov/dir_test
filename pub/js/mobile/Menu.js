/// <reference path="../kiosk/registry.ts" />
var uplight;
(function (uplight) {
    var Menu = (function () {
        function Menu(view, conn, model) {
            var _this = this;
            this.view = view;
            this.conn = conn;
            this.model = model;
            this.listP = this.view.find('[data-id=listP]:first');
            this.listC = this.view.find('[data-id=listC]:first');
            this.content = this.view.find('[data-id=content]:first');
            this.btnMenu = this.view.find('[data-id=btnMenu]:first').click(function () { return _this.toggle(); });
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
            // $.when(p0,d1).then((pages,cats)=>{
            //    console.log(pages,cats);
            // })
            //  conn.getCategories((data) => this.onCatData(data));
        }
        Menu.prototype.show = function () {
            if (this.isHidden) {
                this.isHidden = false;
                this.content.show('fast');
            }
        };
        Menu.prototype.hide = function () {
            if (!this.isHidden) {
                this.isHidden = true;
                this.content.hide('fast');
            }
        };
        Menu.prototype.toggle = function () {
            if (this.isHidden)
                this.show();
            else
                this.hide();
        };
        return Menu;
    })();
    uplight.Menu = Menu;
})(uplight || (uplight = {}));
//# sourceMappingURL=Menu.js.map