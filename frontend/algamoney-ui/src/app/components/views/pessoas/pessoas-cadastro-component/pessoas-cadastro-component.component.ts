import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoas-cadastro-component',
  templateUrl: './pessoas-cadastro-component.component.html',
  styleUrls: ['./pessoas-cadastro-component.component.css'],
  providers: [MessageService]
})
export class PessoasCadastroComponentComponent {

  constructor(
    private messageService: MessageService
  ) { }

  salvar(form: NgForm){
    if(form.status != "INVALID"){

      this.messageService.add({severity:'success', summary:' SUCESSO ', detail:'pessoa registrada com sucesso'});

      console.log(form.value);

      form.reset();

    }

  }

}
