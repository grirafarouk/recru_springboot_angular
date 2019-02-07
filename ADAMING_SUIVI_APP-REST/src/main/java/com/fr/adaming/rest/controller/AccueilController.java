package com.fr.adaming.rest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.ReportingChargeRelanceDto;
import com.fr.adaming.jsfapp.dto.ReportingFicheCVRelance;
import com.fr.adaming.jsfapp.dto.ReportingFicheSourceur;
import com.fr.adaming.jsfapp.dto.ReportingSourceurTechnologieDto;
import com.fr.adaming.jsfapp.dto.SessionFormationReportingDto;
import com.fr.adaming.jsfapp.dto.VListeCandidatsDto;
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

	@RequestMapping(value = "/map", method = RequestMethod.GET)
	public HashMap<String, Integer> findChart() {
		HashMap<String, Integer> map = new HashMap<>();
		map = candidatService.nbrCVParTechnologie();
		return map;
	}

	@RequestMapping(value = "/ReportingChargeRelance", method = RequestMethod.GET)
	public List<ReportingChargeRelanceDto> rechercherChargeParRelance() {
		List<ReportingChargeRelanceDto> liste = new ArrayList<>(utilisateurService.rechercherChargeParRelance());
		return liste;
	}
	
	@RequestMapping(value = "/NombreTechnologieParCandidat", method = RequestMethod.GET)
	public Integer NombreTechnologieParCandidat() {
		return candidatService.nombreTechnologieParCandidat();
	}

	@RequestMapping(value = "/Sessionreporting", method = RequestMethod.GET)
	public List<SessionFormationReportingDto> rechercherSessionreporting() {
		List<SessionFormationReportingDto> liste = new ArrayList<>(sessionFormationService.rechercherSessionreorting());

		return liste;
	}

	@RequestMapping(value = "/SourceurTechnologies", method = RequestMethod.GET)
	public List<ReportingSourceurTechnologieDto> rechercherSourceurTechnologies() {
		List<ReportingSourceurTechnologieDto> listeReportingSourceurTechnologies = new ArrayList<>(
				utilisateurService.rechercherSourceurTechnologies());
		return listeReportingSourceurTechnologies;
	}

	@RequestMapping(value = "/CandidatParCharge", method = RequestMethod.GET)
	public List<ReportingFicheCVRelance> rechercherCandidatParCharge(int idcharge) {
		List<ReportingFicheCVRelance> listeReportingCandidatParCharge = new ArrayList<>(
				candidatService.rechercherCandidatParCharge(idcharge));
		return listeReportingCandidatParCharge;
	}

	@RequestMapping(value = "/CandidatSession", method = RequestMethod.GET)
	public List<ReportingFicheSourceur> rechercherCandidatSessionAccueil(int idsession) {
		List<ReportingFicheSourceur> listeReportingCandidatSession = new ArrayList<>(
				candidatService.rechercherCandidatSessionAccueil(idsession));
		return listeReportingCandidatSession;
	}

}
