package com.fr.adaming.rest.controller.administration;

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

import com.fr.adaming.jsfapp.dto.TechnologieDto;
import com.fr.adaming.jsfapp.mapper.TechnologieMapper;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.services.ITechnologieService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/technologie")

public class TechnologieController {

	@Autowired
	private ITechnologieService technologieService;

	private TechnologieMapper technologieMapper = Mappers.getMapper(TechnologieMapper.class);

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public TechnologieDto create(@RequestBody TechnologieDto technologieDto) {
		Technologie technologie = technologieMapper.technologieDtoToTechnologie(technologieDto);
		technologie = technologieService.merge(technologie);
		return technologieMapper.technologieToTechnologieDto(technologie);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public TechnologieDto update(@RequestBody TechnologieDto technologieDto) {
		Technologie technologie = technologieMapper.technologieDtoToTechnologie(technologieDto);
		technologie = technologieService.update(technologie);
		return technologieMapper.technologieToTechnologieDto(technologie);
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

	public void delete(@RequestBody TechnologieDto technologieDto) {
		Technologie technologie = technologieMapper.technologieDtoToTechnologie(technologieDto);
		technologieService.delete(technologie);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public Boolean deleteById(@PathVariable Long id) {
		technologieService.deleteById(id);
		return true;
	}

}
