package com.fr.adaming.rest.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

	@GetMapping(path = "/{id}")
	public Formation findById(@PathVariable Long id) {
		return formationService.findById(id);
	}

	@GetMapping(path = "")
	public Collection<Formation> findAll() {
		return formationService.findAll();
	}

	@GetMapping(path = "/parcode/{code}")
	public Formation rechercherSessionsFormationParCode(@PathVariable String code) {
		return formationService.rechercherSessionsFormationParCode(code);
	}

	@DeleteMapping(path = "")
	public void delete(@RequestBody FormationDto formationDto) {
		Formation formation = formationMapper.formationDtoToFormation(formationDto);
		formationService.delete(formation);
	}

	@DeleteMapping(path = "/{id}")
	public void deleteById(@PathVariable Long id) {
		formationService.deleteById(id);
	}

	@GetMapping(path = "/parcode")
	public Formation rechercherSessionsFormationParCode(@RequestBody FormationDto formation) {
		return formationService.rechercherSessionsFormationParCode(formation);
	}
	
	@PostMapping(path = "/rechercherFormations")
	public List<Formation> rechercherFormations(@RequestBody
			SessionFormationDto searchDto) {

	
		return new ArrayList<>(formationService.rechercherFormations(searchDto));
	}

	@PostMapping(path = "/formationencours")
	public List<Formation> rechercherFormationsEnCours(@RequestBody SessionFormationDto searchDto) {

		
		return new ArrayList<>(formationService.rechercherFormationsEnCours(searchDto));	
	}

	@PostMapping(path = "/formationclotures")
	public List<Formation> rechercherFormationsClotures(@RequestBody SessionFormationDto searchDto) {
		return formationService.rechercherFormationsClotures(searchDto);
	}

	@PostMapping(path = "/listeformationparsession")
	public List<Formation> rechercherFormationParSessionFormation(@RequestBody FormationDto formationDto,
			SessionFormationDto sessionFormationDto) {
		return formationService.rechercherFormationParSessionFormation(formationDto, sessionFormationDto);
	}

	@GetMapping(path = "/listeformationencours")
	public List<Formation> findAllFormationsEnCours() {
		return formationService.findAllFormationsEnCours();
	}

	@GetMapping(path = "/listeformationclotures")
	public List<Formation> findAllFormationsClotures() {
		return formationService.findAllFormationsClotures();
	}

}
