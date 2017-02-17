# angular-clipboard

[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Copy text to clipboard by clicking a button, without using Flash. This is using the new [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) and [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent) available in the latest browsers.

Browser support: Chrome 43+, Firefox 41+, Opera 29+ and IE10+.



angular-clipboard has no other dependencies than [Angular](https://angular.io/)
itself.

## Usage

Require angular-clipboard as a dependency for your app:

```javascript
import { AngularClipboardDirective } from './angular-clipboard.directive';
@NgModule({
    declarations: [AngularClipboardDirective]
})
```

Create properties in component for wiring up to the attribute

```javascript
export class MyComponent {
        supported = false;

        textToCopy = 'I can copy by clicking!';

        success(): void {
            console.log('Copied!');
        }

        fail (err : any): void {
            console.error('Error!', err);
        }
}
```

Copy text from an input field by clicking a button:

```html
<input type="text" [(ngModel)]="textToCopy">
<button clipboard supported="supported" [text]="textToCopy" (onCopied)="success()" (onError)="fail(err)">Copy</button>
```

You can supply a method to be called for the `onCopied` and `onError` event. The `onError` function will be called with the error object as argument `err`.

The optional `supported` property can be used to detect browser support for the clipboard feature.

### Use as service

You can also invoke the copy to clipboard action directly by injecting the `clipboard` service. Just remember it has to be in a click event, as clipboard access requires user action.

```javascript
export class MyComponent {
  constructor(private clipboard: AngularClipboardProvider) {
        if (!this.clipboard.supported) {
            console.log('Sorry, copy to clipboard is not supported');
        }

        clickHandler(): void {
            this.clipboard.copyText('Copy this text');
        };
    }]);
```



[travis-image]: https://img.shields.io/travis/omichelsen/angular-clipboard/master.svg
[travis-url]: https://travis-ci.org/omichelsen/angular-clipboard
[coveralls-image]: https://img.shields.io/coveralls/omichelsen/angular-clipboard/master.svg
[coveralls-url]: https://coveralls.io/r/omichelsen/angular-clipboard?branch=master
