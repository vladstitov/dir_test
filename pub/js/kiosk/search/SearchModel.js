/**
 * Created by VladHome on 7/18/2015.
 */
/// <reference path="../Registry.ts" />
/// <reference path="SearchDetailsLarge.ts" />
var uplight;
(function (uplight) {
    var DestModel = (function () {
        function DestModel(vo) {
            this.vo = vo;
            this.byCat = true;
            this.byPat = true;
            this.cache = {};
            this.haveMore = 0;
            var more = vo.more.split('\n');
            var img = '';
            if (more.length !== 1 || (vo.tmb && vo.tmb.length)) {
                var det = new uplight.SearchDetails($('<div>').addClass('details'));
                if (more.length !== 1)
                    det.createTable(more);
                if (vo.tmb && vo.tmb.length)
                    img = det.createImage(vo.tmb);
                this.details = det;
                this.haveMore = 1;
            }
            var det2 = new uplight.SearchDetailsLarge(vo);
            if (det2.haveData)
                this.detailsLarge = det2.setDetailsSmall(det);
            this.id = vo.id;
            this.view = $('<li>').addClass(img + ' item Plastic031').attr('data-id', vo.id).append(this.renderVo(vo, this.haveMore));
            this.name = ' ' + vo.name.toLowerCase();
            this.unit = ' ' + vo.unit.toLowerCase();
            this.kws = ',' + vo.kws;
            this.kw = this.view.find('.kws:first');
            if (this.detailsLarge) {
            }
            else if (this.haveMore == 1) {
                this.view.append(det.view);
            }
            // console.log(vo.more);
            // this.view.on(CLICK,()=>this.onClick())
        }
        DestModel.prototype.show = function () {
            if (this.isHiiden) {
                this.isHiiden = false;
                this.view.show();
            }
        };
        DestModel.prototype.hide = function () {
            if (!this.isHiiden) {
                this.isHiiden = true;
                this.view.hide();
            }
        };
        DestModel.prototype.reset = function () {
            this.hideDetails();
            this.clearKeyword();
            this.show();
        };
        DestModel.prototype.togleDetails = function () {
            if (this.detailsLarge) {
                return this.detailsLarge.getView();
            }
            if (!this.details)
                return null;
            if (this.isDetails) {
                this.isDetails = false;
                this.details.view.hide('fast');
                this.btnMore.html('<span class="fa fa-plus"></span> More...');
            }
            else {
                if (!this.btnMore) {
                    this.btnMore = this.view.find('.more:first');
                }
                this.isDetails = true;
                this.details.view.show('fast');
                this.btnMore.html('<span class="fa fa-minus"></span> Less...');
            }
            return null;
        };
        DestModel.prototype.hideDetails = function () {
            if (this.isDetails) {
                this.isDetails = false;
                this.details.view.hide();
                this.btnMore.html('<span class="fa fa-plus"></span> More...');
            }
        };
        DestModel.prototype.tryName = function (pat) {
            var out = 0;
            var ind = this.name.indexOf(pat);
            if (ind === 0)
                out = 1;
            else if (ind !== -1)
                out = 2;
            return out;
        };
        DestModel.prototype.tryUnit = function (pat) {
            var out = 0;
            var ind = this.unit.indexOf(pat);
            if (ind == 0)
                out = 1;
            else if (ind !== -1)
                out = 2;
            return out;
        };
        DestModel.prototype.tryKw = function (pat) {
            var out;
            var kws = this.kws;
            if (this.kws.indexOf(pat) !== -1) {
                var ind = kws.indexOf(pat);
                var end = kws.indexOf(',', ind + 1);
                if (end === -1)
                    out = kws.substr(ind + 1);
                else
                    out = this.kws.substring(ind + 1, end);
            }
            return out;
        };
        DestModel.prototype.filterStr = function (pat) {
            if (this.iskw)
                this.clearKeyword();
            var out = 0;
            if (isNaN(Number(pat))) {
                out = this.tryName(' ' + pat);
                if (out === 0)
                    out = this.tryUnit(' ' + pat);
            }
            else {
                out = this.tryUnit(' ' + pat);
                if (out === 0)
                    out = this.tryName(' ' + pat);
            }
            if (out === 0) {
                var kw = this.tryKw(',' + pat);
                if (kw) {
                    this.showKeyword(kw);
                    out = 3;
                }
            }
            this.ind = out;
            return out;
        };
        DestModel.prototype.showKeyword = function (str) {
            // console.log('showKeyword  '   + str);
            this.kw.text(str);
            this.iskw = 1;
        };
        DestModel.prototype.clearKeyword = function () {
            if (this.iskw) {
                this.kw.text('');
                this.iskw = 0;
            }
        };
        DestModel.prototype.setCats = function (cats) {
            this.cats = ar;
            var ar = this.vo.cats;
            if (!ar) {
                this.byCat = false;
                return this;
            }
            var dif = ar.filter(function (n) {
                return cats.indexOf(n) != -1;
            });
            if (dif.length === 0)
                this.byCat = false;
            else
                this.byCat = true;
            return this;
        };
        DestModel.prototype.render = function () {
            if (this.byCat && this.byPat)
                this.show();
            else
                this.hide();
        };
        DestModel.prototype.getView = function (reset) {
            if (reset)
                this.reset();
            return this.view;
        };
        DestModel.prototype.renderVo = function (vo, ismore) {
            var more = ismore ? '<span class="more"><span class="fa fa-plus"> More...</span></span>' : '';
            var icon = '<span class="icon ' + vo.icon + '"></span>';
            var name = '<span class="name">' + vo.name + '</span>';
            var unit = '<span class="unit">' + vo.unit + '</span>';
            var utype = '<span class="unittype">unit</span>';
            var kws = '<span class="kws">' + '</span>';
            var info = '<span class="info">' + vo.info + '</span>';
            var row1 = '<div class="urow">' + kws + utype + '</div>';
            var row2 = '<div class="urow">' + icon + name + unit + '</div>';
            var row3 = '<div class="urow">' + more + info + '</div>';
            return $('<div>').addClass('main').html(row1 + row2 + row3);
        };
        return DestModel;
    })();
    uplight.DestModel = DestModel;
})(uplight || (uplight = {}));
//# sourceMappingURL=SearchModel.js.map