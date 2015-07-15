﻿/// <reference path="arch/Details.ts" />
/// <reference path="mainview.ts" />
/// <reference path="banner.ts" />
/// <reference path="screensaver.ts" />
/// <reference path="infopage.ts" />

/// <reference path="arch/KeyboardView.ts" />
/// <reference path="keyboard.ts" />
/// <reference path="searchresult.ts" />
/// <reference path="Registry.ts" />
/// <reference path="models.ts" />
/// <reference path="Categories.ts" />
/// <reference path="Connector.ts" />
/// <reference path="keywords.ts" />
declare var u_settings:any;
declare var kiosk_id:number;

module uplight {
   export class Kiosk {     
       private searchResult: SearchResult;
       private R: uplight.Registry;
       private btnBack: JQuery;
       private keyboard: Keyboard;
       private keyboardView: kiosk.KeyboardView;
       private details: Details;
      // private viewPort: ViewPort;
       private screenSaver: ScreenSaver;
      // private viewPort1: kiosk.ViewPort1;

       private maiView: MainView;

       private home: string = '#category=2';
       private infoPage:InfoPage

       private data: any;


       constructor() {
           Registry.getInstance().connector = new Connector();
           Registry.getInstance().model = new Model();
           Registry.getInstance().settings = u_settings;
           Registry.getInstance().dispatcher = $({});

           var kb = new Keyboard($('#Keyboard'));
           var si = new SearchInput($('#searchinput'));
           var kw = new Keywords($('#kw-container'));
           var cats= new Categories($('#Categories'));

         var sr:SearchResult = new SearchResult($('#the-list'));

           var delay:number = u_settings.timer;
           if(isNaN(delay) || delay<2000) delay =2000;

           setInterval(()=>this.relay(),delay);







           /*
           this.R = uplight.Registry.getInstance();         
           var conn: Connector = new uplight.Connector();                 
           //this.R.connector = conn;
           
           this.R.settings=settings                    
          
           var w: number = 700;
           var h: number = 700;
           this.menu = new Menu($('#Menu'), 500, 350,conn);  
           this.maiView = new MainView('#MainView', w, h);


           var mod: DestinantionsModel = new DestinantionsModel(conn);
           mod.onReady = () => {
               $(window).on('hashchange', (evt) => this.onHachChange());
               document.location.hash=this.home;
           };
           this.R.modelDests = mod
                  
           this.searchResult = new SearchResult(mod);
           this.details = new Details(mod, conn);
           this.infoPage = new InfoPage(conn);

           var banner: Banner = new Banner();
          
           this.keyboard = new Keyboard();
           this.keyboard.onKeyboardTyping = (patt: string) => this.onKeyboardTyping(patt);

           this.keyboardView = new kiosk.KeyboardView('#KeyboardView');
           this.screenSaver = new ScreenSaver(conn);

         */
           
       }

       private stamp:number=0;
       private let:number=0;
       private timer:number=(new Date()).getTime();
       private relay():void{
           var that=this;
           var now=(new Date()).getTime();
           var timer=now- this.timer;
           this.timer=now;

           Registry.getInstance().connector.relay(kiosk_id,this.stamp,Math.round(now/1000),this.let,timer).done(function(res:VOResult){

               that.let=(new Date()).getTime()-now;

               switch(res.success){
                   case 'reload':
                       window.location.reload();
                       break;
                   case 'stamp':
                       that.stamp = Number(res.result);
                       break;
               }


           })
       }
       private prevHash;
       private isBlocked: boolean;
       private unblock(): void {
           this.isBlocked = false;
       }
       private onHachChange(): void {           
           if (this.isBlocked) {
               document.location.hash = this.prevHash;
               return;
           }
           this.prevHash = document.location.hash;
           this.isBlocked = true;
           setTimeout(() => this.unblock(), 500);
           
           var hash: string[] = this.prevHash.split('='); 
           switch (hash[0]) {
               case '#category':
                 //  this.keyboardView.hideKeyboard();
                  // var cat: VOItem = this.menu.getCategoryById(Number(hash[1]));
                  // this.maiView.showView(this.searchResult.getListByCategory(cat));
                   break;
               case '#destid': 
                 //  this.keyboardView.hideKeyboard();
                 //  this.maiView.showView(this.details.getDetailsById(Number(hash[1])));
                   break;
               case '#screensaver':
                   if (hash[1] == 'start') setTimeout(() => {
                       this.resetScreen();
                      // document.location.hash = this.home;

                   }, 1000);                           
                   break;
               case '#page':
                   this.keyboardView.hideKeyboard();
                 //  var page: VOItem = this.menu.getPageById(Number(hash[1]));
                 //  this.maiView.showView(this.infoPage.getPage(page));
                   break;
              // case '#search':
                  // this.keyboard.reset();
                  // this.keyboardView.showKeyboard();

                //   break;
              // case '#kb-close':
               //    this.keyboardView.hideKeyboard();
                //   break;
               case '#back':
                   this.maiView.showHistory();
                   break;

           }




       }      
      

       private resetScreen(): void { 
          console.log('reset Screen')
          // this.keyboardView.hideKeyboard();
           //this.keyboard.reset();
         //  this.menu.reset();
           //this.maiView.reset();

       }
       private onKeyboardTyping(patt: string): void {

           //var el: JQuery = this.searchResult.getListByPattern(patt);
           //this.maiView.showView(el);

       }          

    }
    
}

$(document).ready(()=>{
    var k = new uplight.Kiosk();


});