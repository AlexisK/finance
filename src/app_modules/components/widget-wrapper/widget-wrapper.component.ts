import {Component, Input, AfterViewInit, EventEmitter} from '@angular/core';

import {FormsService} from 'services';

const yStep = 40;
const xStep = 80;

@Component({
    selector    : 'finance-widget-wrapper',
    templateUrl : './widget-wrapper.component.html',
    styleUrls   : ['./widget-wrapper.component.scss']
})

export class WidgetWrapperComponent implements AfterViewInit {
    private isSwiping = false;

    private offsetY     = 0;
    private offsetYinit = 0;
    private offsetYmax  = yStep;
    private offsetX     = 0;
    private offsetXinit = 0;
    private offsetXmax  = xStep;

    @Input() icon      = '';
    @Input() iconColor = '';
    @Input() lines     = 1;
    @Input() model: string;
    @Input() item: any;
    @Input() backValue: string;

    constructor(private formsService: FormsService) {
    }

    ngAfterViewInit() {
        this.offsetYmax = (this.lines - 1) * yStep;
    }

    get swipeRules() {
        return {
            x       : this.swipeX.bind(this),
            xFinish : this.swipeXfinish.bind(this),
            y       : this.swipeY.bind(this),
            yFinish : this.swipeYfinish.bind(this)
        };
    }

    swipeX(pos: any) {
        this.offsetX   = Math.min(this.offsetXmax, Math.max(0, this.offsetXinit + pos.diff));
        this.isSwiping = true;
    }

    swipeXfinish(pos: any) {
        let diff     = this.offsetX % xStep;
        this.offsetX = this.offsetXinit = this.offsetX - diff;
        if (diff > xStep / 2) {
            this.offsetX = this.offsetXinit = this.offsetX + xStep;
        }
        this.isSwiping = false;
    }

    swipeY(pos: any) {
        this.offsetY   = Math.min(this.offsetYmax, Math.max(0, this.offsetYinit - pos.diff));
        this.isSwiping = true;
    }

    swipeYfinish(pos: any) {

        let diff     = this.offsetY % yStep;
        this.offsetY = this.offsetYinit = this.offsetY - diff;
        if (diff > yStep / 2) {
            this.offsetY = this.offsetYinit = this.offsetY + yStep;
        }
        this.isSwiping = false;
    }
}
