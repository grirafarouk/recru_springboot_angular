package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.ICompetenceDao;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.services.ICompetenceService;

@Service("competenceService")
public class CompetenceService extends ManagerService<Competence, Long> implements ICompetenceService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Autowired()
	@Qualifier("competenceDao")
	@Transient
	private ICompetenceDao competenceDao;

	@Override
	public IManagerDao<Competence, Long> getDao() {
		return competenceDao;
	}

	@Override
	public List<Competence> rechercherCandidatCompetences(long id) {
		return competenceDao.rechercherCandidatCompetences(id);
	}

	@Override
	public List<Competence> findAllCompetence() {
		return competenceDao.findAllCompetence();
	}

	@Override
	public Competence findByLibelle(String libelle) {
		return competenceDao.findByLibelle(libelle);
	}

}
