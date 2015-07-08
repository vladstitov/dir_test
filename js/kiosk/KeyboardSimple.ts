/**
 * Created by VladHome on 6/9/2015.
 */
    /// <reference path="Registry.ts" />
module uplight{
    export class Keyboard {
        private keys:JQuery;
        view:JQuery
        private alphabet:string = '1,2,3,4,5,6,7,8,9,0,Q,W,E,R,T,Y,U,I,O,P,A,S,D,F,G,H,J,K,L,&nbsp;,Z,X,C,V,SPACE,B,N,M';
        R:Registry
        constructor(view:JQuery) {
            this.view = view;
            this.R=Registry.getInstance();
           // if(set && set.keyboard) this.initSettings(set.keyboard);
            this.keys = $('<div>');
            this.keys.html(this.parseKeys(this.alphabet.split(','))).appendTo(this.view);
            this.keys.on(CLICK,'.kb-key',(evt)=>{this.onKeyClick($(evt.currentTarget))})

            this.R.dispatcher.on(this.R.ON_SETTINGS,(evt,data:any)=>{

                //console.log(data);
                //this.alphabet= data.keyboard.keys;
                //this.keys.html(this.parseKeys(this.alphabet.split(',')))
            })
        }

        private onKeyClick(el):void{
            var txt = el.text().toLowerCase();
            if(txt=='\u00A0'){
                txt='del';
            }else if(txt=='space'){
                txt=' ';
            }
            this.R.dispatcher.triggerHandler(this.R.KEY_PRESSED,txt);
        }
        private parseKeys(ar: string[]):string{
            var out: string = '<div class="row1">';
            for (var i = 0, n = ar.length; i < n; i++) {
                if(i===10)out+='</div><div class="row2">';
                if(i===20) out+='</div><div class="row3">'
                if(i===30) out+='</div><div class="row4">'
                out += this.itemRenderer(ar[i]);
            }
            return out+'</div>';
        }
        private itemRenderer(item: string): string {
            var cl = 'Plastic031';
            if(item=='SPACE') cl+=' space';
            if(item == '&nbsp;')cl+=' back fa fa-caret-square-o-left';
            return '<div class="kb-key '+cl+'"><span>' + item + '</span></div>';
        }
    }

    export class SearchInput{
        view:JQuery
        input:JQuery;
        data:string;
        R:Registry
        constructor(view:JQuery){
            this.view=view;
            this.data='';
            this.input = this.view.find('input');
            this.R=Registry.getInstance();
            this.R.dispatcher.on(this.R.KEY_PRESSED,(evt,txt)=>{this.onKeyPressed(txt)});
            this.R.dispatcher.on(this.R.KEYWORD_PRESSED,(evt,txt)=>{this.setText(txt)});
        }

        private onKeyPressed(txt:string):void{
            if(this.data.length==0) this.data=txt.toUpperCase();
            else if(txt=='del'){
                if(this.data.length>1) this.data = this.data.substr(0,this.data.length-1);
                else this.data='';
            }else  this.data+=txt;
            this.input.val(this.data)
            this.input.focus();
            this.R.dispatcher.triggerHandler(this.R.SEARCH_CANGED,this.data);
        }

        private setText(txt):void{
            this.data=txt;
            this.input.val(this.data);
        }
    }

    export class Keywords{
        view:JQuery;
        list:JQuery;
        data:string[];
        R:Registry;
        constructor(view:JQuery){
            this.R = Registry.getInstance();
            this.view=view;
            this.list = view.find('ul');
            this.list.on(CLICK,'li',(evt)=>{this.onClick(evt.currentTarget)});
        }
        private onClick(e:HTMLElement):void{
            var el=$(e);
            var i:number = el.data('i');
            var val = this.data[i];
            if(val.length>1)this.R.dispatcher.triggerHandler(this.R.KEYWORD_PRESSED,val);

        }

        renderItem(item,i):string{
            return '<li data-i="'+i+'">'+item+'</li>';
        }

        setData(ar:string[]):void{
            this.data=ar;
            var out='';
            for(var i=0,n=ar.length;i<n;i++){
                out+=this.renderItem(ar[i],i);
            }
            this.list.html(out);

        }
    }

}