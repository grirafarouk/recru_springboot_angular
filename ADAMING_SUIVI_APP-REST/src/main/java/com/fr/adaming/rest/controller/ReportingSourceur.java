package com.fr.adaming.rest.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	@GetMapping(path = "/listeReportingSourceur")
	public List<ReportingListSourceurDto> rechercherReportingListSourceur() {
		return utilisateurService.rechercherReportingListSourceur();
	}

	@GetMapping(path = "/listeReporting")
	public List<ReportingSourceurParDispoDto> rechercherReportingSourceurParDispo() {
		return utilisateurService.rechercherReportingSourceur();
	}

	@PostMapping(path = "/nbrTotalCvParCandidat")
	public Integer nombreTotalCvParCandidat(@RequestBody(required = false) ReportingListSourceurDto utilisateur,
			@RequestParam(required = false) Long dateDebut, @RequestParam(required = false) Long dateFin) {
		return utilisateurService.nombreCVParCandidat(utilisateur, dateDebut != null ? new Date(dateDebut) : null,
				dateFin != null ? new Date(dateFin) : null);
	}

	@GetMapping(path = "/nbrTotalCV")
	public Integer nombreTotalCv(@RequestBody(required = false) ReportingListSourceurDto utilisateur,
			@RequestParam(required = false) Long dateDebut, @RequestParam(required = false) Long dateFin) {
		return utilisateurService.nombreCVParCandidat(utilisateur, dateDebut != null ? new Date(dateDebut) : null,
				dateFin != null ? new Date(dateFin) : null);
	}

	@PostMapping(path = "/nbrTotalTechnologieSourceur")
	public Integer nbrTotalTechnologieSourceur(@RequestBody(required = false) ReportingListSourceurDto utilisateur,
			@RequestParam(required = false) Long dateDebut, @RequestParam(required = false) Long dateFin) {
		return utilisateurService.nbrTotalTechnologie(utilisateur, dateDebut != null ? new Date(dateDebut) : null,
				dateFin != null ? new Date(dateFin) : null);
	}

	@GetMapping(path = "/nbrTotalTechnologie")
	public Integer nbrTotalTechnologie(@RequestBody(required = false) ReportingListSourceurDto utilisateur,
			@RequestParam(required = false) Long dateDebut, @RequestParam(required = false) Long dateFin) {
		return utilisateurService.nbrTotalTechnologie(utilisateur, dateDebut != null ? new Date(dateDebut) : null,
				dateFin != null ? new Date(dateFin) : null);
	}

	@PostMapping(path = "/RechercheReportingSourceur")
	public List<ReportingSourceurParDispoDto> rechercheReportingSourceur(
			@RequestBody ReportingListSourceurDto utilisateur, @RequestParam(required = false) Long dateDebut,
			@RequestParam(required = false) Long dateFin) {
		return utilisateurService.rechercherReportingSourceurParDispo(utilisateur,
				dateDebut != null ? new Date(dateDebut) : null, dateFin != null ? new Date(dateFin) : null);
	}

	@GetMapping(path = "/mapTechnologieParSourceur")
	public Map<String, Integer> reportingCVParTechnologieParSourceur() {
		return utilisateurService.reportingCVParTechnologieParSourceur();
	}

	@PostMapping(path = "/RecherchemapTechnologieParSourceur")
	public Map<String, Integer> rechercheReportingCVParTechnologieParSourceur(
			@RequestBody ReportingListSourceurDto utilisateur, @RequestParam(required = false) Long dateDebut,
			@RequestParam(required = false) Long dateFin) {
		return utilisateurService.rechercherReportingCVParTechnologieParSourceur(utilisateur,
				dateDebut != null ? new Date(dateDebut) : null, dateFin != null ? new Date(dateFin) : null);
	}

}
