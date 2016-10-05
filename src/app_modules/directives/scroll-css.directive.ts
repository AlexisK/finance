import {Directive, ElementRef, Input, HostListener, AfterViewInit} from '@angular/core';

@Directive({selector : '[scrollCss]'})
export class ScrollCssDirective implements AfterViewInit {
    @Input() scrollCss: any;


    constructor(private el: ElementRef) {
    }


    ngAfterViewInit() {
        this.normalizeData();
        this.doOnScroll();
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(ev: Event) {
        this.doOnScroll();
    }

    /*
    executes normalized data.
    each function receives 2 values:
        - dom-element
        - boolean, true if scroll position is below marker, false if above
     */
    doOnScroll() {
        for (let k in this.scrollCss) {
            if (document.body.scrollTop > parseFloat(k)) {
                this.scrollCss[k][0](this.el.nativeElement, true);
            } else {
                this.scrollCss[k][1](this.el.nativeElement, false);
            }
        }
    }

    /*
    normalize data so doOnScroll method could just execute.
    normalised data should look like dict, where:
        key - amount of pixels from top(marker)
        value - pair(list.length = 2):
            0: function to execute when we below specified marker
            1: function to execute when we above specified marker
     */
    normalizeData() {
        Object.keys(this.scrollCss).forEach(k => {
            let data = this.scrollCss[k];

            if (data.constructor === String) {
                /*
                 css class received
                 */
                this.scrollCss[k] = [
                    function (node: any) {
                        node.classList.add(data);
                    },
                    function (node: any) {
                        node.classList.remove(data);
                    }
                ];
            } else if (data.constructor === Array) {
                /*
                 pair received, any member could be null
                 */
                data[0] = data[0] || (() => true);
                data[1] = data[1] || (() => true);
            } else if (data.constructor === Function) {
                /*
                 parser received - we don't bother what it does, we execute it all the time
                 */
                this.scrollCss[k] = [data, data];
            } else {
                throw new Error('Unknown type for [scrollCss]');
            }
        });
    }

}
