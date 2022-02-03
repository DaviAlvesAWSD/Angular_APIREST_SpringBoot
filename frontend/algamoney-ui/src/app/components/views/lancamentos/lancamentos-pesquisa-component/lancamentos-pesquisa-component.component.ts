import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {ConfirmationService, ConfirmEventType, Message, MessageService } from 'primeng/api';
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
    private erroHandlerService: ErroHandlerService,
    private route: ActivatedRoute,
    private title: Title  ){}

  ngOnInit(): void{
    this.title.setTitle('Pesquisa de Lançamentos');
  }

  //Get Request
  pesquisar(pagina = 0): void{
      this.filtro.pagina = pagina;
      const nome = ''

      this.lancamentoService.pesquisar(this.filtro)
        .then(resultado => {
            this.totalRegistros = resultado.total;
            this.lancamentos = resultado.lancamentos;
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
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Ação cancelada'});
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

