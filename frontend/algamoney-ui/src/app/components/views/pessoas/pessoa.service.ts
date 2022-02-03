import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento, Pessoa } from '../../utils/model';

export class PessoaFiltro{
  nome?: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl='http://localhost:8080/pessoa';

  constructor(private http: HttpClient) { }


//============================POST request======================================================

  adicionar(pessoa: Pessoa): Promise<Pessoa>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return <Promise<Pessoa>> this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
      .toPromise();

  }

//===========================GET request======================================================

buscarPorCodigo(codigo: number): Promise<Pessoa>{
  const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  return <Promise<Pessoa>> this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers })
    .toPromise()
    .then((response:any) => {

      return response ? response : null;
    });

}


  pesquisar(filtro: PessoaFiltro): Promise<any>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams()
        .set('page', filtro.pagina)
        .set('size', filtro.itensPorPagina);

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }


    return this.http.get(this.pessoasUrl, {headers, params})
      .toPromise()
      .then((response: any) => {
        if(response) {
          const resultado = {
            pessoas: response['content'],
            total: response['totalElements']
          }

          return resultado;
        }
        else{
          const resultado = {
            pessoas: null,
            total: null
          }

          return resultado;
        }
      })
      .catch( e => {
        return Promise.reject(e);
      });
  }

// requisição get para ser usada no select do component de lancamento cadastro
  listarTodas() : Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then((response: any) => response ? response['content'] : null)
      .catch( e => {
        return Promise.reject(e);
      });
  }

  //============================DELETE request====================================================
  excluir(codigo: number): Promise<void>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, { headers })
    .toPromise()
    .catch(response =>{

      return Promise.reject(response);
    });
  }

  //============================PUT request===================================================

  atualizar(pessoa: Pessoa): Promise<Pessoa>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');

    return <Promise<Pessoa>> this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, {headers})
      .toPromise();
  }

  //Metodo utilizado para alterar os status de pessoa
  mudarStatus(codigo: number, ativo: boolean): Promise<void>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .catch( e => {
      return Promise.reject(e);
    });
  }


}
