package com.fr.adaming.rest.controller.administration;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.Lieu;
import com.fr.adaming.jsfapp.services.ILieuService;

@RestController
@RequestMapping(value = "/api/lieu")
@CrossOrigin("*")
public class LieuController {

	@Autowired
	private ILieuService lieuService;

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public Lieu rechercherLieuParLibelle(@PathVariable String libelle) {
		return lieuService.rechercherLieuParLibelle(libelle);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public Lieu createOrUpdate(@RequestBody Lieu entity) {
		return lieuService.createOrUpdate(entity);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public Lieu update(@RequestBody Lieu entity) {
		return lieuService.update(entity);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Lieu create(@RequestBody Lieu entity) {
		return lieuService.create(entity);
	}

	@RequestMapping(value = "/adresse/{libelle}", method = RequestMethod.GET)
	public Lieu rechercherLieuParAdresse(@PathVariable String libelle) {
		return lieuService.rechercherLieuParAdresse(libelle);
	}

	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public Lieu findById(@PathVariable Long id) {
		return lieuService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Lieu> findAll() {
		return lieuService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody Lieu entity) {
		lieuService.delete(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		lieuService.deleteById(id);
	}

}
