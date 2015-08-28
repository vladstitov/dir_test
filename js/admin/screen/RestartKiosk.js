/**
 * Created by VladHome on 7/7/2015.
 */
///<reference path="../RegA"/>
var uplight;
(function (uplight) {
    var RestartKiosk = (function () {
        function RestartKiosk(container) {
            var _this = this;
            this.container = container;
            this.filename = 'kiosks.json';
            this.connector = uplight.RegA.getInstance().connector;
            this.R = uplight.RegA.getInstance();
            var p1 = this.connector.getData('admin.json').done(function (res) {
                _this.admin = JSON.parse(res);
            });
            var p2 = container.load('js/admin/screen/KiosksEdit.html');
            var p3 = this.connector.getServerTime().done(function (res) {
                _this.s_time = Number(res);
            });
            var p4 = this.loadData();
            $.when(p1, p2, p3, p4).then(function () { return _this.init(); });
        }
        RestartKiosk.prototype.init = function () {
            var _this = this;
            console.log('admin', this.admin);
            this.view = $('#KiosksEdit');
            this.view.find('[data-id=btnAll]:first').on(CLICK, function () { return _this.onAllClick(); });
            this.view.find('[data-id=btnRestart]:first').on(CLICK, function () { return _this.onRestartClick(); });
            this.view.find('[data-id=btnDelete]:first').on(CLICK, function () { return _this.onDeleteClick(); });
            this.view.find('[data-id=btnCreate]:first').on(CLICK, function () { return _this.onCreateClick(); });
            this.view.find('[data-id=btnEdit]:first').on(CLICK, function () { return _this.onEditClick(); });
            this.view.find('[data-id=btnClose]').on(CLICK, function () { return _this.onCloseClick(); });
            this.view.find('[data-id=btnSave]:first').on(CLICK, function () { return _this.onSaveClick(); });
            this.editHeader = this.view.find('[data-id=editHeader]:first');
            this.selTemplate = this.view.find('[data-id=selTemplate]:first');
            this.tiName = this.view.find('[data-id=tiName]:first');
            this.list = this.view.find('[data-id=list]:first');
            this.makeTemplates(this.admin.templates);
            this.render();
        };
        RestartKiosk.prototype.onSaveClick = function () {
            if (!this.selectedItem) {
                var k = new VOKiosk({});
                var ar = this.kiosks;
                var max = 1;
                for (var i = 0, n = ar.length; i < n; i++)
                    if (ar[i].id > max)
                        max = ar[i].id;
                k.id = max + 1;
                k.name = this.tiName.val();
                k.template = this.selTemplate.val();
                k.status = 'new';
                this.kiosks.push(k);
            }
            else {
                this.selectedItem.name = this.tiName.val();
                this.selectedItem.template = this.selTemplate.val();
            }
            this.save();
            this.hidePanel();
        };
        RestartKiosk.prototype.hidePanel = function () {
            $('#kioskEditPanel').fadeOut();
        };
        RestartKiosk.prototype.showPanel = function () {
            $('#kioskEditPanel').fadeIn();
        };
        RestartKiosk.prototype.onCloseClick = function () {
            this.hidePanel();
        };
        RestartKiosk.prototype.loadData = function () {
            var _this = this;
            return this.R.connector.getData(this.filename).done(function (res) { return _this.onData(res); });
        };
        RestartKiosk.prototype.makeTemplates = function (ar) {
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                out += '<option value="' + ar[i].value + '">' + ar[i].label + '</option>';
            }
            this.selTemplate.html(out);
        };
        RestartKiosk.prototype.onData = function (res) {
            this.data = JSON.parse(res);
        };
        RestartKiosk.prototype.render = function () {
            var s_time = this.s_time;
            var ar = this.data;
            var out = '';
            var ks = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var k = new VOKiosk(ar[i]);
                ks.push(k);
                out += this.createDevice(k, s_time);
            }
            this.kiosks = ks;
            this.list.html(out);
        };
        RestartKiosk.prototype.onEditClick = function () {
            var ar = this.collectChecked();
            if (ar.length === 0) {
                alert('Please select checkbox in line you want to edit');
                return;
            }
            this.selectedItem = this.getKioskById(ar[0]);
            this.editHeader.text('Edit Kiosk');
            this.tiName.val(this.selectedItem.name);
            this.selTemplate.val(this.selectedItem.template);
            this.showPanel();
        };
        RestartKiosk.prototype.onCreateClick = function () {
            this.selectedItem = null;
            this.editHeader.text('New Kiosk');
            this.tiName.val('');
            this.showPanel();
        };
        RestartKiosk.prototype.onDataSaved = function (res) {
            var _this = this;
            console.log(res);
            this.loadData().then(function () { return _this.render(); });
        };
        RestartKiosk.prototype.save = function () {
            var _this = this;
            this.R.connector.saveData(JSON.stringify(this.kiosks), this.filename).done(function (res) { return _this.onDataSaved(res); });
        };
        RestartKiosk.prototype.collectChecked = function () {
            var out = [];
            this.view.find('table input').each(function (ind, el) {
                if ($(el).prop('checked'))
                    out.push($(el).data('id'));
            });
            return out;
        };
        RestartKiosk.prototype.onRestartClick = function () {
            var ar = this.collectChecked();
            if (ar.length === 0) {
                alert('Please select checkbox in line you want to Restart');
                return;
            }
            if (confirm('You want to Restart ' + this.getKioskNames(ar).toString() + '?')) {
                this.restartKiosks(ar);
            }
        };
        RestartKiosk.prototype.restartKiosks = function (ids) {
            var ar = this.kiosks;
            for (var i = ar.length - 1; i >= 0; i--) {
                if (ids.indexOf(ar[i].id) !== -1)
                    ar[i].status = 'restart';
            }
            this.save();
        };
        RestartKiosk.prototype.getKioskById = function (id) {
            var ar = this.kiosks;
            for (var i = 0, n = ar.length; i < n; i++)
                if (ar[i].id == id)
                    return ar[i];
            return null;
        };
        RestartKiosk.prototype.deleteKiosks = function (ids) {
            var ar = this.kiosks;
            for (var i = ar.length - 1; i >= 0; i--) {
                if (ids.indexOf(ar[i].id) !== -1)
                    ar.splice(i, 1);
            }
            this.save();
        };
        RestartKiosk.prototype.getKioskNames = function (ar) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var k = this.getKioskById(ar[i]);
                if (k)
                    out.push(k.name);
            }
            return out;
        };
        RestartKiosk.prototype.onDeleteClick = function () {
            var ar = this.collectChecked();
            if (ar.length === 0) {
                alert('Please select checkbox in line you want to delete');
                return;
            }
            if (confirm('You want to Delete ' + this.getKioskNames(ar).toString() + '?')) {
                this.deleteKiosks(ar);
            }
        };
        RestartKiosk.prototype.onAllClick = function () {
            var isOn;
            this.view.find('table input').each(function (ind, el) {
                if (ind === 0)
                    isOn = !$(el).prop('checked');
                $(el).prop('checked', isOn);
            });
        };
        RestartKiosk.prototype.createDevice = function (obj, s_time) {
            // console.log(obj);
            var timer = (obj.timer / 1000);
            timer += timer * 0.1;
            var last_server_time = obj.S_time;
            var delta = s_time - last_server_time;
            var isOK = 0;
            if (delta < timer)
                isOK = 1;
            return '<tr>' + '<td><input type="checkbox" data-id="' + obj.id + '" /> </td>' + '<td>' + obj.name + '</td>' + '<td><a target="_blank" href="' + obj.template + '?kiosk=' + obj.id + '&mode=preview" ><span class="fa fa-external-link"></span></a></td>' + '<td>' + obj.status + '</td>' + '<td>' + isOK + '</td>' + '<td>' + obj.ip + '</td>' + '<td>' + obj.ping + '</td>' + '<td class="text-right">' + new Date(obj.start_at * 1000).toLocaleString() + '</td>' + '<td class="text-right">' + new Date(obj.K_time * 1000).toLocaleString() + '</td>' + '</tr>';
        };
        return RestartKiosk;
    })();
    uplight.RestartKiosk = RestartKiosk;
    var VOKiosk = (function () {
        function VOKiosk(obj) {
            this.S_time = 0;
            this.K_time = 0;
            this.ip = '';
            this.ping = 0;
            this.start_at = 0;
            this.timer = 15000;
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOKiosk;
    })();
})(uplight || (uplight = {}));
//# sourceMappingURL=RestartKiosk.js.map