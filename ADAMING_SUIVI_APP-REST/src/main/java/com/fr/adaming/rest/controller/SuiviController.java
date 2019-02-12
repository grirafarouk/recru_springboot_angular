package com.fr.adaming.rest.controller;

import java.util.Collection;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.SuiviDto;
import com.fr.adaming.jsfapp.mapper.SuiviMapper;
import com.fr.adaming.jsfapp.model.Suivi;
import com.fr.adaming.jsfapp.services.ISuiviService;

@RestController
@RequestMapping(value = "/api/suivi")
public class SuiviController {

	@Autowired
	private ISuiviService suiviService;
	
	private SuiviMapper suiviMapper=Mappers.getMapper(SuiviMapper.class);

	@PostMapping("")
	public SuiviDto createOrUpdate(@RequestBody SuiviDto suiviDto) {
		Suivi suivi=suiviMapper.suiviDtoToSuivi(suiviDto);
		suivi=suiviService.create(suivi);
		return suiviMapper.suiviToSuiviDto(suivi);
	}

	@GetMapping("/{id}")
	public Suivi findById(@PathVariable Long id) {
		return suiviService.findById(id);
	}

	@GetMapping("")
	public Collection<Suivi> findAll() {
		return suiviService.findAll();
	}

	@DeleteMapping("")
	public void delete(@RequestBody SuiviDto suiviDto) {
		Suivi suivi=suiviMapper.suiviDtoToSuivi(suiviDto);
		suiviService.delete(suivi);
	}

	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable Long id) {
		suiviService.deleteById(id);
	}
}
