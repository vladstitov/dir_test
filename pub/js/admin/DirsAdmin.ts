﻿/// <reference path="regA.ts" />

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



module uplight {
    export class Admin {
        private R: RegA;
        private listing:DestinationsController;
        private categories:CategoriesManager;
        private categoryListing:CategoryListing;
        private importExport:ImportExport;
       // private restartKiosks:DevicesStats;
        private labels:LabelsManager;
        private settingsEdit:SettingsEdit;
        private statistics:Statistics;
        private attractLoop:AttractLoopEdit;
        private infoPages:InfoPagesManager;
        private frontPageEditor:FrontPageEditor;
        private navigatiom:Navigation;


        private menu:AdminMenu;
        private newindow:Window;
        private preview:JQuery;
        private content:JQuery;

       createPop() {
        this.newindow = window.open('Preview.php','Kiosk Preview','width=560,height=980,toolbar=0,menubar=0,location=0,status=0,left=200,top=200');
        if (window.focus) {this.newindow.focus()}
        }

        closePopup(){
            this.newindow.close();
        }


        private onHashChange(){
            var hash:string= window.location.hash.substr(0,10);
            console.log(hash);
         //  if(hash!=='#PreviewKi') this.hidePreview();
            this.hideKiosk();
            this.hideModile();
                switch (hash){
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
                        this.attractLoop = new AttractLoopEdit(this.content);
                        this.content.show();
                        // this.restartKiosks.restart();

                        break;

                    case '#Statistic':
                        // this.showPreview();

                       // this.content.hide();
                        this.statistics = new Statistics(this.content);
                        this.content.show();
                        // this.restartKiosks.restart();

                        break;
                    case '#Info-Page':
                        // this.showPreview();

                        // this.content.hide();
                        this.infoPages = new InfoPagesManager(this.content);
                        this.content.show();
                        // this.restartKiosks.restart();

                        break;
                    case '#Front-Pag':
                       if(!this.frontPageEditor) this.frontPageEditor = new FrontPageEditor(this.content);
                        else{
                           this.content.children().detach();
                           this.frontPageEditor.appendTo(this.content);
                       }

                        this.content.show();
                        // this.restartKiosks.restart();

                        break;
                    case '#Listing-V':

                        this.listing = new DestinationsController(this.content);
                        this.content.show();
                        break;
                    case '#Categorie':
                    case '#Edit-Cate':

                        this.categories = new CategoriesManager(this.content);
                        this.content.show();
                        break
                    case '#Category-':

                        this.categoryListing = new CategoryListing(this.content);
                        this.content.show();
                        break;
                    case '#Import-Ex':

                        this.importExport = new ImportExport(this.content);
                        break;
                    case '#Settings-':
                        this.settingsEdit = new SettingsEdit(this.content);
                        this.content.show();
                        break;
                    case '#Heading-S':
                    case '#Backgroun':
                    case '#Logo-Imag':

                        this.labels = new LabelsManager(this.content);
                        this.content.show();
                        break;
                    case '#PreviewKi':
                    default :

                        break

                }
        }

        isPreview:boolean;
        btnFullView:JQuery;
        message:JQuery;
        messageText:JQuery;
        private init(): void {
            this.navigatiom = new Navigation($('#AdminNav'));
            this.R.confirm = new Confirm($('#Confirm'));
            this.R.model = new DestinantionsModel();
            this.R.model.dispatcher.on(this.R.model.CHANGE,()=>{
                this.R.model.dispatcher.off(this.R.model.CHANGE);
                this.onHashChange();
            });
            $(window).on('hashchange', (evt) => this.onHashChange());
          //  this.menu = new AdminMenu($('#Navigation'));

            this.preview=$('#Preview');
            this.isPreview=true;

            this.content=$('#content');
            this.message =$('<div>').attr('id','Message');
            this.messageText = $('<div>').appendTo(this.message);
            this.btnFullView = this.preview.find('[data-id=btnFullView]').click(()=>{window.open(this. previewUrl, "_blank");})

            $('#btnRestartKiosks').click(()=>{
               this.R.confirm.show('Restart Kiosks','You want to restart kiosks?',()=>{
                  this.R.connector.restartKiosks().done((res:VOResult)=>{
                      console.log(res);
                      if(res.success=='success'){
                          this.R.msg('Restarting kiosks',$('#btnRestartKiosks'));
                      }else this.R.msg('Server Error',$('#btnRestartKiosks'));

                  }).fail(()=>{ alert('Communication error')});
               })
            })

            if(window.location.hash=='') window.location.hash='#Statistic';

        }

        private logout():void{
            this.R.connector.logout().done((res)=>{
                window.location.reload();
                console.log(res);
                });
        }
        constructor() {
            //  $.ajaxSetup({ cache: false });
            this.R = RegA.getInstance();
            this.R.dispatcher=$({});
            this.R.connector = new Connector();
            this.R.connector.getData('settings.json').done((resp) => {
                this.R.settings = JSON.parse(resp);
                this.R.props = _.indexBy(this.R.settings.props,'id');
                this.init();
                //this.R.vo.events.on(this.R.vo.READY,()=>this.test());
            });

            var btnLogout =  $('#btnLogout').click(()=>{
                if( btnLogout.hasClass('disabled')) return;
                this.logout();
                btnLogout.addClass('disabled');
                setTimeout(()=>{
                    btnLogout.removeClass('disabled');
                },3000);

            });
            this.R.msg=(text,cont)=>this.myMsg(text,cont);



         // this.R.events.on(RegA.SHOW_PREVIEW,(evt,data)=>this.showPreview(data));
         // this.R.events.on(RegA.HIDE_PREVIEW,function(){$('#preview').hide();});
         // this.R.events.on(RegA.VIEW_LISTING,()=>{
             // $('#content').empty();
                //if(!this.details) this.details = new DetailsEditor($('#content'));


          //});



          //  var close =$('<a>').addClass('fa fa-times btn-close').attr('href','#preview-close').appendTo($('#preview'));//.on(CLICK,function(){$('#preview').hide();})


        }


        myMsg(text:string,DO:JQuery){

           var msg =  $('<div>').addClass('umsg').css(DO.offset()).text(text).appendTo('body');
            msg.hide();
            msg.show('fast');
                   setTimeout(function(){
                        msg.hide('fast',function(){
                            msg.remove();
                        })
                        },3000);
        }


        /*            Preview                */
        private previewUrl:string ='Kiosk1080.php?id=0';
        private mobileUrl:string ='KioskMobile.php';
        private showKiosk():void{
            $('#AdminPreviewKiosk').removeClass(HIDDEN);
            $('#AdminPreviewKiosk iframe:first').attr('src',this.previewUrl);
            this.isPreview=true;
        }
        private hideKiosk():void{
            if(this.isPreview){
                $('#AdminPreviewKiosk').addClass(HIDDEN);
                $('#AdminPreviewKiosk iframe:first').attr('src','');
                this.isPreview=false;
            }
        }

        /*         Mobile  preview     */
        isMobile:boolean;
        private showMobile(url?:string):void{
            this.isMobile = true;
            $('#AdminPreviewMobile').removeClass(HIDDEN);
            $('#AdminPreviewMobile iframe').attr('src',this.mobileUrl);
        }
        private hideModile():void{
            if( this.isMobile){
                $('#AdminPreviewMobile').addClass(HIDDEN);
                $('#AdminPreviewMobile iframe').attr('src','');
                this.isMobile = false;
            }
        }


    }

}
