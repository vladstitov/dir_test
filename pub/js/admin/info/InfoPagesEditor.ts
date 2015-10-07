/**
 * Created by VladHome on 9/2/2015.
 */
    /// <reference path="../../typing/jquery.d.ts" />
    /// <reference path="../RegA.ts" />
module uplight{
    export class IconsLibrary{

        iconsLibrary:JQuery;
        iconPreview:JQuery;
        icon:JQuery;
        view:JQuery
        R:RegA

        onSelect:Function;
        constructor(view:JQuery ){
            this.view = view;
            this.iconsLibrary = $('<div>').appendTo(view);
            this.R = RegA.getInstance();
            this.R.connector.getIcons().done((data)=>this.onIconsLoaded(data));
            this.iconPreview=$('<div>').addClass('abs preview').appendTo(this.view);
            this.view.find('[data-id=btnCloseL]:first').click(()=>this.hide());
        }

        hide():void{
            if(this.isVis){
                this.view.hide('fast');
                this.isVis=false;
            }

        }

        show():void{
            if(!this.isVis){
                this.view.show('fast');
                this.view.removeClass(HIDDEN);
                this.isVis = true;
            }

        }
        isVis:boolean
        toggle():void{
            if(this.isVis)this.hide();
            else this.show()

        }

        private renderIconsTopic(topic):string{
            var out='<div class="topic"><h3>'+topic[0]+'</h3><div class="list">';;
            var ar = topic;
            for(var i=1,n=ar.length;i<n;i++){
                out+='<div class="fa fa-'+ ar[i]+'" ></div>';
            }
            return out+'</div></div>';
        }

        private onIconsLoaded(data):void{
            var topics
            var out='';
            var ar = data;
            for(var i=0,n=ar.length;i<n;i++){
                out+=this.renderIconsTopic(ar[i]);
            }

            this.iconsLibrary.html(out);
            this.iconsLibrary.on(CLICK,'.fa',(evt)=>this.onIcionLibraryClick($(evt.currentTarget)))
            this.iconsLibrary.on(MOUSE_OVER,'.fa',(evt)=>this.onIcionLibraryOver($(evt.currentTarget)))
            this.iconPreview.on(MOUSE_OUT,'.fa',(evt)=>this.onIcionLibraryOut($(evt.currentTarget)))
            this.iconPreview.on(CLICK,'.fa',(evt)=>this.onIcionLibraryClick($(evt.currentTarget)))

        }

        onIcionLibraryClick(el:JQuery){
            var cl = el.attr('class');
           if(this.onSelect) this.onSelect(cl) ;

        }

        onIcionLibraryOver(el:JQuery){
            this.iconPreview.html(el.clone());
            this.iconPreview.css('left',el.position().left).css('top',el.position().top);
            this.iconPreview.fadeIn();
        }
        onIcionLibraryOut(el:JQuery){
            this.iconPreview.hide();
        }

    }


    export class TextEditor{
        private isVis:boolean
        private data:any
        private btnSave:JQuery;
        onSave:Function;

        show(){
           if(!this.isVis) {
               this.isVis = true;
               this.view.show();
               this.view.removeClass(HIDDEN);
           }
        }
        hide(){
            if(this.isVis) {
                this.isVis = false;
                this.view.hide();
            }
        }

        saveClicked():void{

        }

        toggle(){
            if(this.isVis)this.hide();
            else this.show();
        }
        setData(data:any){
            this.data= data
            this.load();
        }
        load():void{
            $('#PageBody').load(this.data+'?'+(new Date()).getSeconds(),(res)=>{
                console.log(res);
            })
// nicEditors.findEditor(this.contId.substr(1)).setContent(resp);

        }


        savePage(url):JQueryPromise<VOResult>{
            return this.R.connector.savePage(url,this.content.html());
        }
        getData():any{
            return this.data;
        }



        private editor:nicEditor;
        R:RegA
        content:JQuery
        constructor(private view:JQuery){
            this.R=RegA.getInstance();

            view.find('[data-id=btnCloseT]:first:first').click(()=>this.hide());

            this.editor = new nicEditor({ fullPanel: true });
            this.editor.setPanel('NicPanelPage');
            this.editor.addInstance('PageBody');
            this.content = $('#PageBody');
            this.content.width(730).height(1100);



        }



    }

    export class InfoEditor{
        private view:JQuery;
         btnSave:JQuery;
        private  btnClose:JQuery;
        R:RegA;
        private data:any;
        onSave:Function;
        onClose:Function;
        private selSeq:JQuery
        private tiName:JQuery
        private iconsLibrary:IconsLibrary;
        private btnEditIcon:JQuery
        private icon:JQuery;
        private chkEnabled:JQuery
        private  btnEditText:JQuery;
        private textEditor:TextEditor;


        constructor(){
            this.view= $('#InfoPagesEditor');
            this.view.find('[data-id=btnClose]').click(()=>{
                this.iconsLibrary.hide();
                this.textEditor.hide();
                this.onClose();
            })

            this.btnSave  = this.view.find('[data-id=btnSave]:first').click(()=>{
                this.btnSave.prop('disabled',true);
                this.iconsLibrary.hide();
                this.textEditor.saveClicked();
                setTimeout(()=>{this.btnSave.prop('disabled',false)},3000);
                if(this.onSave)this.onSave();
            });
            this.selSeq = this.view.find('[data-id=selSeq]:first');
            this.icon = this.view.find('[data-id=icon]:first');
            this.btnEditIcon =  this.view.find('[data-id=btnEditIcon]:first');
            this.tiName = this.view.find('[data-id=tiName]:first');
            this.chkEnabled = this.view.find('[data-id=chkEnabled]:first');
            this.iconsLibrary = new IconsLibrary(this.view.find('[data-id=iconsLibrary]:first'));
            this.iconsLibrary.onSelect = (str)=>{
                this.icon.attr('class',str);
            }



            this.textEditor = new TextEditor(this.view.find('[data-ctr=TextEditor]:first'));


            this.btnEditIcon.on(CLICK,()=>this.onEditIconClick());

            this.btnEditText = this.view.find('[data-id=btnEditText]:first').click(()=>{
                this.textEditor.toggle();
                this.iconsLibrary.hide();
            })

            this.icon.parent().on(CLICK,()=>this.onEditIconClick());

            //this.iconPreview=$('<div>').addClass('absolute preview').appendTo(this.iconsLibrary.view.parent());

        }
        private onEditIconClick():void{
           this.iconsLibrary.toggle();
            this.textEditor.hide();
        }
        savePage():JQueryPromise<VOResult>{
           return this.textEditor.savePage(this.data.url);
        }

        render():void{
            this.icon.attr('class',this.data.icon);
            this.selSeq.val( this.data.seq);
            this.tiName.val(this.data.name);
            this.chkEnabled.prop('checked',this.data.enabled);
        }

        setSeq(num:number){
           var out:string='';
            for(var i=1,n=num;i<n;i++){
               out+='<option value="'+i+'">'+i+'</option>';
            }
            this.selSeq.html(out);
        }

        setData(data:any):void{
            this.data = data;
            this.textEditor.setData(data.url);
            this.render();
        }
        getData():any{
            if(!this.data) return null;
            this.data.icon =  this.icon.attr('class');
            this.data.seq= this.selSeq.val();
            this.data.name= this.tiName.val();
            this.data.enabled= this.chkEnabled.prop('checked');

            return this.data;
        }
        hide():void{
            this.view.hide();
        }
        show():void{
            this.view.show();
            this.view.removeClass('hidden');
        }
    }

    export  class InfoPagesManager{
        view:JQuery;
        list:JQuery;
        btnAdd:JQuery;
        btnEdit:JQuery;
        btnDelete:JQuery;
        iEditor:InfoEditor;
        R:RegA;
        selectedIndex:number=-1;
        data:any[];
        selected:JQuery;

        url:string;
        constructor(content:JQuery){
            this.R=RegA.getInstance();
            content.load('js/admin/info/InfoPagesEditor.html',()=>this.init())


        }

        init():void{
            this.url=this.R.settings.pages

            this.view=$('#InfoPagesView');

            this.iEditor = new InfoEditor();
            this.iEditor.onClose=()=>{
                this.iEditor.hide();
                this.show();
            }
            this.iEditor.R= this.R;

            this.iEditor.onSave = ()=>this.onSaveClicked();

            this.btnAdd = this.view.find('[data-id=btnAdd]:first').click(()=> this.onAddClicked());
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(()=> this.onEditClicked());
            this.btnDelete = this.view.find('[data-id=btnDelete]').click(() => this.onDelClicked());
            var table= $('<table>').addClass('table').html('<tr><th>ID</th><th>Icon</th><th>Name</th><th>Sequence</th><th>Enabled</th></tr>');
            this.list=$('<tbody>').appendTo(table);
            this.list.on(CLICK,'tr',(evt)=>this.onListClick(evt));
            $('#InfoPagesList').append(table);
            this.loadData();
        }


        private onListClick(evt:JQueryEventObject):void{
                var i:number = $(evt.currentTarget).data('i');
            if(isNaN(i)) return;
            if(this.selected) this.selected.removeClass(SELECTED);
            this.selected = $(evt.currentTarget);
            this.selected.addClass(SELECTED);
            this.selectedIndex=i;
            this.iEditor.setData(this.data[i]);
        }
        hide():void{
           this.view.hide();
        }
        show():void{
            this.view.show();
        }
        private onAddClicked(): void {
            this.max++;
            var item:any={id:0,icon:'',name:'',seq:this.data.length,enabled:true};
            this.iEditor.setData(item);
            this.iEditor.show();
            this.hide();

        }
        private onSaveClicked():void{
            var item= this.iEditor.getData();
            if(!item) return;
            if(item.id===0){
                this.max++;
                item.id=this.max
                item.url='pages/page'+item.id+'.htm';
                this.data.push(item);
            }
            this.iEditor.savePage();
            this.save().done((res)=>{
                console.log(res);
                if(res.success) this.R.msg('Data saved',this.iEditor.btnSave);
            });
        }

        max:number=0;

        private onData(data):void{
            this.data = JSON.parse(data);

            this.render();
        }
        private render():void{
            this.max=0;
            var ar = this.data;
            var out='';
            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i];
                item.seq=i+1;
                if(item.id>this.max)this.max=item.id;
                out+='<tr data-i="'+i+'" class="item"><td>'+item.id+'</td><td><span class="'+item.icon+'"></span></td><td>'+item.name+'</td><td>'+item.seq+'</td><td>'+item.enabled+'</td></tr>';
            }
            this.list.html(out);
            this.iEditor.setSeq(n+2);

            if(this.selectedIndex!=-1){
                    this.list.find('[data-i='+this.selectedIndex+']').addClass(SELECTED);
            }

        }

        private onEditClicked(): void {
            if(this.selectedIndex==-1) return;
            var item = this.data[this.selectedIndex];
            this.iEditor.setData(item);
            this.iEditor.onSave = ()=>this.onSaveClicked();
            this.iEditor.show();
            this.hide();

        }

        loadData():void{
            this.R.connector.getData(this.url).done((res)=>this.onData(res));
        }

        private onDeleteSuccess(res):void{
            console.log(res);
           this.R.msg('Item Deleted',this.btnDelete);
            this.loadData();
        }
        private save():JQueryPromise<VOResult>{
            var data = _.sortBy(this.data,'seq');
           return this.R.connector.saveData(JSON.stringify(data),this.url)
        }
        private onDelClicked(): void {
            if(this.selectedIndex==-1) return;
            var item = this.data[this.selectedIndex]
            if(confirm('Yoy want to delete Page '+item.name+'?')) {
                this.data.splice(this.selectedIndex,1);
                this.selectedIndex=-1;
                this.save().done((res)=>this.onDeleteSuccess(res));;
            }

        }



    }
}