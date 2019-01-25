package com.fr.adaming.rest.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.mapper.FormationMapper;
import com.fr.adaming.jsfapp.model.Formation;
import com.fr.adaming.jsfapp.services.impl.FormationService;

@RestController
@RequestMapping(value = "/api/formation")
@CrossOrigin("*")
public class FormationController {

	@Autowired
	private FormationService formationService;

	private FormationMapper formationMapper = Mappers.getMapper(FormationMapper.class);

	@PostMapping()
	public FormationDto createOrUpdate(@RequestBody FormationDto formationDto) {
		Formation formation = formationMapper.formationDtoToFormation(formationDto);
		formation = formationService.createOrUpdate(formation);
		return formationMapper.formationToFormationDto(formation);
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
	public void delete(@RequestBody FormationDto formationDto) {
		Formation formation = formationMapper.formationDtoToFormation(formationDto);
		formationService.delete(formation);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		formationService.deleteById(id);
	}

	@RequestMapping(value = "/parcode", method = RequestMethod.GET)
	public Formation rechercherSessionsFormationParCode(@RequestBody FormationDto formation) {
		return formationService.rechercherSessionsFormationParCode(formation);
	}
	
	@RequestMapping(value = "/rechercherFormations", method = RequestMethod.POST)
	public List<Formation> rechercherFormations(@RequestBody
			SessionFormationDto searchDto) {

		List<Formation> liste = new ArrayList<>(formationService.rechercherFormations(searchDto));
		return liste;
	}

	@RequestMapping(value = "/formationencours", method = RequestMethod.POST)
	public List<Formation> rechercherFormationsEnCours(@RequestBody SessionFormationDto searchDto) {

		List<Formation> liste = new ArrayList<>(formationService.rechercherFormationsEnCours(searchDto));
		return liste;
	}

	@RequestMapping(value = "/formationclotures", method = RequestMethod.POST)
	public List<Formation> rechercherFormationsClotures(@RequestBody SessionFormationDto searchDto) {
		List<Formation> liste = new ArrayList<>(formationService.rechercherFormationsClotures(searchDto));
		return liste;
	}

	@RequestMapping(value = "/listeformationparsession", method = RequestMethod.POST)
	public List<Formation> rechercherFormationParSessionFormation(@RequestBody FormationDto formationDto,
			SessionFormationDto sessionFormationDto) {
		return formationService.rechercherFormationParSessionFormation(formationDto, sessionFormationDto);
	}

	@RequestMapping(value = "/listeformationencours", method = RequestMethod.GET)
	public List<Formation> findAllFormationsEnCours() {
		return formationService.findAllFormationsEnCours();
	}

	@RequestMapping(value = "/listeformationclotures", method = RequestMethod.GET)
	public List<Formation> findAllFormationsClotures() {
		return formationService.findAllFormationsClotures();
	}

}
