package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Transient;

import com.fr.adaming.jsfapp.enums.CVSource;
import com.fr.adaming.jsfapp.enums.Civilite;
import com.fr.adaming.jsfapp.enums.MobiliteSurLille;

import com.fr.adaming.jsfapp.enums.Statut;
import com.fr.adaming.jsfapp.model.CodePostal;
import com.fr.adaming.jsfapp.model.Motif;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.model.Technologie;

public class CandidatDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private String nom;
	private String prenom;
	private Civilite civilite;
	private String adresse;
	private Date dateInscription;
	private Date dateNaissance;
	private String lieuNaissance;
	private String email;
	private String numeroTel;
	private UtilisateurDto creePar;
	private Technologie technologie;
	private String idCv;
	private CodePostal codePostal;
	private Origine origine;
	private EntretienDto entretien;
	private SuiviDto suivi;
	private SessionFormationDto sessionFormation;
	private Statut statut;
	private Boolean docConsult;
	private Boolean posteEnCours;
	private Boolean mobiliteSrc;
	private MobiliteSurLille mobiliteLille;
	private CVSource cvSource;
	private Boolean docRefus;
	private Boolean cvAnonyme;
	private String age;
	private String nomCV;
	private String diplome;
	private Date dateObtentionDiplome;
	@Transient
	private String dateisncription;
	@Transient
	private String dateDiplome;
	private Motif motif;
	private String critereRecheche;
	private Boolean emailSessionEnvoyer;
	private Boolean emailSourceurEnvoyer;
	private Boolean emailCandidatEnvoyer;

	@Transient
	public String getDateisncription() {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		if (dateInscription != null) {
			dateisncription = sdf.format(dateInscription);
		}
		return dateisncription;
	}

	@Transient
	public void setDateisncription(String dateisncription) {
		this.dateisncription = dateisncription;
	}

	public CandidatDto() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public Civilite getCivilite() {
		return civilite;
	}

	public void setCivilite(Civilite civilite) {
		this.civilite = civilite;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public CodePostal getCodePostal() {
		return codePostal;
	}

	public void setCodePostal(CodePostal codePostal) {
		this.codePostal = codePostal;
	}

	public Date getDateInscription() {
		return dateInscription;
	}

	public void setDateInscription(Date dateInscription) {
		this.dateInscription = dateInscription;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public String getLieuNaissance() {
		return lieuNaissance;
	}

	public void setLieuNaissance(String lieuNaissance) {
		this.lieuNaissance = lieuNaissance;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNumeroTel() {
		return numeroTel;
	}

	public void setNumeroTel(String numeroTel) {
		this.numeroTel = numeroTel;
	}

	public UtilisateurDto getCreePar() {
		return creePar;
	}

	public void setCreePar(UtilisateurDto creePar) {
		this.creePar = creePar;
	}

	public Technologie getTechnologie() {
		return technologie;
	}

	public void setTechnologie(Technologie technologie) {
		this.technologie = technologie;
	}

	public String getIdCv() {
		return idCv;
	}

	public void setIdCv(String idCv) {
		this.idCv = idCv;
	}

	public Origine getOrigine() {
		return origine;
	}

	public void setOrigine(Origine origine) {
		this.origine = origine;
	}

	public EntretienDto getEntretien() {
		return entretien;
	}

	public void setEntretien(EntretienDto entretien) {
		this.entretien = entretien;
	}

	public SuiviDto getSuivi() {
		return suivi;
	}

	public void setSuivi(SuiviDto suivi) {
		this.suivi = suivi;
	}

	public SessionFormationDto getSessionFormation() {
		return sessionFormation;
	}

	public void setSessionFormation(SessionFormationDto sessionFormation) {
		this.sessionFormation = sessionFormation;
	}

	public Statut getStatut() {
		return statut;
	}

	public void setStatut(Statut statut) {
		this.statut = statut;
	}

	public Boolean getDocConsult() {
		return docConsult;
	}

	public void setDocConsult(Boolean docConsult) {
		this.docConsult = docConsult;
	}

	public Boolean getPosteEnCours() {
		return posteEnCours;
	}

	public void setPosteEnCours(Boolean posteEnCours) {
		this.posteEnCours = posteEnCours;
	}

	public Boolean getMobiliteSrc() {
		return mobiliteSrc;
	}

	public void setMobiliteSrc(Boolean mobiliteSrc) {
		this.mobiliteSrc = mobiliteSrc;
	}

	public Boolean getDocRefus() {
		return docRefus;
	}

	public void setDocRefus(Boolean docRefus) {
		this.docRefus = docRefus;
	}

	public Boolean getCvAnonyme() {
		return cvAnonyme;
	}

	public void setCvAnonyme(Boolean cvAnonyme) {
		this.cvAnonyme = cvAnonyme;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getNomCV() {
		return nomCV;
	}

	public void setNomCV(String nomCV) {
		this.nomCV = nomCV;
	}

	public String getDiplome() {
		return diplome;
	}

	public Date getDateObtentionDiplome() {
		return dateObtentionDiplome;
	}

	public void setDiplome(String diplome) {
		this.diplome = diplome;
	}

	public void setDateObtentionDiplome(Date dateObtentionDiplome) {
		this.dateObtentionDiplome = dateObtentionDiplome;
	}

	public Motif getMotif() {
		return motif;
	}

	public void setMotif(Motif motif) {
		this.motif = motif;
	}

	@Transient
	public String getDateDiplome() {
		SimpleDateFormat sdf = new SimpleDateFormat("MM/yyyy");
		if (dateObtentionDiplome != null) {
			dateDiplome = sdf.format(dateObtentionDiplome);
		}
		return dateDiplome;
	}

	@Transient
	public void setDateDiplome(String dateDiplome) {
		this.dateDiplome = dateDiplome;
	}

	public String getCritereRecheche() {
		return critereRecheche;
	}

	public void setCritereRecheche(String critereRecheche) {
		this.critereRecheche = critereRecheche;
	}

	public Boolean getEmailSessionEnvoyer() {
		return emailSessionEnvoyer;
	}

	public void setEmailSessionEnvoyer(Boolean emailSessionEnvoyer) {
		this.emailSessionEnvoyer = emailSessionEnvoyer;
	}

	public Boolean getEmailSourceurEnvoyer() {
		return emailSourceurEnvoyer;
	}

	public void setEmailSourceurEnvoyer(Boolean emailSourceurEnvoyer) {
		this.emailSourceurEnvoyer = emailSourceurEnvoyer;
	}

	public Boolean getEmailCandidatEnvoyer() {
		return emailCandidatEnvoyer;
	}

	public void setEmailCandidatEnvoyer(Boolean emailCandidatEnvoyer) {
		this.emailCandidatEnvoyer = emailCandidatEnvoyer;
	}

	public MobiliteSurLille getMobiliteLille() {
		return mobiliteLille;
	}

	public void setMobiliteLille(MobiliteSurLille mobiliteLille) {
		this.mobiliteLille = mobiliteLille;
	}

	public CVSource getCvSource() {
		return cvSource;
	}

	public void setCvSource(CVSource cvSource) {
		this.cvSource = cvSource;
	}

}
