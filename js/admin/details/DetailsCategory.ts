/**
 * Created by VladHome on 6/18/2015.
 */
/// <reference path="../RegA.ts" />
module uplight{
    export class DetailsCategory{
        view:JQuery
        haveChanges:boolean;
        private categories:JQuery
        private categoriesAll:JQuery;
        private model:VOCategory[];
        R:RegA
        private current:number[];


        render():void{
            if(!this.model) this.createModel();
            var ar = this.current;
            var ind= this.indexed;
            var out=[];
            for(var i=0,n=ar.length;i<n;i++){
                out.push(ind[ar[i]].label);
            }
            this.categories.val(out);
        }

        reset():void{
            this.hideEditCategories();
            this.categories.val('');
            this.current=null;
        }
        constructor(view:JQuery){

            this.view = view;
            this.R = RegA.getInstance();
            this.categories = view.find('[data-id=categories]:first').on('click', ()=>this.showHideCategories());
            this.categoriesAll = $('#details-categories-list').on('click', 'input', (evt)=>this.onCategoryClick($(evt.currentTarget))).hide();
        }


        private createModel():void{
            this.model= this.R.model.getCategories();
            var ar = this.model;
            var ind={};
            for(var i=0,n=ar.length;i<n;i++){
                ind[ar[i].id]=ar[i];
            }
            this.indexed=ind;
        }
        setCurrent(ar:number[]):void{
            this.current=ar;
            this.hideEditCategories();
        }

        getCurrent():number[]{
            return this.current;
        }
        private catsVisible:boolean;
        private indexed:any;


        private hideEditCategories():void {
            if (this.catsVisible) {
                this.categoriesAll.hide('fast');
                this.catsVisible = false;
            }
        }

        private showEditCategories():void {
            if (this.catsVisible) return
            this.categoriesAll.show('fast');
            this.catsVisible = true;
        }

        private showHideCategories():void {
            if (this.catsVisible) this.hideEditCategories();
            else {
                this.editCategories();
                this.showEditCategories();
            }
        }


        private showItemCategories() {
            var ar:number[] = this.current
            var out:string[] = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var item:VOCategory = this.R.model.getCategoryById(ar[i]);
                if (item) out.push(item.label);
            }
            this.categories.val(out.join(', '));
        }

        private addCategory(cat:VOCategory):void {
            var id:number = cat.id
            if (this.current.indexOf(id) === -1) {
                this.current.push(id);
                this.showItemCategories();
                this.haveChanges = true;
            }
        }

        private removeCategory(cat:VOCategory):void {
            var id:number = cat.id
            var ind = this.current.indexOf(id);
            if (ind !== -1) {
                this.current.splice(ind, 1);
                this.showItemCategories();
                this.haveChanges = true;
            }
        }


        private onCategoryClick(el:JQuery) {
            var cat:VOCategory = this.R.model.getCategoryById(el.val());
            if (el.prop('checked')) this.addCategory(cat);
            else this.removeCategory(cat);
        }

        private editCategories():void {
            if (!this.current){
                this.current=[];
                this.renderAllCats();
                return;
            }

            var ar1:VOCategory[] = []
            var ar2:VOCategory[] = []
            var cats:VOCategory[] = this.R.model.getCategories();

            var catsAr:number[] = this.current;

            for (var i = 0, n = cats.length; i < n; i++) {
                if (catsAr.indexOf(cats[i].id) == -1) ar2.push(cats[i]);
                else ar1.push(cats[i]);
            }
            var out:string = this.renderCats(ar1, true);
            out += this.renderCats(ar2, false);
            this.categoriesAll.html(out);
        }

        private renderAllCats():void{
            this.categoriesAll.html(this.renderCats(this.model,false));
        }
        private renderCats(cats:VOCategory[], selected:boolean):string {
            var out:string = '';
            // out += '<li ' +( selected?'class="selected" >':'>')+ cats[i].label + '<input class="unit" type="checkbox" value="' + cats[i].catid + '" ' + (selected?'checked="true"':'')+'/></li>';
            for (var i = 0, n = cats.length; i < n; i++) {
                out += '<div><input type="checkbox" value="' + cats[i].id + '" ' + (selected ? 'checked="true"' : '') + '/><label>' + cats[i].label + '</label></div>';
            }
            return out;
        }

    }
}