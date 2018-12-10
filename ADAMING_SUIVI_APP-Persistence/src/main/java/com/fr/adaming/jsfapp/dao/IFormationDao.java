package com.fr.adaming.jsfapp.dao;

import java.util.List;

import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.model.Formation;

public interface IFormationDao extends IManagerDao<Formation, Long> {

	Formation rechercherSessionsFormationParCode(String code);

	Formation rechercherSessionsFormationParCode(FormationDto formation);
	
	List<Formation> rechercherFormationsEnCours(SessionFormationDto searchDto);

	List<Formation> rechercherFormationsClotures(SessionFormationDto searchDto);

	List<Formation> rechercherFormationParSessionFormation(
			FormationDto formationDto, SessionFormationDto sessionFormationDto);

	List<Formation> findAllFormationsEnCours();
	
	List<Formation> findAllFormationsClotures();
}
