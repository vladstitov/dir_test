/**
 * Created by VladHome on 7/23/2015.
 */
/// <reference path="Registry.ts" />
var uplight;
(function (uplight) {
    var SearchDetailsLarge = (function () {
        function SearchDetailsLarge(vo) {
            if (vo.imgs && vo.imgs.length)
                this.createGallery(vo.imgs);
            if (vo.pgs && vo.pgs.length)
                this.createPages(vo.pgs);
        }
        SearchDetailsLarge.prototype.createGallery = function (imgs) {
            this.haveData = true;
            var ar = imgs;
            var out = '<div class="nano"><ul class="list nano-content">';
            for (var i = 0, n = ar.length; i < n; i++)
                out += '<li data-i="' + i + '"><img src="' + ar[i] + '" /></li>';
            out += '</ul></div>';
            var u = '<div class="preview" ><div class="img"><img src="' + ar[0] + '" /></div></div>';
            this.gall = $('<div>').addClass('gallery').html(u + out);
            this.imgs = imgs;
            this.img = this.gall.find('.preview img:first');
        };
        SearchDetailsLarge.prototype.onGalClick = function (evt) {
            //console.log(evt);
            var i = $(evt.currentTarget).data('i');
            this.img.attr('src', this.imgs[i]);
        };
        SearchDetailsLarge.prototype.getView = function () {
            var _this = this;
            if (!this.view)
                this.view = this.createView();
            if (this.gall) {
                this.gall.on(CLICK, 'li', function (evt) { return _this.onGalClick(evt); });
                this.img.attr('src', this.imgs[0]);
            }
            return this.view;
        };
        SearchDetailsLarge.prototype.createPages = function (url) {
            this.haveData = true;
        };
        SearchDetailsLarge.prototype.createView = function () {
            var view = $('<div>').addClass('detailsL  Plastic031');
            var content = $('<div>').addClass('content').appendTo(view);
            view.append('<div class="fa fa-close" data-id="btnClose">');
            if (this.detSm)
                content.append(this.detSm.view);
            if (this.gall)
                content.append(this.gall);
            if (this.pages)
                content.append(this.pages);
            return view;
        };
        SearchDetailsLarge.prototype.setDetailsSmall = function (det) {
            this.detSm = det;
            return this;
        };
        return SearchDetailsLarge;
    })();
    uplight.SearchDetailsLarge = SearchDetailsLarge;
})(uplight || (uplight = {}));
//# sourceMappingURL=SearchDetailsLarge.js.map