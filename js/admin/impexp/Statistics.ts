/**
 * Created by VladHome on 8/8/2015.
 */
    ///<reference path="../RegA"/>
module uplight{
    export class Statistics{

        R:RegA;
        constructor(contauner:JQuery){
            this.R = RegA.getInstance();
            contauner.load('js/admin/impexp/Statistics.html',()=>this.init());
        }


        private init():void{
           // var today = new Date()
          //  var priorDate = new Date(today.getTime() - 30*24*60*60*1000);
            this.R.connector.getStatistics('-30 days','now').done((res)=>this.onData(res));

        }


        private onData(res:any):void{
            var cats:CategoriesChart  = new CategoriesChart($('#CategoriesChart'),res);
            console.log(res.length);
        }


    }


    class CategoriesChart{
       colors:string[]=['#9F9977','#B2592D','#BDC2C7','#BC8777',' #996398','#839182','#708EB3','#BC749A'];
        list:JQuery;
        constructor(private view:JQuery,private data:any){
               RegA.getInstance().connector.getCategories().done((res)=>this.onCategories(res))
        }


        private onCategories(res){
            var list=$('<ul>');
            var out='';
                var ar = res
                for(var i=0,n=ar.length;i<n;i++){
                    var cat:VOCategory = new VOCategory(ar[i]);
                    cat.color=this.colors[i];
                    out+='<li><span class="glyphicon glyphicon-stop" style="color:'+cat.color+';"></span> <span> '+cat.label+'</span></li>';
                 /// console.log(cat);
                }
           list.html(out);
            this.list= list;
            list.appendTo(this.view.find('[data-id=list]:first'));

            var myPieChart = new Chart(ctx[0]).Pie(data,options);
            //console.log(res);
        }

    }

    class KiosksCart{
        constructor(view:JQuery){

        }
    }

    class DestinationsTable{
        constructor(view:JQuery){

        }
    }

    class SearcheTable{
        constructor(view:JQuery){

        }
    }


}