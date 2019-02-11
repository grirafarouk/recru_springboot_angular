package com.fr.adaming.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.ReportingChargeRelanceDto;
import com.fr.adaming.jsfapp.dto.ReportingFicheCVRelance;
import com.fr.adaming.jsfapp.dto.ReportingFicheSourceur;
import com.fr.adaming.jsfapp.dto.ReportingSourceurTechnologieDto;
import com.fr.adaming.jsfapp.dto.SessionFormationReportingDto;
import com.fr.adaming.jsfapp.services.ICandidatService;
import com.fr.adaming.jsfapp.services.ISessionFormationService;
import com.fr.adaming.jsfapp.services.IUtilisateurService;

@RestController
@RequestMapping(value = "/api/accueil")
@CrossOrigin("*")
public class AccueilController {

	@Autowired
	private ICandidatService candidatService;
	@Autowired
	private IUtilisateurService utilisateurService;
	@Autowired
	private ISessionFormationService sessionFormationService;

	@GetMapping(path = "/map")
	public Map<String, Integer> findChart() {
		Map<String, Integer> map = new HashMap<>();
		map = candidatService.nbrCVParTechnologie();
		return map;
	}

	@GetMapping(path = "/ReportingChargeRelance")
	public List<ReportingChargeRelanceDto> rechercherChargeParRelance() {
		return utilisateurService.rechercherChargeParRelance();
	}

	@GetMapping(path = "/NombreTechnologieParCandidat")
	public Integer nombreTechnologieParCandidat() {
		return candidatService.nombreTechnologieParCandidat();
	}

	@GetMapping(path = "/Sessionreporting")
	public List<SessionFormationReportingDto> rechercherSessionreporting() {
		return sessionFormationService.rechercherSessionreorting();
	}

	@GetMapping(path = "/SourceurTechnologies")
	public List<ReportingSourceurTechnologieDto> rechercherSourceurTechnologies() {
		return utilisateurService.rechercherSourceurTechnologies();
	}

	@GetMapping(path = "/CandidatParCharge")
	public List<ReportingFicheCVRelance> rechercherCandidatParCharge(int idcharge) {
		return candidatService.rechercherCandidatParCharge(idcharge);
	}

	@GetMapping(path = "/CandidatSession")
	public List<ReportingFicheSourceur> rechercherCandidatSessionAccueil(int idsession) {
		return candidatService.rechercherCandidatSessionAccueil(idsession);
	}

}
