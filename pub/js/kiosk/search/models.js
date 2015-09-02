/// <reference path="../Registry.ts" />
var uplight;
(function (uplight) {
    var Model = (function () {
        function Model() {
            var _this = this;
            this.READY = 'READY';
            this.R = uplight.Registry.getInstance();
            this.dispatcher = $({});
            this.error = this.R.error;
            this.warn = this.R.warn;
            this.R.connector.getDestinations().done(function (res) { return _this.onResult(res); });
        }
        Model.prototype.getDestById = function (id) {
            return this.destInd[id];
        };
        Model.prototype.getKeywords = function () {
            return this.keywords;
        };
        Model.prototype.getCategories = function () {
            return this.cats;
        };
        Model.prototype.getDestsByCat = function (catid) {
            // trace(' getAllByType : ' + type);
            var id = 'c__' + catid;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByCat(catid, this.dests);
            return this.cache[id];
        };
        Model.prototype.getDestsByUnit = function (unit) {
            var id = 'u__' + unit;
            if (!this.cache[id])
                this.cache[id] = this._getDestsByUnit(unit.toString(), this.dests);
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
                this.cache[pattern] = this._getDestsByPattern(pattern, this.dests);
            return this.cache[pattern];
        };
        Model.prototype.refreshData = function () {
            // this.connector.getDestinations((data) => this.onDestinations(data));
            // $.post(this.service, Registry.getInstance().device,'application/json').done((data) => this.onDestinations(data));
        };
        Model.prototype.getData = function () {
            return this.dests;
        };
        Model.prototype.setData = function (data) {
            this.dests = data;
            this.cache = {};
        };
        Model.prototype.makeCats = function (ar) {
            var out = [];
            var ind = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var cat = new uplight.VOCategory(ar[i]);
                ind[cat.id] = cat;
                out.push(cat);
            }
            this.cats = out;
            this.catsInd = ind;
        };
        Model.prototype.addKeywords = function (str) {
        };
        Model.prototype.makeDests = function (ar) {
            var out = [];
            var ind = [];
            var kws = {};
            for (var i = 0, n = ar.length; i < n; i++) {
                var dest = new uplight.VODestination(ar[i]);
                ind[dest.id] = dest;
                if (dest.kws.length) {
                    dest.kws.split(',').forEach(function (el) {
                        if (!kws[el])
                            kws[el] = [];
                        kws[el].push(dest.id);
                    });
                }
                out.push(dest);
            }
            this.keywords = kws;
            this.dests = out;
            this.destInd = ind;
        };
        Model.prototype.onResult = function (res) {
            this.makeCats(res.cats);
            this.makeDests(res.dests);
            this.addIcon();
            this.dispatcher.triggerHandler(this.READY);
        };
        Model.prototype.addIcon = function () {
            var catsI = this.catsInd;
            var ar = this.dests;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                if (item.cats && item.cats.length) {
                    if (catsI[item.cats[0]])
                        item.icon = catsI[item.cats[0]].icon;
                    else
                        this.warn('cant find icon for category ' + item.cats[0] + ' ib dest: ' + item.name);
                }
            }
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
            var out = [];
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].cats.indexOf(cat) != -1)
                    out.push(data[i]);
            return out;
        };
        Model.prototype.onDestinations = function (data) {
            this.dests = data;
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