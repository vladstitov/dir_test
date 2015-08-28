var TYPING = TYPING || 'typing';
var kiosk;
(function (kiosk) {
    var Main = (function () {
        function Main() {
            this.init();
        }
        Main.prototype.init = function () {
            var _this = this;
            connector.onData = function (data) {
                return _this.onServerData(data);
            };
            connector.getSettings();
            $(window).on('hashchange', function () {
                trace(document.location.hash);
                var hash = document.location.hash;

                //var q: number = hash.indexOf('?');
                connector.getData(hash.substr(1));
            });
            $('#DetailsView .buttonBack').on(CLICK, function (evt) {
                return _this.onDetailsBack();
            });
            $('#Keyboard').on(TYPING, function (evt, data) {
                return _this.onKeyboardTyping(data);
            });
        };
        Main.prototype.onKeyboardTyping = function (pattern) {
        };
        Main.prototype.onDetailsBack = function () {
            $('#DetailsView').hide();
            $('.ListView').show();
        };

        Main.prototype.onServerData = function (data) {
            trace(data);

            switch (data.type) {
                case 'settings':
                    this.onSettings(data.data);
                    connector.getMenu();
                    break;
                case 'menu':
                    $('#Menu-list').html(data.data);
                    break;
                case 'tenants':
                    this.data = data;
                    this.model = data.data;
                    $('.ListView').html(this.renderTenants(data.data));
                    $('.ListView').show();
                    break;
                case 'people':
                    this.data = data;
                    this.model = data.data;
                    $('.ListView').html(this.renderPeople(data.data));
                    $('.ListView').show();
                    break;
                case 'tenant':
                    this.data = data;
                    this.details = data.data;
                    $('.ListView').hide();
                    $('#DetailsContent').html(this.renderTenant(data.data));
                    $('#DetailsView').show();
                    break;
                case 'person':
                    this.data = data;
                    this.details = data.data;
                    $('.ListView').hide();
                    $('#DetailsContent').html(this.renderPerson(data.data));
                    $('#DetailsView').show();
                    break;
            }
        };

        Main.prototype.onSettings = function (data) {
            $('body').css('backgroundImage', 'url(' + data.background + ')');
            var labels = data.labels;
            trace(labels);
            for (var str in labels) {
                $('#' + str).html(labels[str]);
            }
            // trace($(document).triggerHandler('show.ListView',
        };

        Main.prototype.renderTenants = function (data) {
            var str = '<ul>';
            for (var i = 0, n = data.length; i < n; i++) {
                str += '<a href="#data.tenant?id=' + data[i].id + '"><li><span class="name">' + data[i].name + '</span><span class="unit">' + data[i].unit + '</span></li></a>';
            }
            return str + '</ul>';
        };
        Main.prototype.renderPeople = function (data) {
            var str = '<ul>';
            for (var i = 0, n = data.length; i < n; i++) {
                str += '<a href="#data.person?id=' + data[i].id + '"><li><span class="name">' + data[i].name + '</span><span class="unit">' + data[i].unit + '</span></li></a>';
            }
            return str + '</ul>';
        };
        Main.prototype.renderPerson = function (data) {
            var str = '<div id="personDetails" >';
            for (var id in data) {
                str += '<span>' + id + '</span> : <span>' + data[id] + '</span><br/>';
            }

            return str + '</div>';
        };
        Main.prototype.renderTenant = function (data) {
            var str = '<div id="tenatDetails">';
            for (var id in data) {
                str += '<span>' + id + '</span> : <span>' + data[id] + '</span><br/>';
            }
            return str + '</div>';
        };
        return Main;
    })();
    kiosk.Main = Main;
    var VOItem = (function () {
        function VOItem(obj) {
        }
        return VOItem;
    })();
})(kiosk || (kiosk = {}));
var trace = trace;

var k = new kiosk.Main();
