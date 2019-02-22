package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IStatutDao;
import com.fr.adaming.jsfapp.model.Statut;
import com.fr.adaming.jsfapp.services.IStatutService;

@Service("statutService")
public class StatutService extends ManagerService<Statut, Long> implements IStatutService {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3959787229382012017L;
	@Autowired()
	@Qualifier("statutDao")
	@Transient
	private IStatutDao statutDao;

	@Override
	public IManagerDao<Statut, Long> getDao() {
		return statutDao;
	}

	@Override
	public Statut rechercherStatutParLibelle(String libelle) {
		return statutDao.rechercherStatusParLibelle(libelle);
	}

	@Override
	public List<Statut> findAllStatut() {
		return statutDao.findAllStatus();
	}

}
