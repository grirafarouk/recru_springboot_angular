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

import com.fr.adaming.jsfapp.dto.OrigineDto;
import com.fr.adaming.jsfapp.mapper.OrigineMapper;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.services.IOrigineService;

@RestController
@RequestMapping("/api/origine")
@CrossOrigin("*")
public class OrigineController {

	@Autowired
	private IOrigineService origineService;

	private OrigineMapper origineMapper = Mappers.getMapper(OrigineMapper.class);

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public Origine rechercherOrigineParLibelle(@PathVariable String libelle) {
		return origineService.rechercherOrigineParLibelle(libelle);
	}

	public Origine merge(Origine entity) {
		return origineService.merge(entity);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public OrigineDto createOrUpdate(@RequestBody OrigineDto origineDto) {
		Origine origine = origineMapper.origineDtoToOrigine(origineDto);
		origine = origineService.createOrUpdate(origine);
		return origineMapper.origineToOrigineDto(origine);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public OrigineDto update(@RequestBody OrigineDto origineDto) {
		Origine origine = origineMapper.origineDtoToOrigine(origineDto);
		origine = origineService.update(origine);
		return origineMapper.origineToOrigineDto(origine);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public OrigineDto create(@RequestBody OrigineDto origineDto) {
		Origine origine = origineMapper.origineDtoToOrigine(origineDto);
		origine = origineService.create(origine);
		return origineMapper.origineToOrigineDto(origine);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public List<Origine> findAllOrigines() {
		return origineService.findAllOrigines();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Origine findById(@PathVariable Long id) {
		return origineService.findById(id);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public Collection<Origine> findAll() {
		return origineService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody OrigineDto origineDto) {
		Origine origine = origineMapper.origineDtoToOrigine(origineDto);
		origineService.delete(origine);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		origineService.deleteById(id);
	}

}
