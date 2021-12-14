package com.example.algamoney.api.resource;

//import java.net.URI;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

//import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
//import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
//import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.algamoney.api.event.RecursoCriadoEvent;
import com.example.algamoney.api.model.Pessoa;
import com.example.algamoney.api.repository.PessoaRepository;
import com.example.algamoney.api.service.PessoaService;

@RestController
@RequestMapping("/pessoa")
public class PessoaResource {
	
	@Autowired 
	private PessoaRepository pessoaRepository;
	
	@Autowired
	private PessoaService pessoaService;
	
	@Autowired
	private ApplicationEventPublisher publisher;
	
// -------------------------------------------POST-----------------------------------------------------------------	
	/*post Request direta
	 * 
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void criar(@RequestBody Pessoa pessoa) {
		pessoaRepository.save(pessoa);
	}
	*/
	
	/*
	 * 
	//POST Request 
	//Requisição post em parametros REST sem um Evento
	@PostMapping
	public ResponseEntity<Pessoa> criar(@Validated @RequestBody Pessoa pessoa, HttpServletResponse response) {
		Pessoa pessoaSalva = pessoaRepository.save(pessoa);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{codigo}")
			.buildAndExpand(pessoaSalva.getCodigo()).toUri();
		
		response.setHeader("Location", uri.toASCIIString());
		
		return ResponseEntity.created(uri).body(pessoaSalva);
		
	}
	*/
	
	
	//POST Request 
	//Requisição post em parametros REST com um Evento
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_PESSOA') and hasAuthority('SCOPE_write')")
	public ResponseEntity<Pessoa> criar(@Validated @RequestBody Pessoa pessoa, HttpServletResponse response) {
		Pessoa pessoaSalva = pessoaRepository.save(pessoa);
		
		publisher.publishEvent(new RecursoCriadoEvent(this, response, pessoaSalva.getCodigo()));
		
		
		return ResponseEntity.status(HttpStatus.CREATED).body(pessoaSalva);
		
	}
// -------------------------------------------GET-----------------------------------------------------------------	
	/*GET Request direta
	 * 
	@GetMapping
	public List<Pessoa> listar(){
		return pessoaRepository.findAll();
	}	
	*/
	
	//GET Request 
	// validando se existe registro dentro da tabela pessoa 
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_PESSOA') and hasAuthority('SCOPE_write')")
	public ResponseEntity<?> listar(){
		List<Pessoa> pessoas = pessoaRepository.findAll();
		return !pessoas.isEmpty() ? ResponseEntity.ok(pessoas) : ResponseEntity.noContent().build();
	}
	
// ------------------------------------------------------------------------------------------------------------

	/*GET Reqquest with Id direta
	 * 
	@GetMapping("/{codigo}")
	public Pessoa buscarPeloCodigo(@PathVariable Long codigo){
		return pessoaRepository.findById(codigo).orElse(null);
	}
	
	*/
	//GET Request with Id 
	//validação do id, caso não exista retornar erro 404
	@GetMapping("/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_PESSOA') and hasAuthority('SCOPE_write')")
	public ResponseEntity<Pessoa> buscarPeloCodigo(@PathVariable Long codigo) {
		Pessoa pessoa = pessoaRepository.findById(codigo).orElse(null);
		return pessoa != null ? ResponseEntity.ok(pessoa) : ResponseEntity.notFound().build();
	}

// -------------------------------------------DELETE-----------------------------------------------------------------	
	
	
	@DeleteMapping("/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVER_PESSOA') and hasAuthority('SCOPE_write')")
	public void remover(@PathVariable Long codigo){
		pessoaRepository.deleteById(codigo);
		
	}
// -------------------------------------------Update-----------------------------------------------------------------	

	/*
	 * 
	// PUT request complete
	@PutMapping("/{codigo}")
	public ResponseEntity<Pessoa> atualizar(@PathVariable Long codigo, @Validated @RequestBody Pessoa pessoa ){
		
		Pessoa pessoaSalva = pessoaRepository.findById(codigo).orElse(null);
		if(pessoaSalva == null){
			throw new EmptyResultDataAccessException(1);
		}
		BeanUtils.copyProperties(pessoa, pessoaSalva, "codigo" );
		pessoaRepository.save(pessoaSalva);	
			
		return ResponseEntity.ok(pessoaSalva);	
	}
	 * 
	 */
	
	// PUT Request complete with service
	@PutMapping("/{codigo}")
	public ResponseEntity<Pessoa> atualizar(@PathVariable Long codigo, @Validated @RequestBody Pessoa pessoa ){
		
		Pessoa pessoaSalva = pessoaService.Atualizar(codigo, pessoa);
		return ResponseEntity.ok(pessoaSalva);
		
	}
	
	@PutMapping("/{codigo}/ativo")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_PESSOA') and hasAuthority('SCOPE_write')")
	public void atualizarPropiedadeAtivo(@PathVariable Long codigo, @RequestBody Boolean ativo){
		pessoaService.atualizarPropriedadeAtivo(codigo, ativo);
	}
	
	
}
