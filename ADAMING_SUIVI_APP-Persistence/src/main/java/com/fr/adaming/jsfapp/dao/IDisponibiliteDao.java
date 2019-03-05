package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import com.fr.adaming.jsfapp.model.Disponibilite;

public interface IDisponibiliteDao extends IManagerDao<Disponibilite, Long>, Serializable {

	Disponibilite rechercherDisponibiliteParLibelle(String libelle);
 
	List<Disponibilite> findAllDisponibilite();

}
