import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import {ConfirmationService, ConfirmEventType, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErroHandlerService } from 'src/app/components/core/erro-handler.service';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa-component',
  templateUrl: './lancamentos-pesquisa-component.component.html',
  styleUrls: ['./lancamentos-pesquisa-component.component.css'],
  providers: [ ConfirmationService]
})
@Injectable()
export class LancamentosPesquisaComponentComponent implements OnInit {



  lancamentos = [ ];
  totalRegistros: number = 0;
  filtro = new LancamentoFiltro();



  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private erroHandlerService: ErroHandlerService
  ){}

  ngOnInit(): void{

  }

  //Get Request
  pesquisar(pagina = 0): void{
      this.filtro.pagina = pagina;
      let resultados: string;

      this.lancamentoService.pesquisar(this.filtro)
        .then(resultado => {
            resultados = resultado.lancamentos.nome;
            this.totalRegistros = resultado.total;
            this.lancamentos = resultado.lancamentos;
          })
        .catch(erro => {
          this.erroHandlerService.handle(erro, resultados);
        });
    }


    confirmarExclusao(value: any): void {
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
            this.excluir(value);
        },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejeitado', detail:'Ação rejeitada'});
                    console.log(type);
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Ação cancelada'});
                    console.log(type);
                break;
            }
          }
      });
    }


  // Delete Request
  excluir(value: any){
    this.lancamentoService.excluir(value.lanc.codigo)
      .then(() => {
        value.grid.reset();
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Lançamento deletado com sucesso'});
      })
      .catch(erro => {
        this.erroHandlerService.handle(erro, value.nome);
      });
    }

  }

