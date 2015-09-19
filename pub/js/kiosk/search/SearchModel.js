/**
 * Created by VladHome on 7/18/2015.
 */
/// <reference path="../Registry.ts" />
/// <reference path="DetailsLarge.ts" />
var uplight;
(function (uplight) {
    var ButtonView = (function () {
        // getViewStr(reset:boolean):string{
        //   return this.viewStr;
        //}
        function ButtonView(model) {
            this.model = model;
            //this.viewStr = '<li class="item Plastic031" data-id="'+model.id+'" data-more="'+model.haveMore+'">'+this.renderVoStr(model.vo,model.haveMore)+'</li>';
            this.$view = $('<li>').addClass('item Plastic031').data('id', model.id).append(this.renderVo(model.vo, model.haveMore));
            this.$kw = this.$view.find('.kws:first');
        }
        ButtonView.prototype.show = function () {
            this.$view.show();
        };
        ButtonView.prototype.hide = function () {
            this.$view.hide();
        };
        ButtonView.prototype.getView = function (reset) {
            return this.$view;
        };
        ButtonView.prototype.showDetails = function () {
            if (!this.$btnMore) {
                this.$btnMore = this.$view.find('.more:first');
                this.details = this.createDetails(this.model.vo);
                this.$view.append(this.details);
            }
            this.details.show('fast');
            this.$btnMore.text('Less...');
        };
        ButtonView.prototype.hideDetails = function () {
            this.details.hide('fast');
            this.$btnMore.text('More...');
        };
        ButtonView.prototype.showKW = function (str) {
            this.$kw.text(str);
        };
        ButtonView.prototype.resetKW = function () {
            this.$kw.text('');
        };
        ButtonView.prototype.createDetails = function (vo) {
            var ar = vo.more.split("\n");
            var out = '<div class="more" ><table class="table">';
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i].split('\t');
                out += '<tr><td>' + (item[0] || '&nbsp;') + '</td><td>' + (item[1] || '&nbsp;') + '</td></tr>';
            }
            out += '</table></div>';
            if (vo.tmb)
                out += '<div class="tmb"><img src="' + vo.tmb + '" /></div>';
            return $('<div>').addClass('details').html(out);
        };
        ButtonView.prototype.renderVoStr = function (vo, ismore) {
            var more = ismore ? '<a class="btn"><span class="fa fa-plus"></span><span class="more"> More... </span></a>' : '';
            var icon = '<span class="icon ' + vo.icon + '"></span>';
            var name = '<span class="name">' + vo.name + '</span>';
            var unit = '<span class="unit">' + vo.unit + '</span>';
            var utype = '<span class="unittype">unit</span>';
            var kws = '<span class="kws">' + '</span>';
            var info = '<span class="info">' + vo.info + '</span>';
            var row1 = '<div class="urow">' + kws + utype + '</div>';
            var row2 = '<div class="urow">' + icon + name + unit + '</div>';
            var row3 = '<div class="urow">' + more + info + '</div>';
            return '<div class="main" >' + row1 + row2 + row3 + '</div>';
        };
        ButtonView.prototype.renderVo = function (vo, ismore) {
            return $('<div>').addClass('main').html(this.renderVoStr(vo, ismore));
        };
        return ButtonView;
    })();
    uplight.ButtonView = ButtonView;
    var DestModel = (function () {
        function DestModel(vo) {
            this.vo = vo;
            this.byCat = true;
            // kw:JQuery;
            this.cache = {};
            this.id = vo.id;
            if (vo.more || vo.tmb || vo.imgs || vo.pgs)
                this.haveMore = true;
            this.view = new ButtonView(this);
            this.name = ' ' + vo.name.toLowerCase();
            this.unit = ' ' + vo.unit.toLowerCase();
            this.kws = ',' + vo.kws;
        }
        DestModel.prototype.addDetails = function (el) {
            if (el.children('.details').length === 0) {
                el.append(this.view.createDetails(this.vo));
                el.children('.details').show('fast');
            }
        };
        DestModel.prototype.getView = function (reset) {
            return this.view.getView(reset);
        };
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
            //this.show();
        };
        DestModel.prototype.togleDetails = function () {
            if (this.haveMore) {
                if (this.isDetails)
                    this.hideDetails();
                else
                    this.showDetails();
                return this.isDetails;
            }
            return false;
        };
        DestModel.prototype.showDetails = function () {
            if (!this.isDetails) {
                this.view.showDetails();
                this.isDetails = true;
            }
        };
        DestModel.prototype.hideDetails = function () {
            if (this.isDetails) {
                this.isDetails = false;
                this.view.hideDetails();
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
            console.log(this.vo.name + '  showKeyword  ' + str);
            this.view.showKW(str);
            this.iskw = 1;
        };
        DestModel.prototype.clearKeyword = function () {
            if (this.iskw) {
                this.view.resetKW();
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
            if (this.byCat)
                this.show();
            else
                this.hide();
        };
        DestModel.dispatcher = $({});
        DestModel.DETAILS_LARGE = 'DETAILS_LARGE';
        return DestModel;
    })();
    uplight.DestModel = DestModel;
})(uplight || (uplight = {}));
//# sourceMappingURL=SearchModel.js.map