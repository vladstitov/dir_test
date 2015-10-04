/**
 * Created by VladHome on 10/3/2015.
 */
    ///<reference path="../DirsAdmin.ts" />
module uplight{
    export class FrontPageEditor{

        view:JQuery;
        list:JQuery;
        menu:JQuery;
        editor:JQuery;

        btnAdd:JQuery;
        btnEdit:JQuery;
        btnDelete:JQuery;
        btnSave:JQuery;
        pages:any[];
        private nicEdit:nicEditor

        appendTo(container:JQuery):void{
            container.append(this.view);
            this.reloadPage();
        }
        constructor(container:JQuery){
            container.load('js/admin/info/FrontPageEditor.htm',()=>this.init());

        }

        private init():void{

            this.view = $('#FrontPageEditor');

            this.btnAdd = this.view.find('[data-id=btnAdd]:first').click(()=> this.onAddClicked());
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(()=> this.onEditClicked());
            this.btnDelete = this.view.find('[data-id=btnDelete]').click(() => this.onDelClicked());
            this.btnSave = this.view.find('[data-id=btnSave]').click(() => this.onSaveClicked());
            this.editor = this.view.find('[data-id=editor]:first');


            if(RegA.getInstance().settings.front_page){
                this.btnAdd.addClass(HIDDEN);
                this.btnDelete.addClass(HIDDEN);
                //TODO make add and delrtr work
            }else {
                this.btnDelete.addClass(HIDDEN);
                this.btnEdit.addClass(HIDDEN);
                this.btnSave.addClass(HIDDEN);
            }
            this.reloadPage();
        }

        private onAddClicked():void{

        }
        private onEditClicked():void{
            if(!this.nicEdit){
                this.nicEdit = new nicEditor({ fullPanel: true });
                this.nicEdit.setPanel('NicPanelPage');
                this.nicEdit.addInstance('PageBody');
            }
        }
        private onDelClicked():void{

        }

        private onSave(res):void{
            console.log(res);;
        }

        private onSaveClicked():void{
            if(confirm('You want to save Front page?')){

                var url:string =RegA.getInstance().settings.front_page;
             var tmp =    this.list.children().detach();
                RegA.getInstance().connector.savePage(url,this.editor.html()).done((res)=>this.onSave(res));
                this.list.append(tmp);
            }

        }



        private onPages(data):void{
            console.log(data);
            this.pages = JSON.parse(data);
            this.renderList();
        }
        private loadMenu():void{
            var url:string =RegA.getInstance().settings.pages;
            if(url)  RegA.getInstance().connector.getData(url).done((data)=>this.onPages(data));
            else this.renderList();
        }

        private reloadPage():void{
            RegA.getInstance().connector.getPage(RegA.getInstance().settings.front_page).done((data)=>this.onContent(data))

        }

        private onContent(data:string):void{

            this.editor.html(data)
           this.menu=this.editor.find('[data-id=menu]:first');
           this.list= this.menu.find('[data-id=list]:first');
          this.loadMenu();
        }

        private renderList():void{
        var ar= this.pages;
            var out='<a class="list-group-item"><span class="fa fa-search"></span> <span> Search Directory</span></a>';
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                item.seq=i+1;
                out+='<a class="list-group-item"><span class="'+item.icon+'"></span> <span> '+item.name+'</span></a>';
            }
            this.list.html(out);

        }

    }
}