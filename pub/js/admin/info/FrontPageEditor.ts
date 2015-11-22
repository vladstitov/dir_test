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
            container.load('htms/admin/FrontPageEditor.htm',()=>this.init());

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
        private hideEdit():void{
            this.isEdit = false;
            $('#NicPanelPage').hide();
            this.editor.attr('contenteditable',false);
        }
        private isEdit:boolean;
        private onEditClicked():void{
            if(!this.nicEdit){
                this.nicEdit = new nicEditor({ fullPanel: true });
                this.nicEdit.setPanel('NicPanelPage');
                this.nicEdit.addInstance('PageBody');
            }
            if(this.isEdit)this.hideEdit();
            else{
                this.isEdit = true;
                this.editor.attr('contenteditable',true);
                $('#NicPanelPage').show();
            }

        }
        private onDelClicked():void{

        }

        private onSave(res:VOResult):void{
          //  console.log(res);
            if(res.success) RegA.getInstance().msg('Page Saved',this.btnSave);
            else {
                RegA.getInstance().connector.error('FronPageEditor '+res.error+' '+res.result);
                alert('Error was send to administarator');
            }
        }

        private onSaveClicked():void{
            this.hideEdit();
                var url:string =RegA.getInstance().settings.front_page;
             var tmp =    this.list.children().detach();
                RegA.getInstance().connector.savePage(url,this.editor.html()).done((res)=>this.onSave(res));
                this.list.append(tmp);


        }

        private onPages(data):void{
           // console.log(data);
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
            out+='<div id="PagesListFront">';
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                item.seq=i+1;
                out+='<a class="list-group-item"><span class="'+item.icon+'"></span> <span> '+item.name+'</span></a>';
            }
            out+='</div>';
            this.list.html(out);

        }

    }
}