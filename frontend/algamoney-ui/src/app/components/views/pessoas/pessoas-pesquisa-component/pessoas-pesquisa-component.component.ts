import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErroHandlerService } from 'src/app/components/core/erro-handler.service';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa-component',
  templateUrl: './pessoas-pesquisa-component.component.html',
  styleUrls: ['./pessoas-pesquisa-component.component.css'],
  providers: []
})
export class PessoasPesquisaComponentComponent implements OnInit {

  pessoas = [ ];
  totalRegistros = 0;
  filtro = new PessoaFiltro();



  @ViewChild('tabela') grid!: Table;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private erroHandlerService: ErroHandlerService
    ){

  }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;
    let resultados: string;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        resultados = resultado.pessoas.nome;
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;

      })
      .catch(erro => {
        this.erroHandlerService.handle(erro, resultados);
      });

  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
          this.excluir(pessoa);
      },
      reject: (type: any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', detail:'Ação rejeitada'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn',  detail:'Ação cancelada'});
              break;
          }
        }
    });
  }

  excluir(pessoa: any){
    this.pessoaService.excluir(pessoa.codigo)
      .then(() =>{
        this.grid.reset();
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Lançamento deletado com sucesso'});
      })
      .catch(erro => {
        this.erroHandlerService.handle(erro, pessoa.nome);
      });
  }

  alternarStatus(pessoa: any): void{
    console.log('teste')
    const novoStatus = !pessoa.ativo;
    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() =>{
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
      })
  }

}
