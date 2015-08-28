/**
 * Created by VladHome on 7/16/2015.
 */
    /// <reference path="Registry.ts" />
module uplight{
    export class SearchDetails{

        private data:VODestination;

        private more:JQuery
        private tmb:JQuery;
        constructor(public view:JQuery){
            this.more=$('<div>').addClass('more').appendTo(view);
            this.tmb =  $('<div>').addClass('tmb').appendTo(view);
        }

        createTable(ar:string[]):void{
                var out:string='<table class="table">';

                        for(var i=0,n=ar.length;i<n;i++){
                            var item = ar[i].split('\t');
                            out+='<tr><td>'+(item[0]||'&nbsp;')+'</td><td>'+(item[1]||'&nbsp;')+'</td></tr>';
                        }

            out+'</table>';
            this.more.html(out);
        }
        createImage(tmb:string):string {
            this.tmb.html('<img src="'+ tmb+'" />');
            return 'img';
        }
    }
}