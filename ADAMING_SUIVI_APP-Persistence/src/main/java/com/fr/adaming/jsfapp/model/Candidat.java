package com.fr.adaming.jsfapp.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


import org.hibernate.annotations.Proxy;
import com.fr.adaming.jsfapp.enums.CVSource;
import com.fr.adaming.jsfapp.enums.Civilite;
import com.fr.adaming.jsfapp.enums.MobiliteSurLille;
import com.fr.adaming.jsfapp.enums.Relance;
import com.fr.adaming.jsfapp.enums.Statut;

@Entity
@Table(name = "candidat")
@Proxy(lazy = false)
public class Candidat implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5548213995682404567L;

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
	private Utilisateur creePar;
	private Technologie technologie;
	private String idCv;
	private CodePostal codePostal;
	private Origine origine;
	private Entretien entretien;
	private Suivi suivi;
	private SessionFormation sessionFormation;
	private Statut statut;
	private Relance relancech;
	private Boolean docConsult;
	private Boolean docRefus;
	private Boolean posteEnCours;
	private Boolean mobiliteSrc;
	private MobiliteSurLille mobiliteLille;
	private CVSource cvSource;
	private Boolean cvAnonyme;
	private String age;
	private String nomCV;
	private String diplome;
	private Date dateObtentionDiplome;
	private Motif motif;
	private Boolean emailSessionEnvoyer;
	private Boolean emailSourceurEnvoyer;
	private Boolean emailCandidatEnvoyer;
//	private Boolean emailCandi;
//	private Boolean test;
//	private Boolean testd;
//	private Boolean tes;
//	private Boolean ops;
	
	private Set<Competence> candidatCompetence = new HashSet<Competence>();

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "NOM", nullable = false)
	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	@Column(name = "PRENOM", nullable = false)
	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	@Enumerated(EnumType.ORDINAL)
	@Column(name = "CIVILITE", nullable = false)
	public Civilite getCivilite() {
		return civilite;
	}

	public void setCivilite(Civilite civilite) {
		this.civilite = civilite;
	}

	@Column(name = "ADRESSE", nullable = true)
	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "CODE_POSTAL", nullable = false)
	public CodePostal getCodePostal() {
		return codePostal;
	}

	public void setCodePostal(CodePostal codePostal) {
		this.codePostal = codePostal;
	}

	@Column(name = "DATE_INSCRIPTION", nullable = false)
	public Date getDateInscription() {
		return dateInscription;
	}

	public void setDateInscription(Date dateInscription) {
		this.dateInscription = dateInscription;
	}

	@Column(name = "DATE_NAISSANCE", nullable = true)
	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	@JoinColumn(name = "LIEU_NAISSANCE", nullable = true)
	public String getLieuNaissance() {
		return lieuNaissance;
	}

	public void setLieuNaissance(String lieuNaissance) {
		this.lieuNaissance = lieuNaissance;
	}

	@Column(name = "EMAIL", nullable = false)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "NUMERO_TEL", nullable = false)
	public String getNumeroTel() {
		return numeroTel;
	}

	public void setNumeroTel(String numeroTel) {
		this.numeroTel = numeroTel;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CREE_PAR", nullable = false)
	public Utilisateur getCreePar() {
		return creePar;
	}

	public void setCreePar(Utilisateur creePar) {
		this.creePar = creePar;
	}

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "TECHNOLOGIE", nullable = false)
	public Technologie getTechnologie() {
		return technologie;
	}

	public void setTechnologie(Technologie technologie) {
		this.technologie = technologie;
	}

	@Column(name = "ID_CV", nullable = false, length = 250)
	public String getIdCv() {
		return idCv;
	}

	public void setIdCv(String idCv) {
		this.idCv = idCv;
	}

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "ORIGINE", nullable = false)
	public Origine getOrigine() {
		return origine;
	}

	public void setOrigine(Origine origine) {
		this.origine = origine;
	}

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "ENTRETIEN", nullable = true)
	public Entretien getEntretien() {
		return entretien;
	}

	public void setEntretien(Entretien entretien) {
		this.entretien = entretien;
	}

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "SUIVI", nullable = true)
	public Suivi getSuivi() {
		return suivi;
	}

	public void setSuivi(Suivi suivi) {
		this.suivi = suivi;
	}

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "SESSION_FORMATION", nullable = true)
	public SessionFormation getSessionFormation() {
		return sessionFormation;
	}

	public void setSessionFormation(SessionFormation sessionFormation) {
		this.sessionFormation = sessionFormation;
	}

	@Enumerated(EnumType.ORDINAL)
	@Column(name = "STATUT", nullable = false)
	public Statut getStatut() {
		return statut;
	}

	public void setStatut(Statut statut) {
		this.statut = statut;
	}

	@Column(name = "DOC_CONSULTATION", nullable = true)
	public Boolean getDocConsult() {
		return docConsult;
	}

	public void setDocConsult(Boolean docConsult) {
		this.docConsult = docConsult;
	}

	@Column(name = "POLE_EMPLOI", nullable = true)
	public Boolean getPosteEnCours() {
		return posteEnCours;
	}

	public void setPosteEnCours(Boolean posteEnCours) {
		this.posteEnCours = posteEnCours;
	}

	@Column(name = "MOBILTE_SRC", nullable = true)
	public Boolean getMobiliteSrc() {
		return mobiliteSrc;
	}

	public void setMobiliteSrc(Boolean mobiliteSrc) {
		this.mobiliteSrc = mobiliteSrc;
	}

	@Column(name = "DOC_REFUS", nullable = true)
	public Boolean getDocRefus() {
		return docRefus;
	}

	public void setDocRefus(Boolean docRefus) {
		this.docRefus = docRefus;
	}

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="candidat_competence",
    joinColumns=
        @JoinColumn(name="candidat_id", referencedColumnName="id"),
    inverseJoinColumns=
        @JoinColumn(name="competence_id", referencedColumnName="id")
    )
	public Set<Competence> getCandidatCompetence() {
		return candidatCompetence;
	}

	public void setCandidatCompetence(Set<Competence> candidatCompetence) {
		this.candidatCompetence = candidatCompetence;
	}

	@Column(name = "CV_ANONYME", nullable = false)
	public Boolean getCvAnonyme() {
		return cvAnonyme;
	}

	public void setCvAnonyme(Boolean cvAnonyme) {
		this.cvAnonyme = cvAnonyme;
	}

	@Column(name = "AGE", length = 3)
	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	@Column(name = "NOM_CV")
	public String getNomCV() {
		return nomCV;
	}

	public void setNomCV(String nomCV) {
		this.nomCV = nomCV;
	}

	@Column(name = "DIPLOME")
	public String getDiplome() {
		return diplome;
	}

	@Column(name = "DATE_OBTENTION_DIPLOME")
	public Date getDateObtentionDiplome() {
		return dateObtentionDiplome;
	}

	public void setDiplome(String diplome) {
		this.diplome = diplome;
	}

	public void setDateObtentionDiplome(Date dateObtentionDiplome) {
		this.dateObtentionDiplome = dateObtentionDiplome;
	}

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "MOTIF", nullable = true)
	public Motif getMotif() {
		return motif;
	}

	public void setMotif(Motif motif) {
		this.motif = motif;
	}

	@Column(name = "Email_Session_Envoyer", nullable = true)
	public Boolean getEmailSessionEnvoyer() {
		return emailSessionEnvoyer;
	}

	public void setEmailSessionEnvoyer(Boolean emailSessionEnvoyer) {
		this.emailSessionEnvoyer = emailSessionEnvoyer;
	}

	@Column(name = "EMAIL_SOURCEUR_ENVOYER", nullable = true)
	public Boolean getEmailSourceurEnvoyer() {
		return emailSourceurEnvoyer;
	}

	public void setEmailSourceurEnvoyer(Boolean emailSourceurEnvoyer) {
		this.emailSourceurEnvoyer = emailSourceurEnvoyer;
	}

	@Column(name = "EMAIL_CANDIDAT_ENVOYER", nullable = true)
	public Boolean getEmailCandidatEnvoyer() {
		return emailCandidatEnvoyer;
	}

	public void setEmailCandidatEnvoyer(Boolean emailCandidatEnvoyer) {
		this.emailCandidatEnvoyer = emailCandidatEnvoyer;
	}

	@Enumerated(EnumType.ORDINAL)
	@Column(name = "mobilite_Lille", nullable = false)
	public MobiliteSurLille getMobiliteLille() {
		return mobiliteLille;
	}

	public void setMobiliteLille(MobiliteSurLille mobiliteLille) {
		this.mobiliteLille = mobiliteLille;
	}

	@Enumerated(EnumType.ORDINAL)
	@Column(name = "cv_Source", nullable = true)
	public CVSource getCvSource() {
		return cvSource;
	}

	public void setCvSource(CVSource cvSource) {
		this.cvSource = cvSource;
	}
//	@Column(name = "EMAIL_CANDID", nullable = true)
//	public Boolean getEmailCandi() {
//		return emailCandi;
//	}
//
//	public void setEmailCandi(Boolean emailCandi) {
//		this.emailCandi = emailCandi;
//	}
//	@Column(name = "test", nullable = true)
//	public Boolean getTest() {
//		return test;
//	}
//
//	public void setTest(Boolean test) {
//		this.test = test;
//	}
//	@Column(name="testd", nullable=true)
//	public Boolean getTestd() {
//		return testd;
//	}
//
//	public void setTestd(Boolean testd) {
//		this.testd = testd;
//	}
//	@Column(name="tes", nullable=true)
//	public Boolean getTes() {
//		return tes;
//	}
//
//	public void setTes(Boolean tes) {
//		this.tes = tes;
//	}
//	@Column(name="ops", nullable=true)
//	public Boolean getOps() {
//		return ops;
//	}
//
//	public void setOps(Boolean ops) {
//		this.ops = ops;
//	}

	@Override
	public String toString() {
		return "Candidat [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", civilite=" + civilite + ", adresse="
				+ adresse + ", dateInscription=" + dateInscription + ", dateNaissance=" + dateNaissance
				+ ", lieuNaissance=" + lieuNaissance + ", email=" + email + ", numeroTel=" + numeroTel + ", creePar="
				+ creePar + ", technologie=" + technologie + ", idCv=" + idCv + ", codePostal=" + codePostal
				+ ", origine=" + origine + ", entretien=" + entretien + ", suivi=" + suivi + ", sessionFormation="
				+ sessionFormation + ", statut=" + statut + ", relancech=" + relancech + ", docConsult=" + docConsult
				+ ", docRefus=" + docRefus + ", posteEnCours=" + posteEnCours + ", mobiliteSrc=" + mobiliteSrc
				+ ", mobiliteLille=" + mobiliteLille + ", cvSource=" + cvSource + ", cvAnonyme=" + cvAnonyme + ", age="
				+ age + ", nomCV=" + nomCV + ", diplome=" + diplome + ", dateObtentionDiplome=" + dateObtentionDiplome
				+ ", motif=" + motif + ", emailSessionEnvoyer=" + emailSessionEnvoyer + ", emailSourceurEnvoyer="
				+ emailSourceurEnvoyer + ", emailCandidatEnvoyer=" + emailCandidatEnvoyer + ", candidatCompetence="
				+ candidatCompetence + "]";
	}
	
	
}
