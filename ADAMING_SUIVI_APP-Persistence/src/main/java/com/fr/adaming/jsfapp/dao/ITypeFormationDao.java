package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import com.fr.adaming.jsfapp.model.TypeFormation;

public interface ITypeFormationDao extends IManagerDao<TypeFormation, Long>,Serializable {
	TypeFormation rechercherTypeFormationParLibelle(String libelle);
	List<TypeFormation> findAllTypesFormation();
	List<TypeFormation> rechercherTypeFormation(String typeFormation);

}
