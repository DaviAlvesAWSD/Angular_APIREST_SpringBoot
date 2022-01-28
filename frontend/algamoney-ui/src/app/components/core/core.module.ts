import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NavbarComponentComponent } from './navbar-component/navbar-component.component';

import { UtilsModule } from '../utils/utils.module';
import { ErroHandlerService } from './erro-handler.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    NavbarComponentComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,

  ],
  exports: [
    NavbarComponentComponent
  ],
  providers: [ErroHandlerService,MessageService]
})
export class CoreModule { }
