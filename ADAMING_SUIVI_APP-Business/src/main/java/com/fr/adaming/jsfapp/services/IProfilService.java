package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Profil;

public interface IProfilService extends IManagerService<Profil, Long> {
	Profil rechercherProfilParLibelle(String libelle);
	List<Profil> findAllProfil();
}
