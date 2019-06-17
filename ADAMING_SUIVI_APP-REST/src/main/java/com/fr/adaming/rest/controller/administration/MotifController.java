package com.fr.adaming.rest.controller.administration;

import java.util.Collection;
import java.util.List;

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
import com.fr.adaming.jsfapp.dto.MotifDto;
import com.fr.adaming.jsfapp.mapper.MotifMapper;
import com.fr.adaming.jsfapp.model.ClientSession;
import com.fr.adaming.jsfapp.model.Motif;
import com.fr.adaming.jsfapp.services.IMotifService;

@RestController
@RequestMapping("/api/motifs")
@CrossOrigin("*")
public class MotifController {

	@Autowired
	private IMotifService motifService;

	private MotifMapper motifMapper = Mappers.getMapper(MotifMapper.class);

	@GetMapping(path = "/libelle/{libelle}")
	public Motif rechercheMotifParLibelle(@PathVariable String libelle) {
		return motifService.rechercheMotifParLibelle(libelle);
	}

	@PostMapping(path = "/add")
	public MotifDto create(@RequestBody MotifDto motifDto) {
		Motif motif = motifMapper.motifDtoToMotif(motifDto);
		motif = motifService.create(motif);
		return motifMapper.motifToMotifDto(motif);
	}

	@PostMapping(path = "/update")
	public MotifDto update(@RequestBody MotifDto motifDto) {
		Motif motif = motifMapper.motifDtoToMotif(motifDto);
		motif = motifService.update(motif);
		return motifMapper.motifToMotifDto(motif);
	}

	@PostMapping(path = "")
	public MotifDto createOrUpdate(@RequestBody MotifDto motifDto) {
		Motif motif = motifMapper.motifDtoToMotif(motifDto);
		motif = motifService.createOrUpdate(motif);
		return motifMapper.motifToMotifDto(motif);
	}

	@GetMapping(path = "/{id}")
	public Motif findById(@PathVariable Long id) {
		return motifService.findById(id);
	}

	@GetMapping(path = "")
	public Collection<Motif> findAll() {
		return motifService.findAll();
	}

	@DeleteMapping(path = "")
	public void delete(@RequestBody MotifDto motifDto) {
		Motif motif = motifMapper.motifDtoToMotif(motifDto);
		motifService.delete(motif);
	}

	@DeleteMapping(path = "{id}")
	public void deleteById(@PathVariable Long id) {
		motifService.deleteById(id);
	}
	@RequestMapping(value = "recherche/{text}", method = RequestMethod.GET)
	public List<Motif> rechercherMotif(@PathVariable String text) {
		return motifService.rechercherMotif(text);
	}
}
