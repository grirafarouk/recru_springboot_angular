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

import com.fr.adaming.jsfapp.dto.ProfilDto;

import com.fr.adaming.jsfapp.mapper.profileMapper;
import com.fr.adaming.jsfapp.model.Profil;
import com.fr.adaming.jsfapp.services.IProfilService;

@RestController
@RequestMapping(value = "/api/profil")
@CrossOrigin("*")
public class ProfileController {

	@Autowired
	private IProfilService profilService;

	private profileMapper profilMapper = Mappers.getMapper(profileMapper.class);

	@GetMapping("/libelle/{libelle}")
	public Profil rechercherTypeProfil(@PathVariable String libelle) {
		return profilService.rechercherProfilParLibelle(libelle);
	}

	@PostMapping("")
	public ProfilDto createOrUpdate(@RequestBody ProfilDto profilDto) {
		Profil profil = profilMapper.ProfilDtoToProfil(profilDto);
		profil = profilService.createOrUpdate(profil);
		return profilMapper.ProfilToProfilDto(profil);
	}

	@PostMapping("/add")
	public ProfilDto create(@RequestBody ProfilDto profilDto) {
		Profil profil = profilMapper.ProfilDtoToProfil(profilDto);
		profil = profilService.merge(profil);
		return profilMapper.ProfilToProfilDto(profil);
	}

	@PostMapping("/update")
	public ProfilDto update(@RequestBody ProfilDto profilDto) {
		Profil profil = profilMapper.ProfilDtoToProfil(profilDto);
		profil = profilService.update(profil);
		return profilMapper.ProfilToProfilDto(profil);
	}

	@GetMapping("/id/{id}")
	public Profil findById(@PathVariable Long id) {
		return profilService.findById(id);
	}

	@GetMapping("")
	public Collection<Profil> findAll() {
		return profilService.findAll();
	}

	@DeleteMapping("")
	public void delete(@RequestBody ProfilDto profilDto) {
		Profil profil = profilMapper.ProfilDtoToProfil(profilDto);
		profilService.delete(profil);
	}

	@DeleteMapping("{id}")
	public void deleteById(@PathVariable Long id) {
		profilService.deleteById(id);
	}

}

