import { Component, Input, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { LancamentoFiltro } from '../lancamento.service';
import { LancamentosPesquisaComponentComponent } from '../lancamentos-pesquisa-component/lancamentos-pesquisa-component.component';

@Component({
  selector: 'app-lancamentos-grid-component',
  templateUrl: './lancamentos-grid-component.component.html',
  styleUrls: ['./lancamentos-grid-component.component.css']
})
export class LancamentosGridComponentComponent {

    @Input() lancamentos:any[] = [];
    @Input() filtro:any = new LancamentoFiltro();
    @Input() totalRegistros = 0;

    @ViewChild('tabela') grid!: Table;

    constructor(private lancamentosPesquisaComponentComponent: LancamentosPesquisaComponentComponent){ }

    // essa função vai ser chamada ao clicar no botão logo em seguida chamando a função certa no outro component
    aoMudarPagina(event: LazyLoadEvent){
      const pagina = event!.first! / event!.rows!;

      this.lancamentosPesquisaComponentComponent.pesquisar(pagina);
    }

    // essa função vai ser chamada ao clicar no botão logo em seguida chamando a função certa no outro component
    aoExcloir(lancamento: any, grid = this.grid){
      const value = {
        grid: grid,
        lanc: lancamento
      };
      
      this.lancamentosPesquisaComponentComponent.confirmarExclusao(value);
    }



}
