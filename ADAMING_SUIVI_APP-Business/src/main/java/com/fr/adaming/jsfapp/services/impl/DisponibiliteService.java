package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import javax.persistence.Transient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IDisponibiliteDao;
import com.fr.adaming.jsfapp.model.Disponibilite;
import com.fr.adaming.jsfapp.services.IDisponibiliteService;

@Service("disponibiliteService")
public class DisponibiliteService extends ManagerService<Disponibilite, Long> implements IDisponibiliteService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1117525074380565949L;
	/**
	 * 
	 */
	@Autowired()
	@Qualifier("disponibiliteDao")
	@Transient
	private IDisponibiliteDao disponibiliteDao;

	@Override
	public IManagerDao<Disponibilite, Long> getDao() {
		return disponibiliteDao;
	}

	@Override
	public Disponibilite rechercherDisponibiliteParLibelle(String libelle) {
		return disponibiliteDao.rechercherDisponibiliteParLibelle(libelle);
	}

	@Override
	public List<Disponibilite> findAllDisponibilite() {
		return disponibiliteDao.findAllDisponibilite();
	}

}
