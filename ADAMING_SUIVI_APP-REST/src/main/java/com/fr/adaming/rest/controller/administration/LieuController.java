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

import com.fr.adaming.jsfapp.dto.LieuDto;
import com.fr.adaming.jsfapp.mapper.LieuMapper;
import com.fr.adaming.jsfapp.model.Lieu;
import com.fr.adaming.jsfapp.services.ILieuService;

@RestController
@RequestMapping(value = "/api/lieu")
@CrossOrigin("*")
public class LieuController {

	@Autowired
	private ILieuService lieuService;

	private LieuMapper lieuMapper = Mappers.getMapper(LieuMapper.class);

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public Lieu rechercherLieuParLibelle(@PathVariable String libelle) {
		return lieuService.rechercherLieuParLibelle(libelle);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public LieuDto createOrUpdate(@RequestBody LieuDto lieuDto) {
		Lieu lieu = lieuMapper.lieuDtoToLieu(lieuDto);
		lieu = lieuService.createOrUpdate(lieu);
		return lieuMapper.lieuToLieuDto(lieu);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public LieuDto update(@RequestBody LieuDto lieuDto) {
		Lieu lieu = lieuMapper.lieuDtoToLieu(lieuDto);
		lieu = lieuService.update(lieu);
		return lieuMapper.lieuToLieuDto(lieu);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public LieuDto create(@RequestBody LieuDto lieuDto) {
		Lieu lieu = lieuMapper.lieuDtoToLieu(lieuDto);
		lieu = lieuService.create(lieu);
		return lieuMapper.lieuToLieuDto(lieu);
	}

	@RequestMapping(value = "/adresse/{libelle}", method = RequestMethod.GET)
	public Lieu rechercherLieuParAdresse(@PathVariable String libelle) {
		return lieuService.rechercherLieuParAdresse(libelle);
	}

	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public Lieu findById(@PathVariable Long id) {
		return lieuService.findById(id);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public Collection<Lieu> findAll() {
		return lieuService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody LieuDto lieuDto) {
		Lieu lieu = lieuMapper.lieuDtoToLieu(lieuDto);
		lieuService.delete(lieu);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		lieuService.deleteById(id);
	}

}
