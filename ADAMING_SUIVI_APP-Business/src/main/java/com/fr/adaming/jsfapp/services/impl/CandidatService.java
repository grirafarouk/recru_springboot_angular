package com.fr.adaming.jsfapp.services.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.ICandidatDao;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dto.CandidatDto;
import com.fr.adaming.jsfapp.dto.ReportingChargeRelanceDto;
import com.fr.adaming.jsfapp.dto.ReportingFicheCVRelance;
import com.fr.adaming.jsfapp.dto.ReportingFicheSourceur;
import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.dto.SyntheseCandidatDto;
import com.fr.adaming.jsfapp.dto.UtilisateurDto;
import com.fr.adaming.jsfapp.model.Candidat;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.services.ICandidatService;

@Service("candidatService")
public class CandidatService extends ManagerService<Candidat, Long> implements
		ICandidatService {

	/**
	 * 	
	 */
	private static final long serialVersionUID = 8725956076501227820L;

	@Autowired()
	@Qualifier("candidatDao")
	private ICandidatDao candidatDao;

	@Override
	public IManagerDao<Candidat, Long> getDao() {
		return candidatDao;
	}

	@Override
	public List<Candidat> rechercherCandidats(CandidatDto candidatDto,
			Boolean all) {
		return candidatDao.rechercherCandidats(candidatDto, all);
	}

	@Override
	public Candidat rechercherCandidatParEmail(String email) {
		return candidatDao.rechercherCandidatParEmail(email);
	}

	@Override
	public Candidat rechercherCandidatParNumTel(String numero) {
		return candidatDao.rechercherCandidatParNumTel(numero);
	}

	@Override
	public List<Candidat> rechercherCandidatAvecEntretien(
			CandidatDto candidatDto, Boolean all) {
		return candidatDao.rechercherCandidatAvecEntretien(candidatDto, all);
	}

	@Override
	public List<SyntheseCandidatDto> rechercherSyntheseCandidatParDate(Date date) {
		return candidatDao.rechercherSyntheseCandidatParDate(date);
	}

	@Override
	public List<Candidat> rechercherCandidatParIdOrigine(Long idOrigine) {
		return candidatDao.rechercherCandidatParIdOrigine(idOrigine);
	}

	@Override
	public List<Candidat> rechercherCandidatParIdTechnologie(Long idTechnologie) {
		return candidatDao.rechercherCandidatParIdTechnologie(idTechnologie);
	}

	@Override
	public List<Candidat> rechercherCandidatAvecSessionFormation(
			SessionFormationDto sessionFormationDto) {
		return candidatDao
				.rechercherCandidatAvecSessionFormation(sessionFormationDto);
	}
	
	@Override
	public List<Candidat> rechercherCandidatAccepterAvecSessionFormation(
			SessionFormationDto sessionFormationDto) {
		return candidatDao
				.rechercherCandidatAccepterAvecSessionFormation(sessionFormationDto);
	}

	@Override
	public List<SyntheseCandidatDto> rechercherSyntheseJournee(Date date) {
		return candidatDao.rechercherSyntheseJournee(date);
	}

	@Override
	public List<SyntheseCandidatDto> rechercherSyntheseSemaine(Date dateDebut,
			Date dateFin) {
		return candidatDao.rechercherSyntheseSemaine(dateDebut, dateFin);
	}

	

	@Override
	public List<Candidat> rechercherCandidatEnAttenteEvaluation() {
		return candidatDao.rechercherCandidatEnAttenteEvaluation();
	}

	@Override
	public List<Candidat> rechercherCandidatsSansEtretiens() {
		return candidatDao.rechercherCandidatsSansEtretiens();
	}

	@Override
	public List<Candidat> rechercherCandidatAjout(CandidatDto candidatDto) {
		return candidatDao.rechercherCandidatAjout(candidatDto);
	}

	@Override
	public List<String> rechercherNomCv() {
		return candidatDao.rechercherNomCv();
	}

	@Override
	public List<Candidat> rechercherCandidatParDate(CandidatDto candidatDto) {
		return candidatDao.rechercherCandidatParDate(candidatDto);
	}

	public List<Candidat> candidatARelancer(Utilisateur charge) {
		return candidatDao.candidatARelancer(charge);
	}

	@Override
	public List<Candidat> candidatARelancer(CandidatDto candidatDto) {
		return candidatDao.candidatARelancer(candidatDto);
	}
	
	@Override
	public Integer nbrCVParTechnologie(Technologie technologie) {
		return candidatDao.nbrCVParTechnologie(technologie);
	}
	
	
	public Integer cvArelancer(UtilisateurDto charge) {
		return candidatDao.cvArelancer(charge);
	}
	
	@Override
	public List<Candidat> rechercherCandidatParCharge(UtilisateurDto charge) {
		return candidatDao.rechercherCandidatParCharge(charge);
	}
	
	@Override
	public List<Candidat> rechercherCandidatSession(SessionFormationDto session) {
		return candidatDao.rechercherCandidatSession(session);
	}
	
	@Override
	public HashMap<String, Integer> nbrCVParTechnologie(){
		return candidatDao.nbrCVParTechnologie();
	}
	
	@Override
	public Integer nombreTechnologieParCandidat() {
		return candidatDao.nombreTechnologieParCandidat();
	}
	
	@Override
	public List<ReportingFicheCVRelance> rechercherCandidatParCharge(int idcharge){
		return candidatDao.rechercherCandidatParCharge(idcharge);
	}
	
	@Override
	public List<ReportingFicheSourceur> rechercherCandidatSessionAccueil(int idsession){
		return candidatDao.rechercherCandidatSessionAccueil(idsession);
	}

}
