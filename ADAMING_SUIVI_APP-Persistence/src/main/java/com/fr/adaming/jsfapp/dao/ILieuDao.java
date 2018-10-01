package com.fr.adaming.jsfapp.dao;

import java.util.List;

import com.fr.adaming.jsfapp.model.Lieu;

public interface ILieuDao extends IManagerDao<Lieu, Long> {
	Lieu rechercherLieuParLibelle(String libelle);
	Lieu rechercherLieuParAdresse(String libelle);

	Lieu rechercherLieu(Lieu lieu);
	
	List<Lieu> findAllLieux();
}
