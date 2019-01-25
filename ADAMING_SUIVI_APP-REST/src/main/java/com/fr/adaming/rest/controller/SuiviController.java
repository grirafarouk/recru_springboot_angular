package com.fr.adaming.rest.controller;

import java.util.Collection;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

	@RequestMapping(value = "", method = RequestMethod.POST)
	public SuiviDto createOrUpdate(@RequestBody SuiviDto suiviDto) {
		Suivi suivi=suiviMapper.suiviDtoToSuivi(suiviDto);
		suivi=suiviService.create(suivi);
		return suiviMapper.suiviToSuiviDto(suivi);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Suivi findById(@PathVariable Long id) {
		return suiviService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Suivi> findAll() {
		return suiviService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody SuiviDto suiviDto) {
		Suivi suivi=suiviMapper.suiviDtoToSuivi(suiviDto);
		suiviService.delete(suivi);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		suiviService.deleteById(id);
	}
}
