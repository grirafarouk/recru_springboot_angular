package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import com.fr.adaming.jsfapp.model.Statut;

public interface IStatutDao extends IManagerDao<Statut, Long>, Serializable {
	Statut rechercherStatusParLibelle(String libelle);

	List<Statut> findAllStatus();
}
