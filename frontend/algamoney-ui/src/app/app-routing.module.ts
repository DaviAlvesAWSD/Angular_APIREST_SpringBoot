import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './components/core/pagina-nao-encontrada.component';
import { SegurancaRoutingModule } from './components/seguranca/seguranca-routing.module';
import { LancamentosRoutingModule } from './components/views/lancamentos/lancamentos-routing.module';
import { PessoasCadastroComponentComponent } from './components/views/pessoas/pessoas-cadastro-component/pessoas-cadastro-component.component';
import { PessoasPesquisaComponentComponent } from './components/views/pessoas/pessoas-pesquisa-component/pessoas-pesquisa-component.component';
import { PessoasRoutingModule } from './components/views/pessoas/pessoas-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lancamentos',
    pathMatch: 'full'
  },
  {
    path: 'pagina-nao-encontrada',
    component: PaginaNaoEncontradaComponent
  },
  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            LancamentosRoutingModule,
            PessoasRoutingModule,
            SegurancaRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
