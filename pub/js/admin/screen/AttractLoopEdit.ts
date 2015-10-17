/**
 * Created by VladHome on 8/11/2015.
 */
    /// <reference path="../RegA.ts" />
module uplight{
    export class AttractLoopEdit{
        R:RegA
        view:JQuery;
        tools:JQuery;
        private settings:any
        private admin:any;
       // private data:any;
        private iframeAL:JQuery;
        private kiosk:JQuery;
        private preview:JQuery;
        private alView:JQuery;

        private settingsURL:string='settings.json';

        private chkTC:JQuery;
        private btnEdit:JQuery;
        private  btnChangeType:JQuery;
        private btnPreview:JQuery;
       // private selectType:JQuery

        private btnSave:JQuery;
        private select:JQuery
        private current:JQuery
        private currentAl:VOAL;
        private editorView:JQuery;

        private changeType:ChangeType;
        private currentEditor:GalleryList
        private currentEditor2:GalleryList

       // private title:JQuery;
        private selectedItem:any;

        constructor(container:JQuery){
            this.R=RegA.getInstance();
            container.load('htms/admin/AttractLoopEdit.html',()=>this.init());
        }

        private init():void{
            var view:JQuery = $('#AttractLoopEdit');
            this.view = view;
            this.tools= view.find('[data-id=tools]:first');
            //this.title=view.find('[data-id=title]:first');
            this.alView = view.find('[data-id=alView]:first');
            this.iframeAL = $('#AttractLoopView');
            this.kiosk=$('#KioskView');
            var p1 = this.loadCurrent();
            $.when(p1).done((sett:any)=>{
                this.settings=sett
               // this.currentAl = al;
                this.renderAl()
            });
            this.chkTC = view.find('[data-id=chkTC]:first');
            this.preview= view.find('[data-id=kioskPreview]:first');
            this.btnPreview = view.find('[data-id=btnPreview]:first');


            this.btnChangeType = view.find('[data-id=btnChangeType]:first');
            this.current =  view.find('[data-id=current]:first');
            //this.btnSave = view.find('[data-id=btnSave]:first').click(()=>this.onSaveClick());
            this.editorView = $('#ALEditor');

            this.addListeners();
        }


        addListeners():void{
            this.preview.find('[data-id=btnClose]').click(()=>this.preview.hide());
            this.btnChangeType.click(()=>this.onChangeTypeClick());
            this.btnPreview.click(()=>this.showPeview())
        }

        private onSelectTypeClose():void{
            this.changeType.hide();
            this.current.show();

        }

         private onChangeTypeClick():void{
             if(!this.changeType){
                 this.changeType = new ChangeType()
                 this.changeType.onClose = ()=>this.onSelectTypeClose();
                 this.changeType.onSave = (al)=>this.save(al);

             }

             this.changeType.setCurrent(this.currentAl);
             this.changeType.show();
             this.current.hide();
         }

        private showPeview():void{
            this.loadAL();
            this.preview.show();
        }

        private hidePreview():void{
            this.preview.hide();
            this.unloadAL();
        }

        private loadAL():void{
            this.iframeAL.attr('src','AttractLoop.php?settings='+this.settingsURL);
        }

        private unloadAL():void{
            this.iframeAL.attr('src','');
        }

        private loadKiosk():void{
            this.kiosk.attr('src','Kiosk1080.php?mode=preview');
        }

        private uloadKiosk():void{
            this.kiosk.attr('src','');
        }


        private loadCurrent():JQueryPromise<any>{
            var d1=$.Deferred();
           var conn =  this.R.connector

            conn.getData(this.settingsURL).done(function(res:string){
                //console.log(res);
                d1.resolve(JSON.parse(res))
            });



            return d1.promise();

        }



        private render():void{
            console.log('render attract loop');
        }

        private onCurrentEdit():void{
            this.tools.hide('fast');
        }
        private onEditExit():void{

          this.tools.show('fast');
        }

        private renderAl():void{
            var al:VOAL = new VOAL(this.settings.attract_loop);
            this.currentAl =al;
            this.chkTC.prop(CHECKED,al.TC);
            this.alView.empty();
            if(al.type=='gallery'){
                this.currentEditor = new GalleryList(al.data_url);
                this.currentEditor.onEdit = ()=>this.onCurrentEdit();
                this.currentEditor.onEditExit = ()=>this.onEditExit();
                this.currentEditor2=null;
                this.alView.append(this.currentEditor.view);
            }else if(al.type=='gallery2'){
                var urls= al.data_url.split(',')
                this.currentEditor = new GalleryList(urls[0]);
                this.currentEditor.onEdit = ()=>this.onCurrentEdit();
                this.currentEditor.onEditExit = ()=>this.onEditExit();
                this.currentEditor2 = new GalleryList(urls[1]);
                this.currentEditor2.onEdit = ()=>this.onCurrentEdit();
                this.currentEditor2.onEditExit = ()=>this.onEditExit();
                this.alView.append(this.currentEditor.view);
                this.alView.append(this.currentEditor2.view);
            }


        }

        private save(newAL:VOAL):void{
            this.settings.attract_loop = newAL
            console.log(this.settings);
            this.R.connector.saveData( JSON.stringify(this.settings),'settings.json').done((res)=>{
               if(res.success){
                   this.renderAl();
                   RegA.getInstance().msg('New Attract loop saved',this.changeType.btnSave)
               }
            })

        }
/*
        private editor:Editor;
        private editors:Editor[]=[];

        private createEditor(item:VOAL):Editor{
            var editor:Editor;
            if(this.editors[item.id]) return this.editors[item.id];

            switch (Number(item.id)){
                case 1:

                    break;
                case 2:

                    break;
                case 3:
                   // editor = new RSSFeed();
                    break;
                case 4:
                    editor = new Messages();
                    break;
                case 5:
                  //  editor = new Simple(item);
                    break;

            }
            this.editors[item.id]= editor;

            //editor.setItem(item);
            return editor;
        }
*/

}


    class ChangeType{
        private currentEditor:GalleryList;
        private currentEditor2:GalleryList;
        private editorView:JQuery;
        private chkTC:JQuery

        btnSave:JQuery;

        view:JQuery
        data:VOAL[];
        select:JQuery;
        onClose:Function;
        onSave:Function;

        private currentVO:VOAL;
        private selectedItem:VOAL


        show():void{
            this.view.show();

        }

        hide():void{
            this.view.hide();
        }

        setCurrent(vo:VOAL):void{
            this.currentVO = vo;
            if(this.select){
                this.select.val(vo.id);
                this.selectTypeChage();
            }

        }
        private onSaveClick():void{
           var btn =  this.btnSave.addClass(DISABLED);
            setTimeout(()=>{this.btnSave.removeClass(DISABLED)},1000);
            this.currentVO = this.selectedVOAL;
            this.currentVO.TC = this.chkTC.prop(CHECKED);
           if(this.onSave)this.onSave(this.currentVO);

        }

        R:RegA;

        constructor(){
            this.R = RegA.getInstance();
            this.view= $('#ChangeType');
            this.editorView = this.view.find('[data-id=editorView]:first');
            this.btnSave = this.view.find('[data-id=btnSave]:first');
            this.chkTC = this.view.find('[data-id=chkTC]:first');
            this.loadAdmin();
        }


        private loadAdmin():void{
            this.R.connector.getData('admin.json').done((res:string)=> {
               var admin = JSON.parse(res);
               this.createSelectType(admin.attract_loops);
                this.addListeners();
                this.select.val(this.currentVO.id);

            });
        }
        private createSelectType(als):void{
            this.data = als
            var $el = this.view.find('[data-id=selectType]:first');


            var out='';
            var ar = als
            for(var i=0,n=ar.length;i<n;i++){
                out+='<option value="'+ar[i].id+'">'+ar[i].name+'</option>';
            }

            this.select=this.view.find('select:first').html(out);

        }

        addListeners():void{
            this.select.change(()=>this.selectTypeChage());
            this.view.find('[data-id=btnClose]').click(()=>{
                if(this.onClose)this.onClose();
            })
            this.btnSave.click(()=>this.onSaveClick())
        }


        private getAlById(id:number):any{

            var ar = this.data;
            for(var i=0,n=ar.length;i<n;i++){
                if(ar[i].id==id) return ar[i];
            }
            return null;
        }

        private onCurrentEdit():void{

        }

        private onEditExit():void{

        }

        private selectedVOAL:VOAL;
        private selectTypeChage():void {
            var al:VOAL = this.getAlById(this.select.val());
            this.selectedVOAL= al;
            this.editorView.empty();
            if (al.type == 'gallery') {
                this.currentEditor = new GalleryList(al.data_url);
                this.currentEditor.onEdit = ()=>this.onCurrentEdit();
                this.currentEditor.onEditExit = ()=>this.onEditExit();
                this.currentEditor2 = null;
                this.editorView.append(this.currentEditor.view);
            } else if (al.type == 'gallery2') {
                var urls = al.data_url.split(',')
                this.currentEditor = new GalleryList(urls[0]);
                this.currentEditor.onEdit = ()=>this.onCurrentEdit();
                this.currentEditor.onEditExit = ()=>this.onEditExit();
                this.currentEditor2 = new GalleryList(urls[1]);
                this.currentEditor2.onEdit = ()=>this.onCurrentEdit();
                this.currentEditor2.onEditExit = ()=>this.onEditExit();
                this.editorView.append(this.currentEditor.view);
                this.editorView.append(this.currentEditor2.view);

            }
        }


    }




}