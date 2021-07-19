package com.example.algamoney.api.repository.lancamento;

//import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.algamoney.api.model.Lancamento;
import com.example.algamoney.api.repository.filter.LancamentoFilter;

public interface LancamentoRepositoryQuery {
	
	public Page<Lancamento> Filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);

}
