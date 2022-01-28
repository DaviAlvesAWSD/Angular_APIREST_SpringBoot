import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
     <p-message severity="error" text="{{ text }}"
          *ngIf="temErro()"></p-message>
  `,
  styles: [`
    .p-message-error {
      margin: 0;
      margin-top: 4px;
      padding: 3px;
    }
  `]
})
export class MessageComponent {

  @Input() error: string = '';
  @Input() control: any;
  @Input() text: string = '';

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }


}
