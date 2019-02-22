package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import com.fr.adaming.jsfapp.model.Profil;

public interface IProfilDao extends IManagerDao<Profil, Long>, Serializable {
	Profil rechercherProfilParTypeProfil(String libelle);

	List<Profil> findAllProfil();
}
