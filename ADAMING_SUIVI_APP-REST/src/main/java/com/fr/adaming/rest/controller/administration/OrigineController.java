package com.fr.adaming.rest.controller.administration;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.services.IOrigineService;

@RestController
@RequestMapping("/api/origine")
@CrossOrigin("*")
public class OrigineController {

	@Autowired
	private IOrigineService origineService;

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public Origine rechercherOrigineParLibelle(@PathVariable String libelle) {
		return origineService.rechercherOrigineParLibelle(libelle);
	}

	public Origine merge(Origine entity) {
		return origineService.merge(entity);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public Origine createOrUpdate(@RequestBody Origine entity) {
		return origineService.createOrUpdate(entity);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public Origine update(@RequestBody Origine entity) {
		return origineService.update(entity);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Origine create(@RequestBody Origine entity) {
		return origineService.create(entity);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public List<Origine> findAllOrigines() {
		return origineService.findAllOrigines();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Origine findById(@PathVariable Long id) {
		return origineService.findById(id);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public Collection<Origine> findAll() {
		return origineService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody Origine entity) {
		origineService.delete(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		origineService.deleteById(id);
	}

}
