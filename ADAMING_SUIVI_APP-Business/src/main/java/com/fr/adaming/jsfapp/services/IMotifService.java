package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Motif;

public interface IMotifService extends IManagerService<Motif, Long> {
	List<Motif> rechercherMotif(String motif);

	public Motif rechercheMotifParLibelle(String libelle);

}
