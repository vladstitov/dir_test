/**
 * Created by VladHome on 8/16/2015.
 */
    /// <reference path="../RegA.ts" />

module uplight{
   export class GalleryList{
       view:JQuery;
       list:JQuery;
       btnShowImages:JQuery;
       btnEdit:JQuery;
       editor: GalleryAdmin;
       data:any;
       vo:VOAL
       onEdit:Function;
       onEditExit:Function

       getVOAL():VOAL{
           return this.vo;
       }

       getEditorView():JQuery{
           return this.editor.getView();
       }

       private onEditorClose():void{
           this.view.show();
           this.editor.view.remove();
           this.loadData();
           if(this.onEditExit)this.onEditExit();
       }
       private onEditClick():void{
           console.log(this.data);
           if(!this.editor) this.editor = new GalleryAdmin({});
           this.editor.onClose = ()=>this.onEditorClose();
           this.editor.setData(this.data);
           this.view.hide();
           this.editor.getView().insertAfter(this.view);
           if(this.onEdit)this.onEdit();
       }

       private connector:Connector
       constructor(private data_url:string){
            this.connector = RegA.getInstance().connector;

            this.view =  $('#Template [data-ctr=GalleryList]:first').clone();
            this.list=$('<ul>').appendTo(this.view.find('.nano')).hide();

            this.btnShowImages = this.view.find('[data-id=btnShowImages]').click(()=>this.onShowImages());
            this.btnEdit = this.view.find('[data-id=btnEdit]:first').click(()=>this.onEditClick());
            this.loadData();
           // this.renderProp();

        }

       private onShowImages():void{
           if(this.btnShowImages.data('vis')){
               this.list.hide('fast');
               this.btnShowImages.data('vis',false);
               this.btnShowImages.children().last().text('Show Images');
           }else {
               this.btnShowImages.data('vis',true);
               this.list.show('fast');
               this.btnShowImages.children().last().text('Hide Images');
           }
       }

        private setData(data:any):void{
            this.data= data;
            this.vo=data.props;
            this.renderData();
            this.renderProp();

        }

       private renderProp():void{
           this.view.find('[data-id=name]').text(this.vo.name);
           this.view.find('[data-id=delay]').text(this.vo.delay);
           this.view.find('[data-id=size]').text(this.vo.size);
       }
       private renderData():void{
           var ar = this.data.gallery
           var out:string=''
           for(var i=0,n=ar.length;i<n;i++){
               out+='<li data-i="'+i+'"><img src="'+ar[i]+'" /></li>';
           }
           this.list.html(out);
       }
        loadData():void{
            this.connector.getData(this.data_url).done((res)=>this.setData(JSON.parse(res)));

        }


    }


 export  class GalleryAdmin{


     onClose:Function

         listView:JQuery
         isEditor:boolean;
         props:VOAL;
        gallery:string[];
         data:any;

     viewUploadAdd:JQuery;
     viewUploadEdit:JQuery;

        btnAdd:JQuery;
        btnEdit:JQuery
        btnDelete:JQuery;
        btnUplaodAdd:JQuery;
        btnUploadEdit:JQuery;
        btnSave:JQuery
        btnClose:JQuery

        view:JQuery
        propsView:JQuery
        name:JQuery;

        tiDelay:JQuery

     getView():JQuery{
         setTimeout(()=>this.addListeners(),100);;
         this.reset();
         return this.view;
     }

     setData(data:any):void{
         this.data=data;
         this.props =data.props;
         this.gallery= data.gallery;
         this.render();
     }

     onSaveResult(res:any):void{
            if(res.success){
                RegA.getInstance().msg('Saved',this.btnSave);
            }else {
                if(typeof res == 'Object')res=JSON.stringify(res)
                alert(res)
            }
     }

     onSaveClick():void{
         var btn:JQuery = this.btnSave.addClass(DISABLED)
         setTimeout(function(){btn.removeClass(DISABLED)},1000);
         this.save();
     }

     save():void{

         var del:number = Number(this.tiDelay.val());
         if(isNaN(del)){
             alert('Delay has to be a number');

         }else{
             this.props.delay= del;
            // console.log(this.props.data_url,this.data);;
             this.connector.saveData(JSON.stringify(this.data),this.props.data_url).done((res)=>this.onSaveResult(res));
         }

     }

     loadData():GalleryAdmin{
         this.connector.getData(this.props.data_url).done((res)=>this.setData(JSON.parse(res)));
         return this;
     }

     constructor(opt:any){

         this.connector = RegA.getInstance().connector;
         for(var str in opt) this[str] = opt[str];
         this.init();
     }

     reset():void{
            if(this.mode==1)  this.viewUploadAdd.addClass('hidden');
            if(this.mode==2)  this.viewUploadEdit.addClass('hidden');

        }


     private renderProp():void{
         this.selected=null;
         this.view.find('[data-id=name]').text(this.props.name);
         this.tiDelay.val(this.props.delay);
         this.view.find('[data-id=size]').text(this.props.size);
     }
        render():void{
            this.renderProp();
            var out='';
            var ar = this.gallery
            for(var i=0,n=ar.length;i<n;i++){
                out+= this.renderItem(ar[i],i);
            }

            this.list.html(out);
        }

        renderItem(item,i:number):string{
            return '<li data-i="'+i+'"><img src="'+item+'" /></li>';
        }

        getData():string[]{
           return this.data;
        }

        list:JQuery

        selector:string='#Template [data-ctr=GalleryAdmin]:first';

        connector:Connector;
        preview:JQuery;

        //src:string;
        //data_url:string;
        //id:number;
       // size:string;

         init():void{

             this.view=$(this.selector).clone();
             this.btnAdd = this.view.find('[data-id=btnAdd]:first')
             this.btnEdit = this.view.find('[data-id=btnEdit]:first')
             this.btnDelete = this.view.find('[data-id=btnDelete]:first')
             this.viewUploadAdd = this.view.find('[data-id=viewUploadAdd]:first');
             this.btnUplaodAdd = this.view.find('[data-id=btnUploadAdd]:first');
             this.viewUploadEdit = this.view.find('[data-id=viewUploadEdit]:first');
             this.btnUploadEdit = this.view.find('[data-id=btnUploadEdit]:first');
             this.btnClose = this.view.find('[data-id=btnClose]');

             this.preview = this.view.find('[data-id=preview]:first');

             this.tiDelay = this.view.find('[data-id=delay]');

             this.btnSave = this.view.find('[data-id=btnSave]');
             this.name=this.view.find('[data-id=name]:first');
             //this.preview.width(dem[0]).height(dem[1]);

             this.list=$('<ul>').addClass('list');
             this.listView = this.view.find('.nano:first').append(this.list);
         }





        private onUploadResult(res:VOResult):void{
            if(res.success) {
                if (this.selected) {
                    var i:number = this.selected.data('i');
                    this.gallery[i] = res.result;
                } else  this.gallery.push(res.result);

                this.render();
            }

        }

        private onUploadResultAdd(res:VOResult):void{
            console.log(res);
            if(res.success){
                this.data.push(res.result);
                this.render();
            }
        }

        private onFileSelected(evt:JQueryEventObject):void{
           var input:any = evt.target
            var files:FileList = input.files;
            if(files.length){
                var form:FormData = new FormData();
                form.append('file',files[0])
                this.connector.uploadImage(form,'al',('al'+this.props.id)).done((res:VOResult)=>this.onUploadResult(res))

            }
            this.reset();

        }
        private mode:number
        private onAddClick():void{
            this.reset();
            this.mode=1;
            this.viewUploadAdd.removeClass('hidden');
            this.resetSelected();
        }

        private onEditClick():void{
            this.reset();
            if(!this.selected) return;
            this.mode=2;
            this.viewUploadEdit.removeClass('hidden');
        }


        private onDeleteClick():void{
            this.reset();
            if(!this.selected) return;
            var i:number = this.selected.data('i');
            if(isNaN(i)) return;
            if(confirm('You want to remove selected image from list?')){
                this.gallery.splice(i,1);
                this.selected=null;
                this.render();
            }

        }


        private selected:JQuery
        private resetSelected():void{
            if(this.selected) this.selected.removeClass(SELECTED);
            this.selected=null;
        }

        private selectImage(evt:JQueryEventObject):void{
            this.reset();
            this.resetSelected();
            var $el = $(evt.currentTarget);
            var i:number = $el.data('i');
            if(isNaN(i)) return;
            $el.addClass(SELECTED);
            this.selected=$el;
        }


     private onCloseClick():void{
         if(this.onClose)this.onClose();
     }
        addListeners():void{
            this.btnAdd.click(()=>this.onAddClick());
            this.btnEdit.click(()=>this.onEditClick());
            this.btnDelete.click(()=>this.onDeleteClick());
            this.btnUplaodAdd.change((evt)=>this.onFileSelected(evt))
            this.btnUploadEdit.change((evt)=>this.onFileSelected(evt))
            this.list.on(CLICK,'li',(evt)=>this.selectImage(evt));
            this.btnClose.click(()=>this.onCloseClick());
            this.btnSave.click(()=>this.onSaveClick());
        }


    }


  /*  export class Editor{
        view:JQuery;
        listView:JQuery
        isEditor:boolean;
        vo:VOAL;
        data:any;
        btnSave:JQuery;

        connector:Connector


        getList():JQuery{
            return this.listView;
        }
        setVOAL(vo:VOAL):Editor{
            this.vo=vo
            return this;
        }

        getVOAL():VOAL{
            return this.vo;
        }
        addListeners():void{

        }

        setData(data:any):void{
            this.data=data;
            this.render();
        }

        render():void{

        }
        onSaveResult(res):void{

        }

        onSaveClick():void{
            var btn:JQuery = this.btnSave.addClass(DISABLED)
            setTimeout(function(){btn.removeClass(DISABLED)},1000);
            this.save();
        }
        save():void{
            this.connector.saveData(JSON.stringify(this.data),this.vo.data_url).done((res)=>this.onSaveResult(res));
        }
        loadData():Editor{
            this.connector.getData(this.vo.data_url).done((res)=>this.setData(JSON.parse(res)));
            return this;
        }
        resetButtons():void{

        }

        toggleEditor():boolean{
            if(this.isEditor)this.hideEditor();
            else this.showEditor();
            return this.isEditor
        }

        showEditor():void{
            this.view.find('.tools:first').removeClass('hidden');
            this.isEditor=true;
        }

        hideEditor():void{
            if(this.isEditor){
                this.view.find('.tools:first').addClass('hidden');
                this.isEditor=false;
            }

        }

        getView():JQuery{

            this.addListeners();
            this.resetButtons();
            console.log('this.view ',this.view);
            return this.view;
        }




    }
*/


}