/**
 * Created by VladHome on 12/30/2015.
 */
    ///<reference path='typing/jquery.d.ts' />
    ///<reference path='typing/underscore.d.ts' />
    ///<reference path='Utils.ts' />

module uplight{
    export class SimpleForm extends DisplayObject{

        inputs:HTMLInputElement[];
        ind:_.Dictionary<HTMLInputElement>;
        $submit:JQuery;
        conn:Connector;
        message:string='Form error';
        constructor(public $view,service:string,name?:string){
            super($view,name);
            var ar:string[] = service.split(',');
            if(ar.length===2)  this.conn = new Connector(ar[1],name,ar[0]);
            else this.conn = new Connector(ar[0],name);
        }
        init(){
            this. $view.find( "form" ).submit(function( evt ) { evt.preventDefault(); });
            var ar:HTMLInputElement[]=[];
            var dic:any={};
            this.$view.find('input').each(function(i,el){
                dic[el.getAttribute('name')]=el;
                ar.push(el);
            })
            this.inputs = ar;
            this.ind=dic;
            this.$submit = this.$view.find('[type=submit]').click(()=>this.onSubmitClick())
            this.onInit();
        }
        onInit():void{

        }
        onSubmitClick():void{
            var valid = true;
            var ar = this.inputs;
            var data:any={};
            for(var i=0,n=ar.length;i<n;i++){
                if(!ar[i].checkValidity()) valid = false;
                if(ar[i].type=='checkbox') data[ar[i].name]=ar[i].checked;
                else data[ar[i].name]=ar[i].value;
            }
            if(valid){
                var btn:JQuery = this.$submit.prop('disabled',true);
                setTimeout(function(){
                    btn.prop('disabled',false)
                },3000)
                this.onSubmit(data);
            }
        }
        onComplete(res:VOResult):void{

        }
        onError(res:VOResult):void{
            var msg:string = res.message || this.message
            this.showMessage(msg);
            console.log(msg);
        }
        onResult(res:VOResult):void{
            if(res.success)this.onComplete(res);
            else this.onError(res)
        }

        onRespond(s:string):void{
            var res:VOResult;
            try{
                res = JSON.parse(s);
            }catch (e){
                this.showMessage('Communication Error logged on server <br/> We will contact you soon');
                this.conn.logError('EMAIL'+this.name+this.conn.service+'  '+s);
                //  console.log(s);
                return;
            }
            if(res) this.onResult(res);
        }
        send(obj){
            this.conn.post(obj).done((s:string)=>this.onRespond(s))
        }

        onSubmit(data:any){
            this.send(data);
        }
        timeout:number;
        showMessage(str:string){
            var msg = this.$view.find('[data-id=message]').html(str).removeClass('hidden').fadeIn();
            clearTimeout(this.timeout);
            this.timeout =  setTimeout(function(){ msg.fadeOut(); },5000);
        }


    }

    export class LoginForm extends SimpleForm{
        constructor(public $view,service:string,name?:string){
            super($view,service,name);

        }
        onInit():void{
           var chk:JQuery =  this.$view.find('[name=showpassword]').click(()=>{
                if(chk.prop('checked'))this.ind['password'].type='text';
                else  this.ind['password'].type='password';
            })
        }
        onComplete(res:VOResult):void{

            if(res.success=='loggedin')window.location.href=res.result;
        }
    }
}