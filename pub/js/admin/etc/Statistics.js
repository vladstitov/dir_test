/**
 * Created by VladHome on 8/8/2015.
 */
///<reference path="../../typing/chart.d.ts"/>
/// <reference path="../DirsAdmin.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
            var kiosksChart = new KiosksChart($('#KiosksChart'), this.colors, this.fromTo);
            var devices = new DevicesData($('#DevicesData'), this.colors);
        };
        Statistics.prototype.onData = function (res) {
            var cats = res.categories;
            var dests = res.destinations;
            //  var search = res.search;
            //  console.log(res);
            var categ = new CategoriesChart($('#CategoriesChart'), cats, this.colors);
            var destinTopDestinations = new TopDestinations($('#TopDestinations'), dests);
            var searches = new TopSearches($('#TopSearches'), res.search, res.keywords);
        };
        return Statistics;
    })();
    uplight.Statistics = Statistics;
    var VODevice = (function () {
        function VODevice(obj) {
            this.S_time = 0;
            this.K_time = 0;
            this.ip = '';
            this.ping = 0;
            this.start_at = 0;
            this.timer = 15000;
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODevice;
    })();
    uplight.VODevice = VODevice;
    var DeviceModel = (function (_super) {
        __extends(DeviceModel, _super);
        function DeviceModel(dev, s_time) {
            _super.call(this, dev);
            var delta = s_time - dev.S_time;
            if (delta < dev.maxdelay)
                this.status = 1;
            else
                this.status = 0;
        }
        return DeviceModel;
    })(VODevice);
    uplight.DeviceModel = DeviceModel;
    var DevicesData = (function () {
        // private greenLite:JQuery;
        function DevicesData(view, colors) {
            this.view = view;
            this.colors = colors;
            console.log('DevicesData');
            this.list = view.find('[data-id=list]:first');
            // this.greenLite=view.find('[data-view=greenLite]:first');
            this.loadData();
        }
        DevicesData.prototype.loadData = function () {
            var _this = this;
            this.list.find('.status').detach();
            uplight.RegA.getInstance().connector.getDevices().done(function (res) { return _this.onKiosks(res); });
        };
        DevicesData.prototype.onKiosks = function (res) {
            this.data = res.result;
            this.s_time = Number(res.success);
            //console.log(this.data);
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
                var k = new DeviceModel(ar[i], s_time);
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
            var stsrtTime = obj.start_at ? new Date(obj.start_at * 1000).toLocaleString() : '';
            var lastTime = obj.K_time ? new Date(obj.K_time * 1000).toLocaleString() : '';
            return '<tr>' + '<td>' + obj.name + '</td>' + '<td><a target="_blank" href="' + obj.template + '?kiosk=' + obj.id + '&mode=preview" ><span class="fa fa-external-link"></span></a></td>' + '<td><span title="' + statusStr + '" class="status fa ' + cl + '" style="color:' + color + '">&nbsp</span></td>' + '<td>' + obj.ip + '</td>' + '<td>' + obj.ping + '</td>' + '<td class="text-right">' + stsrtTime + '</td>' + '<td class="text-right">' + lastTime + '</td>' + '</tr>';
        };
        return DevicesData;
    })();
    uplight.DevicesData = DevicesData;
    var VoRate = (function () {
        function VoRate(ar) {
            this.value = ar[0];
            this.rate = ar[1];
        }
        return VoRate;
    })();
    uplight.VoRate = VoRate;
    var TopSearches = (function () {
        function TopSearches(view, search, keywords) {
            this.view = view;
            var kws = this.parseData(keywords);
            var kbs = this.parseData(search);
            // console.log(kws);
            // console.log(kbs);
            // kws = _.sortBy(kws,'rate').reverse();
            //  kbs= _.sortBy(kbs,'rate').reverse();
            this.showKewords(kws);
            this.showKeyboard(kbs);
        }
        TopSearches.prototype.parseData = function (ar) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(new VoRate(ar[i]));
            return out;
        };
        TopSearches.prototype.showKewords = function (ar) {
            var out = '<table class="table"><thead><tr><td>Keyword</td><td>Times</td></tr></thead><tbody>';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<tr><td> ' + ar[i].value + ' </td><td> ' + ar[i].rate + ' </td></tr>';
            }
            out += '</tbody></table>';
            this.view.find('[data-id=list1]:first').html(out);
        };
        TopSearches.prototype.showKeyboard = function (ar) {
            var out = '<table class="table"><thead><tr><td>Search</td><td>Times</td></tr></thead><tbody>';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<tr><td> ' + ar[i].value + ' </td><td> ' + ar[i].rate + ' </td></tr>';
            }
            out += '</tbody></table>';
            this.view.find('[data-id=list2]:first').html(out);
        };
        return TopSearches;
    })();
    var TopDestinations = (function () {
        function TopDestinations(view, data) {
            this.view = view;
            this.data = data;
            this.render(data);
            // RegA.getInstance().connector.getDestinations().done((res:any)=>this.onDestinations(res))
        }
        TopDestinations.prototype.render = function (ar) {
            // console.log(ar);
            var dests = uplight.RegA.getInstance().model.getDestinationsIndexed();
            //console.log(dests);
            var out = '<thead><tr><td>Clicks</td><td>Name</td><td>Unit</td></tr></thead><tbody>';
            for (var i = 0, n = ar.length; i < n; i++) {
                var dest = dests[ar[i][0]];
                if (dest)
                    out += this.renderItem(dest, ar[i][1]);
                else
                    console.log('error no destination with id: ' + ar[i][0]);
            }
            out += '</tbody>';
            var list = $('<table>').addClass('table').html(out).appendTo(this.view.find('[data-id=list]:first'));
        };
        TopDestinations.prototype.renderItem = function (item, clicks) {
            return '<tr><td>' + clicks + '</td><td>' + item.name + '</td><td >' + item.unit + '</td></tr>';
        };
        return TopDestinations;
    })();
    var CategoriesChart = (function () {
        function CategoriesChart(view, data, colors) {
            // console.log(data);
            this.view = view;
            this.data = data;
            this.colors = colors;
            var ar = data;
            var out = {};
            var max = 0;
            for (var i = 0, n = ar.length; i < n; i++) {
                var val = ar[i][1];
                if (isNaN(val))
                    val = 10000;
                val = 10000 - val;
                if (val > max)
                    max = val;
                out[ar[i][0]] = val;
            }
            for (var str in out)
                out[str] -= max;
            this.render(out);
            //RegA.getInstance().connector.getCategories().done((res)=>this.onCategories(res))
        }
        /* private getCategryStat(id:number){
             var ar = this.data
             for(var i=0,n=ar.length;i<n;i++){
                 var item = ar[i];
             }
           }
   */
        /* private parseData(cats:any,data:any):void{
            console.log(data);
             var ar = data
             for(var i=0,n=ar.length;i<n;i++){
                 if(ar[i].type=='cp'){ cats[ar[i].val]++}
                 else if(ar[i].type=='cm'){cats[ar[i].val]--};
             }
 
         }
 
         private rateCategories(cats:VOCategory[],obj:any):VOPie[]{
             var ar = cats;
             var out:VOPie[]=[]
             for(var i=0,n=ar.length;i<n;i++){
                 var item = ar[i];
                 var vo:VOPie = new VOPie();
                 vo.color=ar[i].color;
                 vo.label = ar[i].label;
                 vo.value = obj[ar[i].id];
                 out.push(vo);
             }
             return out;
         }
         private cats:any;*/
        CategoriesChart.prototype.render = function (data) {
            var list = $('<ul>');
            var out = '';
            // var ar = res
            var obj = {};
            var pies = [];
            var ar = uplight.RegA.getInstance().model.getCategories();
            var total = 0;
            for (var i = 0, n = ar.length; i < n; i++) {
                // var cat:VOCategory = new VOCategory(ar[i]);
                var vo = new VOPie();
                vo.color = this.colors[i];
                vo.label = ar[i].label;
                var val = data[ar[i].id] || 1;
                if (val === 0)
                    val = 1;
                val = 1 / Math.abs(val);
                total += val;
                vo.value = val; // 100+(data[cat.id] || 0);
                pies.push(vo);
                out += '<li><span class="glyphicon glyphicon-stop" style="color:' + vo.color + ';"></span> <span> ' + vo.label + '</span></li>';
            }
            for (var i = 0, n = pies.length; i < n; i++) {
                pies[i].value = pies[i].value / total * 100;
            }
            // console.log(pies);
            // this.parseData(obj,this.data);
            ///  var vis =  this.rateCategories(cats,obj);
            // console.log(cats);
            list.html(out);
            this.list = list;
            list.appendTo(this.view.find('[data-id=list]:first'));
            var canvas = this.view.find('[data-id=canvas]:first');
            //console.log('vis',vis);
            var myPieChart = new Chart(canvas.get(0).getContext("2d")).Pie(pies, this.getOptions());
            //console.log(res);
        };
        CategoriesChart.prototype.getOptions = function () {
            return {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,
                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",
                //Number - The width of each segment stroke
                segmentStrokeWidth: 2,
                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout: 0,
                //Number - Amount of animation steps
                animationSteps: 100,
                //String - Animation easing effect
                animationEasing: "easeOutBounce",
                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,
                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: false
            };
        };
        return CategoriesChart;
    })();
    var VOPie = (function () {
        function VOPie() {
        }
        return VOPie;
    })();
    var VOKs = (function () {
        function VOKs(id) {
            this.id = id;
            this.clicks = [];
        }
        VOKs.prototype.buildDays = function () {
            var out;
            var ar = this.clicks;
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
                var day = date.getDay();
                if (!out[day])
                    out[day] = 0;
                out[day]++;
            }
            return out;
        };
        return VOKs;
    })();
    var KiosksChart = (function () {
        function KiosksChart(view, colors, fromto) {
            var _this = this;
            this.view = view;
            this.colors = colors;
            //  console.log(clicks);
            this.view.find('[data-id=fromto]:first').text(fromto);
            uplight.RegA.getInstance().connector.getData('kiosks.json').done(function (res) { return _this.onKiosks(res); });
        }
        KiosksChart.prototype.craeateTimeline = function () {
            var now = new Date();
            var dates = [];
            dates.push(now.getDate());
            for (var i = 0, n = 30; i < n; i++) {
                now.setDate(now.getDate() - 1);
                dates.push(now.getDate());
            }
            return dates.reverse();
        };
        KiosksChart.prototype.breakeClicksInDays = function (clicks) {
            var ar = clicks;
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
            }
            var from = new Date(clicks[0] * 1000);
            var to = new Date(clicks[clicks.length - 1] * 1000);
            console.log(from);
            console.log(to);
        };
        KiosksChart.prototype.convertClicks = function (ar) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var date = new Date(ar[i] * 1000);
                var day = date.getDate();
                if (!out[day])
                    out[day] = 0;
                out[day]++;
            }
            return out;
        };
        KiosksChart.prototype.mapClicks = function (ar, clicks) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(clicks[ar[i]] || 0);
            return out;
        };
        KiosksChart.prototype.renderKiosk = function (obj) {
            return '<li title="kiosk id ' + obj.id + '"><span class="glyphicon glyphicon-stop" style="color:' + obj.color + ';"></span> <span> ' + obj.name + '</span></li>';
        };
        KiosksChart.prototype.onData = function (res) {
            // console.log('usage',res);
            var timeline = this.craeateTimeline();
            var ar = [];
            for (var str in res) {
                var item = this.devices[str];
                var clicks = this.convertClicks(res[str]);
                item.clicks = this.mapClicks(timeline, clicks);
                ar.push(item);
            }
            this.drawGraph(timeline.map(String), ar);
        };
        KiosksChart.prototype.drawGraph = function (timeline, ar) {
            var datasets = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var ds = {};
                ds.label = ar[i].name;
                ds.strokeColor = ar[i].color;
                ds.pointColor = ar[i].color;
                ds.pointHighlightStroke = "rgba(220,220,220,1)";
                ds.pointStrokeColor = "#fff";
                ds.pointHighlightFill = "#666";
                ds.data = ar[i].clicks;
                datasets.push(ds);
            }
            var data = {
                labels: timeline.map(String),
                datasets: datasets
            };
            var canvas = this.view.find('[data-id=canvas]:first');
            var ctx = canvas.get(0).getContext("2d");
            var myLineChart = new Chart(ctx).Line(data, this.getOptions());
        };
        KiosksChart.prototype.onKiosks = function (res) {
            var _this = this;
            var ids = [];
            // var timeline:number[]=  this.craeateTimeline();
            var ks = JSON.parse(res);
            // console.log(ks);
            var ar = ks;
            var list = $('<ul>');
            var out = '';
            var datasets = [];
            var devices = {};
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                //  var id:string = 'kiosk'+item.id;
                ids.push(item.index);
                devices[item.index] = ar[i];
                // var clicks:number[] = this.clicks[ar[i].id];
                //if(!clicks) clicks=[];
                //clicks = this.convertClicks(clicks);
                //ar[i].clicks = this.mapClicks(timeline,clicks);
                ar[i].color = this.colors[i];
                out += this.renderKiosk(ar[i]);
            }
            this.devices = devices;
            uplight.RegA.getInstance().connector.getUsage(ids.join(','), '-30 days', 'now').done(function (res) { return _this.onData(res); });
            list.html(out);
            this.view.find('[data-id=list]:first').append(list);
            return;
            var timeline;
            var data = {
                labels: timeline.map(String),
                datasets: datasets /*[
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: ks[0].clicks
                    },
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: ks[1].clicks
                    }
                ]*/
            };
            var canvas = this.view.find('[data-id=canvas]:first');
            var ctx = canvas.get(0).getContext("2d");
            var myLineChart = new Chart(ctx).Line(data, this.getOptions());
        };
        KiosksChart.prototype.getOptions = function () {
            return {
                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,
                //String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",
                //Number - Width of the grid lines
                scaleGridLineWidth: 1,
                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: true,
                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: true,
                //Boolean - Whether the line is curved between points
                bezierCurve: true,
                //Number - Tension of the bezier curve between points
                bezierCurveTension: 0.4,
                //Boolean - Whether to show a dot for each point
                pointDot: true,
                //Number - Radius of each point dot in pixels
                pointDotRadius: 4,
                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,
                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 5,
                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,
                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,
                //Boolean - Whether to fill the dataset with a colour
                datasetFill: false
            };
        };
        return KiosksChart;
    })();
})(uplight || (uplight = {}));
//# sourceMappingURL=Statistics.js.map