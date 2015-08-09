/**
 * Created by VladHome on 7/7/2015.
 */

    ///<reference path="../RegA"/>
module uplight {
    export class RestartKiosk {
        R:RegA
        view:JQuery
       // data:any;
        kiosks:VOKiosk[];
        templates:any[];

        btnRestart:JQuery
        editHeader:JQuery
        selTemplate:JQuery
        private dialogName:JQuery;
        private tiName:JQuery;
        private list:JQuery;

        private selectedItem:VOKiosk;

        private filename:string ='kiosks.json';
        private s_time:number;

        constructor(private container:JQuery) {
            this.R = RegA.getInstance();
            container.load('js/admin/screen/KiosksEdit.html',()=>this.init());
        }

        private init():void{
             this.R.connector.getServerTime().done((res)=>this.onServerTime(res));
            this.view = $('#KiosksEdit');
            this.view.find('[data-id=btnAll]:first').on(CLICK,()=>this.onAllClick());
            this.view.find('[data-id=btnRestart]:first').on(CLICK,()=>this.onRestartClick());
            this.view.find('[data-id=btnDelete]:first').on(CLICK,()=>this.onDeleteClick());
            this.view.find('[data-id=btnCreate]:first').on(CLICK,()=>this.onCreateClick());
            this.view.find('[data-id=btnEdit]:first').on(CLICK,()=>this.onEditClick());
            this.view.find('[data-id=btnClose]').on(CLICK,()=>this.onCloseClick());
            this.view.find('[data-id=btnSave]:first').on(CLICK,()=>this.onSaveClick());
            this.editHeader = this.view.find('[data-id=editHeader]:first');
            this.selTemplate = this.view.find('[data-id=selTemplate]:first');
            this.tiName = this.view.find('[data-id=tiName]:first');
            this.list = this.view.find('[data-id=list]:first');

            console.log(this.selTemplate);
        }





        private onSaveClick():void{
            if(!this.selectedItem) {
                    var k= new VOKiosk({});
               var ar = this.kiosks;
                var max=1;
               for(var i=0,n=ar.length;i<n;i++) if(ar[i].id>max) max=ar[i].id;
               k.id=max+1;
                k.name = this.tiName.val();
                k.template=this.selTemplate.val();
                k.status='new';
                this.kiosks.push(k);
            }else{
                this.selectedItem.name = this.tiName.val();
                this.selectedItem.template=this.selTemplate.val();
            }

            this.save();
            this.hidePanel();
        }
        private hidePanel():void{
            $('#kioskEditPanel').fadeOut();
        }
        private showPanel():void{
            $('#kioskEditPanel').fadeIn();
        }
        private onCloseClick():void{
            this.hidePanel();
        }
        private onServerTime(res):void{
            this.s_time= Number(res);
           this.loadData();
        }

        private loadData():void{
            this.R.connector.getData(this.filename).done((res)=>this.onData(res));
        }
        private makeTemplates(ar:any[]):void{
            var out:string='';
            for(var i=0,n=ar.length;i<n;i++){
                out+='<option value="'+ar[i].value+'">' +ar[i].label+'</option>';
            }
            this.selTemplate.html(out);
        }
        private onData(res:string):void{
           console.log(res);
            var data = JSON.parse(res);
            var s_time=this.s_time;

            var ar =  data.kiosks ||[]
            var out='';
            var ks:VOKiosk[]=[];
            for(var i=0,n=ar.length;i<n;i++){
                var k:VOKiosk = new VOKiosk(ar[i]);
                ks.push(k);
                out+=this.createDevice(k,s_time);
            }
            this.kiosks = ks;
            this.templates = data.templates;
            this.makeTemplates(data.templates);
            this.list.html(out) ;
        }


        private onEditClick():void{
            var ar = this.collectChecked();
            if(ar.length ===0 ){
                alert('Please select checkbox in line you want to edit');
                return;
            }

            this.selectedItem = this.getKioskById(ar[0]);

            this.editHeader.text('Edit Kiosk');
            this.tiName.val(this.selectedItem.name);
            this.selTemplate.val(this.selectedItem.template);
            this.showPanel();

        }

        private onCreateClick():void{
            this.selectedItem=null;
            this.editHeader.text('New Kiosk');
            this.tiName.val('');
            this.showPanel();

        }

        private onDataSaved(res):void{
            console.log(res);
            this.loadData();

        }

        private save():void{

            var out:any={};
            out.kiosks= this.kiosks;
            out.templates=this.templates;

            this.R.connector.saveData(JSON.stringify(out),this.filename).done((res)=>this.onDataSaved(res));
        }

        private collectChecked():any[]{
            var out=[]
            this.view.find('table input').each(function(ind,el){
                if($(el).prop('checked'))out.push($(el).data('id'))
            })
            return out;
        }
        private onRestartClick():void{
            var ar = this.collectChecked();

            if(ar.length ===0 ){
                alert('Please select checkbox in line you want to Restart');
                return;
            }
            if(confirm('You want to Restart '+this.getKioskNames(ar).toString()+'?')){
                this.restartKiosks(ar);
            }
        }
        private restartKiosks(ids:number[]):void{
            var ar:VOKiosk[] = this.kiosks;
            for(var i=ar.length-1;i>=0;i--){
                if(ids.indexOf(ar[i].id)!==-1) ar[i].status='restart';
            }
            this.save();
        }

       private getKioskById(id:number):VOKiosk{
           var ar = this.kiosks;
           for(var i=0,n=ar.length;i<n;i++) if(ar[i].id==id) return ar[i] ;
           return null;
       }
        private deleteKiosks(ids:number[]):void{
            var ar:VOKiosk[] = this.kiosks;
            for(var i=ar.length-1;i>=0;i--){
                if(ids.indexOf(ar[i].id)!==-1) ar.splice(i,1);
            }
            this.save();
        }
        private getKioskNames(ar:number[]):string[]{
            var out=[];
            for(var i=0,n=ar.length;i<n;i++){
                var k:VOKiosk = this.getKioskById(ar[i]);
                if(k)  out.push(k.name);
            }
            return out
        }
        private onDeleteClick():void{
            var ar = this.collectChecked();

            if(ar.length ===0 ){
                alert('Please select checkbox in line you want to delete');
                return;
            }
            if(confirm('You want to Delete '+this.getKioskNames(ar).toString()+'?')){
                        this.deleteKiosks(ar);
            }
        }

        private onAllClick(){
          var isOn;
            this.view.find('table input').each(function(ind,el){
               if(ind===0) isOn = !$(el).prop('checked');
                $(el).prop('checked',isOn);
            })


        }

        private createDevice(obj:VOKiosk,s_time:number):string{
               // console.log(obj);
           var timer= (obj.timer/1000);
            timer+=timer*0.1;
            var last_server_time= obj.S_time;
            var delta=s_time-last_server_time;
            var isOK=0;
            if(delta<timer)isOK=1;
            return '<tr>' +
                '<td><input type="checkbox" data-id="'+obj.id+'" /> </td>' +
                '<td>'+obj.name+'</td>' +
                '<td><a target="_blank" href="'+obj.template+'?kiosk='+obj.id+'&mode=preview" ><span class="fa fa-external-link"></span></a></td>' +
                '<td>'+obj.status+'</td>' +
                '<td>'+isOK+'</td>' +
                '<td>'+obj.ip+'</td>' +
                '<td>'+obj.ping+'</td>' +
                '<td class="text-right">'+new Date(obj.start_at*1000).toLocaleString()+'</td>' +
                '<td class="text-right">'+new Date(obj.K_time*1000).toLocaleString()+'</td>' +
                '</tr>';


        }

        //restart():void{
         /////   var yes:boolean = confirm('Tou want to restart kiosks?');
          //  if(yes) this.R.connector.restartKiosks().done((res)=>this.onResult(res))
       // }

       // private onResult(res:VOResult):void{
       //     console.log(res);
       // }



    }

     class VOKiosk{
         constructor(obj:any){for(var str in obj ) this[str] = obj[str];}
         id:number;
         name:string;
         status:string;
         S_time:number=0;
         K_time:number=0;
         ip:string='';
         ping:number=0;
         start_at:number=0;
         timer:number=15000;
         template:string;

     }

}