package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.TypeFormation;

public interface ITypeFormationService extends IManagerService<TypeFormation, Long> {

	TypeFormation rechercherTypeFormationParLibelle(String libelle);
	List<TypeFormation> findAllTypesFormation();
}
