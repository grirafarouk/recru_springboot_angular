package com.fr.adaming.jsfapp.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.ICandidatCompetenceDao;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.model.CandidatCompetence;
import com.fr.adaming.jsfapp.services.ICandidatCompetenceService;

@Service("candidatCompetenceService")
public class CandidatCompetenceService extends ManagerService<CandidatCompetence, Long> implements ICandidatCompetenceService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired()
	@Qualifier("candidatCompetenceDao")
	private ICandidatCompetenceDao candidatCompetenceDao;

	@Override
	public IManagerDao<CandidatCompetence, Long> getDao() {
		return candidatCompetenceDao;
	}

}
