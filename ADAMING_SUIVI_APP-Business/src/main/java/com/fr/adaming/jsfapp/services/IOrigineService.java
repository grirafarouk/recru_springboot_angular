package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Origine;

public interface IOrigineService extends IManagerService<Origine, Long> {

	Origine rechercherOrigineParLibelle(String libelle); 
	
	List<Origine> findAllOrigines();
}
