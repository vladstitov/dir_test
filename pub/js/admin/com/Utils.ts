/**
 * Created by VladHome on 10/8/2015.
 */
    /// <reference path="../../typing/jquery.d.ts" />
    declare var CLICK:string
module uplight{
    export class BreadCrumbs{
        private list:JQuery;
        onCiick:Function;
        private selected:JQuery

        private hash:string;
        constructor(private view:JQuery,private home:string){

            this.list=$('<ul>').addClass('breadcrumb').appendTo(view);
           this.list.on(CLICK,'li',(evt)=>this.onListClick(evt));
        }

        addCrumb(url:string,text:string){
           if(this.selected)this.selected.removeClass('active');
           // this.selected =$('<li>').addClass('active').data('id',url).append($('<a>').attr('href',this.home+'/'+url).text(text)).appendTo(this.list);
            this.selected =$('<li>').addClass('active').data('id',url).text(text).appendTo(this.list);

        }
        clear():void{
            this.selected=null
            this.list.html('');
        }
        removeLast():void{
            this.list.children().last().detach();
            this.selected = this.list.children().last().addClass('active');
        }
        private onListClick(evt:JQueryEventObject):void{
            var el:JQuery = $(evt.currentTarget);
            if(this.onCiick)this.onCiick(el.data('id'));
        }
    }
}