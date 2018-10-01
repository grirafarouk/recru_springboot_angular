package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.dto.TechnologieDto;
import com.fr.adaming.jsfapp.model.Technologie;

public interface ITechnologieService extends IManagerService<Technologie, Long> {

	Technologie rechercherTechnologieParLibelle(String libelle);

	List<Technologie> rechercherTechnologiePourReporting();
	List<Technologie> findAllTechnologies();
	 List<TechnologieDto> findAllTechnologiesByLibelle();
}
