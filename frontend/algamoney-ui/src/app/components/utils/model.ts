export class Endereco {
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
}

export class Pessoa {
  codigo?: number;
  nome?: string;
  endereco = new Endereco();
  ativo = true;
}


export class Categoria{
  codigo?: number;
}

export class Lancamento{
  codigo?: number;
  descricao?: string;
  dataVencimento?: Date;
  valor?: number;
  observacao?: string;
  tipo = 'RECEITA';
  dataPagamento?: Date;
  pessoa = new Pessoa();
  categoria = new Categoria();

}
