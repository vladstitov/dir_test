/**
 * Created by VladHome on 8/8/2015.
 */
///<reference path="../../typing/chart.d.ts"/>
/// <reference path="../DirsAdmin.ts" />
/// <reference path="DeviceBase.ts" />
/// <reference path="TopSearches.ts" />
/// <reference path="KioskChart.ts" />
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
            var devices = new DevicesData($('#DevicesData'), this.colors);
        };
        Statistics.prototype.onData = function (res) {
            var cats = res.categories;
            var dests = res.destinations;
            //  var search = res.search;
            //  console.log(res);
            var categ = new uplight.CategoriesChart($('#CategoriesChart'), cats, this.colors);
            var destinTopDestinations = new uplight.TopDestinations($('#TopDestinations'), dests);
            var searches = new uplight.TopSearches($('#TopSearches'), res.search, res.keywords);
        };
        return Statistics;
    })();
    uplight.Statistics = Statistics;
    var DevicesData = (function () {
        // private greenLite:JQuery;
        function DevicesData(view, colors) {
            this.view = view;
            this.colors = colors;
            //console.log('DevicesData');
            this.list = view.find('[data-id=list]:first');
            // this.greenLite=view.find('[data-view=greenLite]:first');
            this.loadData();
        }
        DevicesData.prototype.loadData = function () {
            var _this = this;
            this.list.find('.status').detach();
            uplight.RegA.getInstance().connector.getDevicesData().done(function (res) { return _this.onKiosks(res); });
        };
        DevicesData.prototype.onKiosks = function (res) {
            this.data = res.result;
            this.s_time = Number(res.success);
            // console.log(this.data);
            // console.log(this.s_time);
            this.render();
            // RegA.getInstance().connector.  getServerTime().done((res)=>{
            //  this.s_time = Number(res);
            //  this.render();
            //  });
        };
        DevicesData.prototype.render = function () {
            var _this = this;
            var s_time = this.s_time;
            var ar = this.data;
            var out = '';
            var ks = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var k = new uplight.DeviceModel(ar[i], s_time);
                /// console.log(k);
                ks.push(k);
                out += this.createDevice(k);
            }
            this.devices = ks;
            this.list.html(out);
            setTimeout(function () { return _this.loadData(); }, 10000);
        };
        DevicesData.prototype.createDevice = function (obj) {
            var color = '#0F0';
            var statusStr = 'Working fine';
            var cl = 'fa-circle';
            if (obj.status === 0) {
                color = '#ECCC6B';
                cl = 'fa-exclamation-triangle';
                statusStr = 'Experienced delays';
            }
            var stsrtTime = obj.start ? new Date(obj.start * 1000).toLocaleString() : '';
            var lastTime = obj.now ? new Date(obj.now * 1000).toLocaleString() : '';
            return '<tr>' + '<td>' + obj.name + '</td>' + '<td><a target="_blank" href="' + obj.template + '?kiosk=' + obj.id + '&mode=preview" ><span class="fa fa-external-link"></span></a></td>' + '<td><span title="' + statusStr + '" class="status fa ' + cl + '" style="color:' + color + '">&nbsp</span></td>' + '<td>' + obj.ip + '</td>' + '<td>' + obj.ping + '</td>' + '<td class="text-right">' + stsrtTime + '</td>' + '<td class="text-right">' + lastTime + '</td>' + '</tr>';
        };
        return DevicesData;
    })();
    uplight.DevicesData = DevicesData;
})(uplight || (uplight = {}));
//# sourceMappingURL=Statistics.js.map