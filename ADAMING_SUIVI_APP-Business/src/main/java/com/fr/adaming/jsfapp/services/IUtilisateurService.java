package com.fr.adaming.jsfapp.services;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.fr.adaming.jsfapp.dto.ReportingChargeRelanceDto;
import com.fr.adaming.jsfapp.dto.ReportingListSourceurDto;
import com.fr.adaming.jsfapp.dto.ReportingSourceurParDispoDto;
import com.fr.adaming.jsfapp.dto.ReportingSourceurTechnologieDto;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.Utilisateur;

public interface IUtilisateurService extends IManagerService<Utilisateur, Long> {

	public Utilisateur findByLoginPass(String login, String passw);

	public Utilisateur findbyUsernameSpringS(String login);

	public Utilisateur findByLoginAndIdUser(String login, Long idUser);

	Utilisateur findByLogin(String login);

	Utilisateur findByEmail(String email);

	Utilisateur findUserByToken(String token);

	List<Utilisateur> findAllUserActif();

	List<Utilisateur> findAllUserCharge();

	List<Utilisateur> findAllUserSourceur();

	List<Utilisateur> findAllSourceurs();
	
	List<Utilisateur> findAllCharges();

	List<Utilisateur> rechercherSourceurPourReporting();

	Integer nbrCVParSourceurParRegion(Utilisateur utilisateur, Region region, Date dateDebut, Date dateFin);

	Integer nbrCVParOrigineParTechnologie(Origine origine, Technologie technologie, Date dateDebut, Date dateFin);
	
	Integer nbrCVParChargeParTechnologie(Utilisateur utilisateur, Technologie technologie, Date dateDebut, Date dateFin);
	
	Integer nbrCVParSourceurParOrigine(Utilisateur utilisateur, Origine origine, Date dateDebut, Date dateFin, boolean horsCible);
	
	Integer nbrCVParSourceur(Utilisateur utilisateur, Date dateDebut, Date dateFin, boolean horsCible, boolean disponible);
	
	Integer nbrCVParSourceurParTechnologie(Utilisateur utilisateur, Technologie technologie, Date dateDebut, Date dateFin);
	
	Integer nbrCVParSourceurParMainframe(Utilisateur utilisateur);
	
	Integer nbrCVParSourceurParMainframePlus(Utilisateur utilisateur);
	
	Integer nbrCVParSourceurParNtic(Utilisateur utilisateur);
	
	Integer nbrCVParSourceurAutreTechnologie(Utilisateur utilisateur);
	
	List<ReportingChargeRelanceDto> rechercherChargeParRelance();
	
	List<ReportingSourceurTechnologieDto> rechercherSourceurTechnologies();
	
	List<ReportingListSourceurDto> rechercherReportingListSourceur();
	
	List<ReportingSourceurParDispoDto> rechercherReportingSourceurParDispo(ReportingListSourceurDto utilisateur, Date dateDebut,
			Date dateFin);
	
	HashMap<String, Integer> ReportingCVParTechnologieParSourceur();
    List<ReportingSourceurParDispoDto> rechercherReportingSourceur();
    HashMap<String, Integer> rechercherReportingCVParTechnologieParSourceur(ReportingListSourceurDto utilisateur, Date dateDebut,
			Date dateFin);
	
	
	
}
