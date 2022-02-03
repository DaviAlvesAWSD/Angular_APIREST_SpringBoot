import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErroHandlerService } from 'src/app/components/core/erro-handler.service';
import { Lancamento } from 'src/app/components/utils/model';

import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';


@Component({
  selector: 'app-lancamentos-cadastro-component',
  templateUrl: './lancamentos-cadastro-component.component.html',
  styleUrls: ['./lancamentos-cadastro-component.component.css'],
  providers: [MessageService, ErroHandlerService]
})
export class LancamentosCadastroComponentComponent implements OnInit{

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias: any[] = [];

  pessoas: any[] = [ ];

  lancamento: Lancamento = new Lancamento();


  constructor(
    private messageService: MessageService,
    private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private lancamentoService: LancamentoService,
    private erroHandlerService: ErroHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) {}


  ngOnInit(): void {
    this.title.setTitle('Novo lançamento');
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.listarCategorias();
    this.ListarPessoas();
  }

  get editando(){
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number){
    let nome = '';
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();

      })
      .catch(erro =>{
        this.erroHandlerService.handle(erro,nome);
      });
  }

  salvar(form: NgForm){
    if(this.editando){
      this.atualizarLancamento(form);
    }else{
      this.adicionarLancamento(form);

    }
  }

  adicionarLancamento(form: NgForm){
    let nome: string = '';

    if(form.status != "INVALID"){

      this.lancamentoService.adicionar(this.lancamento)
      .then(() =>{
        this.messageService.add({severity:'success', summary:' SUCESSO ', detail:'Lançamento registrado com sucesso'});

        form.reset(new Lancamento);
      })
      .catch(erro =>{
        this.erroHandlerService.handle(erro,nome);
      });

    }
  }

  listarCategorias(){
      this.categoriaService.listarTodas()
        .then((categorias: any) =>{
          this.categorias = categorias.map((c: any) => ({ label: c.nome, value: c.codigo }));
        });

  }

  ListarPessoas(){
    this.pessoasService.listarTodas()
      .then((pessoas: any)=> {
        this.pessoas = pessoas.map((p: any) => ({ label: p.nome, value: p.codigo}));
      });
  }

  atualizarLancamento(form: NgForm){
    let nome: string = '';

    if(form.status != "INVALID"){
      this.lancamentoService.atualizar(this.lancamento)
        .then((lancamento:Lancamento) => {
          this.lancamento = lancamento;
          this.messageService.add({ severity: 'success', summary:' SUCESSO ', detail: 'Lançamento alterado com sucesso!' });
          this.atualizarTituloEdicao();
        })
        .catch(erro =>{
          this.erroHandlerService.handle(erro,nome);
        });
    }
  }

  novo(form: NgForm){
    form.reset(new Lancamento);

    this.router.navigate(['lancamentos/novo']);
  }


  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
