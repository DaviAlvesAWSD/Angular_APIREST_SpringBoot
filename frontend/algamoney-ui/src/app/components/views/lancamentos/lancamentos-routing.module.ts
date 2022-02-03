import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../seguranca/auth.guard';
import { LancamentosCadastroComponentComponent } from './lancamentos-cadastro-component/lancamentos-cadastro-component.component';
import { LancamentosPesquisaComponentComponent } from './lancamentos-pesquisa-component/lancamentos-pesquisa-component.component';

const routes: Routes = [
    {
      path: 'lancamentos',
      component: LancamentosPesquisaComponentComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_PESQUISAR_LANCAMENTO']}
   },
    {
      path: 'lancamentos/novo',
      component: LancamentosCadastroComponentComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_CADASTRO_LANCAMENTO']}
     },
    {
      path: 'lancamentos/:codigo',
      component: LancamentosCadastroComponentComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_CADASTRO_LANCAMENTO']}
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class LancamentosRoutingModule { }
