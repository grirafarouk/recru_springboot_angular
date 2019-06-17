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

import com.fr.adaming.jsfapp.dto.OrigineDto;
import com.fr.adaming.jsfapp.mapper.OrigineMapper;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.services.IOrigineService;

@RestController
@RequestMapping("/api/origine")
@CrossOrigin("*")
public class OrigineController {

	@Autowired
	private IOrigineService origineService;

	private OrigineMapper origineMapper = Mappers.getMapper(OrigineMapper.class);

	@GetMapping(path = "/libelle/{libelle}")
	public Origine rechercherOrigineParLibelle(@PathVariable String libelle) {
		return origineService.rechercherOrigineParLibelle(libelle);
	}

	@RequestMapping(value = "recherche/{text}", method = RequestMethod.GET)
	public List<Origine> rechercherOrigine(@PathVariable String text) {
		return origineService.rechercherOrigine(text);
	}

	
	public Origine merge(Origine entity) {
		return origineService.merge(entity);
	}

	@PostMapping(path = "")
	public OrigineDto createOrUpdate(@RequestBody OrigineDto origineDto) {
		Origine origine = origineMapper.origineDtoToOrigine(origineDto);
		origine = origineService.createOrUpdate(origine);
		return origineMapper.origineToOrigineDto(origine);
	}

	@PostMapping(path = "/update")
	public OrigineDto update(@RequestBody OrigineDto origineDto) {
		Origine origine = origineMapper.origineDtoToOrigine(origineDto);
		origine = origineService.update(origine);
		return origineMapper.origineToOrigineDto(origine);
	}

	@PostMapping(path = "/add")
	public OrigineDto create(@RequestBody OrigineDto origineDto) {
		Origine origine = origineMapper.origineDtoToOrigine(origineDto);
		origine = origineService.create(origine);
		return origineMapper.origineToOrigineDto(origine);
	}

	@GetMapping(path = "")
	public List<Origine> findAllOrigines() {
		return origineService.findAllOrigines();
	}

	@GetMapping(path = "/{id}")
	public Origine findById(@PathVariable Long id) {
		return origineService.findById(id);
	}

	@GetMapping(path = "/all")
	public Collection<Origine> findAll() {
		return origineService.findAll();
	}

	@DeleteMapping(path = "")
	public void delete(@RequestBody OrigineDto origineDto) {
		Origine origine = origineMapper.origineDtoToOrigine(origineDto);
		origineService.delete(origine);
	}

	@DeleteMapping(path = "/{id}")
	public void deleteById(@PathVariable Long id) {
		origineService.deleteById(id);
	}

}
