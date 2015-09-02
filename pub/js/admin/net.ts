/// <reference path="models.ts" />
/// <reference path="rega.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />
/// <reference path="../page/PagesList.ts" />
module uplight {
    export class Connector {
        service = 'rem/admin.php';
        private serviceK = 'rem/kiosk.php';
       
        public device:any
        public onData: Function;



        logout(){
           return  $.post('rem/login.php', {credetials:'logout'});
        }



        //////////////////////////Categories/////////////////////////////////////
        getCategories(): JQueryPromise<any> {
            return $.get(this.service, {a:'cats.get_all'}, 'application/json');
        }
        deleteCategory(id:number):JQueryPromise<VOResult> {
            return $.get(this.service, { a: 'cats.delete' ,id:id}, 'application/json');
        }
        //addCategory(callBack: Function, label:string): void {
          //  $.get(this.service, { a: 'data.add_category', label: label }, 'application/json').done(callBack);
       // }   

        saveCategorySortOrder(data:any): JQueryPromise<VOResult>{
          return  $.post(this.service + '?a=cats.sortorder', { sort: data }, 'application/json');
        }

        saveCategory(cat:VOCategory): JQueryPromise<VOCategory[]> {
            var data: any = cat;           
           return  $.post(this.service +'?a=cats.save', data, 'application/json');
        }
        saveCatDests(catid:number,destsIds:number[]){
            return  $.post(this.service +'?a=cats.save_cat_dests&id='+catid,JSON.stringify(destsIds), 'application/json');
        }
        getIcons(): JQueryPromise<any[]> {
            return  $.get(this.service +'?a=cats.get_icons', 'application/json');
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////




      //////////////////////////////////////Pages/////////////////////////////////////////

        savePageInfo(page:VOPage, callBack): void {
            $.post(this.service + '?a=pages.save_info&pageid=' + page.id,page.content).done(callBack);
        }
        getPageInfo(callBack: Function, pageid: number): void {

            $.get(this.service, { a: 'pages.get_info', pageid: pageid }).done(callBack);
        }
        getAllPages(callBack:Function) {
          $.get(this.service + '?a=pages.get_all').done(callBack);
        }
        savePagesSequence(seq:number[],callBack: Function) {
            $.post(this.service + '?a=pages.save_order', {seq:seq}).done(callBack);

        }
        deletePage(pageid: number, callBack: Function): void {
            $.post(this.service + '?a=pages.delete', { pageid: pageid }).done(callBack);
        }
        createPage(page:VOPage,callBack): void {
          $.post(this.service + '?a=pages.add',page).done(callBack);
       }
       
        updatePage(page: any, callBack: Function): void {

            $.post(this.service + '?a=pages.update', page).done(callBack);
        }

        ///////////////////////////////////

        ////////////////////ImportExport////////////////////

        getStatistics(from:string,to:string):JQueryPromise<any[]>{
            var q:any={};
            q.a='get_statistics';
            q.from=from;
            q.to=to;
            return $.get(this.service ,q);
        }
        exportDestination() :JQueryPromise<any[]> {
            return $.get(this.service + '?a=importexport.get_all');
        }

        insertdDestinations(data:string,overwrite:boolean):JQueryPromise<VOResult>{
            var and:string=overwrite?'&overwrite=true':'';

            return $.post(this.service + '?a=importexport.insert_destinations'+and,data);
        }

        insertCategories(data:VOCategory[],overwrite:boolean):JQueryPromise<VOResult>{
            var and:string=overwrite?'&overwrite=true':'';
            return $.post(this.service + '?a=importexport.insert_categories'+and,JSON.stringify(data));
        }


        saveInFile(ar:any[],filename:string) :JQueryPromise<any[]> {
           return $.post(this.service + '?a=importexport.save_file&filename='+filename,JSON.stringify(ar));
        }

        uploadCSV(form:FormData, completeHandler: Function, errorHandler: Function, onProgress: Function): void {

            $.ajax({
                url: this.service + '?a=importexport.parse_csv',  //Server script to process data
                type: 'POST',
                xhr: function () {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) { // Check if upload property exists
                        myXhr.upload.addEventListener('progress', onProgress, false);
                    }
                    return myXhr;
                },
                // Form data
                data: form,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false
            }).done(completeHandler).fail(errorHandler);

        }

        //////////////////////////////Destinations///////////////////
       
        
       // saveCatDests(callBack: Function, data: {}): void {
        //    $.post(this.service + '?a=dests.saveCatDests', data).done(callBack);
       // }
               
      //  addDests(callBack: Function, data: {}): void {
        //    $.post(this.service + '?a=dests.add', JSON.stringify(data)).done(callBack);
       // }

       // overWriteDests(callBack: Function, data: {}): void {
         //   $.post(this.service + '?a=dests.overwrite', JSON.stringify(data)).done(callBack);
       // }

        dropTable(table:string): JQueryPromise<VOResult>{
            return $.get(this.service + '?a=dests.drop_table&table='+table);
        }

        uploadDestinationImage(form: FormData, uid:string): JQueryPromise<VOResult> {
           return  $.ajax({
                url: this.service+'?a=dests.dest_image&id='+uid,  //Server script to process data
                type: 'POST',
                dataType: 'json',
                data: form,
                cache: false,
                contentType: false,
                processData: false
            });
        }
        deleteDestination(id:number) :JQueryPromise<any> {
            return $.get(this.service + '?a=dests.delete&destid='+id);
        }
        saveDestination(vo:VODestination):JQueryPromise<VOResult> {
                    // console.log(vo);

            return $.post(this.service + '?a=destination.save', JSON.stringify(vo));
        }
        savePages( uid: string,pages:string):JQueryPromise<VOResult> {

            return $.post(this.service + '?a=dests.save_pages&uid=' + uid,pages);
        }
        getAdvanced(callBack: Function, destid: number): void {
            $.get(this.service + '?a=dests.get_advanced&destid=' + destid).done(callBack);
        }              
       
        getDestinations(): JQueryPromise<VODestination[]> {
           return $.get(this.service+'?a=dests.get_dests');//.done(callBack);;
        }

        
        ///////////////////////////////////////////////////////SCREEN/////////////////////////////////////////////
        uploadImage(form: FormData, folder:string,prefix:string): JQueryPromise<VOResult> {
            return  $.ajax({
                url: this.service+'?a=upload_image&folder='+folder+'&prefix='+prefix,  //Server script to process data
                type: 'POST',
                dataType: 'json',
                data: form,
                cache: false,
                contentType: false,
                processData: false
            });
        }
        getServerTime():JQueryPromise<string>{
            return $.get(this.service + '?a=screen.get_server_time');
        }


        getData(filename:string) :JQueryPromise<string> {

            return $.get(this.service + '?a=get_data&file_name='+filename);
        }
        saveData(data:string, filename:string):JQueryPromise<VOResult>{
            console.log('save data '+filename);
           return $.post(this.service + '?a=save_data&file_name='+filename,data);
        }

        getLabels():any {
            return $.get(this.service + '?a=screen.get_labels','application/json');
        }

        getImages():any {
            return $.get(this.service + '?a=screen.get_images','application/json');
        }

        saveLabels(data:any):JQueryPromise<VOResult>{
          return  $.post(this.service + '?a=screen.save_labels', JSON.stringify(data));

        }
       // getScreenSaver(callBack: Function): void {
         //   $.get(this.service + '?a=screen.get_screensaver').done(callBack);
       // }
       // saveScrenSaver(data: any, callBack: Function): void {
         //   $.post(this.service + '?a=screen.screensaver', JSON.stringify(data)).done(callBack);
       // }
       // getColor(callBack): void {
        //    $.get(this.service + '?a=screen.get_color').done(callBack);
       // }
       // saveColor(data: {}, callBack): void {
        //    $.post(this.service + '?a=screen.save_color', data).done(callBack);
       // }

       // getMessages(callBack): void {
        //    $.get(this.service + '?a=screen.get_messages').done(callBack);
       // }
       // saveMessages(data: string, callBack): void {
       //     $.post(this.service + '?a=screen.save_messages', data).done(callBack);
       // }
       // getBanner(callBack: Function): void {
         //   $.get(this.service + '?a=screen.get_banner').done(callBack);
       // }
       // saveBanner(data: any, callBack: Function): void {
        //    $.post(this.service + '?a=screen.save_header', data).done(callBack);
       // }
       /// getSettings(callBack: Function): void {
       //     $.get(this.serviceK+'?a=get_settings').done(callBack);
       // }
       // saveSettings(callBack: Function,data:string): void {

         //   $.post(this.service + '?a=screen.save_settings',data).done(callBack);
       // }


       /// uploadAttractLoop(form: any, completeHandler: Function, errorHandler: Function, onProgress: Function) {
        //    this.uploadFile(form, '?a=screen.upload_al', completeHandler, errorHandler, onProgress);
      //  }
      ///  getAllAttractLoopss(callBack: Function): void {
      //      $.get(this.service + '?a=screen.get_all_AL').done(callBack);
      //  }

        //saveSetting(sett: string, data: any, callBack: Function): void {
        //    $.post(this.service + '?a=screen.save_setting.' + sett, JSON.stringify(data)).done(callBack);
        //}
        ////////////////////////////////Labels////////////////////////////
        /*

        deleteImage(url: string, callBack: Function): void {
            var data: any = RegA.getInstance().device;
            data.deleteMediaUrl = url;
            // data.a = 'screen.deleteMedia';
            $.post(this.service + '?a=screen.deleteMedia', data).done(callBack);
        }

        saveBackground(url: string, callBack: Function): void {
            var data: any = RegA.getInstance().device;
            data.newBackground = url;
            $.post(this.service + '?a=screen.newBackground', data, 'application/json').done(callBack);
        }

       // uploadBackgroundLibrary(form: any, completeHandler: Function, errorHandler: Function, onProgress: Function): void {
           // this.uploadFile(form, '?a=screen.bg_upload', completeHandler, errorHandler, onProgress);
       // }

       // uploadTempFile(formname: string, completeHandler: Function, errorHandler: Function, onProgress: Function): void {
        //    this.uploadFile(<HTMLFormElement>document.getElementById(formname),'?a=screen.upload_temp' , completeHandler, errorHandler, onProgress);
       //}

        saveImageIndex(filename:string,index:string):JQueryPromise<VOCategory[]>{
            var data:any={};
            data.a='screen.save_image_index';
            data.file_name=filename;
            data.index=index;
            return $.get(this.service,data);
        }

       uploadTempImage(data:FormData): JQueryPromise<VOCategory[]> {
           //console.log('uploadTempImage    ',data);
           return  $.ajax({
                url: this.service+'?a=screen.upload_image',  //Server script to process data
                type: 'POST',
                dataType: 'json',
                data: data,
                cache: false,
                contentType: false,
                processData: false
            });

        }
*/
       /* private uploadFile2(form:HTMLElement, service: string, completeHandler: Function, errorHandler: Function, onProgress: Function): void {
          //  var data: FormData = new FormData(form);
            $.ajax({
                url: this.service + service,  //Server script to process data
                type: 'POST',
                xhr: function () {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                   if (myXhr.upload) { // Check if upload property exists
                        myXhr.upload.addEventListener('progress', onProgress, false);
                   }
                   return myXhr;
                },
                // Form data
              //  data: data,
                //Options to tell jQuery not to process data or worry about content-type.
               cache: false,
               contentType: false,
               processData: false
            }).done(completeHandler).fail(errorHandler);

        }
*/

    }
}

