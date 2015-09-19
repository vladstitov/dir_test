/// <reference path="../kiosk/registry.ts" />


module uplight {
    export class FilterPage {

        private list: JQuery;
       // view: JQuery;
        input: JQuery;
        private catid:number;
        private catTitle:JQuery;
        private tiFilter:JQuery;
        private details:JQuery
        data:uplight.VODestination[];
        resetView(): JQuery {
            this.input.val('');
            this.list.html('<p class="bgwhite">Start typing in input field on top of page. Results will come as soon as you are typing</p>');
            return this.view;
        }

        showDefault():void{
            this.data = this.model.getData();
            this.renderList();
            this.input.val('');

            this.tiFilter.show();
            this.catTitle.text('');
            this.doAll();
            this.show();
            this.input.focus();

        }

        private current:number
        private selected:JQuery;

        showDestination(vo:VODestination,table:string):void{
            if(this.selected) this.selected.removeClass(SELECTED);
            this.list.children()
            this.current=vo.id;
           var out:string='';
            out+=vo.info;
            out+=table;
            if(vo.tmb)out+='<div class="tmb"></div><img src="'+vo.tmb+'"/></div>';
            this.details.html(out).show('fast');

            this.isDetails = true;
           this.selected =  this.list.children('[data-id='+vo.id+']:first').addClass(SELECTED).append(this.details);
           // window.location.hash='details-small/'+vo.id;
        }

        showCategory(num:number):void{
           this.tiFilter.hide();

            var cat:uplight.VOCategory = this.model.getCategoryById(num);
            console.log(cat);
            this.catTitle.text(cat.label);

           this.data = this.model.getDestsByCat(num);
            this.catid=num;
            this.renderList();
            this.show();
        }


        isHidden:boolean;
        show():void{
            if(this.isHidden){
                this.isHidden = false;
                this.view.show('fast');
                this.input.focus();
            }
        }

        hide():void{
            if(!this.isHidden){

                this.isHidden = true;
                this.view.hide('fast');
            }
        }

        isDetails:boolean;
        constructor(private view:JQuery, private model: uplight.Model) {
            this.input = view.find('[data-id=filter]');
            this.input.on('input', (evt) => this.onInput(evt));                   
            this.list = view.find('[data-id=list]');
            this.list.on(CLICK,'.selected',()=>{
               if(this.isDetails){
                   this.details.hide('fast');
                   this.isDetails=false;
               }else{
                   this.details.show('fast');
                   this.isDetails=true
               }

            })

            this.cache = { ' ': 'Please type in feild' };
            this.tiFilter= view.find('[data-id=tiFilter]:first');
            this.catTitle= view.find('[data-id=catTitle]:first');
            view.find('[data-id=btnClear]:first').click(()=>{
                this.input.val('');
                this.doAll();
            })

            this.details = $('<div>').addClass('details');
        }
        getHeader(): JQuery {
            return this.input;
        }
        private onInputFocus(evt): void {
            this.input.val('');
        }
        private cache: any;

        private doAll():void{
            this.data = this.model.getData();
            this.renderList();
        }
        private onInput(evt: JQueryEventObject): void {
               setTimeout(()=>this.doFilter(),200);
        }


        private doFilter():void{
            var str: string = this.input.val();

            if (str.length == 0) {
                this.doAll();
            }
            else {
                this.data = this.model.getDestsByPattern(str);
                if (this.data.length == 0)  this.list.html('<p class="bgwhite">  Sorry not results for text <b>'+str+'</b></p>');
                else  this.renderList();
                //if (!this.cache[str]) this.cache[str] = this.renderList(str);
                // this.list.html(this.cache[str]);
            }
        }



        private renderList(): void {
            var ar = this.data;
            var out: string = '';
            for (var i = 0, n = ar.length; i < n; i++) out += this._renderItem(ar[i]);
            this.list.html(out);
        }

        _renderItem(item: VODestination): string {
            var cl: string='"';
          //  if (item.advanced) cl = ' more-data"  href="#Details/'+item.destid+'"';
           // else if ((item.email.length + item.phone.length + item.website.length) >20 ) cl= ' more-data" href="#Details/'+item.destid+'"';
          //  var prf:string=cl.length==1?'':'+ ';
            return '<a  data-id="'+item.id+'" href="#details/'+item.id+'" class="list-group-item' + cl +'> <span class="left">'+ item.name + '</span><span class="pull-right">' + item.unit + '</span></a>';

        }

    }

}