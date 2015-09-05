/**
 * Created by VladHome on 6/17/2015.
 */
/// <reference path="../RegA.ts" />
/// <reference path="DetailsCategory.ts" />
/// <reference path="DetailsImages.ts" />
var uplight;
(function (uplight) {
    var DetailsForm = (function () {
        function DetailsForm(form) {
            var _this = this;
            this.haveChanges = true;
            this.view = form;
            this.R = uplight.RegA.getInstance();
            this.pages = $('#details-pages');
            this.name = form.find('[data-id=tiName]:first');
            this.unit = form.find('[data-id=tiUnit]:first');
            this.form = form;
            this.info = form.find('[data-id=info]:first');
            this.details = form.find('[data-id=details]:first');
            this.keywords = form.find('[data-id=keywords]:first');
            this.tmbImg = form.find('[data-id=imgThumbnail]:first');
            this.tmbInput = form.find('[data-id=tmbInput]:first');
            this.tmbInput.on(CHANGE, function (evt) { return _this.onTmbInputChange(evt); });
            this.meta = form.find('[data-id=meta]:first');
            this.uid = form.find('[data-id=uid]:first');
            this.dbid = form.find('[data-id=dbid]:first');
            this.saveBtn = form.find('[data-id=save]:first');
            this.btnAddRow = this.form.find('[data-id=btnAddRow]:first').on(CLICK, function () { return _this.onAddRowClicked(); });
            this.btnDeleteRow = this.form.find('[data-id=btnDeleteRow]:first').on(CLICK, function () { return _this.onDeleteRowClicked(); });
            this.details.on(CLICK, 'tr', function (evt) { return _this.onRowSelected($(evt.currentTarget)); });
            this.categories = new uplight.DetailsCategory(form);
            // this.editor = new nicEditor({ fullPanel: true });
            // this.editor.setPanel('myNicPanel');
            // this.editor.addInstance('details-pages');
            this.imagesEditor = new uplight.DetailsImages($('#DetailsImagesEdit'), $('#images-container'));
            this.imagesEditor.view.find('.fa-close').on(CLICK, function () { return _this.onImageEditorCloseClick(); });
            this.imagesEditor.view.find('[data-id=btnDone]').on(CLICK, function () { return _this.onImageEditorDoneClick(); });
            this.imagesEditor.hide();
            $('#DetailsImages [data-id=btnEfit]:first').on(CLICK, function () { return _this.onEditImagesClick(); });
        }
        DetailsForm.prototype.getDestination = function () {
            if (!this.current)
                return null;
            var vo = this.current;
            vo.name = this.name.val();
            if (vo.name.length < 2) {
                this.R.msg('Name is required', this.name);
                return null;
            }
            vo.unit = this.unit.val() || '';
            vo.info = this.info.val() || '';
            vo.imgs = this.imagesEditor.getData();
            vo.imgsD = this.imagesEditor.getDeleted();
            // vo.cats = this.categories.getCurrent();
            vo.more = this.collectDataFromTable();
            vo.meta = this.meta.val() || '';
            vo.kws = this.keywords.val() || '';
            vo.uid = this.uid.val() || '';
            vo.tmb = this.tmbImg.attr('src');
            var pages = this.pages.html();
            if (pages.length > 20) {
                vo.pgs = 'pages';
                this.pgs = pages;
            }
            else {
                vo.pgs = null;
                this.pgs = null;
            }
            // this.current=vo;
            return vo;
        };
        DetailsForm.prototype.show = function () {
            this.view.show();
            this.render();
        };
        DetailsForm.prototype.focusName = function () {
            this.name.focus();
        };
        DetailsForm.prototype.hide = function () {
            this.view.hide();
        };
        DetailsForm.prototype.reset = function () {
            this.name.val('');
            this.unit.val('');
            this.info.val('');
            this.renderTable('');
            this.categories.reset();
            this.uid.val('');
            this.meta.val('');
            this.dbid.text('');
            this.keywords.val('');
            this.pages.html('');
            this.tmbImg.attr('src', null);
            // this.showItemCategories();
        };
        DetailsForm.prototype.setDestibation = function (vo) {
            this.current = vo;
            this.categories.setCurrent(vo);
            this.imagesEditor.setData(vo);
        };
        DetailsForm.prototype.setID = function (num) {
            this.current.id = num;
            this.dbid.text(num);
        };
        DetailsForm.prototype.onUploadTumb = function (res) {
            this.tmbImg.attr('src', res.result);
            console.log(res);
        };
        DetailsForm.prototype.onTmbInputChange = function (evt) {
            var _this = this;
            var input = evt.target;
            var files = input.files;
            if (files.length) {
                var form = new FormData();
                form.append('file', files[0]);
                this.R.connector.uploadDestinationImage(form, this.current.uid).done(function (res) { return _this.onUploadTumb(res); });
            }
        };
        DetailsForm.prototype.onImageEditorDoneClick = function () {
            this.imagesEditor.render();
            this.view.show();
            this.imagesEditor.hide();
        };
        DetailsForm.prototype.onEditImagesClick = function () {
            this.view.hide();
            this.imagesEditor.show();
        };
        DetailsForm.prototype.onImageEditorCloseClick = function () {
            this.imagesEditor.resetData();
            this.imagesEditor.render();
            this.view.show();
            this.imagesEditor.hide();
        };
        //////////TABLE/////////////////////
        DetailsForm.prototype.onRowSelected = function (el) {
            this.selectedRow = el;
        };
        DetailsForm.prototype.onAddRowClicked = function () {
            this.details.append('<tr><td></td><td>&nbsp;</td></tr>');
        };
        DetailsForm.prototype.onDeleteRowClicked = function () {
            if (this.selectedRow) {
                //if (this.details.children().length < 2) {
                //   this.selectedRow.html('<td>&nbsp;</td><td>&nbsp;</td>');
                //  this.selectedRow = null;
                //  return
                // }
                var tr = this.selectedRow;
                var out = tr.children('td:nth-child(1)').text() + "  " + tr.children('td:nth-child(2)').text();
                var del = true;
                if (out.length > 2) {
                    del = confirm('You want to delete row? \n' + out);
                }
                if (del) {
                    this.selectedRow.remove();
                    this.selectedRow = null;
                }
            }
        };
        DetailsForm.prototype.renderCell = function (label, value) {
            return '<tr><td>' + label + '</td><td>' + value + '</td></tr>';
        };
        DetailsForm.prototype.renderTable = function (details) {
            if (!details)
                details = " ";
            var ar = details.split("\n");
            console.log(ar.length);
            //  console.log('renderTable   ',ar);
            var out = '';
            for (var i = 0, n = ar.length; i < n; i++) {
                var line = ar[i].split("\t");
                out += this.renderCell(line[0] || '', line[1] || '&nbsp');
            }
            this.details.html(out);
        };
        DetailsForm.prototype.collectDataFromTable = function () {
            var list = this.details.children('tr');
            var out = [];
            list.each(function (ind, el) {
                var tr = $(el);
                var str = tr.children('td:nth-child(1)').text() + "\t" + tr.children('td:nth-child(2)').text();
                out.push(str.replace('\u00a0', ''));
            });
            return out.join('\n');
        };
        ////////////////////////////DESTINATION///////////////////////////////////
        DetailsForm.prototype.render = function () {
            if (this.current) {
                var vo = this.current;
                this.name.val(vo.name);
                this.unit.val(vo.unit);
                this.info.val(vo.info);
                this.renderTable(vo.more);
                this.categories.render();
                this.imagesEditor.render();
                this.uid.val(vo.uid);
                this.meta.val(vo.meta);
                this.dbid.text(vo.id);
                this.keywords.val(vo.kws);
                this.pages.html('');
                this.tmbImg.attr('src', vo.tmb);
                if (vo.pgs == 'pages')
                    this.pages.load('data/pages/' + vo.uid + '.htm');
                // this.showItemCategories();
                return true;
            }
            else
                return false;
        };
        DetailsForm.prototype.getDestinationId = function () {
            if (this.current)
                return this.current.id;
            else
                return 0;
        };
        DetailsForm.prototype.getDestinationName = function () {
            if (this.current)
                return this.current.name;
            else
                return null;
        };
        DetailsForm.prototype.getPages = function () {
            return this.pgs;
        };
        return DetailsForm;
    })();
    uplight.DetailsForm = DetailsForm;
})(uplight || (uplight = {}));
//# sourceMappingURL=DetailsForm.js.map