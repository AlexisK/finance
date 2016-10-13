import {Directive, ElementRef, Input, HostListener, Renderer} from '@angular/core';

const captureLimit = 7;

/**
 * Directive for capturing swipe events.
 * Can handle horizontal and vertical swipes separately, both optional
 * Intercepted swipe (the one that has handler assigned to) prevents further event propagation and handling.
 *
 * It's functional is not separated into external service because this is only place it is used.
 */

interface SwipeInput {
    x?: Function;
    y?: Function;
    xFinish?: Function;
    yFinish?: Function;
}

@Directive({selector : '[swipe]'})
export class SwipeDirective {
    private isDragging      = false;
    private savedOffset     = [0, 0];
    private currentOffset   = [0, 0];
    private dragAxis        = 0; // 0 - none, 1 - x axis, 2 - y axis
    private dragAxisMapping = {
        0 : 'captureState',
        1 : 'swipeX',
        2 : 'swipeY'
    };
    @Input() swipe: SwipeInput;

    constructor(private el: ElementRef, renderer: Renderer) {
        renderer.listen(el.nativeElement, 'touchstart', this.onDragStart.bind(this));
    }


    private _getData(index: number) {
        let data     = {
            from : this.savedOffset[index],
            to   : this.currentOffset[index]
        };
        data['diff'] = data.to - data.from;
        return data;
    }

    // Drag workers
    /**
     * When user drags element it uses either captureState, or captureState-defined method to handle event.
     * This behaviour lets work with separate handlers for different swipe directions
     * Right now it recognizes either horizontal or vertical swipe.
     */
    captureState(ev: TouchEvent): any {
        if ( this.swipe.x && this.swipe.y ) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        let diff = Math.abs(this.savedOffset[0] - this.currentOffset[0]);
        if (diff >= captureLimit) {
            // x axis swipe
            this.dragAxis = 1;
            return null;
        }
        diff = Math.abs(this.savedOffset[1] - this.currentOffset[1]);
        if (diff >= captureLimit) {
            // y axis swipe
            this.dragAxis = 2;
        }
        return null;
    }

    swipeX(ev: TouchEvent) {
        if (this.swipe.x) {
            this.swipe.x(this._getData(0));
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    swipeY(ev: TouchEvent) {
        if (this.swipe.y) {
            this.swipe.y(this._getData(1));
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    // Drag handling
    onDragStart(ev: TouchEvent) {
        if (!this.isDragging && ev.touches.length === 1) {
            this.savedOffset = [ev.touches[0].clientX, ev.touches[0].clientY];
            this.isDragging  = true;
        }
    }

    @HostListener('touchmove', ['$event'])
    onDragMove(ev: TouchEvent) {
        if (this.isDragging) {
            this.currentOffset[0] = ev.touches[0].clientX;
            this.currentOffset[1] = ev.touches[0].clientY;
            this[this.dragAxisMapping[this.dragAxis]](ev);
        }
    }

    @HostListener('touchend', ['$event'])
    onDragEnd(ev: TouchEvent) {
        if (this.isDragging) {
            if (this.dragAxis === 1 && this.swipe.xFinish) {
                this.swipe.xFinish(this._getData(0));
                ev.preventDefault();
                ev.stopPropagation();
            } else if (this.dragAxis === 2 && this.swipe.yFinish) {
                this.swipe.yFinish(this._getData(1));
                ev.preventDefault();
                ev.stopPropagation();
            }
            this.dragAxis   = 0;
            this.isDragging = false;
        }
    }
}
