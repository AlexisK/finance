import {Directive, ElementRef, Input, AfterViewInit, OnChanges} from '@angular/core';

import {helpers} from 'utils';
import {textConfig} from 'config';

class EllipsisSettings {
    public maxHeight: number;
    public splitter: string;
    public suffix: string;
}

@Directive({selector : '[textEllipsis]'})
export class TextEllipsisDirective implements AfterViewInit, OnChanges {
    @Input() textEllipsis: EllipsisSettings;

    private partsMap: string[];
    private splitter: string;
    private suffix: string;
    private maxHeight: number;

    private recalcTimes         = 0;
    private recalcInterval: any = null;


    constructor(private el: ElementRef) {
    }

    normalizeInput() {
        this.splitter  = this.textEllipsis.splitter || ' ';
        this.suffix    = this.textEllipsis.suffix || '';
        this.maxHeight = this.textEllipsis.maxHeight || 0;
    }

    optimiseSpace(parts: string[]) {
        if (this.recalcTimes < textConfig.ellipsis.limitRecalcPerTimeFrame) {
            // This is to block infinite loop if app crashes (could happen during development)
            this.recalcTimes += 1;
            clearInterval(this.recalcInterval);
            this.recalcInterval = setTimeout(() => (this.recalcTimes = 0), textConfig.ellipsis.timeFrame);

            this.el.nativeElement.textContent = parts.join(this.splitter) + this.suffix;
            if (this.el.nativeElement.offsetHeight > this.maxHeight) {
                this.optimiseSpace(parts.slice(0, parts.length - 1));
            }
        } else {
            throw new Error('TextEllipsisDirective exceeded the limit of calculations per second');
        }
    }

    ngAfterViewInit() {
        this.partsMap = this.el.nativeElement.textContent.split(this.splitter);
        this.normalizeInput();
        helpers.waitToRender().then(() => this.optimiseSpace(this.partsMap));
    }

    ngOnChanges() {
        this.normalizeInput();
        if (this.splitter) {
            helpers.waitToRender().then(() => this.optimiseSpace(this.partsMap));
        }
    }
}
