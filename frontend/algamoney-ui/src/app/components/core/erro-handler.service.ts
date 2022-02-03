import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErroHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
    ) { }

  handle(errorResponse: any, nome: any){
    let msg = errorResponse.error[0] ? errorResponse.error[0].mensagemDesenvolvedor : 'null';
    let msgStr: String = msg.toString();
    let SQLIntegrityConstraintViolationException: string = 'SQLIntegrityConstraintViolationException: Cannot delete or update a parent row: a foreign key constraint fails (`algamoneyapi`.`lancamento`, CONSTRAINT `lancamento_ibfk_2` FOREIGN KEY (`codigo_pessoa`) REFERENCES `pessoa` (`codigo`))';
    let PessoaInexistenteOuInativaException: string = 'com.example.algamoney.api.service.exception.PessoaInexistenteOuInativaException';

    //ExceptionHandle Machine
    switch(msgStr){
      case PessoaInexistenteOuInativaException:

        this.exceptionHandlePessoaInexistenteOuInativaException(errorResponse,nome);
        break;
      case SQLIntegrityConstraintViolationException:

        this.exceptionHandleSQLIntegrityConstraintViolationExceptionParent(errorResponse, nome);
        break;
      default:
        this.handleException(errorResponse);
    }
  }

  // general ExceptionHandle
  handleException(errorResponse: any){
    let msg: string;
    let msgH: any;
    if(typeof errorResponse === 'string'){
      msg = errorResponse;

    }else if (errorResponse instanceof NotAuthenticatedError) {


      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    }
    else{
      msg = 'Erro ao processar serviço. Tente novamente!';

     if(errorResponse.error[0] && errorResponse.status >= 400 && errorResponse.status < 500){
          msgH = errorResponse.error[0].mensagemUsuario;
       }
     else if(errorResponse.error.error == "Not Found" && errorResponse.status >= 400 && errorResponse.status < 500){
          msgH = "Erro na solicitação";
      }
     else if(!errorResponse.status){
          msgH = "Erro na porta";
      }
     else{
          msgH = "Erro no servidor";
      }

    }


    this.messageService.add({severity:'error', summary: msgH , detail: msg });


  }

    // PessoaInexistenteOuInativaException
    exceptionHandlePessoaInexistenteOuInativaException(errorResponse: any, nome: any){
      let msg: string = '';
      let msgH: any;

      if(typeof errorResponse === 'string'){
        msg = errorResponse;
      }
      else{

        msg = 'error ao processar serviço. Pessoa inativa!';
        msgH = errorResponse.error[0] ? errorResponse.error[0].mensagemUsuario : 'Error';
      }

      this.messageService.add({severity:'error', summary: msgH , detail: msg });

    }

  // SQLIntegrityConstraintViolationExceptionParentException
  exceptionHandleSQLIntegrityConstraintViolationExceptionParent(errorResponse: any, nome: any): any{
    let msg: string = '';
    let msgH: any;

    if(typeof errorResponse === 'string'){
      msg = errorResponse;
    }
    else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499){

      msg = `error ao processar serviço. ${nome} possui um lançamento registrado!`;
      msgH = errorResponse.error[0] ? errorResponse.error[0].mensagemUsuario : 'Error';
    }

    this.messageService.add({severity:'error', summary: msg , detail: msgH });
  }

}
