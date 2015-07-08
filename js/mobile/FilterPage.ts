/// <reference path="../kiosk/registry.ts" />


module mobile {
    export class FilterPage {

        private list: JQuery;
        view: JQuery;
        input: JQuery;

               
        resetView(): JQuery {
            this.input.val('');           
            this.list.html('<p class="bgwhite">Start typing in input field on top of page. Results will come as soon as you are typing</p>'); 
           
            return this.view;      
        }

        constructor(id: string, private model: uplight.DestinantionsModel) {
            this.view = $(id);
            this.input = $(id+' input:first'); 
            this.input.on('input', (evt) => this.onInput(evt));                   
            this.list = $(id + ' [data-id=list]');
            this.cache = { ' ': 'Please type in feild' };
                        
        }
        getHeader(): JQuery {
            return this.input;
        }
        private onInputFocus(evt): void {
            this.input.val('');
        }
        private cache: any;
        private onInput(evt: JQueryEventObject): void {
            var str: string = this.input.val();
           
            if (str.length == 0) this.list.html('Please type in feild ');
            else {
                if (!this.cache[str]) this.cache[str] = this.renderList(str);
                this.list.html(this.cache[str]);
            }                
        }

        private renderList(str: string): string {
            var ar: uplight.VODestination[] = this.model.getDestsByPattern(str);
            var out: string = '';
            if (ar.length == 0) out = '<p class="bgwhite">  Sorry not results for text <b>'+str+'</b></p>';
           
            for (var i = 0, n = ar.length; i < n; i++) out += this._renderItem(ar[i]);
                return out;
        }

        _renderItem(item: uplight.VODestination): string {
            var cl: string='"';
            if (item.advanced) cl = ' more-data"  href="#Details/'+item.destid+'"';
            else if ((item.email.length + item.phone.length + item.website.length) >20 ) cl= ' more-data" href="#Details/'+item.destid+'"';
            var prf:string=cl.length==1?'':'+ ';
            return '<a  class="ubutton' + cl +'> <span class="left">'+prf + item.name + '</span><span class="right">' + item.unit + '</span></a>';

        }

    }

}