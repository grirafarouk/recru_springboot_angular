package com.fr.adaming.jsfapp.services;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

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

public interface ICandidatService extends IManagerService<Candidat, Long> {

	List<Candidat> rechercherCandidats(CandidatDto candidatDto, Boolean all);

	Candidat rechercherCandidatParEmail(String email);

	Candidat rechercherCandidatParNumTel(String numero);

	List<Candidat> rechercherCandidatAvecEntretien(CandidatDto candidatDto,
			Boolean all);

	List<Candidat> candidatARelancer(CandidatDto candidatDto);

	List<Candidat> rechercherCandidatParIdOrigine(Long idOrigine);

	List<Candidat> rechercherCandidatParIdTechnologie(Long idTechnologie);

	List<SyntheseCandidatDto> rechercherSyntheseCandidatParDate(Date date);

	List<Candidat> rechercherCandidatAvecSessionFormation(
			SessionFormationDto sessionFormationDto);
	
	List<Candidat> rechercherCandidatAccepterAvecSessionFormation(
			SessionFormationDto sessionFormationDto);

	List<SyntheseCandidatDto> rechercherSyntheseJournee(Date date);

	List<SyntheseCandidatDto> rechercherSyntheseSemaine(Date dateDebut,
			Date dateFin);


	List<Candidat> rechercherCandidatEnAttenteEvaluation();

	List<Candidat> rechercherCandidatsSansEtretiens();

	List<Candidat> rechercherCandidatAjout(CandidatDto candidatDto);

	List<String> rechercherNomCv();

	List<Candidat> rechercherCandidatParDate(CandidatDto candidatDto);

	List<Candidat> candidatARelancer(Utilisateur charge);
	
	Integer nbrCVParTechnologie(Technologie technologie);
	
	Integer cvArelancer(UtilisateurDto charge);
	
	List<Candidat> rechercherCandidatParCharge(UtilisateurDto charge);
	
	List<Candidat> rechercherCandidatSession(SessionFormationDto session);
	
	HashMap<String, Integer> nbrCVParTechnologie();
	
	Integer nombreTechnologieParCandidat() ;

	List<ReportingFicheCVRelance> rechercherCandidatParCharge(int idcharge);
	
    List<ReportingFicheSourceur> rechercherCandidatSessionAccueil(int idsession);
}
