/// <reference path="regA.ts" />
/// <reference path="Menu.ts" />
///<reference path="details/DetailsEditor.ts" />
///<reference path="categories/CategoriesManager.ts" />
///<reference path="categories/CategoryListing.ts" />
///<reference path="impexp/ImportExport.ts" />
///<reference path="impexp/Statistics.ts" />
///<reference path="labels/LabelsManager.ts" />
///<reference path="screen/RestartKiosk.ts" />
///<reference path="screen/SettingsEdit.ts" />
///<reference path="screen/AttractLoopEdit.ts" />
var uplight;
(function (uplight) {
    var Admin = (function () {
        function Admin() {
            var _this = this;
            this.previewUrl = 'Kiosk1080.php?id=0';
            //  $.ajaxSetup({ cache: false });
            this.R = uplight.RegA.getInstance();
            this.R.dispatcher = $({});
            this.R.connector = new uplight.Connector();
            this.R.connector.getData('settings.json').done(function (resp) {
                _this.R.settings = resp;
                _this.init();
                _this.onHashChange();
                //this.R.vo.dispatcher.on(this.R.vo.READY,()=>this.test());
            });
            this.R.msg = function (text, cont) { return _this.myMsg(text, cont); };
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
                case '#Attract-L':
                    // this.showPreview();
                    this.hidePreview();
                    // this.content.hide();
                    this.attractLoop = new uplight.AttractLoopEdit(this.content);
                    this.content.show();
                    break;
                case '#Statistic':
                    // this.showPreview();
                    this.hidePreview();
                    // this.content.hide();
                    this.statistics = new uplight.Statistics(this.content);
                    this.content.show();
                    break;
                case '#RestartKi':
                    // this.showPreview();
                    this.hidePreview();
                    this.content.hide();
                    this.content.empty();
                    this.restartKiosks = new uplight.RestartKiosk(this.content);
                    this.content.show();
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
                case '#Settings-':
                    this.hidePreview();
                    this.settingsEdit = new uplight.SettingsEdit(this.content);
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
            this.btnFullView = this.preview.find('[data-id=btnFullView]').click(function () {
                window.open(_this.previewUrl, "_blank");
            });
        };
        Admin.prototype.myMsg = function (text, DO) {
            var msg = $('<div>').addClass('umsg').css(DO.offset()).text(text).appendTo('body');
            msg.hide();
            msg.show('fast');
            setTimeout(function () {
                msg.hide('fast', function () {
                    msg.remove();
                });
            }, 3000);
        };
        Admin.prototype.showPreview = function (url) {
            if (url)
                this.previewUrl = url;
            this.preview.find('iframe:first').attr('src', this.previewUrl);
            this.preview.show();
            this.isPreview = true;
            this.preview.show();
        };
        Admin.prototype.hidePreview = function () {
            if (this.isPreview) {
                this.preview.find('iframe:first').attr('src', '');
                this.preview.hide();
                this.isPreview = false;
            }
        };
        return Admin;
    })();
    uplight.Admin = Admin;
})(uplight || (uplight = {}));
//# sourceMappingURL=DirsAdmin.js.map