package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IOrigineDao;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.services.IOrigineService;

@Service("origineService")
public class OrigineService extends ManagerService<Origine, Long> implements IOrigineService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3656415492415962034L;

	@Autowired()
	@Qualifier("origineDao")
	private IOrigineDao origineDao;

	@Override
	public IManagerDao<Origine, Long> getDao() {
		return origineDao;
	}

	@Override
	public Origine rechercherOrigineParLibelle(String libelle) {
		return origineDao.rechercherOrigineParLibelle(libelle);
	}

	public List<Origine> findAllOrigines() {
		return origineDao.findAllOrigines();
	}

	@Override
	public List<Origine> rechercherOrigine(String orgine) {
		return origineDao.rechercherOrigine(orgine);
	}

}
