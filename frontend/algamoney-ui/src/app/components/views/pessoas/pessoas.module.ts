import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasPesquisaComponentComponent } from './pessoas-pesquisa-component/pessoas-pesquisa-component.component';
import { PessoasCadastroComponentComponent } from './pessoas-cadastro-component/pessoas-cadastro-component.component';

import { UtilsModule } from '../../utils/utils.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PessoaService } from './pessoa.service';
import { RouterModule } from '@angular/router';
import { PessoasRoutingModule } from './pessoas-routing.module';


@NgModule({
  declarations: [
    PessoasPesquisaComponentComponent,
    PessoasCadastroComponentComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    ConfirmDialogModule,
    PessoasRoutingModule


  ],
  exports: [ ],
  providers: [PessoaService]
})
export class PessoasModule { }
