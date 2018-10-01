package com.fr.adaming.rest.controller.administration;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.Motif;
import com.fr.adaming.jsfapp.services.IMotifService;

@RestController
@RequestMapping("/motifs")
@CrossOrigin("*")
public class MotifController {

	@Autowired
	private IMotifService motifService;

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public Motif rechercheMotifParLibelle(@PathVariable String libelle) {
		return motifService.rechercheMotifParLibelle(libelle);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public Motif createOrUpdate(@RequestBody Motif entity) {
		return motifService.createOrUpdate(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Motif findById(@PathVariable Long id) {
		return motifService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Motif> findAll() {
		return motifService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody Motif entity) {
		motifService.delete(entity);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		motifService.deleteById(id);
	}

}
