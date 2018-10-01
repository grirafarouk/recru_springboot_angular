package com.fr.adaming.jsfapp.dao;

import java.util.List;

import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationReportingDto;
import com.fr.adaming.jsfapp.model.SessionFormation;

public interface ISessionFormationDao extends
		IManagerDao<SessionFormation, Long> {

	public List<SessionFormation> rechercherSessionsFormationParFormation(
			FormationDto sessionFormationDto);

	List<SessionFormation> rechercherSessionsFormation(
			SessionFormationDto sessionFormationDto);

	List<SessionFormation> rechercherFormationEnCours(
			SessionFormationDto sessionFormationDto);
	List<SessionFormation> rechercherSessionsFormationEnCours(
			SessionFormationDto sessionFormationDto);

	List<SessionFormation> rechercherSessionsFormationCloture(
			SessionFormationDto sessionFormationDto);

	List<SessionFormation> rechercherSessionsFormationClotureParFormation(
			FormationDto formationDto);

	List<SessionFormation> rechercherSessionsFormationEnCourParFormation(
			FormationDto formationDto);
	List<SessionFormation> rechercherSession();
	List<SessionFormationReportingDto> rechercherSessionreorting();
	List<SessionFormationReportingDto> rechercherAllSession();
}
