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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.EntretienDto;
import com.fr.adaming.jsfapp.mapper.EntretienMapper;
import com.fr.adaming.jsfapp.model.Entretien;
import com.fr.adaming.jsfapp.services.IEntretienService;

@RestController
@RequestMapping(value = "/api/entretien")
@CrossOrigin("*")
public class EntretienController {

	@Autowired
	private IEntretienService entretienService;

	private EntretienMapper entretienMapper = Mappers.getMapper(EntretienMapper.class);

	@PostMapping(path = "")
	public EntretienDto createOrUpdate(@RequestBody EntretienDto entretienDto) {
		Entretien entretien = entretienMapper.entretienDtoToEntretien(entretienDto);
		entretien = entretienService.createOrUpdate(entretien);
		return entretienMapper.entretienToEntretienDto(entretien);
	}

	@GetMapping(path = "/{id}")
	public Entretien findById(@PathVariable Long id) {
		return entretienService.findById(id);
	}

	@GetMapping(path = "")
	public Collection<Entretien> findAll() {
		return entretienService.findAll();
	}

	@DeleteMapping(path = "")
	public void delete(@RequestBody EntretienDto entretienDto) {
		Entretien entretien = entretienMapper.entretienDtoToEntretien(entretienDto);
		entretienService.delete(entretien);
	}

	@DeleteMapping(path = "/{id}")
	public void deleteById(@PathVariable Long id) {
		entretienService.deleteById(id);
	}

}
