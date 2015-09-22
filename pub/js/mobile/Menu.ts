/// <reference path="../kiosk/registry.ts" />

module uplight {

    export class Menu {

        private cats: uplight.VOCategory[];
        private pages: any[];

        private listP: JQuery;
        private listC:JQuery;
        private btnMenu:JQuery;
        private content:JQuery
        private menu:JQuery;
        onSearchFocus:Function;
        onSearchType:Function;
        onSearchON:Function;
        onSearchClose:Function;

        onMenuON:Function;


        isHiddenMenu:boolean;
        timeoutMenu:number;
        showMenu():void{
            if(this.isHiddenMenu){
                clearTimeout(this.timeoutMenu);
                this.isHiddenMenu = false;
                this.menu.removeClass('closed');
                this.timeoutMenu = setTimeout(()=>{
                    if(this.onMenuON)this.onMenuON();
                },500);
            }
        }

        clearSearch():void{
            this.tiSearch.val('');
        }
        hideAll():void{
           this.hideMenu();
           this.hideSearch();
        }

        hideMenu():void{
            if(!this.isHiddenMenu) {
                clearTimeout(this.timeoutMenu);
                this.isHiddenMenu = true;
                this.menu.addClass('closed');
            }
        }

        toggleMenu():void{
            if(this.isHiddenMenu)this.showMenu();
            else this.hideMenu();
        }
        constructor(private view:JQuery,private conn:uplight.Connector,private model:uplight.Model) {
            this.menu=$('#Menu');
            this.menu.find('[data-id=btnClose]').click(()=>this.hideMenu());
            this.listP = this.view.find( '[data-id=listP]:first');
            this.listC = this.view.find( '[data-id=listC]:first');
            this.content = this.view.find('[data-id=content]:first');
            this.btnMenu = this.view.find('[data-id=btnMenu]:first').click(()=>this.toggleMenu());
            var cats:uplight.VOCategory[] = model.getCategories();
            var d1:JQueryDeferred<uplight.VOCategory> = $.Deferred();
            if(!cats) {
                model.dispatcher.on(model.READY,()=>{
                    cats=model.getCategories();
                    d1.resolve(cats)})

            }else d1.resolve(cats);
            $.when(d1).then((cats)=>{
                 // console.log(cats);
                var out: string = '';
                var ar = cats
                for (var i = 0, n = ar.length; i < n; i++)  for(var i=0,n=ar.length;i<n;i++) out+= '<a class="u-brand list-group-item" href="#category/'+ar[i].id+'/'+ar[i].label+'"><span class="'+ar[i].icon+'"></span> ' + ar[i].label + '</a>';
                this.listC.html(out);
               })


           var p0 =   conn.getPages().done((res)=>{
              // console.log(res);
             var out='';
              var ar = res
              for(var i=0,n=ar.length;i<n;i++) out+= '<a class="u-brand list-group-item" href="#page/'+ar[i].id+'/'+ar[i].label+'"><span class="'+ar[i].icon+'"></span> ' + ar[i].label + '</a>';
               this.listP.html(out);

           });

            this.slider = this.view.find('[data-id=SearchSlider]:first');

            this.view.find('[data-id=btnSearch]').click(()=>this.toggleSearch());
            this.view.find('[data-id=btnSearchClose]:first').click(()=>{
                this.tiSearch.val('');
                this.hideSearch();
                if(this.onSearchClose)this.onSearchClose();

            })

            this.tiSearch = this.view.find('[data-id=tiSearch]:first').on('input',()=>{
                console.log(this.tiSearch.val());
                if(this.onSearchType)this.onSearchType(this.tiSearch.val());
            })
           // $.when(p0,d1).then((pages,cats)=>{
            //    console.log(pages,cats);

           // })


          //  conn.getCategories((data) => this.onCatData(data));

        }

        tiSearch:JQuery;
        slider:JQuery;
        isSearch:boolean;
        timeoutSearchFocus:number;
        timeoutON:number
        hideSearch():void{
            if(this.isSearch){
                this.isSearch = false;
                this.slider.animate({scrollTop:0});
                clearTimeout(this.timeoutSearchFocus );
                clearTimeout(this.timeoutON);
            }
        }

        showSearch():void{
            if(!this.isSearch){
                this.tiSearch.val('');
                clearTimeout(this.timeoutON);
                this.isSearch = true;
                this.slider.animate({scrollTop:30});
               this.timeoutON = setTimeout(()=>{
                    if(this.onSearchON)this.onSearchON();
                },500);

         this.timeoutSearchFocus =  setTimeout(()=>this.focusSearch(),1000);
            }
        }
        focusSearch():void{
            this.tiSearch.focus();
            if(this.onSearchFocus)this.onSearchFocus()

        }
        toggleSearch():void{
            if(this.isSearch)this.hideSearch();
            else this.showSearch();
        }


    }

}