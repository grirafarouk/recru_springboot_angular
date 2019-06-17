package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Statut;

public interface IStatutService extends IManagerService<Statut, Long> {
	Statut rechercherStatutParLibelle(String libelle);
    List<Statut> rechercherStatut(String statut);
	List<Statut> findAllStatut();
}