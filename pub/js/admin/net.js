/// <reference path="models.ts" />
/// <reference path="rega.ts" />
/// <reference path="../../libs/typing/jquery.d.ts" />
/// <reference path="../page/PagesList.ts" />
var uplight;
(function (uplight) {
    var Connector = (function () {
        function Connector() {
            this.service = 'rem/admin.php';
            this.serviceK = 'rem/kiosk.php';
        }
        //// getContentData(callBack: Function, href: string): void {
        //     $.ajax(this.service + href).done(callBack);
        //  }
        // loadFile(filename):JQueryPromise<string>{
        //    return $.get('data/'+filename);
        // }
        // saveTitle(title: string): void {
        //  $.post(this.service + '?a=saveTitle', { title: title });
        // }
        //restartKiosks():JQueryPromise<VOResult> {
        //   return $.get(this.service, { a: 'screen.kiosks_restart' });
        // }
        //////////////////////////Categories/////////////////////////////////////
        Connector.prototype.getCategories = function () {
            return $.get(this.service, { a: 'cats.get_all' }, 'application/json');
        };
        Connector.prototype.deleteCategory = function (id) {
            return $.get(this.service, { a: 'cats.delete', id: id }, 'application/json');
        };
        //addCategory(callBack: Function, label:string): void {
        //  $.get(this.service, { a: 'data.add_category', label: label }, 'application/json').done(callBack);
        // }   
        Connector.prototype.saveCategorySortOrder = function (data) {
            return $.post(this.service + '?a=cats.sortorder', { sort: data }, 'application/json');
        };
        Connector.prototype.saveCategory = function (cat) {
            var data = cat;
            return $.post(this.service + '?a=cats.save', data, 'application/json');
        };
        Connector.prototype.saveCatDests = function (catid, destsIds) {
            return $.post(this.service + '?a=cats.save_cat_dests&id=' + catid, JSON.stringify(destsIds), 'application/json');
        };
        Connector.prototype.getIcons = function () {
            return $.get(this.service + '?a=cats.get_icons', 'application/json');
        };
        ////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////Pages/////////////////////////////////////////
        Connector.prototype.savePageInfo = function (page, callBack) {
            $.post(this.service + '?a=pages.save_info&pageid=' + page.id, page.content).done(callBack);
        };
        Connector.prototype.getPageInfo = function (callBack, pageid) {
            $.get(this.service, { a: 'pages.get_info', pageid: pageid }).done(callBack);
        };
        Connector.prototype.getAllPages = function (callBack) {
            $.get(this.service + '?a=pages.get_all').done(callBack);
        };
        Connector.prototype.savePagesSequence = function (seq, callBack) {
            $.post(this.service + '?a=pages.save_order', { seq: seq }).done(callBack);
        };
        Connector.prototype.deletePage = function (pageid, callBack) {
            $.post(this.service + '?a=pages.delete', { pageid: pageid }).done(callBack);
        };
        Connector.prototype.createPage = function (page, callBack) {
            $.post(this.service + '?a=pages.add', page).done(callBack);
        };
        Connector.prototype.updatePage = function (page, callBack) {
            $.post(this.service + '?a=pages.update', page).done(callBack);
        };
        ///////////////////////////////////
        ////////////////////ImportExport////////////////////
        Connector.prototype.getStatistics = function (from, to) {
            var q = {};
            q.a = 'get_statistics';
            q.from = from;
            q.to = to;
            return $.get(this.service, q);
        };
        Connector.prototype.exportDestination = function () {
            return $.get(this.service + '?a=importexport.get_all');
        };
        Connector.prototype.insertdDestinations = function (data, overwrite) {
            var and = overwrite ? '&overwrite=true' : '';
            return $.post(this.service + '?a=importexport.insert_destinations' + and, JSON.stringify(data));
        };
        Connector.prototype.insertCategories = function (data, overwrite) {
            var and = overwrite ? '&overwrite=true' : '';
            return $.post(this.service + '?a=importexport.insert_categories' + and, JSON.stringify(data));
        };
        Connector.prototype.saveInFile = function (ar, filename) {
            return $.post(this.service + '?a=importexport.save_file&filename=' + filename, JSON.stringify(ar));
        };
        Connector.prototype.uploadCSV = function (form, completeHandler, errorHandler, onProgress) {
            $.ajax({
                url: this.service + '?a=importexport.parse_csv',
                type: 'POST',
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
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
        };
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
        Connector.prototype.uploadDestinationImage = function (form, uid) {
            return $.ajax({
                url: this.service + '?a=dests.dest_image&id=' + uid,
                type: 'POST',
                dataType: 'json',
                data: form,
                cache: false,
                contentType: false,
                processData: false
            });
        };
        Connector.prototype.deleteDestination = function (id) {
            return $.get(this.service + '?a=dests.delete&destid=' + id);
        };
        Connector.prototype.saveDestination = function (vo) {
            // console.log(vo);
            return $.post(this.service + '?a=destination.save', JSON.stringify(vo));
        };
        Connector.prototype.savePages = function (uid, pages) {
            return $.post(this.service + '?a=dests.save_pages&uid=' + uid, pages);
        };
        Connector.prototype.getAdvanced = function (callBack, destid) {
            $.get(this.service + '?a=dests.get_advanced&destid=' + destid).done(callBack);
        };
        Connector.prototype.getDestinations = function () {
            return $.get(this.service + '?a=dests.get_dests'); //.done(callBack);;
        };
        ///////////////////////////////////////////////////////SCREEN/////////////////////////////////////////////
        Connector.prototype.uploadFile = function (form, folder, prefix) {
            return $.ajax({
                url: this.service + '?a=upload_file&folder=' + folder + '&prefix=' + prefix,
                type: 'POST',
                dataType: 'json',
                data: form,
                cache: false,
                contentType: false,
                processData: false
            });
        };
        Connector.prototype.getServerTime = function () {
            return $.get(this.service + '?a=screen.get_server_time');
        };
        Connector.prototype.getData = function (filename) {
            return $.get(this.service + '?a=get_data&file_name=' + filename);
        };
        Connector.prototype.saveData = function (data, filename) {
            console.log('save data ' + filename);
            return $.post(this.service + '?a=save_data&file_name=' + filename, data);
        };
        Connector.prototype.getLabels = function () {
            return $.get(this.service + '?a=screen.get_labels', 'application/json');
        };
        Connector.prototype.getImages = function () {
            return $.get(this.service + '?a=screen.get_images', 'application/json');
        };
        Connector.prototype.saveLabels = function (data) {
            return $.post(this.service + '?a=screen.save_labels', JSON.stringify(data));
        };
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
        Connector.prototype.uploadFile2 = function (form, service, completeHandler, errorHandler, onProgress) {
            //  var data: FormData = new FormData(form);
            $.ajax({
                url: this.service + service,
                type: 'POST',
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
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
        };
        return Connector;
    })();
    uplight.Connector = Connector;
})(uplight || (uplight = {}));
//# sourceMappingURL=net.js.map