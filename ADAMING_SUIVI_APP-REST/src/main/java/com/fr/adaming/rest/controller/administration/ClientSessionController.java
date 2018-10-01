package com.fr.adaming.rest.controller.administration;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.ClientSession;
import com.fr.adaming.jsfapp.services.IClientSessionService;


@RestController
@CrossOrigin("*")
@RequestMapping(value = "/clientSession")
public class ClientSessionController {
	
	@Autowired
	private IClientSessionService clientSessionService;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<ClientSession> findAll() {
		return clientSessionService.findAll();
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ClientSession create(@RequestBody ClientSession entity) {
		return clientSessionService.create(entity);
	}
}
