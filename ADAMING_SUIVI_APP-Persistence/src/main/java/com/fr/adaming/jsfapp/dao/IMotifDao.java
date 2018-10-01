package com.fr.adaming.jsfapp.dao;

import com.fr.adaming.jsfapp.model.Motif;

public interface IMotifDao extends IManagerDao<Motif, Long> {
	
	public Motif rechercheMotifParLibelle(String libelle);

}
