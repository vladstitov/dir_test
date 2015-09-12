/**
 * Created by VladHome on 7/2/2015.
 */
    /// <reference path="../RegA.ts" />

module uplight{
    export class DetailsImages{
        private btnAdd:JQuery;
        private btnEdit:JQuery;
        private btnDel:JQuery;
        private btnUpload:JQuery
        private uploadView:JQuery
        private uploadText:JQuery;

        private title:JQuery;

        private list1:JQuery;
        private list2:JQuery;
        private content:JQuery

        private data:string[];
        private dataDelete:string[];
        selectedItem:string;
        selected:JQuery;

        private mode:string
        onSave:Function

        view:JQuery

        hide():void{
            this.view.hide();
            this.content.empty();
            this.list2.empty();
        }

        show():void{
            this.view.show();
            this.render2();
        }


        resetData():void{
            this.data=this.current.imgs?this.current.imgs.slice(0):null;
        }
        private current:VODestination;

        setData(vo:VODestination):void{
            this.current = vo;
            this.resetData();

        }

        getData():string[]{
            return this.data
        }
        getDeleted():string[]{
            return this.dataDelete;
        }

        R:RegA
        constructor(view:JQuery,list:JQuery){
            this.R=RegA.getInstance();
            this.list1= $('<ul>').appendTo(list);
            this.list2=$('<ul>').appendTo(view.find('.nano:first'));
            this.list2.on(CLICK,'li',(evt)=>this.onItemClick($(evt.currentTarget)));
            this.view = view;


           // this.editor =
           // this.editor.hide();
            this.btnUpload= $('<input>').attr('type','file').attr('name','file');
            this.uploadView = $('<div>').addClass('upload').append(this.btnUpload);
            this.uploadText= $('<span>').appendTo( this.uploadView);

            this.btnAdd =  view.find('[data-id=btnAdd]:first').on(CLICK,()=>this.onAddClick());
            this.btnEdit =  view.find('[data-id=btnEdit]:first').on(CLICK,()=>this.onEditClick());
            this.btnDel =  view.find('[data-id=btnDel]:first').on(CLICK,()=>this.onDeleteClick());
            var panel:JQuery=$('<div>');
            var image:JQuery = $('<img>');
            this.content = view.find('[data-id=content]:first');

            this.title=view.find('[data-id=title]:first');


           // this.editor=$('<div>').addClass('cover').app

        }

        private onItemClick(el:JQuery){
                var i = Number(el.data('i'));
            if(isNaN(i))return
            this.selectedItem = this.data[i];
            if(this.selected)this.selected.removeClass(SELECTED);
            el.addClass(SELECTED);
            this.selected=el;
            this.content.empty();
            this.content.html(el.clone());
            this.mode='';
        }

        private renderItem(str:string,i:number):string{
            var img ='<img class="item"   src="'+str+'"/>';
            return '<li data-i="'+i+'" >'+img+'</li>';
        }
        render():void{
            var ar = this.data;
          //  console.log('rendet images   ',ar);

            if(!ar){
                this.list1.html('');
                this.list1.parent().hide();
                return;
            }
            var out='';
            for(var i=0,n=ar.length;i<n;i++){
                out+= this.renderItem(ar[i],i);
            }
            this.list1.html(out);
            this.list1.parent().show();
        }
       render2():void{
           this.title.html(this.current.name+' &nbsp;&nbsp;unit:'+this.current.unit);
           var ar = this.data
           if(!ar){
               this.list2.html('');
               return;
           } ;
           var out='';
           for(var i=0,n=ar.length;i<n;i++){
               out+= this.renderItem(ar[i],i);
           }
           this.selectedItem=null;
           this.list2.html(out);
       }



        private onAddClick():void{
           this.uploadText.text('to Add File');
            this.content.prepend(this.uploadView);
            this.btnUpload.on(CHANGE,(evt)=>this.onFileSelected(evt.target))
            this.mode='add';
            if(this.selected)this.selected.removeClass(SELECTED);
            this.selected=null;
            this.selectedItem=null;
        }

        private onEditClick():void{
            if(!this.selectedItem) return;
            this.uploadText.text('to Replace File');
            this.content.prepend(this.uploadView);
            this.btnUpload.on(CHANGE,(evt)=>this.onFileSelected(evt.target))
            this.mode='update';
        }

        private onUploadResult(res:VOResult):void{
            console.log(res);
            if(res.success){
                if( this.mode==='add'){
                    if(!this.data) this.data=[];
                    this.data.push(res.result);
                    var item= this.renderItem(res.result,this.data.length-1);
                    this.content.empty();
                    this.content.html(item);
                    this.list2.append(item);
                    this.mode='';
                }else if( this.mode==='update'){
                    var i:number = this.selected.data('i');
                    this.data[i]=res.result;
                    this.selectedItem=this.data[i];
                    this.render2();
                    var item= this.renderItem(this.selectedItem,i);
                    this.content.empty();
                    this.content.html(item);
                    this.mode='';
                }

            }
        }

        private onFileSelected(input:any):void{
            var files:FileList = input.files;
            if(files.length){
                var form:FormData = new FormData();
                form.append('file',files[0])
                this.R.connector.uploadDestinationImage(form,this.current.uid).done((res:VOResult)=>this.onUploadResult(res))

            }

        }
        private onDeleteClick():void{
            var isDel = confirm('You want to delete selected Image from records?');
            if(isDel){
                var ind= this.data.indexOf(this.selectedItem);
                if(!this.dataDelete)this.dataDelete=[];
                this.dataDelete.push(this.data.splice(ind,1)[0]);
                this.render2();
                this.content.empty();
            }
        }


        private onFileChoosen(input:any):void{
            var files=input.files;
            if(files.length){
                var form:FormData = new FormData();
                form.append('file',files[0]);

            }
        }
    }
}