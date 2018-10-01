package com.fr.adaming.jsfapp.dao;

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

public interface IUtilisateurDao extends IManagerDao<Utilisateur, Long> {

	/**
	 * Récupérer un {@link Utilisateur} a partir de son Login et son Mot de
	 * Passe
	 * 
	 * @author Elyess Tekaya
	 * @return Utilisateur
	 * @param login
	 * @param passw
	 * @return
	 * 
	 */
	public Utilisateur findbyLoginPass(String login, String passw);

	/**
	 * Récupérer un {@link Utilisateur} a partir de son UserName
	 * 
	 * @author Elyess Tekaya
	 * @return Utilisateur
	 * @param login
	 * @return
	 * 
	 */
	public Utilisateur findbyUsernameSpringS(String login);

	/**
	 * Récupérer un {@link Utilisateur} a partir de son Login et de son ID
	 * 
	 * @author Elyess Tekaya
	 * @return Utilisateur
	 * @param login
	 * @param idUser
	 * @return
	 * 
	 */
	public Utilisateur findByLoginAndIdUser(String login, Long idUser);

	Utilisateur findByLogin(String login);

	Utilisateur findByEmail(String email);

	Utilisateur findUserByToken(String token);

	List<Utilisateur> findAllUserActif();

	List<Utilisateur> findAllUserCharge();

	List<Utilisateur> findAllUserSourceur();

	List<Utilisateur> rechercherSourceurPourReporting();

	List<Utilisateur> findAllSourceurs();
	
	List<Utilisateur> findAllCharges();
	
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
