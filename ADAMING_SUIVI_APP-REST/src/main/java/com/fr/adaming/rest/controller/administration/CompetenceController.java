package com.fr.adaming.rest.controller.administration;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.services.ICompetenceService;

@RestController
@RequestMapping(value = "/competence")
@CrossOrigin("*")
public class CompetenceController {

	@Autowired
	private ICompetenceService competenceService;

	private List<Competence> listeCompetences;

	public List<Competence> getListeCompetences() {
		return listeCompetences;
	}

	public void setListeCompetences(List<Competence> listeCompetences) {
		this.listeCompetences = listeCompetences;
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public Competence createOrUpdate(@RequestBody Competence entity) {
		return competenceService.createOrUpdate(entity);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public Competence update(@RequestBody Competence entity) {
		return competenceService.update(entity);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Competence create(@RequestBody Competence entity) {
		return competenceService.create(entity);
	}

	@RequestMapping(value = "/rechercheid/{id}", method = RequestMethod.GET)
	public List<Competence> rechercherCandidatCompetences(@PathVariable long id) {
		return competenceService.rechercherCandidatCompetences(id);
	}

	@RequestMapping(value = "/findid/{id}", method = RequestMethod.GET)
	public Competence findById(@PathVariable Long id) {
		return competenceService.findById(id);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public Collection<Competence> findAll() {
		// return competenceService.findAll();
		setListeCompetences(new ArrayList<>(competenceService.findAll()));
		return listeCompetences;
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody Competence entity) {
		competenceService.delete(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		competenceService.deleteById(id);
	}

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public Competence findByLibelle(@PathVariable String libelle) {
		return competenceService.findByLibelle(libelle);
	}

}
