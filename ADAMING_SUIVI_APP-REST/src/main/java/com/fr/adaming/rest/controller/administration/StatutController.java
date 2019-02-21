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
import com.fr.adaming.jsfapp.dto.StatutDto;
import com.fr.adaming.jsfapp.mapper.StatutMapper;
import com.fr.adaming.jsfapp.model.Statut;
import com.fr.adaming.jsfapp.services.IStatutService;

@RestController
@RequestMapping(value = "/api/statut")
@CrossOrigin("*")
public class StatutController {
	@Autowired
	private IStatutService statutService;

	private StatutMapper statutMapper = Mappers.getMapper(StatutMapper.class);

	@GetMapping("/libelle/{libelle}")
	public Statut rechercherTypeProfil(@PathVariable String libelle) {
		return statutService.rechercherStatutParLibelle(libelle);
	}

	@PostMapping("")
	public StatutDto createOrUpdate(@RequestBody StatutDto StatutDto) {
		Statut statut = statutMapper.StatusDtoToStatus(StatutDto);
		statut = statutService.createOrUpdate(statut);
		return statutMapper.StatusToStatusDto(statut);
	}

	@PostMapping("/add")
	public StatutDto create(@RequestBody StatutDto StatutDto) {
		Statut statut = statutMapper.StatusDtoToStatus(StatutDto);
		statut = statutService.merge(statut);
		return statutMapper.StatusToStatusDto(statut);
	}

	@PostMapping("/update")
	public StatutDto update(@RequestBody StatutDto StatutDto) {
		Statut statut = statutMapper.StatusDtoToStatus(StatutDto);
		statut = statutService.update(statut);
		return statutMapper.StatusToStatusDto(statut);
	}

	@GetMapping("/id/{id}")
	public Statut findById(@PathVariable Long id) {
		return statutService.findById(id);
	}

	@GetMapping("")
	public Collection<Statut> findAll() {
		return statutService.findAll();
	}

	@DeleteMapping("")
	public void delete(@RequestBody StatutDto StatutDto) {
		Statut statut = statutMapper.StatusDtoToStatus(StatutDto);
		statutService.delete(statut);
	}

	@DeleteMapping("{id}")
	public void deleteById(@PathVariable Long id) {
		statutService.deleteById(id);
	}

}




