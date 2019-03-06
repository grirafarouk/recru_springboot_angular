package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Disponibilite;

public interface IDisponibiliteService extends IManagerService<Disponibilite, Long> {
	Disponibilite rechercherDisponibiliteParLibelle(String libelle);
	List<Disponibilite> findAllDisponibilite();
}
