package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IMotifDao;
import com.fr.adaming.jsfapp.model.Motif;
import com.fr.adaming.jsfapp.services.IMotifService;

@Service("motifService")
public class MotifService extends ManagerService<Motif, Long> implements IMotifService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8476028360874840411L;
	
	
	@Autowired()
	@Qualifier("motifDao")
	private IMotifDao motifDao;
	

	@Override
	public IManagerDao<Motif, Long> getDao() {
		return motifDao;
	}


	@Override
	public Motif rechercheMotifParLibelle(String libelle) {
		
		return motifDao.rechercheMotifParLibelle(libelle);
	}


	@Override
	public List<Motif> rechercherMotif(String motif) {
	return  motifDao.rechercherMotif(motif);
	}

}
