package com.fr.adaming.jsfapp.services.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IUtilisateurDao;
import com.fr.adaming.jsfapp.dto.ReportingChargeRelanceDto;
import com.fr.adaming.jsfapp.dto.ReportingListSourceurDto;
import com.fr.adaming.jsfapp.dto.ReportingSourceurParDispoDto;
import com.fr.adaming.jsfapp.dto.ReportingSourceurTechnologieDto;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.services.IUtilisateurService;

@Service("utilisateurService")
public class UtilisateurService extends ManagerService<Utilisateur, Long> implements IUtilisateurService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8725956076501227820L;

	@Autowired()
	@Qualifier("utilisateurDao")
	@Transient
	private IUtilisateurDao utilisateurDao;

	@Override
	public Utilisateur findByLoginAndIdUser(String login, Long idUser) {
		return utilisateurDao.findByLoginAndIdUser(login, idUser);
	}

	@Override
	public Utilisateur findByLoginPass(String login, String passw) {
		return utilisateurDao.findbyLoginPass(login, passw);
	}

	@Override
	public Utilisateur findbyUsernameSpringS(String login) {

		if (login == null || login.trim().isEmpty()) {
			return null;
		} else {
			return utilisateurDao.findbyUsernameSpringS(login);
		}

	}

	@Override
	public Utilisateur findByLogin(String login) {
		return utilisateurDao.findByLogin(login);
	}

	@Override
	public Utilisateur findUserByToken(String token) {
		return utilisateurDao.findUserByToken(token);
	}

	@Override
	public List<Utilisateur> findAllUserActif() {

		return utilisateurDao.findAllUserActif();
	}

	@Override
	public IManagerDao<Utilisateur, Long> getDao() {
		return utilisateurDao;
	}

	@Override
	public Utilisateur findByEmail(String email) {
		return utilisateurDao.findByEmail(email);
	}

	@Override
	public List<Utilisateur> findAllUserCharge() {
		return utilisateurDao.findAllUserCharge();
	}

	@Override
	public List<Utilisateur> findAllUserSourceur() {
		return utilisateurDao.findAllUserSourceur();

	}

	@Override
	public List<Utilisateur> findAllSourceurs() {
		return utilisateurDao.findAllSourceurs();
	}

	@Override
	public List<Utilisateur> rechercherSourceurPourReporting() {
		return utilisateurDao.rechercherSourceurPourReporting();
	}

	@Override
	public List<Utilisateur> findAllCharges() {
		return utilisateurDao.findAllCharges();
	}

	@Override
	public Integer nbrCVParSourceurParRegion(Utilisateur utilisateur, Region region, Date dateDebut, Date dateFin) {
		return utilisateurDao.nbrCVParSourceurParRegion(utilisateur, region, dateDebut, dateFin);
	}

	@Override
	public Integer nbrCVParOrigineParTechnologie(Origine origine, Technologie technologie, Date dateDebut,
			Date dateFin) {
		return utilisateurDao.nbrCVParOrigineParTechnologie(origine, technologie, dateDebut, dateFin);
	}

	@Override
	public Integer nbrCVParChargeParTechnologie(Utilisateur utilisateur, Technologie technologie, Date dateDebut,
			Date dateFin) {
		return utilisateurDao.nbrCVParChargeParTechnologie(utilisateur, technologie, dateDebut, dateFin);
	}

	@Override
	public Integer nbrCVParSourceurParOrigine(Utilisateur utilisateur, Origine origine, Date dateDebut, Date dateFin,
			boolean horsCible) {
		return utilisateurDao.nbrCVParSourceurParOrigine(utilisateur, origine, dateDebut, dateFin, horsCible);
	}

	@Override
	public Integer nbrCVParSourceur(Utilisateur utilisateur, Date dateDebut, Date dateFin, boolean horsCible,
			boolean disponible) {
		return utilisateurDao.nbrCVParSourceur(utilisateur, dateDebut, dateFin, horsCible, disponible);

	}

	@Override
	public Integer nbrCVParSourceurParTechnologie(Utilisateur utilisateur, Technologie technologie, Date dateDebut,
			Date dateFin) {
		return utilisateurDao.nbrCVParSourceurParTechnologie(utilisateur, technologie, dateDebut, dateFin);
	}

	@Override
	public Integer nombreCVParCandidat(ReportingListSourceurDto utilisateur, Date dateDebut, Date dateFin) {
		return utilisateurDao.nombreCVParCandidat(utilisateur, dateDebut, dateFin);
	}

	@Override
	public Integer nbrTotalTechnologie(ReportingListSourceurDto utilisateur, Date dateDebut, Date dateFin) {
		return utilisateurDao.nbrTotalTechnologie(utilisateur, dateDebut, dateFin);
	}

	@Override
	public Integer nbrCVParSourceurParMainframe(Utilisateur utilisateur) {
		return utilisateurDao.nbrCVParSourceurParMainframe(utilisateur);
	}

	@Override
	public Integer nbrCVParSourceurParMainframePlus(Utilisateur utilisateur) {
		return utilisateurDao.nbrCVParSourceurParMainframePlus(utilisateur);
	}

	@Override
	public Integer nbrCVParSourceurParNtic(Utilisateur utilisateur) {
		return utilisateurDao.nbrCVParSourceurParNtic(utilisateur);
	}

	@Override
	public Integer nbrCVParSourceurAutreTechnologie(Utilisateur utilisateur) {
		return utilisateurDao.nbrCVParSourceurAutreTechnologie(utilisateur);
	}

	@Override
	public List<ReportingChargeRelanceDto> rechercherChargeParRelance() {
		return utilisateurDao.rechercherChargeParRelance();
	}

	@Override
	public List<ReportingSourceurTechnologieDto> rechercherSourceurTechnologies() {
		return utilisateurDao.rechercherSourceurTechnologies();
	}

	@Override
	public List<ReportingListSourceurDto> rechercherReportingListSourceur() {
		return utilisateurDao.rechercherReportingListSourceur();
	}

	@Override
	public List<ReportingSourceurParDispoDto> rechercherReportingSourceurParDispo(ReportingListSourceurDto utilisateur,
			Date dateDebut, Date dateFin) {
		return utilisateurDao.rechercherReportingSourceurParDispo(utilisateur, dateDebut, dateFin);
	}

	@Override
	public Map<String, Integer> reportingCVParTechnologieParSourceur() {
		return utilisateurDao.reportingCVParTechnologieParSourceur();
	}

	@Override
	public List<ReportingSourceurParDispoDto> rechercherReportingSourceur() {
		return utilisateurDao.rechercherReportingSourceur();
	}

	@Override
	public Map<String, Integer> rechercherReportingCVParTechnologieParSourceur(ReportingListSourceurDto utilisateur,
			Date dateDebut, Date dateFin) {
		return utilisateurDao.rechercherReportingCVParTechnologieParSourceur(utilisateur, dateDebut, dateFin);
	}

	@Override
	public List<Utilisateur> rechercheUser(String text) {
		return utilisateurDao.rechercherUser(text);
	}

	@Override
	public List<Utilisateur> rechercheListeutilisateurs(Utilisateur utilisateur) {
		return utilisateurDao.rechercheListeutilisateurs(utilisateur);
	}

}
