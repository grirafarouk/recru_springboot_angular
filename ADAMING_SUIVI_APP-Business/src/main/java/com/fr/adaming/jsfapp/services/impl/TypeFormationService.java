package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.ITypeFormationDao;
import com.fr.adaming.jsfapp.model.TypeFormation;
import com.fr.adaming.jsfapp.services.ITypeFormationService;

@Service("typeFormationService")
public class TypeFormationService extends ManagerService<TypeFormation, Long>
		implements ITypeFormationService {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4128842610867708520L;
	@Autowired()
	@Qualifier("typeFormationDao")
	@Transient
	private ITypeFormationDao typeFormationDao;

	@Override
	public IManagerDao<TypeFormation, Long> getDao() {
		return typeFormationDao;
	}

	@Override
	public TypeFormation rechercherTypeFormationParLibelle(String libelle) {
		return typeFormationDao.rechercherTypeFormationParLibelle(libelle);
	}

	@Override
	public List<TypeFormation> findAllTypesFormation() {
		return typeFormationDao.findAllTypesFormation();
	}

	@Override
	public List<TypeFormation> rechercherTypeFormation(String typeFormation) {
		return typeFormationDao.rechercherTypeFormation(typeFormation);
	}

}
