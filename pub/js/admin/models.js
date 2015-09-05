/// <reference path="RegA.ts" />
var uplight;
(function (uplight) {
    var DestinantionsModel = (function () {
        function DestinantionsModel() {
            this.dispatcher = $({});
            this.CHANGE = 'CAHBE';
            this.CATEGORIES_CAHANGE = 'CATEGORIES_CAHANGE';
            this.R = uplight.RegA.getInstance();
            this.refreshData();
        }
        DestinantionsModel.prototype.deleteDestination = function (dest, callBack) {
            var _this = this;
            this.R.connector.deleteDestination(dest.id).done(function (res) {
                _this.refreshData();
                callBack(res);
            });
        };
        DestinantionsModel.prototype.saveDestination = function (callBack, vo, pages) {
            var _this = this;
            if (pages && !vo.uid)
                vo.uid = 'a_' + vo.id;
            var p1 = this.R.connector.saveDestination(vo).done(function (res) {
                _this.refreshData();
            });
            var p2;
            if (pages) {
                if (!vo.uid)
                    vo.uid = 'a_' + vo.id;
                p2 = this.R.connector.savePage('pages/p' + vo.uid + '.htm', pages);
                $.when(p1, p2).then(function (v1, v2) {
                    // console.log('both');
                    //console.log(v1,v2);
                    var res = v1[0];
                    callBack(res);
                });
            }
            else
                p1.then(function (res) {
                    callBack(res);
                });
        };
        DestinantionsModel.prototype.saveCategoryListing = function (catid, ids, callBack) {
            var _this = this;
            this.R.connector.saveCatDests(catid, ids).done(function (res) {
                callBack(res);
                _this.refreshData();
            });
        };
        DestinantionsModel.prototype.deleteCatChanges = function () {
            this.catChanges = {};
        };
        /*
                getAllByType(type: string): VODestination[]{
                   // trace(' getAllByType : ' + type);
                    if (!this.searches['type_' + type]) this.searches['type_' + type]=this._getAllByType(type);
                    return this.searches['type_' + type];
                }
                */
        DestinantionsModel.prototype._getDestById = function (destid) {
            var data = this._data;
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].id == destid)
                    return data[i];
            return null;
        };
        DestinantionsModel.prototype.getDestById = function (destid) {
            if (!this.cacheDests[destid])
                this.cacheDests[destid] = this._getDestById(destid);
            return this.cacheDests[destid];
        };
        // getDestInfo(callBack: Function, destid: number): void {
        //  R.connector.getDestInfo(callBack, destid); 
        // }
        ///////////////////
        //getDestinationsByUnitAndCat(unit: string, catid: number): VODestination[]{
        // console.log('unit ' + unit + ' catid: ' + catid);
        // var id: string = 'c' + catid+'u' + unit;
        // if (!this.cacheSearches[id]) this.cacheSearches[id] = this._getDestinationsByUnit(unit, this.getAllByCat(catid));
        //  return this.cacheSearches[id]
        // }
        DestinantionsModel.prototype._getDestinationsByUnit = function (unit, data) {
            if (unit == '')
                return data;
            var out = [];
            for (var i = 0, n = data.length; i < n; i++)
                if (data[i].unit.indexOf(unit) != -1)
                    out.push(data[i]);
            // console.log(' _getDestinationsByUnit: ' + unit+' total: ' + out.length);
            return out;
        };
        ////////////////////
        // getDestinantionsByPatternAndCat(pattern: string, catid: number): VODestination[]{
        //   var id: string = 'c' + catid+ pattern;
        //if (!this.cacheSearches[id]) this.cacheSearches[id] = this._getDestinantionsByPattern(pattern, this.getAllByCat(catid));
        //return this.cacheSearches[id];
        //}
        DestinantionsModel.prototype.getDestinantionsByNumber = function (num) {
            var pat1 = num.toString();
            var ar = this.getData();
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                if (item.name.indexOf(pat1) !== -1 || item.unit.indexOf(pat1) !== -1 || item.id.toString().indexOf(pat1) !== -1)
                    out.push(item);
            }
            return out;
        };
        DestinantionsModel.prototype.getDestinantionsByPattern = function (pattern) {
            if (pattern.length == 0)
                return this.getData();
            pattern = pattern.toLowerCase();
            var out;
            if (isNaN(pattern)) {
                var pat2 = ' ' + pattern;
                var out1 = [];
                var out2 = [];
                var out3 = [];
                var ar = this.getData();
                for (var i = 0, n = ar.length; i < n; i++) {
                    var name = ar[i].name.toLowerCase();
                    if (name.indexOf(pattern) === 0)
                        out1.push(ar[i]);
                    else if (name.indexOf(pat2) != -1)
                        out2.push(ar[i]);
                    else {
                        var unit = ar[i].unit.toLowerCase();
                        if (unit.indexOf(pattern) === 0 || unit.indexOf(pat2) !== -1)
                            out1.push(ar[i]);
                        else {
                            var all = ' ' + ar[i].info + ' ' + ar[i].uid; //+' '+ar[i].meta;
                            if (all.indexOf(pat2) !== -1)
                                out3.push(ar[i]);
                        }
                    }
                }
                out = out1.concat(out2, out3);
            }
            else
                out = this.getDestinantionsByNumber(Number(pattern));
            return out;
        };
        /////////////////////////////////////////////
        DestinantionsModel.prototype.getData = function () {
            return this._data;
        };
        DestinantionsModel.prototype.getUnassigned = function () {
            var out = [];
            var ar = this.getData();
            for (var i = 0, n = ar.length; i < n; i++)
                if (ar[i].cats.length === 0)
                    out.push(ar[i]);
            return out;
        };
        DestinantionsModel.prototype.getDestinationsInCategory = function (id) {
            var ar = this.getData();
            var yes = [];
            var not = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].cats.indexOf(id) === -1)
                    not.push(ar[i]);
                else
                    yes.push(ar[i]);
            }
            this.notInCategory = not;
            this.inCategory = yes;
            return yes;
        };
        DestinantionsModel.prototype.getDestinationsNotInCategory = function () {
            return this.notInCategory;
        };
        DestinantionsModel.prototype.removeDestinatinsFromCategory = function (catid, destids) {
            // VODestination[]
        };
        DestinantionsModel.prototype.getCategoryById = function (id) {
            return this.catsIndexed[id];
        };
        DestinantionsModel.prototype.refreshData = function () {
            console.log('DestinantionsModel refresh');
            this.cache = {};
            var p1 = this.R.connector.getCategories();
            var p2 = this.R.connector.getDestinations();
            var self = this;
            $.when(p1, p2).then(function (v1, v2) {
                //  console.log(v1[0],v2[0]);
                var res = v1[0];
                var catInd = self.setCategories(res);
                var dests = v2[0];
                self.setDestinations(dests);
                self.mapCategories();
                self.dispatcher.triggerHandler(self.CATEGORIES_CAHANGE, res);
                self.dispatcher.triggerHandler(self.CHANGE);
                return;
                var convert = function (ar, cats, destid) {
                    var out = [];
                    for (var i = 0, n = ar.length; i < n; i++) {
                        var cat = cats[ar[i]];
                        if (cat) {
                            if (!cat.dests)
                                cat.dests = [];
                            out.push(cat.label);
                            cat.dests.push(destid);
                        }
                        else
                            console.warn('no category ' + ar[i]);
                    }
                    return out;
                };
                var ar = dests;
                //  console.log(ar);
                var destInd = [];
                for (var i = 0, n = ar.length; i < n; i++) {
                    var item = ar[i];
                    destInd[item.id] = item;
                    if (item.imgs)
                        item.imgs = item.imgs.split(',');
                    if (item.cats == 0)
                        item.cats = 0;
                    if (!item.cats)
                        continue;
                    item.cats = item.cats.split(',').map(Number);
                    item.categories = convert(item.cats, catInd, item.id);
                }
                self.setData(dests);
            });
        };
        DestinantionsModel.prototype.setDestinations = function (res) {
            var out = [];
            for (var i = 0, n = res.length; i < n; i++) {
                var dest = new uplight.VODestination(res[i]);
                out.push(dest);
            }
            this.setData(out);
        };
        DestinantionsModel.prototype.mapCategories = function () {
            var catInd = this.catsIndexed;
            // console.log(catInd);
            var convert = function (ar, cats, destid) {
                var out = [];
                for (var i = 0, n = ar.length; i < n; i++) {
                    var cat = cats[ar[i]];
                    if (cat) {
                        out.push(cat.label);
                        cat.dests.push(destid);
                    }
                    else {
                        ar.splice(i++, 1);
                    }
                }
                return out;
            };
            var ar = this.getData();
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.categories = convert(item.cats, catInd, item.id);
            }
        };
        /////////////////////////////CATEGORIES//////////////////////////////////
        DestinantionsModel.prototype.saveCategory = function (vo, callBack) {
            var that = this;
            this.R.connector.saveCategory(vo).done(function (res) {
                that.setCategories(res);
                that.mapCategories();
                callBack({ success: true });
                that.dispatcher.triggerHandler(that.CATEGORIES_CAHANGE, res);
            });
        };
        DestinantionsModel.prototype.setCategories = function (ar) {
            var cats = [];
            var catInd = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var cat = new uplight.VOCategory(ar[i]);
                cats.push(cat);
                catInd[cat.id] = cat;
            }
            this.categories = cats;
            this.catsIndexed = catInd;
            return catInd;
        };
        DestinantionsModel.prototype.getCategories = function () {
            return this.categories;
        };
        DestinantionsModel.prototype.deleteCategory = function (cat, callBack) {
            var _this = this;
            this.R.connector.deleteCategory(cat.id).done(function (res) {
                _this.refreshData();
                callBack(res);
            });
        };
        DestinantionsModel.prototype.setData = function (data) {
            this._data = data;
        };
        DestinantionsModel.prototype.eraseCache = function () {
            this.cacheDests = {};
            this.catChanges = {};
        };
        DestinantionsModel.prototype.addDestination = function (data) {
            this.eraseCache();
            this._data.push(data);
            // if (this.onChange) this.onChange();
        };
        return DestinantionsModel;
    })();
    uplight.DestinantionsModel = DestinantionsModel;
})(uplight || (uplight = {}));
//# sourceMappingURL=models.js.map