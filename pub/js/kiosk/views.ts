/**
 * Created by VladHome on 11/4/2015.
 */
    /// <reference path="../typing/jquery.d.ts" />
    /// <reference path="Registry.ts" />
module uplight{
    export class KeyboardView{
        private btnClose:JQuery;
        private isVisible:boolean;
        private R:Registry;
       constructor(private view:JQuery){
           this.btnClose = view.find('[data-id=btnClose]:first').click(()=>this.hide());
            this.R=Registry.getInstance();
           this.R.dispatcher.on(this.R.SHOW_KEYBOARD,(evt)=>this.show());
           this.R.dispatcher.on(this.R.RESET_VIEWS,(evt)=>this.hide());
           this.R.dispatcher.on(this.R.HIDE_VIEWS,(evt)=>this.hide());

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
        constructor(private view:JQuery){
            this.R=Registry.getInstance();
            this.btnSearch = view.find('[data-id=btnSearch]:first').click(()=>{
                console.log('search');
               this.R.dispatcher.triggerHandler(this.R.SHOW_KEYBOARD);
            });

        }
    }
}