/**
 * Created by VladHome on 7/20/2015.
 */
    ///<reference path="../RegA"/>
module uplight{
    export class SettingsEdit{
        view:JQuery
        R:RegA;
        list:JQuery;
        editor:JQuery
        selectedItem:VOItem;
        tiValue:JQuery;
        lblIndex:JQuery
        btnSave:JQuery;
        data:VOItem[];
        selTime:JQuery

            constructor(private container:JQuery){
                container.load('js/admin/screen/SettingsEdit.htm',()=>{setTimeout(()=>{this.init()},50)});
                this.R = RegA.getInstance();

            }
             init(){

            this.view = $('#SettingsEdit');

            var table=$('<table>').addClass('table').appendTo(this.view.find('[data-id=list]:first'));
            this.list = $('<tbody>').on(CLICK, 'tr .fa-edit', (evt) => this.onEditClick(evt)).appendTo(table);


            var editor:JQuery=  this.view.find('[data-id=labelEditor]:first');
            editor.hide();
            editor.find('.fa-close').on(CLICK,()=>{
                $('#cover').hide();
                this.editor.hide()
                this.selectedItem=null
            })
            this.editor = editor;

            this.btnSave = editor.find('[data-id=btnSave]').on(CLICK, () => this.onSaveClick());;

            this.tiValue = editor.find('input:first');
                 this.lblIndex = editor.find('[data-id=lblIndex]')
            var self = this;


                 this.selTime = editor.find('[data-id=selTime]');
                 var out=''
                 var ampm='AM';
                 var m=-1;
                 for(var i=0;i<24;i++){
                    var h=i;
                     if(h==0){
                        h=12;
                     }
                     if(i>11) ampm='PM';
                     if(h>12){
                         h=h-12;

                     }
                    // out+='<option>'+((h<10)?'&nbsp;&nbsp;':'')+h+':00 '+ampm+'</option>';
                    // out+='<option>'+((h<10)?'&nbsp;&nbsp;':'')+h+':30 '+ampm+'</option>';
                     out+='<option>'+h+':00 '+ampm+'</option>';
                     out+='<option>'+h+':30 '+ampm+'</option>';
                 }

                 this.selTime.html(out).on(CHANGE,()=>{

                    this.tiValue.val(this.selTime.val());
                 })

                 this.refreshData();
        }
        private onEditClick(evt:JQueryEventObject):void{
                var el:JQuery=$(evt.currentTarget).parent().parent();
            var i:number = Number(el.data('i'));
            if(isNaN(i)) return;
            var item:any= this.data[i];
            if(!item) return;
            this.selectedItem = item;
            this.openEditor();
        }

        private openEditor():void{
            switch(this.selectedItem.type){
                case 'time':
                    this.tiValue.hide();
                   this.selTime.val(this.selectedItem.value);
                    this.selTime.show();
                    break;
                default :
                    this.tiValue.val(this.selectedItem.value);
                    this.tiValue.show();
                    this.selTime.hide();
                    break;
            }
            this.lblIndex.text(this.selectedItem.label);


            this.editor.show();
        }
        private hideEditor():void{
            this.editor.hide();
        }
        private refreshData():void{
            this.R.connector.getData('settings.json').done((res:string)=>{
               this.data  = JSON.parse(res)
                this.render();
            })
        }
        private renderItem(item:VOItem,i):string{
            var img=0;
            return '<tr  data-id="'+item.id+'" data-i="'+i+'" class="'+item.type+'" ><td class="index">'+item.label+'</td><td class="value">'+item.value+'</td><td><span class=" btn fa fa-edit"></span></td></tr>';
        }
        private render():void{
           var ar = this.data;
            var out='';
            for(var i=0,n=ar.length;i<n;i++){
                out+= this.renderItem(ar[i],i);
            }
           // console.log(out);
            this.list.html(out);
            this.container.show();
        }


        private onSaveClick():void{
            console.log('save');
            this.selectedItem.value= this.tiValue.val();
            this.R.connector.saveData( JSON.stringify(this.data),'settings.json').done((res)=>{
               this.render();
                console.log(res);
            })

        }
    }
}
