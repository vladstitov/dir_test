﻿/// <reference path="arch/Details.ts" />
/// <reference path="mainview.ts" />
/// <reference path="banner.ts" />
/// <reference path="als/ScreenSaver.ts" />
/// <reference path="infopage.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/KeyboardSimple.ts" />
/// <reference path="search/SearchResult.ts" />
/// <reference path="search/SearchModel.ts" />
/// <reference path="als/TouchClip.ts" />
/// <reference path="als/AttractLoop.ts" />
/// <reference path="als/Gallery.ts" />
/// <reference path="search/models.ts" />
/// <reference path="../typing/greensock.d.ts" />
/// <reference path="../typing/jquery.d.ts" />


/// <reference path="arch/KeyboardView.ts" />
/// <reference path="search/Keyboard.ts" />
/// <reference path="search/SearchResult.ts" />
/// <reference path="Registry.ts" />
/// <reference path="search/models.ts" />
/// <reference path="search/Categories.ts" />
/// <reference path="Connector.ts" />
/// <reference path="search/Keywords.ts" />
/// <reference path="MainMenu.ts" />
/// <reference path="utils/Relay.ts" />
/// <reference path="utils/Timeout.ts" />
/// <reference path="views.ts" />

declare var u_settings:any;

module uplight {
   export class Kiosk {



      // private searchResult: SearchResult;
       private R: Registry;
     //  private keyboard: Keyboard;
       private timeout:number
    //   private details:DetailsLarge
      // private searchInput:SearchInput;
       //private cateegories:Categories;
    //   private mainMenu:PagesMenu;
       private attractLoop:AttractLoop;
       //keywords:Keywords;

     //  private infoPage:InfoPagesModel;

       private onMouseDown(evt:MouseEvent):void{
          if(this.attractLoop.hide()) window.location.href='#kiosk';

           if(this.isBlocked){
               evt.preventDefault();
               evt.stopPropagation();
               evt.stopImmediatePropagation();
           }else{
               setTimeout(()=>this.unblock(),500);
               this.isBlocked = true;
           }
       }

       showSearch():void{
           $('#toolsview').animate({scrollTop:'365'});
           this.showSearchResult();
       }
       showMenu():void{
           $('#toolsview').animate({scrollTop:'0'});
       }


       showSearchResult():void{
           $('#mainport').animate({scrollLeft:0});
       }
       showPages():void{
           $('#mainport').animate({scrollLeft:725});
       }
      // onMenuClick(item:any):void{
           // this.showPages();
      // }
       errors:string='';
       error(str:string):void{
           this.errors+=str+"\n";
       }
       warns:string='';
       warn(str:string):void{
           this.warns+=str+"\n";
       }

       constructor() {
           console.log('kiodk');
           document.addEventListener('mousedown',(evt)=>this.onMouseDown(evt),true);
           var r:Registry = Registry.getInstance();
           r.connector = new Connector();
           r.connector.id=u_settings.kiosk;
           r.connector.who='kiosk';
           r.model = new Model(r.connector,(w)=>this.warn(w));
           u_settings.props.forEach(function(val){
               u_settings[val.id] = val.value;
           })
           r.settings = u_settings;

           r.events = $({});



           this.setControllers();
           this.R=r;
          //this.keyboard = new Keyboard();
           var si = new SearchInput($('#searchinput'));
           var kw = new Keywords($('#kw-container'));
         //  var cats= new Categories();
           ///var btnSearch:ButtonSearch = new ButtonSearch($('[data-ctr=ButtonSearch]:first'));
         //  var kbv:KeyboardView = new KeyboardView($('[data-ctr=KeyboardView]:first'));

          // var pm = new PagesMenu($('[data-ctr=PagesMenu]:first'));
          // pm.onSelect = (item)=>this.onMenuClick(item);

          // var mm:MainMenu = new MainMenu($('[data-ctr=MainMenu]:first'));

           //this.infoPage = new InfoPagesModel($('[data-id=Pages]:first'));

           this.R.events.on(this.R.KIOSK_SHOW_MENU,()=>this.showMenu());
           this.R.events.on(this.R.KIOSK_SHOW_SEARCH,()=>this.showSearch());

           this.R.events.on(Keyboard.KEYBOARD_SHOW,()=>this.showSearchResult());

           this.R.events.on(InfoPagesModel.PAGE_SELECED,(evt,page)=>{
               this.R.events.triggerHandler(Keyboard.KEYBOARD_HIDE);
               this.showPages();

           })
           this.R.events.on(Categories.CATEGORY_SELECTED,(evt,cat)=>{
               this.showSearchResult();
           })

           var timeout:Timeout = new Timeout(u_settings.ss_timeout);
           timeout.onTimeout=(num)=>{
               console.log('timeout '+num);
               window.location.href='#timeout'
           }

           r.events.on(DetailsLarge.DETAILS_LARGE_CLOSE_CLICK,(evt)=>{
               r.events.triggerHandler(DetailsLarge.DETAILS_LARGE_HIDE);
           });


          // $('#btnSearch').click(()=>this.showSearch());
          // $('#SearchView [data-id=btnClose]').click(()=>this.showMenu())
          // $('#SearchView [data-id=btnShowMenu]').click(()=>this.showMenu())


        // this.searchResult = new SearchResult($('#SearchResult'));
           r.events.on( SearchResult.SEARCH_RESULT_SELECT,(evt,id)=>{
               var dest:VODestination = this.R.model.getDestById(id);
               if(dest.imgs)r.events.triggerHandler(DetailsLarge.DETAILS_LARGE_SHOW,id)// this.details.setDestination(dest).render().show();
               else r.events.triggerHandler( SearchResult.SEARCH_RESULT_SHOW_DESTINATION,id)//this.searchResult.showDestination(dest);
               console.log(dest);
           })
/*

           this.searchResult.onSelect = (id)=>{

           }
*/
           if(!u_settings.hasOwnProperty('norelay'))  var relay:Relay = new Relay(u_settings.timer);
            r.events.on(r.SS_START,function(){r.events.triggerHandler(r.RESET_ALL)});


           this.attractLoop = new AttractLoop($('#AttractLoop'),u_settings.attract_loop);
           this.attractLoop.show();
          // setTimeout(()=>{ DestModel.events.triggerHandler(DestModel.DETAILS_LARGE,document.location.hash.split('/')[1]),2000});
          // Registry.getInstance().connector.Log('kiosk started succesguly');
         // Registry.getInstance().connector.Error('kiosk started succesguly');

       }
       setControllers():void{
           var stringToFunction = function(str) {
               var arr = str.split(".");
               var fn = (window || this);
               for (var i = 0, len = arr.length; i < len; i++) fn = fn[arr[i]];
               if (typeof fn !== "function")   fn=null;
               return  fn;
           };

           var r:Registry= Registry.getInstance();

           $('[data-ctr]').each(function(ind,el){
               var str=$(el).data('ctr');
               var MyClass = stringToFunction(str);
               if(MyClass) {
                   r.register(str,MyClass);
                   var cl= new MyClass(el);
               } else console.warn(' class '+str+' not loaded');

               //console.log(el);
           })
       }


       private prevHash;
       private isBlocked: boolean;

       private unblock(): void {
           this.isBlocked = false;
       }

       private onHachChange(): void {
           var h:string = document.location.hash;
           if (this.isBlocked) {
               document.location.hash = h;
               return;
           }
           this.prevHash = h;
           this.isBlocked = true;
           setTimeout(() => this.unblock(), 500);
           
           var hash: string[] = h.split('/');
           switch (hash[0]) {
               case '#category':
                 //  this.keyboardView.hideKeyboard();
                  // var cat: VOItem = this.menu.getCategoryById(Number(hash[1]));
                  // this.maiView.showView(this.searchResult.getListByCategory(cat));
                   break;
               case '#dest':

                 //  this.dest.showDest(Number(hash[1]));
                 //  this.keyboardView.hideKeyboard();
                 //  this.maiView.showView(this.details.getDetailsById(Number(hash[1])));
                   break;
               case'#ScreenSaver':
                   window.location.reload();
                   /*
                   this.details.reset();
                   this.searchResult.reset();
                   this.keyboard.reset();
                   this.cateegories.reset();
                   this.keywords.reset();
                   */

                   break

           }
       }

    }


}

$(document).ready(()=>{
   var k = new uplight.Kiosk();
});