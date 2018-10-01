package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.ITechnologieDao;
import com.fr.adaming.jsfapp.dto.TechnologieDto;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.services.ITechnologieService;

@Service("technologieService")
public class TechnologieService extends ManagerService<Technologie, Long>
		implements ITechnologieService {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7547495150232387321L;
	@Autowired()
	@Qualifier("technologieDao")
	private ITechnologieDao technologieDao;

	@Override
	public IManagerDao<Technologie, Long> getDao() {
		return technologieDao;
	}

	@Override
	public Technologie rechercherTechnologieParLibelle(String libelle) {
		return technologieDao.rechercherTechnologieParLibelle(libelle);
	}

	@Override
	public List<Technologie> rechercherTechnologiePourReporting() {
		return technologieDao.rechercherTechnologiePourReporting();
	}

	@Override
	public List<Technologie> findAllTechnologies() {
		return technologieDao.findAllTechnologies();
	}
	
	@Override
	public List<TechnologieDto> findAllTechnologiesByLibelle() {
		return technologieDao.findAllTechnologiesByLibelle();
	}
}
