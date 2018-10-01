package com.fr.adaming.jsfapp.dao;

import java.util.List;

import com.fr.adaming.jsfapp.model.TypeFormation;

public interface ITypeFormationDao extends IManagerDao<TypeFormation, Long> {
	TypeFormation rechercherTypeFormationParLibelle(String libelle);
	List<TypeFormation> findAllTypesFormation();
}
