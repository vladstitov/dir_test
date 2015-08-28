/**
 * Created by VladHome on 6/7/2015.
 */
/// <reference path="regA.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var Menu = (function () {
        function Menu(view) {
            var _this = this;
            this.view = view;
            this.R = uplight.RegA.getInstance();
            if (view.length)
                this.init(view);
            this.btnOn = $('#menu-on').hide();
            this.R.dispatcher.on(uplight.RegA.SHOW_MENU, function () {
                _this.open();
            });
        }
        Menu.prototype.init = function (view) {
            var _this = this;
            this.view.find('[data-id=btnMenu]:first').on(CLICK, function () {
                _this.toggle();
            });
        };
        Menu.prototype.toggle = function () {
            if (this.view.hasClass('opened'))
                this.colapse();
            else
                this.open();
        };
        Menu.prototype.colapse = function () {
            //this.btnOn.show();
            this.view.removeClass('opened');
            this.view.children('section').hide('fast');
        };
        Menu.prototype.open = function () {
            //this.btnOn.hide();
            this.view.addClass('opened');
            this.view.children('section').show('fast');
        };
        return Menu;
    })();
    uplight.Menu = Menu;
})(uplight || (uplight = {}));
//# sourceMappingURL=Menu.js.map