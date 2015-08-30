﻿/// <reference path="../RegA.ts" />
module uplight{
    export class LabelEditor{
        view:JQuery
        private select:JQuery
        private btnSaveLabel: JQuery;
        private btnUpload:JQuery
        private tiIndex:JQuery;
        private tiValue:JQuery;
        private imgValue:JQuery;
        private tiDescr:JQuery
        private btnDelete:JQuery;
        current:any;
        img:JQuery;
        text:JQuery;
        onSave:Function
        onDelete:Function;
        isSuper:boolean;


        setAvailable(ar){

        }


        private onSaveClick():void{
            console.log('save');
            if(!this.current) return;
            var item = this.current;
            if(item.type=='img'){
                item.value= this.imgValue.attr('src');
            }else{
                item.value = this.tiValue.val();
            }

            item.description = this.tiDescr.val();
            item.index= this.tiIndex.val();

           this.onSave(item);
        }

        private onFileSelected(evt:JQueryEventObject):void{
            var input:any = evt.target;
            var files= input.files;
            console.log(files);
            if(files.length){
                var file:any = files[0];
                var form:FormData = new FormData();
                form.append('file',file);
               this.R.connector.uploadImage(form,'assets','').done((res)=>{
                console.log(res);
                if(res.success) this.imgValue.attr('src',res.result);
               });


            }
        }

        setData(item):LabelEditor{
            this.current= item
            return this;
        }
        renderImage():void{
            this.imgValue.attr('src',this.current.value);
           this.text.hide();
            this.img.show();
        }
        renderText():void{
            this.tiValue.val(this.current.value);
            this.img.hide();
            this.text.show();
        }
        render():LabelEditor{
            var item = this.current;
            if(item.type== 'img') this.renderImage()
            else if(item.type=='text') this.renderText();
            if(this.isSuper){
                this.tiIndex.val(item.index);
                this.select.val(item.type);
            }
            this.tiDescr.val(item.description);

            return this;
        }
        hide():void{
            this.view.hide();
        }
        show():void{
            this.view.show();
        }
        private onSelectChange():void{
            this.current.type=this.select.val();
            this.render();
        }
        private onDeleteClick():void{
            if(!this.current) return;
       var yes =  confirm('You wont to delete '+this.current.description+'?');
            if(yes){
                this.onDelete(this.current);
                this.current= null;
                this.hide();
            }
        }
        R:RegA
        constructor(){
            this.isSuper= false;
            this.R = RegA.getInstance();
            this.view= $('#LabelEditor');
            this.select = this.view.find('[data-id=select]:first').change(()=>this.onSelectChange())
            this.view.find('[data-id=btnClose]').click(()=>{
                this.hide();
                this.current=null;
              //  console.log('click');
            })
            this.img = this.view.find('[data-id=img]:first');
            this.text = this.view.find('[data-id=text]:first');
            this.btnSaveLabel = this.view.find('[data-id=btnSave]').on(CLICK, () => this.onSaveClick());;

           this.tiValue = this.view.find('[data-id=tiValue]:first');
            this.tiDescr = this.view.find('[data-id=tiDescr]:first');
            this.tiIndex = this.view.find('[data-id=tiIndex]:first');
          this.imgValue = this.view.find('[data-id=imgValue]:first');


            this.btnDelete = this.view.find('[data-id=btnDelete]:first').click(()=>this.onDeleteClick());

            this.btnUpload = this.view.find('[data-id=btnUpload]').change((evt)=>this.onFileSelected(evt))


        }
    }

    export class LabelsManager {
        view: JQuery;
        private selected: JQuery;
        private list: JQuery;
        private data:any[];
        private btnAdd:JQuery
        private max:number;
        R:RegA

        constructor(container:JQuery) {
            container.load('js/admin/screen/labelsManager.htm',()=>{this.init()});
            this.R = RegA.getInstance();
        }
        private onAddClick():void{
            this.selectedIndex=-1;
            var id= this.max+1;
            var item={index:'index'+id,description:'',id:id,type:'text',value:''};
            this.editor.setData(item).render().show();
        }

        editor:LabelEditor

        available:string[]=['header','slogan','footer','list-header','list-footer','background','logo'];

        init(){

            this.view = $('#LabelsManager');
            this.btnAdd = this.view.find('[data-id=btnAdd]').click(()=>this.onAddClick())
            var table=$('<table>').addClass('table').appendTo(this.view.find('[data-id=list]:first'));
            table.append('<tr><th>index</th><th>Value</th><th>Edit</th></tr>')
            this.list = $('<tbody>').on(CLICK, 'tr .fa-edit', (evt) => this.onEditClick($(evt.currentTarget))).appendTo(table);
           this.editor = new LabelEditor();
            this.editor.onSave = (data)=>this.saveItem(data);
            this.editor.onDelete = (data)=>this.deleteItem(data)

            var isSuper = false;
            if(isSuper){
                this.editor.isSuper= true;
            }else this.view.find('[data-role=isSuper]').hide();
           this.refreshData();
        }

        private saveItem(data):void{
            if(this.selectedIndex !==-1)  this.data[this.selectedIndex]=data;
            else {
                var id=-1;
               var ar = this.data
               for(var i=0,n=ar.length;i<n;i++){
                   var item = ar[i];
                   if(item.index == data.index){
                       id=i;
                       break;
                   }
               }

                if(id!==-1){
                   var yes =  confirm('You want to override '+ ar[i].description+'? ');
                    if(yes)  this.data[i]= data;
                    else return;
                }else this.data.push(data);

            }

            this.saveLabels();

        }

        private deleteItem(item):void{
            this.data.splice( this.selectedIndex,1);
            this.saveLabels();
        }


        refreshData(){
            //console.log(this.R.settings);
            this.R.connector.getData(this.R.settings.labels).done((res)=>{
             //   console.log(res);
               this.data = JSON.parse(res)
                this.renderLabels();
            });
        }



        private saveLabels():void{
            this.R.connector.saveData(JSON.stringify(this.data),this.R.settings.labels).done((res)=>{
                this.refreshData();
                console.log(res);
            })
        }

        private onSaveClick():void{
            this.saveLabels();
        }

        private renderItem(item:any):string{
            var img=0;
            return '<tr title="'+item.description+'"  data-i="'+item.i+'" class="'+item.type+'" ><td class="index">'+item.index+'</td><td class="value">'+((item.type=='img')?'<img src="'+item.value+'"/>':item.value)+'</td><td><span class=" btn fa fa-edit"></span></td></tr>';
        }
        private renderLabels():void{
           var  ar = this.data;

           // var avail= this.available;
            this.max=0;
            var out='';
           for(var i=0,n=ar.length;i<n;i++){
               var item = ar[i];
               item.i=i;
               //var ind = avail.indexOf(item.index);
             //  if(ind!=-1)avail.splice(ind,1);
               if(item.id>this.max)this.max = item.id;
               out+= this.renderItem(item);
           }
            this.list.html(out);
            this.selectedIndex=-1
           // this.editor.setAvailable(avail)
        }

        private selectedItem:any;


        selectedIndex:number;
        private onEditClick(el:JQuery): void {
            this.selectedIndex=-1;
           var row= el.parent().parent();
            var i:number = Number(row.data('i'));
            if(isNaN(i)) return;
            var item= this.data[i];
            if(!item) return;
           this.selectedIndex = i;
            this.editor.setData(item).render().show()
        }

    }
}



