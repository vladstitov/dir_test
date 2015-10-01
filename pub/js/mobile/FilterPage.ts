/// <reference path="../kiosk/registry.ts" />
/// <reference path="../Mobile.ts" />

module uplight {
    export class FilterPage {

        private list: JQuery;
       // view: JQuery;
        input: JQuery;
        private catid:number;
        private catTitle:JQuery;
        private tiFilter:JQuery;
        private details:JQuery
        private ALL:string='all_';
        private cache: any={};
        data:uplight.VODestination[];

        onSelect:Function;
        onImageClick:Function;


        resetView(): JQuery {
            this.input.val('');
            this.list.html('<p class="bgwhite">Start typing in input field on top of page. Results will come as soon as you are typing</p>');
            return this.view;
        }


        showDefault():void{
            this.data = this.model.getData();
            this.input.val('');

            this.tiFilter.show();
            this.catTitle.text('').hide();
            this.renderAll();
            this.show();
            this.input.focus();

        }


        showPattern(str:string):void{
            if (str.length == 0) {
                this.renderAll();
            }else {
                this.data = this.model.getDestsByPattern(str);
                if (this.data.length == 0)  this.list.html('<p class="bgwhite">  Sorry not results for text <b>'+str+'</b></p>');
                else  this.renderList(str);
            }

        }


        private current:number
        private selected:JQuery;



        showCategory(num:number):void{
            this.tiFilter.hide();
            var cat:uplight.VOCategory = this.model.getCategoryById(num);
            this.catTitle.text(cat.label).show();
           this.data = this.model.getDestsByCat(num);
            this.catid=num;
            this.renderList('cat_'+num);
            this.show();
        }


        isHidden:boolean=true;
        show():void{
            if(this.isHidden){
                this.isHidden = false;
                this.view.removeClass(HIDE);
                this.view.addClass(SHOW);
                this.input.focus();
            }
        }

        hide():void{
            if(!this.isHidden){
                this.isHidden = true;
                this.view.addClass(HIDE);
                this.view.removeClass(SHOW);
            }
        }

        isDetails:boolean;

        constructor(private view:JQuery, private model: uplight.Model) {
            this.input = view.find('[data-id=filter]');
            this.input.on('input', (evt) => this.onInput(evt));                   
            this.list = view.find('[data-id=list]');
            this.list.on(CLICK,'a',(evt)=>this.onListClick(evt));
            this.list.on(CLICK,'img',(evt)=>this._onImageClick(evt));
            this.cache = { ' ': 'Please type in feild' };
            this.tiFilter= view.find('[data-id=tiFilter]:first');
            this.catTitle= view.find('[data-id=catTitle]:first').hide();
            view.find('[data-id=btnClear]:first').click(()=>{
                this.input.val('');
                this.renderAll();
            })

            this.details = $('<div>').addClass('details');
            $('#ImageView').click(()=>{
                $('#ImageView').fadeOut();
            })
        }

        private _onImageClick(evt:JQueryEventObject):void{
            var el:JQuery = $(evt.target);
            var src=el.attr('src');
            //$('#ImageView').removeClass('hidden');
            $('#ImageView').fadeIn();
            $('#ImageView img').attr('src',src);
            if(this.onImageClick)this.onImageClick(src);

        }

        private  addDetails(vo:VODestination,el:JQuery):void{
            console.log(vo);
            if(!vo.details) vo.details = Utils.renderDetails(vo);
            el.append(vo.details);
        }


        private onListClick(evt:JQueryEventObject):void{
            var el:JQuery = $(evt.currentTarget).parent();

            if(el.hasClass(SELECTED)){
               el.removeClass(SELECTED);
               // el.children('.details');
               this.selected = null;

            }else{
                el.addClass(SELECTED);
                this.selected = el;
                if(el.children('.details').length !==0){
                  //  el.children('.details').show('fast');
                }else{
                    var vo:VODestination = this.model.getDestById(el.data('id'));
                    if(vo) this.addDetails(vo,el)                }

            }

        }
        getHeader(): JQuery {
            return this.input;
        }
        private onInputFocus(evt): void {
            this.input.val('');
        }


        private renderAll():void{
            this.data = this.model.getData();
            this.renderList(this.ALL);
        }
        private onInput(evt: JQueryEventObject): void {
               setTimeout(()=>this.doFilter(),200);
        }



        private doFilter():void{
            var str: string = this.input.val();


            if (str.length == 0) {
                this.renderAll();
            }
            else {
                this.data = this.model.getDestsByPattern(str);
                if (this.data.length == 0)  this.list.html('<p class="bgwhite">  Sorry not results for text <b>'+str+'</b></p>');
                else  this.renderList(str);
                //if (!this.cache[str]) this.cache[str] = this.renderList(str);
                // this.list.html(this.cache[str]);
            }
        }


        private cats:string[];

        private makeCats():string[]{
            var ar = this.model.getCategories();
            var out:string[]=[];
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                out[ar[i].id] = ar[i].icon;
            }
            return out;
        }

        private renderList(str:string): void {
            if(this.cache[str])this.list.html(this.cache[str]);
            else{
                if(!this.cats) this.cats = this.makeCats();
                var ar = this.data;
                var out: string = '';
                for (var i = 0, n = ar.length; i < n; i++) out += Utils.renderItem(ar[i],this.cats);
                this.cache[str]=out;
                this.list.html(out);
            }

        }






    }

}