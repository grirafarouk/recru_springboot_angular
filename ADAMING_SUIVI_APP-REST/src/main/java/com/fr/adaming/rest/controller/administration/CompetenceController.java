package com.fr.adaming.rest.controller.administration;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.CompetenceDto;
import com.fr.adaming.jsfapp.mapper.CompetenceMapper;
import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.services.ICompetenceService;

@RestController
@RequestMapping(value = "/api/competence")
@CrossOrigin("*")
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

	@RequestMapping(value = "", method = RequestMethod.POST)
	public CompetenceDto createOrUpdate(@RequestBody CompetenceDto competenceDto) {
		Competence competence = competenceMapper.competenceDtoToCandidat(competenceDto);
		competence = competenceService.createOrUpdate(competence);
		return competenceMapper.competenceToCompetenceDto(competence);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public CompetenceDto update(@RequestBody CompetenceDto competenceDto) {
		Competence competence = competenceMapper.competenceDtoToCandidat(competenceDto);
		competence = competenceService.update(competence);
		return competenceMapper.competenceToCompetenceDto(competence);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public CompetenceDto create(@RequestBody CompetenceDto competenceDto) {
		Competence competence = competenceMapper.competenceDtoToCandidat(competenceDto);
		competence = competenceService.create(competence);
		return competenceMapper.competenceToCompetenceDto(competence);
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
	public void delete(@RequestBody CompetenceDto competenceDto) {
		Competence competence = competenceMapper.competenceDtoToCandidat(competenceDto);
		competenceService.delete(competence);
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
