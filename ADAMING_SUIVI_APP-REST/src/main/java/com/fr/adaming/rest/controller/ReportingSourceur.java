package com.fr.adaming.rest.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.ReportingListSourceurDto;
import com.fr.adaming.jsfapp.dto.ReportingSourceurParDispoDto;
import com.fr.adaming.jsfapp.services.IUtilisateurService;

@RestController
@RequestMapping(value = "/api/ReportingSourceur")
@CrossOrigin("*")
public class ReportingSourceur {

	@Autowired
	private IUtilisateurService utilisateurService;

	@RequestMapping(value = "/listeReportingSourceur", method = RequestMethod.GET)
	public List<ReportingListSourceurDto> rechercherReportingListSourceur() {
		List<ReportingListSourceurDto> listeReportingSourceur = new ArrayList<>(
				utilisateurService.rechercherReportingListSourceur());
		return listeReportingSourceur;
	}

	@RequestMapping(value = "/listeReporting", method = RequestMethod.GET)
	public List<ReportingSourceurParDispoDto> rechercherReportingSourceurParDispo() {
		List<ReportingSourceurParDispoDto> listeReportingSourceur = new ArrayList<>(
				utilisateurService.rechercherReportingSourceur());
		return listeReportingSourceur;
	}

	@RequestMapping(value = "/RechercheReportingSourceur", method = RequestMethod.POST)
	public List<ReportingSourceurParDispoDto> RechercheReportingSourceur(
			@RequestBody ReportingListSourceurDto utilisateur, Date dateDebut, Date dateFin) {

		List<ReportingSourceurParDispoDto> listeReportingSourceur = new ArrayList<>(
				utilisateurService.rechercherReportingSourceurParDispo(utilisateur, dateDebut, dateFin));
		return listeReportingSourceur;
	}

	@RequestMapping(value = "/mapTechnologieParSourceur", method = RequestMethod.GET)
	public HashMap<String, Integer> ReportingCVParTechnologieParSourceur() {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map = utilisateurService.ReportingCVParTechnologieParSourceur();
		return map;
	}

	@RequestMapping(value = "/RecherchemapTechnologieParSourceur", method = RequestMethod.POST)
	public HashMap<String, Integer> RechercheReportingCVParTechnologieParSourceur(
			@RequestBody ReportingListSourceurDto utilisateur, Date dateDebut, Date dateFin) {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map = utilisateurService.rechercherReportingCVParTechnologieParSourceur(utilisateur, dateDebut, dateFin);
		return map;
	}

}
