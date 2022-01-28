import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErroHandlerService {

  constructor( private messageService: MessageService) { }

  handle(errorResponse: any, nome: any){
    console.log(errorResponse);
    let msg = errorResponse.error[0] ? errorResponse.error[0].mensagemDesenvolvedor : 'null';
    let msgStr: String = msg.toString();
    let SQLIntegrityConstraintViolationException: string = 'SQLIntegrityConstraintViolationException: Cannot delete or update a parent row: a foreign key constraint fails (`algamoneyapi`.`lancamento`, CONSTRAINT `lancamento_ibfk_2` FOREIGN KEY (`codigo_pessoa`) REFERENCES `pessoa` (`codigo`))';

    //ExceptionHandle Machine
    switch(msgStr){
      case SQLIntegrityConstraintViolationException:

        this.exceptionHandleSQLIntegrityConstraintViolationExceptionParent(errorResponse, nome);
        console.log(errorResponse.error[0].mensagemDesenvolvedor);
        break;

      default:

        this.handleException(errorResponse);
        // console.log(errorResponse.error[0].mensagemDesenvolvedor);
    }
  }

  // general ExceptionHandle
  handleException(errorResponse: any){
    let msg: string;
    let msgH: any;

    if(typeof errorResponse === 'string'){
      msg = errorResponse;
    }
    else{
      msg = 'error ao processar serviço. Tente novamente!';

      // msgH = errorResponse.error[0] && errorResponse.Status >= 400 && errorResponse.Status < 500 ? errorResponse.error[0].mensagemUsuario  : 'Error no Servidor' ;
     if(errorResponse.error[0] && errorResponse.status >= 400 && errorResponse.status < 500){
       msgH = errorResponse.error[0].mensagemUsuario;
     }
     else if(errorResponse.error.error == "Not Found" && errorResponse.status >= 400 && errorResponse.status < 500){
        msgH = "Error";
     }
     else if(!errorResponse.status){
      msgH = "Error na porta";
     }
     else{
       msgH = "Error no servidor";
     }

      // console.log(errorResponse);
    }


    this.messageService.add({severity:'error', summary: msgH , detail: msg });


  }

  // SQLIntegrityConstraintViolationExceptionParentException
  exceptionHandleSQLIntegrityConstraintViolationExceptionParent(errorResponse: any, nome: any){
    let msg: string;
    let msgH: any;

    if(typeof errorResponse === 'string'){
      msg = errorResponse;
    }
    else{
      msg = `error ao processar serviço. ${nome} possui um lançamento registrado!`;
      msgH = errorResponse.error[0] && errorResponse.status >= 400 && errorResponse.status < 500 ? errorResponse.error[0].mensagemUsuario : 'Error';
      // console.log(errorResponse);
    }

    this.messageService.add({severity:'error', summary: msgH , detail: msg });
  }

}
