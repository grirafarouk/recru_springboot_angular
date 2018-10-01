package com.fr.adaming.rest.controller;

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

import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.model.Formation;
import com.fr.adaming.jsfapp.services.impl.FormationService;

@RestController
@RequestMapping(value = "/formation")
@CrossOrigin("*")
public class FormationController {

	@Autowired
	private FormationService formationService;

	public Formation createOrUpdate(Formation entity) {
		return formationService.createOrUpdate(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Formation findById(@PathVariable Long id) {
		return formationService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Formation> findAll() {
		return formationService.findAll();
	}

	@RequestMapping(value = "/parcode/{code}", method = RequestMethod.GET)
	public Formation rechercherSessionsFormationParCode(@PathVariable String code) {
		return formationService.rechercherSessionsFormationParCode(code);
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody Formation entity) {
		formationService.delete(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		formationService.deleteById(id);
	}

	@RequestMapping(value = "/parcode", method = RequestMethod.GET)
	public Formation rechercherSessionsFormationParCode(@RequestBody FormationDto formation) {
		return formationService.rechercherSessionsFormationParCode(formation);
	}

	@RequestMapping(value = "/formationencours", method = RequestMethod.POST)
	public List<Formation> rechercherFormationsEnCours(@RequestBody FormationDto formationDto, SessionFormationDto searchDto) {
		
		List<Formation> liste = new ArrayList<>(
				formationService.rechercherFormationsEnCours(formationDto, searchDto));
		return liste;
	}

	@RequestMapping(value = "/formationclotures", method = RequestMethod.POST)
	public List<Formation> rechercherFormationsClotures(@RequestBody FormationDto formationDto, SessionFormationDto searchDto) {
		List<Formation> liste = new ArrayList<>(
		 formationService.rechercherFormationsClotures(formationDto, searchDto));
		return liste;
	}

	@RequestMapping(value = "/listeformationparsession", method = RequestMethod.POST)
	public List<Formation> rechercherFormationParSessionFormation(@RequestBody FormationDto formationDto, SessionFormationDto sessionFormationDto) {
		return formationService.rechercherFormationParSessionFormation(formationDto, sessionFormationDto);
	}

	@RequestMapping(value = "/listeformationencours", method= RequestMethod.GET)
	public List<Formation> findAllFormationsEnCours() {
		return formationService.findAllFormationsEnCours();
	}

	@RequestMapping(value = "/listeformationclotures", method = RequestMethod.GET)
	public List<Formation> findAllFormationsClotures() {
		return formationService.findAllFormationsClotures();
	}

	

}
