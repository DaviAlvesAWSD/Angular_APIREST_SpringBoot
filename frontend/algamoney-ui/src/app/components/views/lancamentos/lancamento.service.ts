import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 3;
}
@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamento';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      let params = new HttpParams()
          .set('page', filtro.pagina)
          .set('size', filtro.itensPorPagina);


      if(filtro.descricao){
        params = params.set('descricao', filtro.descricao);
      }

      if(filtro.dataVencimentoInicio){
        params = params.set('dataVencimentoDe',  moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
      }

      if(filtro.dataVencimentoFim){
        params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
      }



    return this.http.get(`${this.lancamentoUrl}?resumo`, {headers, params})
      .toPromise()
      .then((response: any) =>{
        if(response){

          const resultado = {
            lancamentos: response['content'],
            total: response['totalElements']
          };

          return resultado;
        }else{

          const resultado = {
            lancamentos: null,
            total: null
          }

          return resultado;
        }

       })
      .catch( e => {
        return Promise.reject(e);
      });
  }

  excluir(codigo: number): Promise<void>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.delete<void>(`${this.lancamentoUrl}/${codigo}`, { headers })
      .toPromise();
  }

}
