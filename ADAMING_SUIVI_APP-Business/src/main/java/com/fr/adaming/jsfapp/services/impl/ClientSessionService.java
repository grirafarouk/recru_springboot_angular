package com.fr.adaming.jsfapp.services.impl;

import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IClientSessionDao;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.model.ClientSession;
import com.fr.adaming.jsfapp.services.IClientSessionService;


@Service("clientSessionService")
public class ClientSessionService extends ManagerService<ClientSession, Long> implements IClientSessionService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8476028360874840411L;
	
	
	@Autowired()
	@Qualifier("clientSessionDao")
	@Transient
	private IClientSessionDao clientSessionDao;
	

	@Override
	public IManagerDao<ClientSession, Long> getDao() {
	
		return clientSessionDao;
	}


	@Override
	public ClientSession rechercheClientSessionParLibelle(String libelle) {
		
		return clientSessionDao.rechercheClientSessionParLibelle(libelle);
	}

}
