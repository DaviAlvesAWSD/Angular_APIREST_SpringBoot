import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

import { LancamentosPesquisaComponentComponent } from './lancamentos-pesquisa-component/lancamentos-pesquisa-component.component';
import { LancamentosCadastroComponentComponent } from './lancamentos-cadastro-component/lancamentos-cadastro-component.component';
import { LancamentosGridComponentComponent } from './lancamentos-grid-component/lancamentos-grid-component.component';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { UtilsModule } from '../../utils/utils.module';
import { LancamentoService } from './lancamento.service';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CategoriaService } from '../categorias/categoria.service';
import { ErroHandlerService } from '../../core/erro-handler.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LancamentosPesquisaComponentComponent,
    LancamentosCadastroComponentComponent,
    LancamentosGridComponentComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    ConfirmDialogModule,
    LancamentosRoutingModule,
    RouterModule

  ],
  exports: [],
  providers: [
    ErroHandlerService,
    LancamentoService,
    CategoriaService,
    { provide: LOCALE_ID, useValue: 'pt' },
  ]
})
export class LancamentosModule { }
