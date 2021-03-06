package com.fr.adaming.rest.controller.administration;

import java.util.Collection;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.ClientSessionDto;
import com.fr.adaming.jsfapp.mapper.ClientSessionMapper;
import com.fr.adaming.jsfapp.model.ClientSession;
import com.fr.adaming.jsfapp.model.TypeFormation;
import com.fr.adaming.jsfapp.services.IClientSessionService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/clientSession")
public class ClientSessionController {

	@Autowired
	private IClientSessionService clientSessionService;

	private ClientSessionMapper clientSessionMapper = Mappers.getMapper(ClientSessionMapper.class);

	@GetMapping(value = "")
	public Collection<ClientSession> findAll() {
		return clientSessionService.findAll();
	}

	@GetMapping(value = "/libelle/{libelle}")
	public ClientSession rechercherClientSessionParLibelle(@PathVariable String libelle) {
		return clientSessionService.rechercheClientSessionParLibelle(libelle);
	}

	@PostMapping(value = "/add")
	public ClientSessionDto create(@RequestBody ClientSessionDto clientSessionDto) {
		ClientSession clientSession = clientSessionMapper.clientSessionDtoToClientSession(clientSessionDto);
		clientSession = clientSessionService.create(clientSession);
		return clientSessionMapper.motifToMotifDto(clientSession);
	}

	@PostMapping(value = "/update")
	public ClientSessionDto update(@RequestBody ClientSessionDto clientSessionDto) {
		ClientSession clientSession = clientSessionMapper.clientSessionDtoToClientSession(clientSessionDto);
		clientSession = clientSessionService.update(clientSession);
		return clientSessionMapper.motifToMotifDto(clientSession);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		clientSessionService.deleteById(id);
	}
	@RequestMapping(value = "recherche/{text}", method = RequestMethod.GET)
	public List<ClientSession> rechercherClientSession(@PathVariable String text) {
		return clientSessionService.rechercherClientSession(text);
	}
	
}
