import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErroHandlerService } from 'src/app/components/core/erro-handler.service';
import { Pessoa } from 'src/app/components/utils/model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-cadastro-component',
  templateUrl: './pessoas-cadastro-component.component.html',
  styleUrls: ['./pessoas-cadastro-component.component.css'],
  providers: [MessageService,ErroHandlerService]
})
export class PessoasCadastroComponentComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  constructor(
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private erroHandlerService: ErroHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }


  ngOnInit(): void {
    this.title.setTitle('Nova pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if(codigoPessoa != 'nova'){
      this.carregarPessoa(codigoPessoa);
    }

  }

  get editando(){
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoa(codigo: number){
    let nome = "";
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa =>{
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();

      })
      .catch(erro =>{
        this.erroHandlerService.handle(erro, nome);
      });
  }


  salvar(form: NgForm){
    if(this.editando){
      this.atualizarPessoa(form);
    }else{
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm){
    let nome: String = '';

    if(form.status != "INVALID"){

      this.pessoaService.adicionar(this.pessoa)
        .then(() =>{
          form.reset(new Pessoa);
          this.messageService.add({severity:'success', summary:' SUCESSO ', detail:'Pessoa registrada com sucesso'});
        })
        .catch(erro =>{
          this.erroHandlerService.handle(erro, nome);
        });
    }

  }


  atualizarPessoa(form: NgForm){
    let nome = '';
    if(form.status != "INVALID"){
      this.pessoaService.atualizar(this.pessoa)
        .then( (pessoa: Pessoa) =>{
          this.pessoa = pessoa;

          this.messageService.add({ severity: 'success', summary:' SUCESSO ', detail: 'Pessoa alterada com sucesso!' });
          this.atualizarTituloEdicao();
        })
        .catch(erro =>{
          this.erroHandlerService.handle(erro, nome);
        });
    }
  }


  nova(form: NgForm) {
    this.router.navigate(['pessoas/nova']);


    this.pessoa = new Pessoa();
    this.title.setTitle('Nova pessoa');
    form.reset();




  }

  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição da Pessoa: ${this.pessoa.nome}`);
  }

}
