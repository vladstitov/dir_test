/**
 * Created by VladHome on 6/7/2015.
 */

 /// <reference path="regA.ts" />
/// <reference path="../typing/jquery.d.ts" />
module uplight{

    export class Menu{
        R:RegA;
        btnOn:JQuery;
        constructor(public view:JQuery){
            this.R = RegA.getInstance();
           if(view.length) this.init(view);
            this.btnOn=$('#menu-on').hide();
            this.R.dispatcher.on(RegA.SHOW_MENU,()=>{this.open();})
        }

        private init(view:JQuery){

            this.view.find('[data-id=btnMenu]:first').on(CLICK,()=>{
                this.toggle();
            })

        }

        toggle():void{
            if(this.view.hasClass('opened'))this.colapse();
            else this.open();
        }
        colapse(){
            //this.btnOn.show();
           this.view.removeClass('opened');
            this.view.children('section').hide('fast');
        }

        open(){
            //this.btnOn.hide();
            this.view.addClass('opened');
            this.view.children('section').show('fast');
        }

    }
}