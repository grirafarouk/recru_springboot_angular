package com.fr.adaming.jsfapp.services.impl;

import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.ICiviliteDao;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.model.Civilite;
import com.fr.adaming.jsfapp.services.ICiviliteService;

@Service("civiliteService")
public class CiviliteService extends ManagerService<Civilite, Long> implements ICiviliteService {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8356064884175412654L;
	@Autowired()
	@Qualifier("civiliteDao")
	@Transient
	private ICiviliteDao civiliteDao;

	@Override
	public IManagerDao<Civilite, Long> getDao() {
		return civiliteDao;
	}

}
