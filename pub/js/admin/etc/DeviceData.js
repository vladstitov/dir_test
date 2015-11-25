/**
 * Created by VladHome on 11/9/2015.
 */
/// <reference path="../RegA.ts" />
/// <reference path="../../typing/jquery.d.ts" />
/// <reference path="../../typing/underscore.d.ts" />
var uplight;
(function (uplight) {
    var DeviceModel = (function () {
        function DeviceModel(dev) {
            this.dev = dev;
            for (var str in dev)
                this[str] = dev[str];
            //   var delta:number = (s_time-this.s_time);
            // if(delta < timer)this.status=1;
            //else this.status=0;
        }
        return DeviceModel;
    })();
    uplight.DeviceModel = DeviceModel;
    var DevicesData = (function () {
        function DevicesData($view, colors) {
            //console.log('DevicesData');
            var _this = this;
            this.$view = $view;
            this.colors = colors;
            this.ID = 'uplight.DevicesData';
            this.R = uplight.RegA.getInstance();
            if (uplight.RegA.getInstance().props['timer'])
                this.kioskTimer = this.R.props['timer'].value;
            this.list = $view.find('[data-id=list]:first');
            // this.greenLite=view.find('[data-view=greenLite]:first');
            this.loadData();
            this.timer = setInterval(function () { return _this.loadData(); }, 10000);
        }
        DevicesData.prototype.detach = function () {
            this.$view.detach();
        };
        DevicesData.prototype.appendTo = function (cont) {
            this.$view.appendTo(cont);
            return this;
        };
        DevicesData.prototype.getName = function () {
            return this.ID;
        };
        DevicesData.prototype.destroy = function () {
            clearInterval(this.timer);
        };
        DevicesData.prototype.loadData = function () {
            var _this = this;
            this.list.find('.status').detach();
            uplight.RegA.getInstance().connector.getDevicesData().done(function (res) { return _this.onDeviceData(res); });
        };
        DevicesData.prototype.onDeviceData = function (res) {
            var ar = res.result;
            DeviceModel.s_time = Number(res.success);
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++)
                out.push(new DeviceModel(ar[i]));
            //  console.log(res);
            //  this.s_time = Number(res.success);
            // console.log(this.data);
            // console.log(this.s_time);
            // this.render();
            // RegA.getInstance().connector.  getServerTime().done((res)=>{
            //  this.s_time = Number(res);
            //  this.render();
            //  });
        };
        DevicesData.prototype.render = function () {
            var kt = this.kioskTimer;
            console.log(kt);
            var s_time = this.s_time;
            var ar = this.data;
            var out = '';
            var ks = [];
            for (var i = 0, n = ar.length; i < n; i++) {
            }
            this.devices = ks;
            this.list.html(out);
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
            return '';
            /*
                        var stsrtTime:string= obj.start?new Date(obj.start_at*1000).toLocaleString():'';
                        var lastTime:string =obj.now? new Date(obj.now*1000).toLocaleString():'';
                        return '<tr>' +
                            '<td>'+obj.name+'</td>' +
                            '<td><a target="_blank" href="'+obj.template+'&mode=preview" ><span class="fa fa-external-link"></span></a></td>' +
                            '<td><span title="'+statusStr+'" class="status fa '+cl+'" style="color:'+color+'">&nbsp</span></td>' +
                            '<td>'+obj.ip+'</td>' +
                            '<td>'+obj.ping+'</td>' +
                            '<td class="text-right">'+stsrtTime+'</td>' +
                            '<td class="text-right">'+lastTime+'</td>' +
                            '</tr>';*/
        };
        return DevicesData;
    })();
    uplight.DevicesData = DevicesData;
})(uplight || (uplight = {}));
//# sourceMappingURL=DeviceData.js.map