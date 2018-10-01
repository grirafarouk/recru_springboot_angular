package com.fr.adaming.jsfapp.model;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fr.adaming.jsfapp.enums.CVSource;
import com.fr.adaming.jsfapp.enums.Disponibilite;
import com.fr.adaming.jsfapp.enums.MobiliteSurLille;
import com.fr.adaming.jsfapp.enums.Statut;

@Entity
@Table(name="V_ReportingCandidat")
public class V_ReportingCandidat implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private String nom;
	private String prenom;
	private String email;
	private String numeroTel;
	private String technologie;
	private String region;
	private String origine;
	private Date dateInscription;
	private Statut statut;
	private MobiliteSurLille mobiliteLille;
	private CVSource cvSource;
	private String nomSourceur;
	private String prenomSourceur;
	private String nomCharge;
	private String prenomCharge;
	private Integer pertinence;
	private Disponibilite disponible;
	private String lieuEntretien;
	private Date dateEntretien;
	private Long noteTotale;
	private String formation;
	private Date dateDemarrageFormation;
	private Date dateDebut;
	private Date dateFin;
	private String idCv;
	private String diplome;
	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	private Date dateObtentionDiplome;
	@Transient
	private String dateisncription;
	@Id
	@Column(name = "ID_CANDIDAT", nullable = false)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "NOM_CANDIDAT", nullable = false)
	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	@Column(name = "PRENOM_CANDIDAT", nullable = false)
	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	@Column(name = "NUMERO_TEL_CANDIDAT", nullable = true)
	public String getNumeroTel() {
		return numeroTel;
	}

	public void setNumeroTel(String numeroTel) {
		this.numeroTel = numeroTel;
	}
	
	@Column(name = "EMAIL_CANDIDAT", nullable = true)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "DATE_INSCRIPTION", nullable = true)
	public Date getDateInscription() {
		return dateInscription;
	}

	public void setDateInscription(Date dateInscription) {
		this.dateInscription = dateInscription;
	}

	@Column(name = "DATE_ENTRETIEN", nullable = true)
	public Date getDateEntretien() {
		return dateEntretien;
	}

	public void setDateEntretien(Date dateEntretien) {
		this.dateEntretien = dateEntretien;
	}

	@Column(name = "NOM_SOURCEUR", nullable = true)
	public String getNomSourceur() {
		return nomSourceur;
	}

	public void setNomSourceur(String nomSourceur) {
		this.nomSourceur = nomSourceur;
	}

	@Column(name = "PRENOM_SOURCEUR", nullable = true)
	public String getPrenomSourceur() {
		return prenomSourceur;
	}

	@Column(name = "LIEU_ENTRETIEN", nullable = true)
	public String getLieuEntretien() {
		return lieuEntretien;
	}

	public void setLieuEntretien(String lieuEntretien) {
		this.lieuEntretien = lieuEntretien;
	}
	
	public void setPrenomSourceur(String prenomSourceur) {
		this.prenomSourceur = prenomSourceur;
	}

	@Column(name = "NOM_CHARGE", nullable = true)
	public String getNomCharge() {
		return nomCharge;
	}

	public void setNomCharge(String nomCharge) {
		this.nomCharge = nomCharge;
	}

	@Column(name = "PRENOM_CHARGE", nullable = true)
	public String getPrenomCharge() {
		return prenomCharge;
	}

	public void setPrenomCharge(String prenomCharge) {
		this.prenomCharge = prenomCharge;
	}

	@Column(name = "NOTE_TOTALE", nullable = true)
	public Long getNoteTotale() {
		return noteTotale;
	}

	public void setNoteTotale(Long noteTotale) {
		this.noteTotale = noteTotale;
	}

	@Column(name = "FORMATION", nullable = true)
	public String getFormation() {
		return formation;
	}

	public void setFormation(String formation) {
		this.formation = formation;
	}

	@Column(name = "DATE_DEMARRAGE_FORMATION", nullable = true)
	public Date getDateDemarrageFormation() {
		return dateDemarrageFormation;
	}

	public void setDateDemarrageFormation(Date dateDemarrageFormation) {
		this.dateDemarrageFormation = dateDemarrageFormation;
	}
	@Transient
	public Date getDateDebut() {
		return dateDebut;
	}
	@Transient
	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}
	@Transient
	public Date getDateFin() {
		return dateFin;
	}
	@Transient
	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}
	@Transient
	public String getDateisncription() {
		if (dateInscription != null) {
			dateisncription = sdf.format(dateInscription);
		}
		return dateisncription;
	}

	public void setDateisncription(String dateisncription) {
		this.dateisncription = dateisncription;
	}

	@Column(name = "ID_CV")
	public String getIdCv() {
		return idCv;
	}

	public void setIdCv(String idCv) {
		this.idCv = idCv;
	}
	@Column(name = "TECHNOLOGIE", nullable = false)
	public String getTechnologie() {
		return technologie;
	}

	public void setTechnologie(String technologie) {
		this.technologie = technologie;
	}
	@Column(name = "REGION", nullable = false)
	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}
	@Column(name = "ORIGINE", nullable = false)
	public String getOrigine() {
		return origine;
	}

	public void setOrigine(String origine) {
		this.origine = origine;
	}
	@Column(name = "PERTINENCE", nullable = true)
	public Integer getPertinence() {
		return pertinence;
	}

	public void setPertinence(Integer pertinence) {
		this.pertinence = pertinence;
	}
	@Column(name = "DISPONIBLE", nullable = true)
	public Disponibilite getDisponible() {
		return disponible;
	}

	public void setDisponible(Disponibilite disponible) {
		this.disponible = disponible;
	}
	@Column(name = "DIPLOME", nullable = true)
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
	@Column(name = "STATUT", nullable = true)
	public Statut getStatut() {
		return statut;
	}

	public void setStatut(Statut statut) {
		this.statut = statut;
	}
	@Column(name = "mobilite_Lille", nullable = true)
	public MobiliteSurLille getMobiliteLille() {
		return mobiliteLille;
	}

	public void setMobiliteLille(MobiliteSurLille mobiliteLille) {
		this.mobiliteLille = mobiliteLille;
	}
	@Column(name = "cv_Source", nullable = true)
	public CVSource getCvSource() {
		return cvSource;
	}

	public void setCvSource(CVSource cvSource) {
		this.cvSource = cvSource;
	}
	
	
	
	
}
