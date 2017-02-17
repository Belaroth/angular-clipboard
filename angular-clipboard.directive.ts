import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { AngularClipboardProvider } from './angular-clipboard.provider';


@Directive({
    selector: '[clipboard]'
})
export class AngularClipboardDirective {
    constructor(private el: ElementRef,
        private clipboard: AngularClipboardProvider
    ) {
        this.supported = clipboard.supported;
    }

    public supported: boolean;

    @Input() text: string;
    @Output() onCopied = new EventEmitter();
    @Output() onError = new EventEmitter();

    @HostListener('click') onclick() {
        try {
            this.clipboard.copyText(this.text, this.el);
            if (this.onCopied.observers.length > 0) {
                this.onCopied.emit(null);
            }
        } catch (err) {
            if (this.onError.observers.length > 0) {
                this.onError.emit({ err: err });
            }
        }
    }
}
