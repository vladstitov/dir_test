/**
 * Created by VladHome on 8/8/2015.
 */
///<reference path="../../typing/chart.d.ts"/>
/// <reference path="../DirsAdmin.ts" />
/// <reference path="DeviceBase.ts" />
/// <reference path="TopSearches.ts" />
/// <reference path="KioskChart.ts" />
/// <reference path="DeviceData.ts" />
var uplight;
(function (uplight) {
    var Statistics = (function () {
        function Statistics(contauner) {
            var _this = this;
            this.colors = ['#9F9977', '#B2592D', '#BDC2C7', '#BC8777', ' #996398', '#839182', '#708EB3', '#BC749A'];
            this.R = uplight.RegA.getInstance();
            contauner.load('htms/admin/Statistics.htm', function () { return _this.init(); });
        }
        Statistics.prototype.init = function () {
            // var today = new Date()
            //  var priorDate = new Date(today.getTime() - 30*24*60*60*1000);
            var _this = this;
            this.R.connector.getStatistics().done(function (res) { return _this.onData(res); });
            var today = new Date();
            var priorDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            this.fromTo = 'from ' + today.toDateString().substr(4) + ' to ' + priorDate.toDateString().substr(4);
            var kiosksChart = new uplight.KiosksChart($('#KiosksChart'), this.colors, this.fromTo);
            var devices = new uplight.DevicesData($('#DevicesData'), this.colors);
        };
        Statistics.prototype.onData = function (res) {
            var cats = res.categories;
            var dests = res.destinations;
            //  console.log(res);
            var categ = new uplight.CategoriesChart($('#CategoriesChart'), cats, this.colors);
            var destinTopDestinations = new uplight.TopDestinations($('#TopDestinations'), dests);
            var searches = new uplight.TopSearches($('#TopSearches'), res.search, res.keywords);
        };
        return Statistics;
    })();
    uplight.Statistics = Statistics;
})(uplight || (uplight = {}));
//# sourceMappingURL=Statistics.js.map