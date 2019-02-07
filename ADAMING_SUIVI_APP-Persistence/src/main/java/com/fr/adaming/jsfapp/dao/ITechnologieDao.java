package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import com.fr.adaming.jsfapp.dto.TechnologieDto;
import com.fr.adaming.jsfapp.model.Technologie;

public interface ITechnologieDao extends IManagerDao<Technologie, Long> ,Serializable{

	Technologie rechercherTechnologieParLibelle(String libelle);

	List<Technologie> rechercherTechnologiePourReporting();
	
	List<Technologie> findAllTechnologies();
	
	 List<TechnologieDto> findAllTechnologiesByLibelle();
}
