package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.ILieuDao;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.model.Lieu;
import com.fr.adaming.jsfapp.services.ILieuService;

@Service("lieuService")
public class LieuService extends ManagerService<Lieu, Long> implements
		ILieuService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 850018047326201183L;
	@Autowired()
	@Qualifier("lieuDao")
	private ILieuDao lieuDao;

	@Override
	public IManagerDao<Lieu, Long> getDao() {
		return lieuDao;
	}

	@Override
	public Lieu rechercherLieu(Lieu lieu) {
		return lieuDao.rechercherLieu(lieu);
	}

	@Override
	public Lieu rechercherLieuParLibelle(String libelle) {
		return lieuDao.rechercherLieuParLibelle(libelle);
	}
	@Override
	public Lieu rechercherLieuParAdresse(String libelle) {
		return lieuDao.rechercherLieuParAdresse(libelle);
	}
	
	@Override
	public List<Lieu> findAllLieux() {
		return lieuDao.findAllLieux();
	}
}
