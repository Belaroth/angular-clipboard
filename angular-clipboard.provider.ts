import { Directive, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Injectable()
export class AngularClipboardProvider {
    public supported: boolean;

    constructor( @Inject(DOCUMENT) private document: any) {
        this.supported = document.queryCommandSupported('copy')
    }

    public createNode(text: string): HTMLElement {
        var node = document.createElement('textarea');
        node.style.position = 'absolute';
        node.textContent = text;
        node.style.left = '-10000px';
        node.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
        return node;
    }

    public copyNode(node: HTMLElement): void {
        try {
            // Set inline style to override css styles
            document.body.style.webkitUserSelect = 'initial';

            var range = document.createRange();
            range.selectNodeContents(node);
            var selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            if (!document.execCommand('copy')) {
                throw ('failure copy');
            }
        } finally {
            // Reset inline style
            document.body.style.webkitUserSelect = '';
        }
    }

    public copyText(text: string, scope?: any) {
        var node = this.createNode(text);
        document.body.appendChild(node);
        this.copyNode(node);
        document.body.removeChild(node);
    }

    //return {
    //    copyText: copyText,
    //    supported: 'queryCommandSupported' in $document[0] && $document[0].queryCommandSupported('copy')
    //};
}
