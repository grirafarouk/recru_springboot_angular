package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import com.fr.adaming.jsfapp.model.Origine;

public interface IOrigineDao extends IManagerDao<Origine, Long>,Serializable {
	Origine rechercherOrigineParLibelle(String libelle);

	List<Origine> findAllOrigines();
}
