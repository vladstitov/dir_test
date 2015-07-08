/// <reference path="Registry.ts" />
/// <reference path="../typing/jquery.d.ts" />
var uplight;
(function (uplight) {
    var Model = (function () {
        function Model() {
            var _this = this;
            this.R = uplight.Registry.getInstance();
            this.R.dispatcher.on(this.R.ON_DATA, function (evt, data) { return _this.setData(data); });
            //setTimeout(() => this.refreshData(), 20);
        }
        Model.prototype.getDestById = function (destid) {
            if (!this._dataid[destid])
                this._dataid[destid] = this._getDestById(destid, this._data);
            return this._dataid[destid];
        };
        Model.prototype.getDestsByCat = function (catid) {
            // trace(' getAllByType : ' + type);
            var id = 'c__' + catid;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByCat(catid, this._data);
            return this.cache[id];
        };
        Model.prototype.getDestsByUnit = function (unit) {
            var id = 'u__' + unit;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByUnit(unit.toString(), this._data);
            return this.cache[id];
        };
        Model.prototype.getDestsByPatternAndCat = function (cat, pattern) {
            var id = cat + '__' + pattern;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByPattern(pattern, this.getDestsByCat(cat));
            return this.cache[id];
        };
        Model.prototype.getDestsByUnitAndCat = function (cat, unit) {
            var id = cat + '_u_' + unit;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByUnit(unit.toString(), this.getDestsByCat(cat));
            return this.cache[id];
        };
        Model.prototype.getDestsByPattern = function (pattern) {
            if (!this.cache[pattern])
                this.cache[pattern] = this._getDestsByPattern(pattern, this._data);
            return this.cache[pattern];
        };
        Model.prototype.refreshData = function () {
            // this.connector.getDestinations((data) => this.onDestinations(data));
            // $.post(this.service, Registry.getInstance().device,'application/json').done((data) => this.onDestinations(data));
        };
        Model.prototype.getData = function () {
            return this._data;
        };
        Model.prototype.setData = function (data) {
            this.data = data;
            this.cache = {};
        };
        Model.prototype._getDestById = function (destid, data) {
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].id == destid)
                    return data[i];
            return null;
        };
        Model.prototype._getDestsByUnit = function (unit, data) {
            var out = [];
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].unit.indexOf(unit) != -1)
                    out.push(data[i]);
            return out;
        };
        Model.prototype._getDestsByPattern = function (pattern, data) {
            pattern = ' ' + pattern.toLowerCase();
            var out = [];
            for (var i = 0, n = data.length; i < n; i++) {
                var patt = ' ' + data[i].name.toLowerCase() + ' ' + data[i].unit;
                if (patt.indexOf(pattern) != -1)
                    out.push(data[i]);
            }
            return out;
        };
        Model.prototype._getDestsByCat = function (cat, data) {
            if (cat == 0)
                return data;
            var c = cat + ',';
            var out = [];
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].cats.indexOf(c) != -1)
                    out.push(data[i]);
            return out;
        };
        Model.prototype.onDestinations = function (data) {
            this._data = data;
            this.cache = {};
            this._dataid = {};
            if (this.onReady)
                this.onReady();
        };
        Model.prototype.pushKeywords = function (ar, obj) {
            for (var i = 0, n = ar.length; i < n; i++)
                obj[ar[i]] = true;
        };
        return Model;
    })();
    uplight.Model = Model;
})(uplight || (uplight = {}));
//# sourceMappingURL=models.js.map