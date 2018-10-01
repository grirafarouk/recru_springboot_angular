package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.model.Formation;

public interface IFormationService extends IManagerService<Formation, Long> {

	Formation rechercherSessionsFormationParCode(String code);

	Formation rechercherSessionsFormationParCode(FormationDto formation);

	List<Formation> rechercherFormationsEnCours(FormationDto formationDto, SessionFormationDto searchDto);

	List<Formation> rechercherFormationsClotures(FormationDto formationDto, SessionFormationDto searchDto);

	List<Formation> rechercherFormationParSessionFormation(
			FormationDto formationDto, SessionFormationDto sessionFormationDto);

	List<Formation> findAllFormationsEnCours();
	
	List<Formation> findAllFormationsClotures();
}
