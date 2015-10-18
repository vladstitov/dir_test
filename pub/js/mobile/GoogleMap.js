/**
 * Created by VladHome on 10/7/2015.
 */
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var GoogleMapOptions = (function () {
        function GoogleMapOptions() {
            this.key = 'AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
            this.center = '43.657467, -79.376571';
            this.zoom = 10;
            this.maptype = 'satelite';
        }
        GoogleMapOptions.SATELITE = 'satellite';
        GoogleMapOptions.ROADMAP = 'roadmap';
        return GoogleMapOptions;
    })();
    uplight.GoogleMapOptions = GoogleMapOptions;
    var GoogleMap = (function () {
        function GoogleMap() {
            this.key = 'AIzaSyAUaQFpM8aGgiocMDRcPzH66FKx5rPH1q0';
            // private TORONTO:string=;
            this.url = 'https://www.google.com/maps/embed/v1/';
            this.type = 'view';
            this.options = new GoogleMapOptions();
            this.options.key = this.key;
            this.options.zoom = 18;
            this.options.maptype = GoogleMapOptions.ROADMAP;
        }
        GoogleMap.prototype.createView = function () {
            var _this = this;
            return $('<div>').addClass('loader').load('htms/mobile/GoogleMap.htm', function () { return _this.init(); });
        };
        GoogleMap.prototype.getView = function () {
            if (!this.view)
                this.view = this.createView();
            return this.view;
        };
        GoogleMap.prototype.toString = function (opt) {
            var ar = [];
            for (var str in opt)
                ar.push(str + '=' + opt[str]);
            return this.url + this.type + '?' + ar.join('&');
        };
        GoogleMap.prototype.init = function () {
            this.view.prepend(this.view.children());
            var iframe = this.view.find('iframe:first');
            iframe.attr('src', this.toString(this.options));
        };
        return GoogleMap;
    })();
    uplight.GoogleMap = GoogleMap;
})(uplight || (uplight = {}));
//# sourceMappingURL=GoogleMap.js.map