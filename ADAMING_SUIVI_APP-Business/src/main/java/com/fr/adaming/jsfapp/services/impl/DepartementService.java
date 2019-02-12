package com.fr.adaming.jsfapp.services.impl;

import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IDepartementDao;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.model.Departement;
import com.fr.adaming.jsfapp.services.IDepartementService;

@Service("departementService")
public class DepartementService extends ManagerService<Departement, Long> implements IDepartementService {

	private static final long serialVersionUID = 1165039883463070904L;

	@Autowired()
	@Qualifier("departementDao")
	@Transient
	private IDepartementDao departementDao;

	@Override
	public IManagerDao<Departement, Long> getDao() {
		return departementDao;
	}

}
