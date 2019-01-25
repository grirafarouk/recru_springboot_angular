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

import com.fr.adaming.jsfapp.dto.MotifDto;
import com.fr.adaming.jsfapp.mapper.MotifMapper;
import com.fr.adaming.jsfapp.model.Motif;
import com.fr.adaming.jsfapp.services.IMotifService;

@RestController
@RequestMapping("/api/motifs")
@CrossOrigin("*")
public class MotifController {

	@Autowired
	private IMotifService motifService;

	private MotifMapper motifMapper = Mappers.getMapper(MotifMapper.class);

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public Motif rechercheMotifParLibelle(@PathVariable String libelle) {
		return motifService.rechercheMotifParLibelle(libelle);
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public MotifDto create(@RequestBody MotifDto motifDto) {
		Motif motif = motifMapper.motifDtoToMotif(motifDto);
		motif = motifService.create(motif);
		return motifMapper.motifToMotifDto(motif);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public MotifDto update(@RequestBody MotifDto motifDto) {
		Motif motif = motifMapper.motifDtoToMotif(motifDto);
		motif = motifService.update(motif);
		return motifMapper.motifToMotifDto(motif);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public MotifDto createOrUpdate(@RequestBody MotifDto motifDto) {
		Motif motif = motifMapper.motifDtoToMotif(motifDto);
		motif = motifService.createOrUpdate(motif);
		return motifMapper.motifToMotifDto(motif);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Motif findById(@PathVariable Long id) {
		return motifService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Motif> findAll() {
		return motifService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody MotifDto motifDto) {
		Motif motif = motifMapper.motifDtoToMotif(motifDto);
		motifService.delete(motif);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		motifService.deleteById(id);
	}

}
