/**
 * Created by VladHome on 7/11/2015.
 */
    /// <reference path="Registry.ts" />
module uplight{
    export class SearchController{

        private data:DestModel[];
        constructor(private all:DestModel[]){
                this.data=all
        }
        getFiltered():DestModel[]{
            return this.data;
        }
    }
}