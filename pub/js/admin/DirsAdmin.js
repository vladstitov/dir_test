/// <reference path="regA.ts" />
/// <reference path="net.ts" />
/// <reference path="models.ts" />
/// <reference path="../typing/jquery.d.ts" />
/// <reference path="../typing/underscore.d.ts" />
/// <reference path="com/GalleryAdmin.ts" />
/// <reference path="com/Utils.ts" />
///<reference path="info/InfoPagesEditor.ts" />
///<reference path="info/FrontPageEditor.ts" />
/// <reference path="views/Menu.ts" />
/// <reference path="views/Navigation.ts" />
///<reference path="destinations/DestinationsController.ts" />
///<reference path="categories/CategoriesManager.ts" />
///<reference path="categories/CategoryListing.ts" />
///<reference path="etc/ImportExport.ts" />
///<reference path="etc/Statistics.ts" />
///<reference path="screen/LabelsManager.ts" />
///<reference path="screen/SettingsEdit.ts" />
///<reference path="screen/AttractLoopEdit.ts" />
var uplight;
(function (uplight) {
    var Admin = (function () {
        function Admin() {
            var _this = this;
            /*            Preview                */
            this.previewUrl = 'Kiosk1080.php?id=0';
            this.mobileUrl = 'KioskMobile.php';
            //  $.ajaxSetup({ cache: false });
            this.R = uplight.RegA.getInstance();
            this.R.dispatcher = $({});
            this.R.connector = new uplight.Connector();
            this.R.connector.getData('settings.json').done(function (resp) {
                _this.R.settings = JSON.parse(resp);
                _this.init();
                //this.R.vo.dispatcher.on(this.R.vo.READY,()=>this.test());
            });
            var btnLogout = $('#btnLogout').click(function () {
                if (btnLogout.hasClass('disabled'))
                    return;
                _this.logout();
                btnLogout.addClass('disabled');
                setTimeout(function () {
                    btnLogout.removeClass('disabled');
                }, 3000);
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
        Admin.prototype.onHashChange = function () {
            var hash = window.location.hash.substr(0, 10);
            console.log(hash);
            //  if(hash!=='#PreviewKi') this.hidePreview();
            this.hideKiosk();
            this.hideModile();
            switch (hash) {
                case '#PreviewKi':
                    this.content.hide();
                    this.showKiosk();
                    break;
                case '#PreviewMo':
                    this.content.hide();
                    this.showMobile();
                    break;
                case '#Attract-L':
                    // this.showPreview();
                    // this.content.hide();
                    this.attractLoop = new uplight.AttractLoopEdit(this.content);
                    this.content.show();
                    break;
                case '#Statistic':
                    // this.showPreview();
                    // this.content.hide();
                    this.statistics = new uplight.Statistics(this.content);
                    this.content.show();
                    break;
                case '#Info-Page':
                    // this.showPreview();
                    // this.content.hide();
                    this.infoPages = new uplight.InfoPagesManager(this.content);
                    this.content.show();
                    break;
                case '#Front-Pag':
                    if (!this.frontPageEditor)
                        this.frontPageEditor = new uplight.FrontPageEditor(this.content);
                    else {
                        this.content.children().detach();
                        this.frontPageEditor.appendTo(this.content);
                    }
                    this.content.show();
                    break;
                case '#Listing-V':
                    this.listing = new uplight.DestinationsController(this.content);
                    this.content.show();
                    break;
                case '#Categorie':
                case '#Edit-Cate':
                    this.categories = new uplight.CategoriesManager(this.content);
                    this.content.show();
                    break;
                case '#Category-':
                    this.categoryListing = new uplight.CategoryListing(this.content);
                    this.content.show();
                    break;
                case '#Import-Ex':
                    this.importExport = new uplight.ImportExport(this.content);
                    break;
                case '#Settings-':
                    this.settingsEdit = new uplight.SettingsEdit(this.content);
                    this.content.show();
                    break;
                case '#Heading-S':
                case '#Backgroun':
                case '#Logo-Imag':
                    this.labels = new uplight.LabelsManager(this.content);
                    this.content.show();
                    break;
                case '#PreviewKi':
                default:
                    break;
            }
        };
        Admin.prototype.init = function () {
            var _this = this;
            this.navigatiom = new uplight.Navigation($('#AdminNav'));
            this.R.confirm = new uplight.Confirm($('#Confirm'));
            this.R.model = new uplight.DestinantionsModel();
            this.R.model.dispatcher.on(this.R.model.CHANGE, function () {
                _this.R.model.dispatcher.off(_this.R.model.CHANGE);
                _this.onHashChange();
            });
            $(window).on('hashchange', function (evt) { return _this.onHashChange(); });
            //  this.menu = new AdminMenu($('#Navigation'));
            this.preview = $('#Preview');
            this.isPreview = true;
            this.content = $('#content');
            this.message = $('<div>').attr('id', 'Message');
            this.messageText = $('<div>').appendTo(this.message);
            this.btnFullView = this.preview.find('[data-id=btnFullView]').click(function () {
                window.open(_this.previewUrl, "_blank");
            });
            $('#btnRestartKiosks').click(function () {
                _this.R.confirm.show('Restart Kiosks', 'You want to restart kiosks?', function () {
                    _this.R.connector.restartKiosks().done(function (res) {
                        console.log(res);
                        if (res.success == 'success') {
                            _this.R.msg('Restarting kiosks', $('#btnRestartKiosks'));
                        }
                        else
                            _this.R.msg('Server Error', $('#btnRestartKiosks'));
                    }).fail(function () {
                        alert('Communication error');
                    });
                });
            });
            window.location.hash = '#Statistic';
        };
        Admin.prototype.logout = function () {
            this.R.connector.logout().done(function (res) {
                window.location.reload();
                console.log(res);
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
        Admin.prototype.showKiosk = function () {
            $('#AdminPreviewKiosk').removeClass(HIDDEN);
            $('#AdminPreviewKiosk iframe:first').attr('src', this.previewUrl);
            this.isPreview = true;
        };
        Admin.prototype.hideKiosk = function () {
            if (this.isPreview) {
                $('#AdminPreviewKiosk').addClass(HIDDEN);
                $('#AdminPreviewKiosk iframe:first').attr('src', '');
                this.isPreview = false;
            }
        };
        Admin.prototype.showMobile = function (url) {
            this.isMobile = true;
            $('#AdminPreviewMobile').removeClass(HIDDEN);
            $('#AdminPreviewMobile iframe').attr('src', this.mobileUrl);
        };
        Admin.prototype.hideModile = function () {
            if (this.isMobile) {
                $('#AdminPreviewMobile').addClass(HIDDEN);
                $('#AdminPreviewMobile iframe').attr('src', '');
                this.isMobile = false;
            }
        };
        return Admin;
    })();
    uplight.Admin = Admin;
})(uplight || (uplight = {}));
//# sourceMappingURL=DirsAdmin.js.map