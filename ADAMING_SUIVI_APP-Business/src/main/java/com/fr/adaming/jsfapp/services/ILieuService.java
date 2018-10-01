package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Lieu;

public interface ILieuService extends IManagerService<Lieu, Long> {

	Lieu rechercherLieu(Lieu lieu);

	Lieu rechercherLieuParLibelle(String libelle);
	
	Lieu rechercherLieuParAdresse(String libelle);
	
	List<Lieu> findAllLieux();
}
