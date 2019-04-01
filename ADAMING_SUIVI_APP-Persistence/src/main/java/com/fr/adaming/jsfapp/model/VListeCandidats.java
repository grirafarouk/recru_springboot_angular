package com.fr.adaming.jsfapp.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fr.adaming.jsfapp.enums.CVSource;
import com.fr.adaming.jsfapp.enums.MobiliteSurLille;

@Entity
@Table(name = "V_ListeCandidats")
public class VListeCandidats implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5331929993859063089L;

	private Long id;
	private String nom;
	private String prenom;
	private String numeroTel;
	private String email;
	private Boolean mobilite;
	private MobiliteSurLille mobiliteLille;
	private Boolean poleEmploi;
	private CVSource cvSource;
	private Long noteTotale;
	private Date dateInscription;
	private String  statut;
	private String technologie;
	private String region;
	private String nomSourceur;
	private String prenomSourceur;
	private String disponibilite;
	private Boolean relancer;
	private Date dateRelance;
	private Date dateEntretien;
	private String lieuEntretien;
	private Boolean confirmationRdv;
	private String nomCharge;
	private String prenomCharge;
	private String commentaire;
    private String source;
    private String charge;
   
	public String getCharge() {
		return charge;
	}

	public void setCharge(String charge) {
		this.charge = charge;
	}

	public String getSource() {
	return source;
}

public void setSource(String source) {
	this.source = source;
}

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

	@Column(name = "MOBILITE", nullable = true)
	public Boolean getMobilite() {
		return mobilite;
	}

	public void setMobilite(Boolean mobilite) {
		this.mobilite = mobilite;
	}

	@Column(name = "POLE_EMPLOI", nullable = true)
	public Boolean getPoleEmploi() {
		return poleEmploi;
	}

	public void setPoleEmploi(Boolean poleEmploi) {
		this.poleEmploi = poleEmploi;
	}

	@Column(name = "DATE_INSCRIPTION", nullable = true)
	public Date getDateInscription() {
		return dateInscription;
	}

	public void setDateInscription(Date dateInscription) {
		this.dateInscription = dateInscription;
	}
	@Column(name = "REGION", nullable = true)
	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	@Column(name = "DATE_RELANCE", nullable = true)
	public Date getDateRelance() {
		return dateRelance;
	}

	public void setDateRelance(Date dateRelance) {
		this.dateRelance = dateRelance;
	}

	@Column(name = "DATE_ENTRETIEN", nullable = true)
	public Date getDateEntretien() {
		return dateEntretien;
	}

	public void setDateEntretien(Date dateEntretien) {
		this.dateEntretien = dateEntretien;
	}

	@Column(name = "COMMENTAIRE", nullable = true)
	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	@Column(name = "NOTE_TOTALE", nullable = true)
	public Long getNoteTotale() {
		return noteTotale;
	}

	public void setNoteTotale(Long noteTotale) {
		this.noteTotale = noteTotale;
	}

	@Column(name = "STATUT", nullable = true)
	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	@Column(name = "RELANCER", nullable = true)
	public Boolean getRelancer() {
		return relancer;
	}

	@Column(name = "TECHNOLOGIE", nullable = true)
	public String getTechnologie() {
		return technologie;
	}

	public void setTechnologie(String technologie) {
		this.technologie = technologie;
	}

	public void setRelancer(Boolean relancer) {
		this.relancer = relancer;
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

	@Column(name = "DISPONIBILITE", nullable = false)
	public String getDisponibilite() {
		return disponibilite;
	}

	@Column(name = "CONFIRMATION_RDV", nullable = true)
	public Boolean getConfirmationRdv() {
		return confirmationRdv;
	}

	public void setConfirmationRdv(Boolean confirmationRdv) {
		this.confirmationRdv = confirmationRdv;
	}

	public void setDisponibilite(String disponibilite) {
		this.disponibilite = disponibilite;
	}

	@Column(name = "LIEU_ENTRETIEN", nullable = true)
	public String getLieuEntretien() {
		return lieuEntretien;
	}

	public void setLieuEntretien(String lieuEntretien) {
		this.lieuEntretien = lieuEntretien;
	}
}
