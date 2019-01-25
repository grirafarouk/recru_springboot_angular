package com.fr.adaming.rest.controller.administration;

import java.util.Collection;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.TypeFormationDto;
import com.fr.adaming.jsfapp.mapper.TypeFormationMapper;
import com.fr.adaming.jsfapp.model.TypeFormation;
import com.fr.adaming.jsfapp.services.ITypeFormationService;

@RestController
@RequestMapping(value = "/api/typeformation")
@CrossOrigin("*")
public class TypeFormationController {

	@Autowired
	private ITypeFormationService typeFormationService;

	private TypeFormationMapper typeFormationMapper = Mappers.getMapper(TypeFormationMapper.class);

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public TypeFormation rechercherTypeFormationParLibelle(@PathVariable String libelle) {
		return typeFormationService.rechercherTypeFormationParLibelle(libelle);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public TypeFormationDto createOrUpdate(@RequestBody TypeFormationDto typeFormationDto) {
		TypeFormation typeFormation = typeFormationMapper.typeFormationDtoToTypeFormation(typeFormationDto);
		typeFormation = typeFormationService.createOrUpdate(typeFormation);
		return typeFormationMapper.typeFormationToTypeFormationDto(typeFormation);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public TypeFormationDto create(@RequestBody TypeFormationDto typeFormationDto) {
		TypeFormation typeFormation = typeFormationMapper.typeFormationDtoToTypeFormation(typeFormationDto);
		typeFormation = typeFormationService.merge(typeFormation);
		return typeFormationMapper.typeFormationToTypeFormationDto(typeFormation);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public TypeFormationDto update(@RequestBody TypeFormationDto typeFormationDto) {
		TypeFormation typeFormation = typeFormationMapper.typeFormationDtoToTypeFormation(typeFormationDto);
		typeFormation = typeFormationService.update(typeFormation);
		return typeFormationMapper.typeFormationToTypeFormationDto(typeFormation);
	}

	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public TypeFormation findById(@PathVariable Long id) {
		return typeFormationService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<TypeFormation> findAll() {
		return typeFormationService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody TypeFormationDto typeFormationDto) {
		TypeFormation typeFormation = typeFormationMapper.typeFormationDtoToTypeFormation(typeFormationDto);
		typeFormationService.delete(typeFormation);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		typeFormationService.deleteById(id);
	}

}
