/**
 * Created by VladHome on 7/7/2015.
 */

    ///<reference path="../RegA"/>
module uplight {
    export class RestartKiosk {

        R:RegA

        view:JQuery
        data:any;
        btnRestart:JQuery
        private s_time:number;

        constructor(private container:JQuery) {
            this.R = RegA.getInstance();
            this.R.connector.getServerTime().done((res)=>this.onServerTime(res));

        }

        private onServerTime(res):void{
            this.s_time= Number(res);
            console.log(this.s_time);
            this.R.connector.getData('track.json').done((res)=>this.onData(res));
        }
        private onData(res:string):void{
            //console.log(res);
            var out='<div class="panel panel-default">' +
                '<div class="panel-heading">' +
                '<div class="btn" data-id="btnRestart"><div class="fa fa-refresh"></div> <span> Restart</span></div>' +
                '<div class="btn" data-id="btnDelete"><div class="fa fa-minus"></div> <span> Delete</span></div>' +
                '</div>' +
                '<div class="panel-body"><table class="table"><thead><tr>' +
                '<th class="btn" data-id="btnAll">All</th>' +
                '<th>Name</th>' +
                '<th>Status</th>' +
                '<th>Icon</th>' +
                '<th>IP</th>' +
                '<th>Ping</th>' +
                '<th class="text-center">Started At</th>' +
                '<th class="text-center">Last ping at</th>' +
                '</tr></thead><tbody>';
            var s_time=this.s_time;
           var data= JSON.parse(res);
            for(var str in data) out+=this.createDevice(str,data[str],s_time);
            out+='</tbody></table></div></div>';
            this.data= data;
            this.view = $('<div>').attr('id','Devices').addClass('row').html(out).appendTo(this.container);
            console.log(this.view);
            this.view.find('[data-id=btnAll]:first').on(CLICK,()=>this.onAllClick());
            this.view.find('[data-id=btnRestart]:first').on(CLICK,()=>this.onRestartClick());
            this.view.find('[data-id=btnDelete]:first').on(CLICK,()=>this.onDeleteClick());


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
            console.log('Restart ',ar);

        }

        private onDeleteClick():void{
            var ar = this.collectChecked();
            console.log('Delete',ar);
        }

        private onAllClick(){
          var isOn;
            this.view.find('table input').each(function(ind,el){
               if(ind===0) isOn = !$(el).prop('checked');
                $(el).prop('checked',isOn);
            })


        }

        private createDevice(id:string,obj:any,s_time:number):string{
               // console.log(obj);
           var timer= (obj.timer/1000);
            timer+=timer*0.1;
            var last_server_time= obj.S_time;
            var delta=s_time-last_server_time;
            var isOK=0;
            if(delta<timer)isOK=1;
            return '<tr>' +
                '<td><input type="checkbox" data-id="'+id+'" /> </td>' +
                '<td>'+obj.name+'</td>' +
                '<td>'+obj.status+'</td>' +
                '<td>'+isOK+'</td>' +
                '<td>'+obj.ip+'</td>' +
                '<td>'+obj.ping+'</td>' +
                '<td class="text-right">'+new Date(obj.start_at*1000).toLocaleString()+'</td>' +
                '<td class="text-right">'+new Date(obj.K_time*1000).toLocaleString()+'</td>' +
                '</tr>';


        }

        restart():void{
            var yes:boolean = confirm('Tou want to restart kiosks?');
            if(yes) this.R.connector.restartKiosks().done((res)=>this.onResult(res))
        }

        private onResult(res:VOResult):void{
            console.log(res);
        }



    }

}