/// <reference path="../../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var BreadCrumbs = (function () {
        function BreadCrumbs(view, home) {
            var _this = this;
            this.view = view;
            this.home = home;
            this.list = $('<ul>').addClass('breadcrumb').appendTo(view);
            this.list.on(CLICK, 'li', function (evt) { return _this.onListClick(evt); });
        }
        BreadCrumbs.prototype.addCrumb = function (url, text) {
            if (this.selected)
                this.selected.removeClass('active');
            // this.selected =$('<li>').addClass('active').data('id',url).append($('<a>').attr('href',this.home+'/'+url).text(text)).appendTo(this.list);
            this.selected = $('<li>').addClass('active').data('id', url).text(text).appendTo(this.list);
        };
        BreadCrumbs.prototype.clear = function () {
            this.selected = null;
            this.list.html('');
        };
        BreadCrumbs.prototype.removeLast = function () {
            this.list.children().last().detach();
            this.selected = this.list.children().last().addClass('active');
        };
        BreadCrumbs.prototype.onListClick = function (evt) {
            var el = $(evt.currentTarget);
            if (this.onCiick)
                this.onCiick(el.data('id'));
        };
        return BreadCrumbs;
    })();
    uplight.BreadCrumbs = BreadCrumbs;
})(uplight || (uplight = {}));
//# sourceMappingURL=Utils.js.map