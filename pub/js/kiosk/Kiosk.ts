/// <reference path="arch/Details.ts" />
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
       private R: Registry;
       private keyboard: Keyboard;
       private timeout:number


       private onMouseDown(evt:MouseEvent):void{

           if(this.isBlocked){
               evt.preventDefault();
               evt.stopPropagation();
               evt.stopImmediatePropagation();
           }else{
               setTimeout(()=>this.unblock(),500);
               this.isBlocked = true;
           }
       }

       constructor() {

           document.addEventListener('mousedown',(evt)=>this.onMouseDown(evt),true);
           var r:Registry = Registry.getInstance();
           r.connector = new Connector();
           r.connector.id=kiosk_id;
           r.connector.who='kiosk';
           r.model = new Model();
           r.settings = u_settings;
           r.dispatcher = $({});

           this.R=r;
          this.keyboard = new Keyboard();
           var si = new SearchInput($('#searchinput'));
           var kw = new Keywords($('#kw-container'));
           var cats= new Categories();

         this.searchResult = new SearchResult();
           var relay:Relay = new Relay(u_settings.timer);
            r.dispatcher.on(r.SS_START,function(){r.dispatcher.triggerHandler(r.RESET_ALL)});

          // Registry.getInstance().connector.Log('kiosk started succesguly');
         // Registry.getInstance().connector.Error('kiosk started succesguly');

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

           }
       }

    }

    export class Relay{
        constructor(delay:number){
            if(isNaN(delay) || delay<2) delay = 2;
            this.timer =(new Date()).getTime();
            setInterval(()=>this.relay(),delay*1000);
        }

        private stamp:number=0;
        private ping:number=0;
        private timer:number

        private relay():void{
            var that=this;
            var now=(new Date()).getTime();
            var timer=now- this.timer;
            this.timer=now;
            Registry.getInstance().connector.relay(kiosk_id,this.stamp,Math.round(now/1000),this.ping,timer,Registry.status).done(function(res:string){
                that.ping=(new Date()).getTime()-now;
                var vo:VOResult
                try{
                    vo = JSON.parse(res)
                }catch(e){
                    console.warn('relay doesnt work '+ res);
                    return;
                }

                switch(vo.success){
                    case 'reload':
                        window.location.reload();
                        break;
                    case 'load':
                        window.location.href=vo.result;
                        break;
                    case 'stamp':
                        that.stamp = Number(vo.result);
                        break;
                }


            })
        }
    }
    
}

$(document).ready(()=>{
    var k = new uplight.Kiosk();


});