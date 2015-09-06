/**
 * Created by VladHome on 9/5/2015.
 */
/// <reference path="Kiosk.ts" />
var uplight;
(function (uplight) {
    var MainMenu = (function () {
        function MainMenu() {
            var _this = this;
            this.R = uplight.Registry.getInstance();
            this.view = $('[data-ctr=MainMenu]:first');
            this.R.connector.getData('pages.json').done(function (data) { return _this.onData(data); });
            this.list = this.view.find('[data-id=list]');
            this.list.on(CLICK, 'a', function (evt) { return _this.onMenuClick(evt); });
        }
        MainMenu.prototype.onMenuClick = function (evt) {
            console.log(evt);
            evt.preventDefault();
            var i = $(evt.currentTarget).data('i');
            console.log(i);
            if (isNaN(i))
                return;
            var item = this.data[i];
            if (!item)
                return;
            this.pages.showPage(i);
            if (this.onClick)
                this.onClick(item);
        };
        MainMenu.prototype.onData = function (res) {
            // console.log(res);
            this.data = JSON.parse(res);
            this.pages = new uplight.InfoPage();
            this.pages.setData(this.data);
            this.render();
        };
        MainMenu.prototype.render = function () {
            var ar = this.data;
            var out = '<ul class="nano-content">';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                out += '<li class="item Plastic031"><a data-i="' + i + '">' + item.name + '</a></li>';
            }
            out += '</ul>';
            this.list.html(out);
        };
        return MainMenu;
    })();
    uplight.MainMenu = MainMenu;
})(uplight || (uplight = {}));
//# sourceMappingURL=MainMenu.js.map