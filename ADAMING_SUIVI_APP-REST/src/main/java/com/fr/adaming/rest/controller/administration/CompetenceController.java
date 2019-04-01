package com.fr.adaming.rest.controller.administration;

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

import com.fr.adaming.jsfapp.dto.CompetenceDto;
import com.fr.adaming.jsfapp.mapper.CompetenceMapper;
import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.services.ICompetenceService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping(value = "/api/competence")
@CrossOrigin("*")
@Api(tags = "API - TEST")
public class CompetenceController {

	@Autowired
	private ICompetenceService competenceService;

	private List<Competence> listeCompetences;

	private CompetenceMapper competenceMapper = Mappers.getMapper(CompetenceMapper.class);

	public List<Competence> getListeCompetences() {
		return listeCompetences;
	}

	public void setListeCompetences(List<Competence> listeCompetences) {
		this.listeCompetences = listeCompetences;
	}

	@PostMapping(value = "")
	public CompetenceDto createOrUpdate(@RequestBody CompetenceDto competenceDto) {
		Competence competence = competenceMapper.competenceDtoToCandidat(competenceDto);
		competence = competenceService.createOrUpdate(competence);
		return competenceMapper.competenceToCompetenceDto(competence);
	}

	@PostMapping(value = "/update")
	public CompetenceDto update(@RequestBody CompetenceDto competenceDto) {
		Competence competence = competenceMapper.competenceDtoToCandidat(competenceDto);
		competence = competenceService.update(competence);
		return competenceMapper.competenceToCompetenceDto(competence);
	}

	@PostMapping(value = "/add")
	public CompetenceDto create(@RequestBody CompetenceDto competenceDto) {
		Competence competence = competenceMapper.competenceDtoToCandidat(competenceDto);
		competence = competenceService.create(competence);
		return competenceMapper.competenceToCompetenceDto(competence);
	}

	@GetMapping(value = "/rechercheid/{id}")
	public List<Competence> rechercherCandidatCompetences(@PathVariable long id) {
		return competenceService.rechercherCandidatCompetences(id);
	}

	@GetMapping(value = "/findid/{id}")
	public Competence findById(@PathVariable Long id) {
		return competenceService.findById(id);
	}

	@GetMapping(value = "/all")
	public Collection<Competence> findAll() {
		setListeCompetences(new ArrayList<>(competenceService.findAll()));
		return listeCompetences;
	}

	@DeleteMapping(value = "")
	public void delete(@RequestBody CompetenceDto competenceDto) {
		Competence competence = competenceMapper.competenceDtoToCandidat(competenceDto);
		competenceService.delete(competence);
	}

	@DeleteMapping(value = "/{id}")
	public void deleteById(@PathVariable Long id) {
		competenceService.deleteById(id);
	}

	@GetMapping(value = "/libelle/{libelle}")
	public Competence findByLibelle(@PathVariable String libelle) {
		return competenceService.findByLibelle(libelle);
	}

}
