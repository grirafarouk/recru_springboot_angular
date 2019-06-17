package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import com.fr.adaming.jsfapp.model.Motif;

public interface IMotifDao extends IManagerDao<Motif, Long>,Serializable {
	
	public Motif rechercheMotifParLibelle(String libelle);
	List<Motif> rechercherMotif(String motif);


}
