import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-cadastro-component',
  templateUrl: './lancamentos-cadastro-component.component.html',
  styleUrls: ['./lancamentos-cadastro-component.component.css'],
  providers: [MessageService]
})
export class LancamentosCadastroComponentComponent {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [
    { label: 'Alimentação', value: 1 },
    { label: 'Transporte', value: 2 },
  ];

  pessoas = [
    { label: 'João da Silva', value: 4 },
    { label: 'Sebastião Souza', value: 9 },
    { label: 'Maria Abadia', value: 3 },
  ];


  constructor(
    private messageService: MessageService
    ) {}

  salvar(form: NgForm){
    if(form.status != "INVALID"){

      this.messageService.add({severity:'success', summary:' SUCESSO ', detail:'Lançamento registrado com sucesso'});

      console.log(form.value);


      form.reset();

    }

  }

}
