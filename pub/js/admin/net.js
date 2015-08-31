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
        Connector.prototype.logout = function () {
            return $.post('rem/login.php', { credetials: 'logout' });
        };
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
            return $.post(this.service + '?a=importexport.insert_destinations' + and, data);
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
        Connector.prototype.uploadImage = function (form, folder, prefix) {
            return $.ajax({
                url: this.service + '?a=upload_image&folder=' + folder + '&prefix=' + prefix,
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
        return Connector;
    })();
    uplight.Connector = Connector;
})(uplight || (uplight = {}));
//# sourceMappingURL=net.js.map