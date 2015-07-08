/// <reference path="regA.ts" />
/// <reference path="Menu.ts" />
///<reference path="details/DetailsEditor.ts" />
///<reference path="categories/CategoriesManager.ts" />
///<reference path="categories/CategoryListing.ts" />
///<reference path="impexp/ImportExport.ts" />
///<reference path="labels/LabelsManager.ts" />
///<reference path="screen/RestartKiosk.ts" />


module uplight {

    export class Admin {
        private R: RegA;
        private details:DetailsEditor;
        private categories:CategoriesManager;
        private categoryListing:CategoryListing;
        private importExport:ImportExport
        private restartKiosks:RestartKiosk
        private labels:LabelsManager;
        private menu:Menu;
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
        test(){
          //  $('#content').empty();
       //  this.categories = new CategoriesManager($('#content'));
        // this.categoryListing = new CategoryListing($('#content'));
            //$('#menubar').hide();

         // this.details = new DetailsEditor($('#content'));
          // this.importExport = new ImportExport($('#content'));
          //  this.labels = new LabelsManager($('#content'))
        }

        private onHashChange(){

            var hash:string= window.location.hash.substr(0,10);
            console.log(hash);
         //  if(hash!=='#PreviewKi') this.hidePreview();

                switch (hash){

                    case '#RestartKi':
                        this.showPreview();
                        this.restartKiosks = new RestartKiosk(this.content);
                        this.restartKiosks.restart();

                        break;
                    case '#Listing-V':
                        this.hidePreview();
                        this.details = new DetailsEditor(this.content);
                        this.content.show();
                        break;
                    case '#Categorie':
                    case '#Edit-Cate':
                        this.hidePreview();
                        this.categories = new CategoriesManager(this.content);
                        this.content.show();
                        break
                    case '#Category-':
                        this.hidePreview();
                        this.categoryListing = new CategoryListing(this.content);
                        this.content.show();
                        break;
                    case '#Import-Ex':
                        this.hidePreview();
                        this.importExport = new ImportExport(this.content);
                        break;
                    case '#Heading-S':
                    case '#Backgroun':
                    case '#Logo-Imag':
                        this.hidePreview();
                        this.labels = new LabelsManager(this.content);
                        this.content.show();
                        break;
                    case '#PreviewKi':
                    default :
                        this.content.hide();
                        this.showPreview();
                        break

                }
        }

        isPreview:boolean
        message:JQuery
        messageText:JQuery;
        private init(): void {
            this.R.model = new DestinantionsModel();
            $(window).on('hashchange', (evt) => this.onHashChange());
            this.menu = new Menu($('#Menu').appendTo($('#menubar')));

            this.preview=$('#Preview');
            this.isPreview=true;

            this.content=$('#content');
            this.message =$('<div>').attr('id','Message');
            this.messageText = $('<div>').appendTo(this.message);
        }

        constructor() {
            //  $.ajaxSetup({ cache: false });
            this.R = RegA.getInstance();
            this.R.dispatcher=$({});
            this.R.connector = new Connector();
            this.R.connector.getSettings((resp) => {
                this.R.settings = resp;
                this.init();
                this.onHashChange();
                //this.R.model.dispatcher.on(this.R.model.READY,()=>this.test());
            });

            this.R.alert=(text,cont)=>this.myMsg(text,cont);



         // this.R.dispatcher.on(RegA.SHOW_PREVIEW,(evt,data)=>this.showPreview(data));
         // this.R.dispatcher.on(RegA.HIDE_PREVIEW,function(){$('#preview').hide();});
         // this.R.dispatcher.on(RegA.VIEW_LISTING,()=>{
             // $('#content').empty();
                //if(!this.details) this.details = new DetailsEditor($('#content'));


          //});



          //  var close =$('<a>').addClass('fa fa-times btn-close').attr('href','#preview-close').appendTo($('#preview'));//.on(CLICK,function(){$('#preview').hide();})


        }


        myMsg(text:string,container:JQuery){

            this.messageText.text(text);

                 var alert =  this.message.prependTo(container);
                alert.show();
                    setTimeout(function(){  alert.hide('fast');  },3000);
        }



        private showPreview():void{
            this.preview.show();
            this.isPreview=true;
           this.preview.show();
        }
        hidePreview():void{
            if(this.isPreview){
                this.preview.hide();
                this.isPreview=false;
            }
        }


    }

}
