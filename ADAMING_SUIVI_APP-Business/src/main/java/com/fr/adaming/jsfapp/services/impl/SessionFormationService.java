package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.ISessionFormationDao;
import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationReportingDto;
import com.fr.adaming.jsfapp.model.SessionFormation;
import com.fr.adaming.jsfapp.services.ISessionFormationService;

@Service("sessionFormationService")
public class SessionFormationService extends ManagerService<SessionFormation, Long>
		implements ISessionFormationService {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired()
	@Qualifier("sessionFormationDao")
	@Transient
	private ISessionFormationDao sessionFormation;

	@Override
	public IManagerDao<SessionFormation, Long> getDao() {
		return sessionFormation;
	}

	public List<SessionFormation> rechercherSessionsFormationParFormation(FormationDto sessionFormationDto) {

		return sessionFormation.rechercherSessionsFormationParFormation(sessionFormationDto);
	}

	@Override
	public List<SessionFormation> rechercherSessionsFormation(SessionFormationDto sessionFormationDto) {

		return sessionFormation.rechercherSessionsFormation(sessionFormationDto);
	}

	@Override
	public SessionFormation rechercherSessionsFormationParCode(String code) {
		return null;
	}

	public List<SessionFormation> rechercherSessionsFormationEnCours(SessionFormationDto sessionFormationDto) {
		return sessionFormation.rechercherSessionsFormationEnCours(sessionFormationDto);
	}

	public List<SessionFormation> rechercherSessionFormation(SessionFormationDto sessionFormationDto) {
		return sessionFormation.rechercherSessionFormation(sessionFormationDto);
	}

	public List<SessionFormation> rechercherFormationEnCours(SessionFormationDto sessionFormationDto) {
		return sessionFormation.rechercherFormationEnCours(sessionFormationDto);
	}

	public List<SessionFormation> rechercherSession() {
		return sessionFormation.rechercherSession();
	}

	public List<SessionFormation> rechercherSessionsFormationCloture(SessionFormationDto sessionFormationDto) {
		return sessionFormation.rechercherSessionsFormationCloture(sessionFormationDto);
	}

	public List<SessionFormation> rechercherSessionsFormationClotureParFormation(FormationDto formationDto) {
		return sessionFormation.rechercherSessionsFormationClotureParFormation(formationDto);
	}

	public List<SessionFormation> rechercherSessionsFormationEnCourParFormation(FormationDto formationDto) {
		return sessionFormation.rechercherSessionsFormationEnCourParFormation(formationDto);
	}

	public List<SessionFormationReportingDto> rechercherSessionreorting() {
		return sessionFormation.rechercherSessionreorting();
	}

	public List<SessionFormationReportingDto> rechercherAllSession() {
		return sessionFormation.rechercherAllSession();
	}
}
