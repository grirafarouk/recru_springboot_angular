package com.fr.adaming.jsfapp.services.impl;

import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.ISuiviDao;
import com.fr.adaming.jsfapp.model.Suivi;
import com.fr.adaming.jsfapp.services.ISuiviService;

@Service("suiviService")
public class SuiviService extends ManagerService<Suivi, Long> implements ISuiviService {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1522847268923117030L;

	@Autowired()
	@Qualifier("suiviDao")
	@Transient
	private ISuiviDao suiviDao;

	@Override
	public IManagerDao<Suivi, Long> getDao() {
		return suiviDao;
	}

}
