package com.fr.adaming.jsfapp.services;

import com.fr.adaming.jsfapp.model.Motif;

public interface IMotifService extends IManagerService<Motif, Long> {
	
	public Motif rechercheMotifParLibelle(String libelle);

}
