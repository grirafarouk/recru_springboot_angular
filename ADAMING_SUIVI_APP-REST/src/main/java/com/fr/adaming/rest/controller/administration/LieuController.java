package com.fr.adaming.rest.controller.administration;

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

	@GetMapping(value = "/libelle/{libelle}")
	public Lieu rechercherLieuParLibelle(@PathVariable String libelle) {
		return lieuService.rechercherLieuParLibelle(libelle);
	}

	@PostMapping(value = "")
	public LieuDto createOrUpdate(@RequestBody LieuDto lieuDto) {
		Lieu lieu = lieuMapper.lieuDtoToLieu(lieuDto);
		lieu = lieuService.createOrUpdate(lieu);
		return lieuMapper.lieuToLieuDto(lieu);
	}

	@PostMapping(value = "/update")
	public LieuDto update(@RequestBody LieuDto lieuDto) {
		Lieu lieu = lieuMapper.lieuDtoToLieu(lieuDto);
		lieu = lieuService.update(lieu);
		return lieuMapper.lieuToLieuDto(lieu);
	}

	@PostMapping(value = "/add")
	public LieuDto create(@RequestBody LieuDto lieuDto) {
		Lieu lieu = lieuMapper.lieuDtoToLieu(lieuDto);
		lieu = lieuService.create(lieu);
		return lieuMapper.lieuToLieuDto(lieu);
	}

	@GetMapping(value = "/adresse/{libelle}")
	public Lieu rechercherLieuParAdresse(@PathVariable String libelle) {
		return lieuService.rechercherLieuParAdresse(libelle);
	}

	@GetMapping(value = "/id/{id}")
	public Lieu findById(@PathVariable Long id) {
		return lieuService.findById(id);
	}

	@GetMapping(value = "/all")
	public Collection<Lieu> findAll() {
		return lieuService.findAll();
	}

	@DeleteMapping(value = "")
	public void delete(@RequestBody LieuDto lieuDto) {
		Lieu lieu = lieuMapper.lieuDtoToLieu(lieuDto);
		lieuService.delete(lieu);
	}

	@DeleteMapping(value = "/{id}")
	public void deleteById(@PathVariable Long id) {
		lieuService.deleteById(id);
	}

}
