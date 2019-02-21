package com.fr.adaming.rest.controller;

import java.util.Collection;

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

import com.fr.adaming.jsfapp.dto.CiviliteDto;
import com.fr.adaming.jsfapp.mapper.CiviliteMapper;
import com.fr.adaming.jsfapp.model.Civilite;
import com.fr.adaming.jsfapp.services.ICiviliteService;

@RestController
@RequestMapping(value = "/api/civilites")
@CrossOrigin("*")
public class CiviliteController {

	@Autowired
	private ICiviliteService civiliteService;
	
	private CiviliteMapper civiliteMapper=Mappers.getMapper(CiviliteMapper.class);

	@GetMapping(path = "")
	public Collection<Civilite> findAll() {
		return civiliteService.findAll();
	}

	@GetMapping(path = "/{id}")
	public Civilite findById(@PathVariable Long id) {
		return civiliteService.findById(id);
	}

	@PostMapping(path = "/add")
	public CiviliteDto create(@RequestBody CiviliteDto civiliteDto) {
		Civilite civilite=civiliteMapper.civiliteDtoToCivilite(civiliteDto);
		civilite=civiliteService.create(civilite);
		return civiliteMapper.civiliteToCiviliteDto(civilite);
	}

	@PostMapping(path = "/update")
	public CiviliteDto update(@RequestBody CiviliteDto civiliteDto) {
		Civilite civilite=civiliteMapper.civiliteDtoToCivilite(civiliteDto);
		civilite=civiliteService.update(civilite);
		return civiliteMapper.civiliteToCiviliteDto(civilite);
	}

	@PostMapping(path = "")
	public CiviliteDto createOrUpdate(@RequestBody CiviliteDto civiliteDto) {
		Civilite civilite=civiliteMapper.civiliteDtoToCivilite(civiliteDto);
		civilite=civiliteService.createOrUpdate(civilite);
		return civiliteMapper.civiliteToCiviliteDto(civilite);
	}

	@DeleteMapping(path = "")
	public void delete(@RequestBody CiviliteDto civiliteDto) {
		Civilite civilite=civiliteMapper.civiliteDtoToCivilite(civiliteDto);
		civiliteService.delete(civilite);
	}

	@DeleteMapping(path = "{id}")
	public void deleteById(@PathVariable Long id) {
		civiliteService.deleteById(id);
	}

}
