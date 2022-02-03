import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../../seguranca/auth.guard';

import { PessoasCadastroComponentComponent } from './pessoas-cadastro-component/pessoas-cadastro-component.component';
import { PessoasPesquisaComponentComponent } from './pessoas-pesquisa-component/pessoas-pesquisa-component.component';

const routes: Routes = [
    {
      path: 'pessoas',
      component: PessoasPesquisaComponentComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_PESQUISAR_PESSOA']}
    },
    {
      path: 'pessoas/novo',
      component: PessoasCadastroComponentComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_CADASTRO_PESSOA']}
    },
    {
      path: 'pessoas/:codigo',
      component: PessoasCadastroComponentComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_CADASTRO_PESSOA']}
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class PessoasRoutingModule { }
