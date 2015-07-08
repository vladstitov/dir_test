/**
 * Created by VladHome on 6/20/2015.
 */

/// <reference path="../rega.ts" />

///<reference path="CategoryInListing.ts" />
///<reference path="CategoryList.ts" />
///<reference path="CategoryNotListing.ts" />


module uplight{
   export class CategoryListing{

    view:JQuery;
       isVisible:boolean
       R:RegA


       current:VOCategory
       private notInListing:CategoryNotListing;
       private inListing:CategoryInListing;
       private list:CategoryList


       private btnAdd:JQuery
       private btnDel:JQuery;
       private btnSave:JQuery


    constructor(container:JQuery){

        this.R=RegA.getInstance();
        var that=this;
        if(!this.R.model)this.R.model = new DestinantionsModel();
        container.load('js/admin/categories/CategoryListing.htm',function(){that.init();})

        }

       init():void{
           this.view=$('#CategoryListing');
           var tools= this.view;
          // this.show();

           this.inListing = new CategoryInListing($('#CategoryInListing'));
           this.list=new CategoryList($('#CategoryList'));
           this.list.dispatcher.on(this.list.CATEGORY_SELECTED,(evt,cat)=>this.onCategorySelected(cat))
           this.notInListing = new CategoryNotListing($('#CategoryNotListing'));

           this.btnAdd = tools.find('[data-id=btnAdd]:first').on(CLICK,()=> this.onAddClicked());

           this.btnSave = tools.find('[data-id=btnSave]:first').on(CLICK,()=> this.onSaveClicked());




       }

       private onCategorySelected(cat:VOCategory):void{
           //console.log(cat);
           this.inListing.setCurrent(cat);

           this.inListing.render();
           this.notInListing.setCurrent(cat);
           this.notInListing.render();

       }

       private onAddClicked():void{
           this.list.hide();
           this.notInListing.show();
       }

       private onSave(res):void{
           console.log(res);
       }
       private onSaveClicked():void{
           console.log('save');
           var ids:number[] = this.inListing.getAllIds();
           var catid:number = this.inListing.getCatId();
           this.R.model.saveCategoryListing(catid,ids,(res)=>this.onSave(res))


       }


}
}