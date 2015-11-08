/**
 * Created by VladHome on 11/4/2015.
 */
    /// <reference path="../typing/jquery.d.ts" />
    /// <reference path="Registry.ts" />
    /// <reference path="search/KeyboardSimple.ts" />
module uplight{
    export class LowPanelController{
        constructor(el:HTMLElement){
            var r:Registry = Registry.getInstance();
            $('#btnSearch').click(r.events.triggerHandler(r.KIOSK_SHOW_SEARCH));
            $('#SearchView [data-id=btnClose]').click(r.events.triggerHandler(r.KIOSK_SHOW_MENU));
            $('#SearchView [data-id=btnShowMenu]').click(r.events.triggerHandler(r.KIOSK_SHOW_MENU));

        }
    }
    export class KeyboardView{
     //   static KEYBOARDVIEW_SHOW:string='KEYBOARDVIEW_SHOW';
     //   static KEYBOARDVIEW_HIDE:string='KEYBOARDVIEW_HIDE';
        private btnClose:JQuery;
        private isVisible:boolean;
        private R:Registry;
        private view:JQuery;

       constructor(el:HTMLElement){

           this.view = $(el);
           this.btnClose = this.view.find('[data-id=btnClose]:first').click(()=>this.hide());
            this.R=Registry.getInstance();
           this.R.events.on(Keyboard.KEYBOARD_SHOW,(evt)=>this.show());
           this.R.events.on(Keyboard.KEYBOARD_HIDE,(evt)=>this.hide());
           this.R.events.on(this.R.RESET_VIEWS,(evt)=>this.hide());
           this.R.events.on(this.R.HIDE_VIEWS,(evt)=>this.hide());

       }

        hide():void{
            if(this.isVisible){
                this.view.removeClass(SHOW);
                this.isVisible = false;
            }

        }
        show():void{
            this.isVisible = true;
            this.view.addClass(SHOW);
        }
    }

    export class ButtonSearch{
        private btnSearch:JQuery;
        private R:Registry;
        constructor(el:HTMLElement){
            var view:JQuery = $(el);
            this.R=Registry.getInstance();
            this.btnSearch = view.find('[data-id=btnSearch]:first').click(()=>{
                console.log('search');
               this.R.events.triggerHandler(Keyboard.KEYBOARD_SHOW);
            });

        }
    }
}