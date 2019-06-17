package com.fr.adaming.rest.controller.administration;

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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.fr.adaming.jsfapp.dto.TechnologieDto;
import com.fr.adaming.jsfapp.mapper.TechnologieMapper;
import com.fr.adaming.jsfapp.model.Lieu;
import com.fr.adaming.jsfapp.model.Role;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.services.ITechnologieService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/technologie")

public class TechnologieController {

	@Autowired
	private ITechnologieService technologieService;

	private TechnologieMapper technologieMapper = Mappers.getMapper(TechnologieMapper.class);

	@RequestMapping(value = "recherche/{text}", method = RequestMethod.GET)
	public List<Technologie> rechercherTechnologie(@PathVariable String text) {
		return technologieService.rechercherTechnologie(text);
	}

	@PostMapping("/add")
	public TechnologieDto create(@RequestBody TechnologieDto technologieDto) {
		Technologie technologie = technologieMapper.technologieDtoToTechnologie(technologieDto);
		technologie = technologieService.merge(technologie);
		return technologieMapper.technologieToTechnologieDto(technologie);
	}

	@PostMapping("/update")
	public TechnologieDto update(@RequestBody TechnologieDto technologieDto) {
		Technologie technologie = technologieMapper.technologieDtoToTechnologie(technologieDto);
		technologie = technologieService.update(technologie);
		return technologieMapper.technologieToTechnologieDto(technologie);
	}

	@GetMapping("/libelle/{libelle}")
	public Technologie rechercherTechnologieParLibelle(@PathVariable String libelle) {
		return technologieService.rechercherTechnologieParLibelle(libelle);
	}

	@GetMapping("/Reporting")
	public List<Technologie> rechercherTechnologiePourReporting() {
		return technologieService.rechercherTechnologiePourReporting();
	}

	@GetMapping("/Libelle")
	public List<TechnologieDto> rechercherTechnologieParLibelle() {
		return technologieService.findAllTechnologiesByLibelle();
	}

	@GetMapping("/id/{id}")
	public Technologie findById(@PathVariable Long id) {
		return technologieService.findById(id);
	}

	@GetMapping("")
	public Collection<Technologie> findAll() {
		return technologieService.findAll();
	}

	@GetMapping("tech")
	public List<Technologie> findAllTechnologies() {
		return technologieService.findAllTechnologies();
	}

	@DeleteMapping("")
	public void delete(@RequestBody TechnologieDto technologieDto) {
		Technologie technologie = technologieMapper.technologieDtoToTechnologie(technologieDto);
		technologieService.delete(technologie);
	}

	@DeleteMapping("/{id}")
	public Boolean deleteById(@PathVariable Long id) {
		technologieService.deleteById(id);
		return true;
	}

}
