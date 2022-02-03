import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NavbarComponentComponent } from './navbar-component/navbar-component.component';

import { UtilsModule } from '../utils/utils.module';
import { ErroHandlerService } from './erro-handler.service';
import { MessageService } from 'primeng/api';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AuthService } from '../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';


@NgModule({
  declarations: [
    NavbarComponentComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    UtilsModule

  ],
  exports: [
    NavbarComponentComponent
  ],
  providers: [ErroHandlerService,MessageService, AuthService]
})
export class CoreModule { }
