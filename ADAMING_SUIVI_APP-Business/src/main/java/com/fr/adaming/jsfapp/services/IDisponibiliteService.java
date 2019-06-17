package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Disponibilite;
import com.fr.adaming.jsfapp.model.Role;

public interface IDisponibiliteService extends IManagerService<Disponibilite, Long> {
	Disponibilite rechercherDisponibiliteParLibelle(String libelle);
	List<Disponibilite> findAllDisponibilite();
	List<Disponibilite> rechercheRole(String Disponibilite);

}
