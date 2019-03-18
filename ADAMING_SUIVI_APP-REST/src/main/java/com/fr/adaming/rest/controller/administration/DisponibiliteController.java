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
import com.fr.adaming.jsfapp.dto.DisponibiliteDto;
import com.fr.adaming.jsfapp.mapper.DisponibiliteMapper;
import com.fr.adaming.jsfapp.model.Disponibilite;
import com.fr.adaming.jsfapp.services.IDisponibiliteService;

@RestController
@RequestMapping(value = "/api/disponibilite")
@CrossOrigin("*")
public class DisponibiliteController {
	@Autowired
	private IDisponibiliteService disponibiliteService;

	private DisponibiliteMapper disponibiliteMapper = Mappers.getMapper(DisponibiliteMapper.class);

	@GetMapping("/libelle/{libelle}")
	public Disponibilite rechercherLibelleDisponibilite(@PathVariable String libelle) {
		return disponibiliteService.rechercherDisponibiliteParLibelle(libelle);
	}

	@PostMapping("")
	public DisponibiliteDto createOrUpdate(@RequestBody DisponibiliteDto disponibiliteDto) {
		Disponibilite disponibilite = disponibiliteMapper.DisponibiliteDtoToDisponibilite(disponibiliteDto);
		disponibilite = disponibiliteService.createOrUpdate(disponibilite);
		return disponibiliteMapper.DisponibiliteToDisponibiliteDto(disponibilite);
	}

	@PostMapping("/add")
	public DisponibiliteDto create(@RequestBody DisponibiliteDto disponibiliteDto) {
		Disponibilite disponibilite = disponibiliteMapper.DisponibiliteDtoToDisponibilite(disponibiliteDto);
		disponibilite = disponibiliteService.create(disponibilite);
		return disponibiliteMapper.DisponibiliteToDisponibiliteDto(disponibilite);
	}

	@PostMapping("/update")
	public DisponibiliteDto update(@RequestBody DisponibiliteDto disponibiliteDto) {
		Disponibilite disponibilite = disponibiliteMapper.DisponibiliteDtoToDisponibilite(disponibiliteDto);
		disponibilite = disponibiliteService.update(disponibilite);
		return disponibiliteMapper.DisponibiliteToDisponibiliteDto(disponibilite);
	}

	@GetMapping("/id/{id}")
	public Disponibilite findById(@PathVariable Long id) {
		return disponibiliteService.findById(id);
	}

	@GetMapping("/all")
	public Collection<Disponibilite> findAll() {
		return disponibiliteService.findAll();
	}

	@DeleteMapping("")
	public void delete(@RequestBody DisponibiliteDto disponibiliteDto) {
		Disponibilite disponibilite = disponibiliteMapper.DisponibiliteDtoToDisponibilite(disponibiliteDto);
		disponibiliteService.delete(disponibilite);
	}

	@DeleteMapping("{id}")
	public void deleteById(@PathVariable Long id) {
		disponibiliteService.deleteById(id);
	}

}
