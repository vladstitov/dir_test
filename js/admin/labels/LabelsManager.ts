/// <reference path="../RegA.ts" />
module uplight{
    export class LabelsManager {
        view: JQuery;

        private selected: JQuery;
        private list: JQuery;      

        private btnSaveLabel: JQuery;

        private tiValue:JQuery;
        private imgValue:JQuery;

        private labels:any;
        private labelEditor:JQuery
        private btnUpload:JQuery

        R:RegA
        constructor(container:JQuery) {
            container.load('js/admin/labels/labelsManager.htm',()=>{this.init()});
            this.R = RegA.getInstance();
        }
        init(){

            this.view = $('#LabelsManager');
            var table=$('<table>').addClass('table').appendTo(this.view.find('[data-id=list]:first'));
            this.list = $('<tbody>').on(CLICK, 'tr .fa-edit', (evt) => this.onEditClick($(evt.currentTarget))).appendTo(table);


            var editor:JQuery=  this.view.find('[data-id=labelEditor]:first');
           editor.hide();
            editor.find('.fa-close').on(CLICK,()=>{
                $('#cover').hide();
                this.labelEditor.hide()
                this.selectedItem=null
            })
            this.labelEditor = editor;

            this.btnSaveLabel = editor.find('[data-id=btnSave]').on(CLICK, () => this.onSaveLabelClick());;

            this.tiValue = editor.find('input:first');
            this.imgValue = editor.find('img:first');


            var self = this;
            this.btnUpload = editor.find('[data-id=btnUpload]').on(CHANGE, function () {
                self.onFileSelected(this.files);
            });


           this.refreshData();
        }

        private onFileSelected(files:FileList):void{

            if(files.length){
                var file:any = files[0];
                var form:FormData = new FormData();
                form.append('file',file);
               // this.R.connector.uploadTempImage(form).done((res)=>{
                  //  console.log(res);
                  // if(res.success) this.imgValue.attr('src',res.result);

               // });


            }
        }

        refreshData(){
            this.R.connector.getLabels().done((res)=>{
                var ar:any=[]
                for(var str in res){
                    var val =res[str];
                    var vo:any={};
                    if(val.substr(0,5)=='data/')vo.type='image';
                    else vo.type='text';
                    vo.index=str;
                    vo.value = val;
                    ar.push(vo);
                }
                this.renderLabels(ar);
            });
        }

        private onSaveLabelClick():void{
            console.log('save');
            var item= this.selectedItem;
            if(item.type=='image'){
                item.value= this.imgValue.attr('src');
            }else{
                item.value = this.tiValue.val();
            }

            console.log(item);
          this.saveLabels();
        }

        private saveLabels():void{
            var obj:any = {};
           var ar = this.labels
           for(var i=0,n=ar.length;i<n;i++){
              obj[ ar[i].index] = ar[i].value;
            }

            this.R.connector.saveLabels(obj).done((res)=>{
                this.refreshData();
                console.log(res);
            })
        }

        private onSaveClick():void{
            //TODO nea data insert

            this.saveLabels();
        }



        private renderItem(item:any,i):string{
            var img=0;
            return '<tr  data-i="'+i+'" class="'+item.type+'" ><td class="index">'+item.index+'</td><td class="value">'+((item.type=='image')?'<img src="'+item.value+'"/>':item.value)+'</td><td><span class=" btn fa fa-edit"></span></td></tr>';
        }
        private renderLabels(ar:any[]):void{
            this.labels = ar;
            console.log(ar);
            var out='';
           for(var i=0,n=ar.length;i<n;i++){
               out+= this.renderItem(ar[i],i);
           }
            this.list.html(out);
        }

        private selectedItem:any;


        private onEditClick(el:JQuery): void {
           var row= el.parent().parent();
            var i:number = Number(row.data('i'));
            if(isNaN(i)) return;
            var item= this.labels[i];
            if(!item) return;
           this.selectedItem =  item;
            if(item.type=='image'){
                this.labelEditor.addClass('large')
                this.btnUpload.show();
                this.tiValue.hide();
                this.imgValue.attr('src',item.value);
                this.imgValue.show();

            }else{
                this.labelEditor.removeClass('large')
                this.imgValue.hide();
                this.btnUpload.hide();
                this.tiValue.show();
                this.tiValue.val(item.value);
            }
            var cover = $('#cover').show();
            cover.appendTo(this.view).append( this.labelEditor);
            this.labelEditor.show();
        }

    }
}



