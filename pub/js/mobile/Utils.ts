/**
 * Created by VladHome on 9/20/2015.
 */
    /// <reference path="../Mobile.ts" />
module uplight{
    export class Utils{
        static checkValue(val:string):string{
            if(!val || val.length===0)return '&nbsp;';
            var re= /\S+@\S+\.\S+/;
            if(re.test(val)) return '<a href="mailto:'+val+'">'+val+'</a>';
            if(val.match(/\d/g).length===10) return '<a href="tel:'+val+'">'+val+'</a>';

            return val;
        }
       static createTable(more:string):string{
            if(more.length===0) return '';
            var ar = more.split("\n");
            var out:string='<div class="more" ><table class="table">';

            for(var i=0,n=ar.length;i<n;i++){
                var item = ar[i].split('\t');
                out+='<tr><td>'+(item[0]||'&nbsp;')+'</td><td>'+Utils.checkValue(item[1])+'</td></tr>';
            }

            out+='</table></div>';
            return out;
        }

        static renderDetails(vo: VODestination):string{
            var out='<div class="details">';
            if(vo.info)out+='<div class="uinfo">'+vo.info+'</div>';
            out+=Utils.createTable(vo.more);
            if(vo.tmb)out+='<div class="tmb"><img src="'+vo.tmb+'"/></div>';
            return out+'</div>';
        }


        static renderItem(item: VODestination,catsObj:any): string {
            var cl: string='';
            var cats:string=(item.cats && item.cats.length)?catsObj[item.cats[0]]:'fa-fw';
            if(item.imgs)cl+=' imgs';
            // if(item.more)cl+=' more';
            //   if(item.info)cl+=' uinfo';
            //  if(item.tmb)cl+=' tmb';
            var more='';
            if(cl.length)more='<span class="anim btn fa fa-angle-double-right"></span>'



            //  if (item.advanced) cl = ' more-data"  href="#Details/'+item.destid+'"';
            // else if ((item.email.length + item.phone.length + item.website.length) >20 ) cl= ' more-data" href="#Details/'+item.destid+'"';
            //  var prf:string=cl.length==1?'':'+ ';
            return '<li  class="list-group-item" data-id="'+item.id+'"  ><a  data-type="dest"  data-id="'+item.id+'" ><span class="fa '+cats+'">&nbsp;</span> <span>'+ item.name + ' </span> '+more+'<span class="pull-right">' + item.unit + '</span></a></li>';

        }

    }

}