package com.fr.adaming.jsfapp.services.impl;

import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fr.adaming.jsfapp.dao.IEntretienDao;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.model.Entretien;
import com.fr.adaming.jsfapp.services.IEntretienService;

@Service("entretienService")
public class EntretienService extends ManagerService<Entretien, Long> implements IEntretienService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 850283868659013865L;

	@Autowired()
	@Qualifier("entretienDao")
	@Transient
	private IEntretienDao entretienDao;

	@Override
	public IManagerDao<Entretien, Long> getDao() {
		return entretienDao;
	}

//	@Override
//	@Transactional
//	public void updateDisponiblite(String id) {
//		entretienDao.updateDisponiblite(id);
//		
//	}

}
