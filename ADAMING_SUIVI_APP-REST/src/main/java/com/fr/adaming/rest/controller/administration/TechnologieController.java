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

import com.fr.adaming.jsfapp.dto.TechnologieDto;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.services.ITechnologieService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/technologie")

public class TechnologieController {

	@Autowired
	private ITechnologieService technologieService;

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Technologie create(@RequestBody Technologie entity) {
		return technologieService.merge(entity);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public Technologie update(@RequestBody Technologie entity) {
		return technologieService.update(entity);
	}

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public Technologie rechercherTechnologieParLibelle(@PathVariable String libelle) {
		return technologieService.rechercherTechnologieParLibelle(libelle);
	}

	@RequestMapping(value = "/Reporting", method = RequestMethod.GET)
	public List<Technologie> rechercherTechnologiePourReporting() {
		return technologieService.rechercherTechnologiePourReporting();
	}

	@RequestMapping(value = "/Libelle", method = RequestMethod.GET)
	public List<TechnologieDto> rechercherTechnologieParLibelle() {
		return technologieService.findAllTechnologiesByLibelle();
	}

	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public Technologie findById(@PathVariable Long id) {
		return technologieService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Technologie> findAll() {
		return technologieService.findAll();
	}

	@RequestMapping(value = "tech", method = RequestMethod.GET)
	public List<Technologie> findAllTechnologies() {
		return technologieService.findAllTechnologies();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)

	public void delete(@RequestBody Technologie entity) {
		technologieService.delete(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public Boolean deleteById(@PathVariable Long id) {
		technologieService.deleteById(id);
		return true;
	}

}
