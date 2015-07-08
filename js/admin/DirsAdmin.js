/// <reference path="regA.ts" />
/// <reference path="Menu.ts" />
///<reference path="details/DetailsEditor.ts" />
///<reference path="categories/CategoriesManager.ts" />
///<reference path="categories/CategoryListing.ts" />
///<reference path="impexp/ImportExport.ts" />
///<reference path="labels/LabelsManager.ts" />
///<reference path="screen/RestartKiosk.ts" />
var uplight;
(function (uplight) {
    var Admin = (function () {
        function Admin() {
            var _this = this;
            //  $.ajaxSetup({ cache: false });
            this.R = uplight.RegA.getInstance();
            this.R.dispatcher = $({});
            this.R.connector = new uplight.Connector();
            this.R.connector.getSettings(function (resp) {
                _this.R.settings = resp;
                _this.init();
                _this.onHashChange();
                //this.R.model.dispatcher.on(this.R.model.READY,()=>this.test());
            });
            this.R.alert = function (text, cont) { return _this.myMsg(text, cont); };
            // this.R.dispatcher.on(RegA.SHOW_PREVIEW,(evt,data)=>this.showPreview(data));
            // this.R.dispatcher.on(RegA.HIDE_PREVIEW,function(){$('#preview').hide();});
            // this.R.dispatcher.on(RegA.VIEW_LISTING,()=>{
            // $('#content').empty();
            //if(!this.details) this.details = new DetailsEditor($('#content'));
            //});
            //  var close =$('<a>').addClass('fa fa-times btn-close').attr('href','#preview-close').appendTo($('#preview'));//.on(CLICK,function(){$('#preview').hide();})
        }
        Admin.prototype.createPop = function () {
            this.newindow = window.open('Preview.php', 'Kiosk Preview', 'width=560,height=980,toolbar=0,menubar=0,location=0,status=0,left=200,top=200');
            if (window.focus) {
                this.newindow.focus();
            }
        };
        Admin.prototype.closePopup = function () {
            this.newindow.close();
        };
        Admin.prototype.test = function () {
            //  $('#content').empty();
            //  this.categories = new CategoriesManager($('#content'));
            // this.categoryListing = new CategoryListing($('#content'));
            //$('#menubar').hide();
            // this.details = new DetailsEditor($('#content'));
            // this.importExport = new ImportExport($('#content'));
            //  this.labels = new LabelsManager($('#content'))
        };
        Admin.prototype.onHashChange = function () {
            var hash = window.location.hash.substr(0, 10);
            console.log(hash);
            switch (hash) {
                case '#RestartKi':
                    this.showPreview();
                    this.restartKiosks = new uplight.RestartKiosk(this.content);
                    this.restartKiosks.restart();
                    break;
                case '#Listing-V':
                    this.hidePreview();
                    this.details = new uplight.DetailsEditor(this.content);
                    this.content.show();
                    break;
                case '#Categorie':
                case '#Edit-Cate':
                    this.hidePreview();
                    this.categories = new uplight.CategoriesManager(this.content);
                    this.content.show();
                    break;
                case '#Category-':
                    this.hidePreview();
                    this.categoryListing = new uplight.CategoryListing(this.content);
                    this.content.show();
                    break;
                case '#Import-Ex':
                    this.hidePreview();
                    this.importExport = new uplight.ImportExport(this.content);
                    break;
                case '#Heading-S':
                case '#Backgroun':
                case '#Logo-Imag':
                    this.hidePreview();
                    this.labels = new uplight.LabelsManager(this.content);
                    this.content.show();
                    break;
                case '#PreviewKi':
                default:
                    this.content.hide();
                    this.showPreview();
                    break;
            }
        };
        Admin.prototype.init = function () {
            var _this = this;
            this.R.model = new uplight.DestinantionsModel();
            $(window).on('hashchange', function (evt) { return _this.onHashChange(); });
            this.menu = new uplight.Menu($('#Menu').appendTo($('#menubar')));
            this.preview = $('#Preview');
            this.isPreview = true;
            this.content = $('#content');
            this.message = $('<div>').attr('id', 'Message');
            this.messageText = $('<div>').appendTo(this.message);
        };
        Admin.prototype.myMsg = function (text, container) {
            this.messageText.text(text);
            var alert = this.message.prependTo(container);
            alert.show();
            setTimeout(function () {
                alert.hide('fast');
            }, 3000);
        };
        Admin.prototype.showPreview = function () {
            this.preview.show();
            this.isPreview = true;
            this.preview.show();
        };
        Admin.prototype.hidePreview = function () {
            if (this.isPreview) {
                this.preview.hide();
                this.isPreview = false;
            }
        };
        return Admin;
    })();
    uplight.Admin = Admin;
})(uplight || (uplight = {}));
//# sourceMappingURL=DirsAdmin.js.map