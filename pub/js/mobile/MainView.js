var mobile;
(function (mobile) {
    var MainView = (function () {
        function MainView(view, width, height) {
            this.view = view;
            this.width = width;
            this.height = height;
            this.slider = $('<div class="myslider"></div>').width(this.width).css('overflow-x', 'hidden').css('overflow-y', 'auto').height(this.height).appendTo(this.view);
            this.content = $('<div class="mycontent"></div>').width(this.width * 2 + 20).appendTo(this.slider);
        }
        /*
        showView(el: JQuery): void {
        
        this.current = el;
        this.content.append(el);
        if (this.content.children().length > 1) {
        //  console.log('animate   scrollLeft:' + this.width);
        this.slider.animate({ scrollLeft: this.width }, 500, () => {
        el.siblings().remove();
        this.slider.scrollLeft(0);
        });
        }
        }
        
        */
        MainView.prototype.setHeader = function (str) {
            return this;
        };
        MainView.prototype.addFooter = function (footer) {
            if (this.footer)
                this.footer.remove();
            if (footer)
                this.view.append(footer);
            this.footer = footer;
        };
        MainView.prototype.addHeader = function (header) {
            if (this.header)
                this.header.remove();
            if (header)
                this.view.prepend(header);
            this.header = header;
        };
        MainView.prototype.showView = function (el, header) {
            var _this = this;
            if (this.header)
                this.header.prependTo(this.current);
            this.header = null;
            this.current = el;
            this.content.append(el);

            // var el = this.current;
            this.slider.animate({ scrollLeft: this.width }, 500, function () {
                el.siblings().remove();
                if (header) {
                    _this.header = header;
                    header.prependTo(_this.view);
                }
                _this.slider.scrollLeft(0);
            });
        };

        MainView.prototype.showViewBack = function (el, header) {
            var _this = this;
            if (this.header)
                this.header.prependTo(this.current);
            this.header = null;

            if (this.content.children().length > 1) {
                console.log('CHIDREN more then 1');
                this.current.siblings().remove();
            }
            el.show();
            this.current = el;
            this.content.prepend(el);
            this.slider.scrollLeft(this.width);
            this.slider.animate({ scrollLeft: 0 }, this.width, function () {
                el.siblings().remove();
                if (header) {
                    _this.header = header;
                    header.prependTo(_this.view);
                }
            });
        };
        return MainView;
    })();
    mobile.MainView = MainView;
})(mobile || (mobile = {}));
//# sourceMappingURL=mainview.js.map
