/// <reference path="regA.ts" />



module uplight {

    export class Admin {
        private R: RegA;
        private details:DetailsEditor;
        private categories:CategoriesManager;
        private categoryListing:CategoryListing;
        private importExport:ImportExport;
        private restartKiosks:RestartKiosk;
        private labels:LabelsManager;
        private settingsEdit:SettingsEdit;
        private statistics:Statistics;
        private attractLoop:AttractLoopEdit;
        private infoPages:InfoPagesManager;


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
                    case '#RestartKi':
                       // this.showPreview();

                        this.content.hide();
                        this.content.empty();
                        this.restartKiosks = new RestartKiosk(this.content);
                        this.content.show();
                       // this.restartKiosks.restart();

                        break;
                    case '#Listing-V':

                        this.details = new DetailsEditor(this.content);
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
            this.R.model = new DestinantionsModel();
            $(window).on('hashchange', (evt) => this.onHashChange());
            this.menu = new AdminMenu($('#Navigation'));

            this.preview=$('#Preview');
            this.isPreview=true;

            this.content=$('#content');
            this.message =$('<div>').attr('id','Message');
            this.messageText = $('<div>').appendTo(this.message);
            this.btnFullView = this.preview.find('[data-id=btnFullView]').click(()=>{window.open(this. previewUrl, "_blank");})



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
                this.init();
                this.onHashChange();
                //this.R.vo.dispatcher.on(this.R.vo.READY,()=>this.test());
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



         // this.R.dispatcher.on(RegA.SHOW_PREVIEW,(evt,data)=>this.showPreview(data));
         // this.R.dispatcher.on(RegA.HIDE_PREVIEW,function(){$('#preview').hide();});
         // this.R.dispatcher.on(RegA.VIEW_LISTING,()=>{
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
