package com.fr.adaming.rest.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.chemistry.opencmis.commons.impl.json.JSONObject;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.fr.adaming.jsfapp.dto.FormationDto;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.mapper.SessionFormationMapper;
import com.fr.adaming.jsfapp.model.Candidat;
import com.fr.adaming.jsfapp.model.SessionFormation;
import com.fr.adaming.jsfapp.services.impl.CandidatService;
import com.fr.adaming.jsfapp.services.impl.SessionFormationService;
	
@RestController
@RequestMapping("/api/sessionsformations")
@CrossOrigin("*")
public class SessionsFormations {

	@Autowired
	private SessionFormationService sessionFormationService;

	@Autowired
	private CandidatService candidatService;
	
	private SessionFormationMapper sessionFormationMapper=Mappers.getMapper(SessionFormationMapper.class);
	
	@PostMapping("")
	public SessionFormationDto createOrUpdate(@RequestBody SessionFormationDto sessionFormationDto) {
		if(sessionFormationDto.getId()==null)
		sessionFormationDto.setfActif(true);
		SessionFormation sessionFormation=sessionFormationMapper.sessionFormationDtoToSessionFormation(sessionFormationDto);
		sessionFormation=sessionFormationService.createOrUpdate(sessionFormation);
		return sessionFormationMapper.sessionFormationToSessionFormationDto(sessionFormation);

	}

	@GetMapping("/CandidatParSession")
	public SessionFormation findById(Long id) {
		return sessionFormationService.findById(id);
	}

	@GetMapping("/AllSessions")
	public Collection<SessionFormation> findAll() {
		return sessionFormationService.findAll();
	}

	public void delete(SessionFormation entity) {
		sessionFormationService.delete(entity);
	}

	@PostMapping("/sessionFormationEnCoursparformation")
	public List<SessionFormation> rechercherSessionsFormationParFormation(
			@RequestBody FormationDto sessionFormationDto) {
		return sessionFormationService.rechercherSessionsFormationParFormation(sessionFormationDto);
	}

	public void deleteById(Long id) {
		sessionFormationService.deleteById(id);
	}

	public List<SessionFormation> rechercherSessionsFormation(SessionFormationDto sessionFormationDto) {
		return sessionFormationService.rechercherSessionsFormation(sessionFormationDto);
	}

	public SessionFormation rechercherSessionsFormationParCode(String code) {
		return sessionFormationService.rechercherSessionsFormationParCode(code);
	}

	public List<SessionFormation> rechercherSessionsFormationEnCours(SessionFormationDto sessionFormationDto) {
		return sessionFormationService.rechercherSessionsFormationEnCours(sessionFormationDto);
	}
	
	@PostMapping("/rechercherSessionFormation")
	public List<SessionFormation> rechercherSessionFormation(@RequestBody SessionFormationDto sessionFormationDto) {
		return sessionFormationService.rechercherSessionFormation(sessionFormationDto);
	}

	@PostMapping("/sessionFormationEnCours")
	public List<SessionFormation> rechercherFormationEnCours(@RequestBody SessionFormationDto sessionFormationDto) {
		return sessionFormationService.rechercherFormationEnCours(sessionFormationDto);
	}

	@GetMapping("/sessionFormation")
	public List<SessionFormation> rechercherSession() {
		return sessionFormationService.rechercherSession();
	}

	@PostMapping("/sessionFormationCloturee")
	public List<SessionFormation> rechercherSessionsFormationCloture(
			@RequestBody SessionFormationDto sessionFormationDto) {
		return sessionFormationService.rechercherSessionsFormationCloture(sessionFormationDto);
	}

	public List<SessionFormation> rechercherSessionsFormationClotureParFormation(FormationDto formationDto) {
		return sessionFormationService.rechercherSessionsFormationClotureParFormation(formationDto);
	}

	public List<SessionFormation> rechercherSessionsFormationEnCourParFormation(FormationDto formationDto) {
		return sessionFormationService.rechercherSessionsFormationEnCourParFormation(formationDto);
	}

	@PostMapping("/listeCandidats")
	public JSONObject rechercherCandidatAvecSessionFormation(@RequestBody SessionFormationDto sessionFormationDto,
			@RequestParam int page, @RequestParam int size) {
		List<Candidat> liste = new ArrayList<>(
				candidatService.rechercherCandidatAvecSessionFormation(sessionFormationDto));
		JSONObject object = new JSONObject();
		object.put("total", liste.size());
		if (size == 0)
			object.put("results", liste);
		else
			object.put("results", liste.subList(page, liste.size() < size + page ? liste.size() : page + size));
		return object;
	}

	@GetMapping("/nbreparticipants/{id}")
	public int nbreparticipants(@PathVariable Long id) {
		SessionFormationDto s = new SessionFormationDto();
		s.setId(id);
		List<Candidat> liste = new ArrayList<>(candidatService.rechercherCandidatAvecSessionFormation(s));
		return liste.size();
	}

}
