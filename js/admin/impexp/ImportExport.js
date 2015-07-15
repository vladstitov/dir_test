/// <reference path="../RegA.ts" />
var uplight;
(function (uplight) {
    var ImportExport = (function () {
        function ImportExport(container) {
            var _this = this;
            this.R = uplight.RegA.getInstance();
            // if(!this.R.vo)this.R.vo = new DestinantionsModel();
            container.load('js/admin/impexp/ImportExport.htm', function () {
                _this.init();
            });
            // this.init();
        }
        ImportExport.prototype.init = function () {
            ///  trace('ImportExport init');
            var _this = this;
            this.view = $('#ImportExport');
            this.tableView = $('#ImportExport #table-container');
            this.table = $('<table>').addClass('table table-bordered').appendTo(this.tableView);
            this.tbody = $('<tbody>').appendTo(this.table);
            this.total = this.view.find('[data-id=total]');
            this.tbody.on(CLICK, 'tr', function (evt) { return _this.onItemClick(evt); });
            this.btnDel = this.view.find('[data-id=btnDel]').on(CLICK, function () { return _this.onDelClicked(); });
            // this.viewAddOver = this.viewWiz.find('[data-id=addover]').eq(0);
            this.rdAdd = this.view.find('[data-id=rdAdd]:first');
            this.rdOver = this.view.find('[data-id=rdOver]:first');
            this.btnUpload = this.view.find('[data-id=btnUpload]').on(CLICK, function () { return _this.onUploadClicked(); });
            this.btnDownload = this.view.find('[data-id=btnDownload]'); //.on(CLICK,()=>this.onDownloadClick());
            this.btnDownload.attr('href', this.R.connector.service + '?a=importexport.export_CSV');
            var self = this;
            this.btnSelect = this.view.find('[data-id=btnImport]').on(CHANGE, function () {
                self.onFileSelected(this.files);
            });
            this.table.append(this.renderHead());
            this.getData();
        };
        ImportExport.prototype.onCategories = function (res) {
            this.categories = res;
        };
        ImportExport.prototype.getData = function () {
            var _this = this;
            this.R.connector.getCategories().done(function (res) { return _this.onCategories(res); });
            this.R.connector.exportDestination().done(function (res) { return _this.onDataComplete(res); });
        };
        ImportExport.prototype.onError = function (res) {
        };
        ImportExport.prototype.renderHead = function () {
            return '<thead><th>UID</th><th>Name</th><th>unit</th><th>Info</th><th>Categories</th>' + '<th>Keywords</th><th>Table</th><th>Pages</th><th>Meta</th></thead><tbody>';
        };
        ImportExport.prototype.renderItem = function (item, i) {
            return '<tr data-i="' + i + '"><td>' + item.uid + '</td><td>' + item.name + '</td><td>' + item.unit + '</td><td>' + item.info + '</td><td>' + item.cats + '</td><td>' + item.kws + '</td><td>' + item.more + '</td><td>' + item.pgs + '</td><td>' + item.meta + '</td></tr>';
        };
        ImportExport.prototype.onDataComplete = function (ar) {
            this._data = ar;
            console.log(ar);
            this.renderData();
        };
        ImportExport.prototype.renderData = function () {
            var out = '';
            var ar = this._data;
            for (var i = 0, n = ar.length; i < n; i++)
                out += this.renderItem(ar[i], i);
            this.tbody.html(out);
            this.total.text(n);
        };
        ImportExport.prototype.checkHeaders = function (ar) {
        };
        ImportExport.prototype.getCategoryId = function (label) {
            var ar = this.categories;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].label == label)
                    return ar[i].id;
            }
            return 0;
        };
        ImportExport.prototype.addNewCategory = function (str) {
            if (this.newCategories.indexOf(str) === -1)
                this.newCategories.push(str);
        };
        ImportExport.prototype.checkCatigories = function (str) {
            if (str.length < 3)
                return;
            var ar = str.split(',');
            for (var i = 0, n = ar.length; i < n; i++) {
                if (this.getCategoryId(ar[i]))
                    ;
                else
                    this.addNewCategory(ar[i]);
            }
        };
        ImportExport.prototype.onUploadTempComplete = function (res) {
            var ar = res;
            var out = [];
            this.checkHeaders(res.shift());
            this.newCategories = [];
            for (var i = 1, n = ar.length; i < n; i++) {
                var item = ar[i];
                this.checkCatigories(item[4]);
                out.push({ uid: item[0], name: item[1], unit: item[2], info: item[3], cats: item[4], kws: item[5], more: item[6], pgs: item[7], meta: item[8] });
            }
            this._data = out;
            this.renderData();
            if (this.newCategories.length)
                alert('New categories will be added: ' + "\n" + this.newCategories.join("\n"));
        };
        ImportExport.prototype.onFileSelected = function (files) {
            var _this = this;
            //  var file: File = files[0];
            console.log(files);
            if (files.length != 1) {
            }
            else {
                var form = new FormData();
                form.append('file', files[0]);
                this.R.connector.uploadCSV(form, function (res) { return _this.onUploadTempComplete(res); }, this.onError, this.onProgress);
            }
            // console.log(file);
        };
        ImportExport.prototype.createCategories = function (ar, start) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                var cat = new uplight.VOCategory({ id: 0 });
                cat.label = ar[i];
                cat.icon = '';
                cat.enable = 1;
                cat.type = 0;
                cat.sort = i + start;
                out.push(cat);
            }
            return out;
        };
        ImportExport.prototype.collectCategories = function () {
            var cats = [];
            var ar = this._data;
            for (var i = 0, n = ar.length; i < n; i++) {
                if (ar[i].cats.length < 4)
                    continue;
                var ar2 = ar[i].categories;
                for (var i2 = 0, n2 = ar2.length; i2 < n2; i2++) {
                    if (cats.indexOf(ar2[i2]) === -1)
                        cats.push(ar2[i2]);
                }
            }
            return this.createCategories(cats, 1);
        };
        ImportExport.prototype.convertCategories = function (ar) {
            var out = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(this.getCategoryId(ar[i]));
            }
            return out;
        };
        ImportExport.prototype.onNewCategories = function (res) {
            this.categories = res;
            this.sendData();
        };
        ImportExport.prototype.sendData = function () {
            var ar = this._data;
            for (var i = 0, n = ar.length; i < n; i++) {
                var item = ar[i];
                item.cats = this.convertCategories(item.categories);
            }
            var is_overwrite = this.rdOver.prop(CHECKED);
            this.R.connector.insertdDestinations(ar, is_overwrite);
        };
        ImportExport.prototype.uploadNewCategories = function () {
            var _this = this;
            var is_overwrite = this.rdOver.prop(CHECKED);
            console.log('is_overwrite ' + is_overwrite);
            var ar;
            if (is_overwrite)
                ar = this.collectCategories();
            else
                ar = this.createCategories(this.newCategories, this.categories.length);
            console.log(ar);
            this.R.connector.insertCategories(ar, is_overwrite).done(function (r) {
                console.log('insertCategories   ', r);
                _this.R.connector.getCategories().done(function (res) { return _this.onNewCategories(res); });
            });
        };
        ImportExport.prototype.onUploadClicked = function () {
            console.log('uploding');
            if (this.newCategories.length)
                this.uploadNewCategories();
            else
                this.sendData();
        };
        ImportExport.prototype.onUploadComplete = function (res) {
            console.log(res);
            if (res.result) {
                this.R.alert('Complete', this.btnUpload);
                this._data = null;
                //this.reset();
                this.getData();
                this.R.model.refreshData();
            }
        };
        /*
         private renderData(data:VODestination[]): void {
             var out: string = '<thead><th>id</th><th>Name</th><th>Unit</th><th>Personal info</th><th>Categories</th></thead><tbody>';
             for (var i = 0, n = data.length; i < n; i++) out += this.renderItem(data[i]);
             out += '</tbody>';
             this.table.html(out);
         }
         
 
         private renderItem(item: VODestination): string {
 
             return '<tr data-id="' + item.destid + '"><td>' + item.destid + '</td><td>' + item.name + '</td><td>' + item.unit + '</td><td>' + item.personal + '</td><td>' + item.cats + '</td></tr>';
         }
          
         private onExportClick(evt): void {
 
             var el: HTMLElement = document.getElementById('tblDest');
 
           document.execCommand('SaveAs', true, 'directrories.html');
            
 
             var file = {
                 worksheets: [[]], // worksheets has one empty worksheet (array)
                 creator: 'Electronic Directory', created: new Date(),
                 lastModifiedBy: 'Interactive Directory', modified: new Date(),
                 activeWorksheet: 0
             }
             var w:any = file.worksheets[0]; // cache current worksheet
             w.name = "DirectoriesData";
             $('#tblDest').find('tr').each(function () {
                 var r = w.push([]) - 1; // index of current row
                 $(this).find('td').each(function () { w[r].push(this.innerText); });
             });
 
 
            // trace(file.worksheets);
 
           trace(xlsx(file).base64);
 */
        //   }
        ImportExport.prototype.onImportClick = function (evt) {
            var _this = this;
            this.R.connector.uploadTempFile('uploadFile', function (res) { return _this.onUploadComplete(res); }, null, this.onProgress);
            $('#ImportExport progress').show();
        };
        ImportExport.prototype.onProgress = function (evt) {
            console.log(evt);
            if (evt.lengthComputable) {
            }
        };
        ImportExport.prototype.onDelClicked = function () {
            if (this.btnDel.hasClass(DISABLED))
                return;
            // console.log(this.table.find('.selected').each);
            var data = this._data;
            $(this.table.find('.selected').get().reverse()).each(function (ind, el) {
                if (el.rowIndex) {
                    data.splice(el.rowIndex - 1, 1);
                    $(el).remove();
                }
            });
            //  this.renderData(this._data);
        };
        ImportExport.prototype.onItemClick = function (evt) {
            if (this.btnDel.hasClass(DISABLED))
                return;
            var el = evt.currentTarget;
            el.classList.toggle('selected');
        };
        return ImportExport;
    })();
    uplight.ImportExport = ImportExport;
})(uplight || (uplight = {}));
//# sourceMappingURL=ImportExport.js.map