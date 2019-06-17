package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import com.fr.adaming.jsfapp.model.Disponibilite;
import com.fr.adaming.jsfapp.model.Role;

public interface IDisponibiliteDao extends IManagerDao<Disponibilite, Long>, Serializable {

	Disponibilite rechercherDisponibiliteParLibelle(String libelle);

	List<Disponibilite> findAllDisponibilite();
	List<Disponibilite> rechercheDisponibilite(String disponibilite);

}
