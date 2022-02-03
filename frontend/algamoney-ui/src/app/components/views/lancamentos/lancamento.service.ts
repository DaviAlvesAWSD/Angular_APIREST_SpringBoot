import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { Lancamento } from '../../utils/model';


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

//====================================POST request=============================================================
  adicionar(lancamento: Lancamento): Promise<Lancamento>{

    return <Promise<Lancamento>> this.http.post<Lancamento>(this.lancamentoUrl, lancamento)
    .toPromise();
  }

  //====================================GET request=============================================================
  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get(`${this.lancamentoUrl}/${codigo}`)
      .toPromise()
      .then((response:any) => {
        this.converterStringsParaDatas([response]);

        return response ? response : null;
      });
  }

  private converterStringsParaDatas(lancamentos: any[]) {

    for (const lancamento of lancamentos) {

      lancamento.dataVencimento = new Date(lancamento.dataVencimento);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(lancamento.dataPagamento);
      }
    }
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any>{

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



    return this.http.get(`${this.lancamentoUrl}?resumo`, {params})
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

       });
  }
//====================================PUT request=============================================================

  atualizar(lancamento: Lancamento): Promise<Lancamento>{

    return <Promise<Lancamento>> this.http.put<Lancamento>(`${this.lancamentoUrl}/${lancamento.codigo}`,lancamento)
      .toPromise();

  }

//====================================DELETE request=================================================================
  excluir(codigo: number): Promise<void>{

      return this.http.delete<void>(`http://localhost:8080/lancamento/${codigo}`)
      .toPromise();

  }

}
