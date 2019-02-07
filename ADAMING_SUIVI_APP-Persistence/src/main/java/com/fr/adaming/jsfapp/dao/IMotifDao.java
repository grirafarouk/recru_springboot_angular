package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;

import com.fr.adaming.jsfapp.model.Motif;

public interface IMotifDao extends IManagerDao<Motif, Long>,Serializable {
	
	public Motif rechercheMotifParLibelle(String libelle);

}
