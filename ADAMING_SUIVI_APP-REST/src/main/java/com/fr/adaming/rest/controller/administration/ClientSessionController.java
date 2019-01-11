package com.fr.adaming.rest.controller.administration;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.ClientSession;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.services.IClientSessionService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/clientSession")
public class ClientSessionController {

	@Autowired
	private IClientSessionService clientSessionService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<ClientSession> findAll() {
		return clientSessionService.findAll();
	}

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public ClientSession rechercherClientSessionParLibelle(@PathVariable String libelle) {
		return clientSessionService.rechercheClientSessionParLibelle(libelle);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ClientSession create(@RequestBody ClientSession entity) {
		return clientSessionService.create(entity);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public ClientSession update(@RequestBody ClientSession entity) {
		return clientSessionService.update(entity);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		clientSessionService.deleteById(id);
	}
}
