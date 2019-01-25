package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IFormationDao;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.model.Formation;
import com.fr.adaming.jsfapp.services.IFormationService;

@Service("formationService")
public class FormationService extends ManagerService<Formation, Long> implements
		IFormationService {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4128842610867708520L;
	@Autowired()
	@Qualifier("formationDao")
	private IFormationDao formationDao;

	@Override
	public IManagerDao<Formation, Long> getDao() {
		return formationDao;
	}

	@Override
	public Formation rechercherSessionsFormationParCode(String code) {
		return formationDao.rechercherSessionsFormationParCode(code);

	}

	@Override
	public Formation rechercherSessionsFormationParCode(FormationDto formation) {
		return formationDao.rechercherSessionsFormationParCode(formation);
	}
	
	@Override
	public List<Formation> rechercherFormations(SessionFormationDto searchDto) {
		return formationDao
				.rechercherFormations(searchDto);
	}

	@Override
	public List<Formation> rechercherFormationsEnCours(SessionFormationDto searchDto) {
		return formationDao
				.rechercherFormationsEnCours(searchDto);
	}

	@Override
	public List<Formation> rechercherFormationsClotures(SessionFormationDto searchDto) {
		return formationDao.rechercherFormationsClotures(searchDto);
	}

	public List<Formation> rechercherFormationParSessionFormation(
			FormationDto formationDto, SessionFormationDto sessionFormationDto) {
		return formationDao.rechercherFormationParSessionFormation(
				formationDto, sessionFormationDto);
	}

	public List<Formation> findAllFormationsEnCours() {
		return formationDao.findAllFormationsEnCours();
	}
	
	public List<Formation> findAllFormationsClotures() {
		return formationDao.findAllFormationsClotures();
	}
}
