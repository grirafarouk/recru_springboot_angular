package com.fr.adaming.rest.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.Entretien;
import com.fr.adaming.jsfapp.services.IEntretienService;

@RestController
@RequestMapping(value = "/api/entretien")
@CrossOrigin("*")
public class EntretienController {

	@Autowired
	private IEntretienService entretienService;

	@RequestMapping(value = "", method = RequestMethod.POST)
	public Entretien createOrUpdate(@RequestBody Entretien entity) {
		return entretienService.createOrUpdate(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Entretien findById(@PathVariable Long id) {
		return entretienService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Entretien> findAll() {
		return entretienService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody Entretien entity) {
		entretienService.delete(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		entretienService.deleteById(id);
	}

}
