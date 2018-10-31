package com.fr.adaming.rest.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.Suivi;
import com.fr.adaming.jsfapp.services.ISuiviService;

@RestController
@RequestMapping(value = "/suivi")
public class SuiviController {

	@Autowired
	private ISuiviService suiviService;

	@RequestMapping(value = "", method = RequestMethod.POST)
	public Suivi createOrUpdate(@RequestBody Suivi entity) {
		return suiviService.createOrUpdate(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Suivi findById(@PathVariable Long id) {
		return suiviService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Suivi> findAll() {
		return suiviService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody Suivi entity) {
		suiviService.delete(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		suiviService.deleteById(id);
	}
}
