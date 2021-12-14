package com.example.algamoney.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.algamoney.api.model.Pessoa;
//interface Pessoa JPA stance 
public interface PessoaRepository extends JpaRepository<Pessoa, Long>{

}
