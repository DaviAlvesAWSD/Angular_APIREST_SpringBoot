import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

import { LancamentosPesquisaComponentComponent } from './lancamentos-pesquisa-component/lancamentos-pesquisa-component.component';
import { LancamentosCadastroComponentComponent } from './lancamentos-cadastro-component/lancamentos-cadastro-component.component';
import { LancamentosGridComponentComponent } from './lancamentos-grid-component/lancamentos-grid-component.component';

import { UtilsModule } from '../../utils/utils.module';
import { LancamentoService } from './lancamento.service';

import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    LancamentosPesquisaComponentComponent,
    LancamentosCadastroComponentComponent,
    LancamentosGridComponentComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    ConfirmDialogModule
    
  ],
  exports: [
    LancamentosPesquisaComponentComponent,
    LancamentosCadastroComponentComponent
  ],
  providers: [
    LancamentoService,
    { provide: LOCALE_ID, useValue: 'pt' },
  ]
})
export class LancamentosModule { }
