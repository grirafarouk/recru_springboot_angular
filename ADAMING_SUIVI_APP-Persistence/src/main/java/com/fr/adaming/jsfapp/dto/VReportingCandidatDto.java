package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Transient;

import com.fr.adaming.jsfapp.enums.CVSource;
import com.fr.adaming.jsfapp.model.Disponibilite;
import com.fr.adaming.jsfapp.enums.MobiliteSurLille;

public class VReportingCandidatDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	private Long id;
	private String nom;
	private String prenom;
	private String email;
	private String numeroTel;
	private Date dateInscription;
	private String nomSourceur;
	private String prenomSourceur;
	private String nomCharge;
	private String prenomCharge;
	private Integer pertinence;
	private String disponibilite;
	private String statut;
	private MobiliteSurLille mobiliteLille;
	private CVSource cvSource;
	private String lieuEntretien;
	private Date dateEntretien;
	private String noteTotale;
	private String formation;
	private Date dateDemarrageFormation;
	private Date dateDebut;
	private Date dateFin;
	private String idCv;
	private String technologie;
	private String region;
	private String origine;
	private String diplome;
	private Date dateObtentionDiplome;
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

	@Transient
	private String dateisncription;

	@Transient
	private String stringDateObtentionDiplome;

	@Transient
	public String getDateisncription() {
		if (dateInscription != null) {
			dateisncription = sdf.format(dateInscription);
		}
		return dateisncription;
	}

	@Transient
	public void setDateisncription(String dateisncription) {
		this.dateisncription = dateisncription;
	}

	@Transient
	private String datEnt;

	@Transient
	public String getDatEnt() {
		if (dateEntretien != null) {
			datEnt = sdf.format(dateEntretien);
		}
		return datEnt;
	}

	@Transient
	public void setDatEnt(String datEnt) {
		this.datEnt = datEnt;
	}

	@Transient
	private String dateDemForm;

	@Transient
	public String getDateDemForm() {
		if (dateDemarrageFormation != null) {
			dateDemForm = sdf.format(dateDemarrageFormation);
		}
		return dateDemForm;
	}

	@Transient
	public void setDateDemForm(String dateDemForm) {
		this.dateDemForm = dateDemForm;
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

	public Date getDateInscription() {
		return dateInscription;
	}

	public void setDateInscription(Date dateInscription) {
		this.dateInscription = dateInscription;
	}

	public String getNomSourceur() {
		return nomSourceur;
	}

	public void setNomSourceur(String nomSourceur) {
		this.nomSourceur = nomSourceur;
	}

	public String getPrenomSourceur() {
		return prenomSourceur;
	}

	public void setPrenomSourceur(String prenomSourceur) {
		this.prenomSourceur = prenomSourceur;
	}

	public String getNomCharge() {
		return nomCharge;
	}

	public void setNomCharge(String nomCharge) {
		this.nomCharge = nomCharge;
	}

	public String getPrenomCharge() {
		return prenomCharge;
	}

	public void setPrenomCharge(String prenomCharge) {
		this.prenomCharge = prenomCharge;
	}

	public String getLieuEntretien() {
		return lieuEntretien;
	}

	public void setLieuEntretien(String lieuEntretien) {
		this.lieuEntretien = lieuEntretien;
	}

	public Date getDateEntretien() {
		return dateEntretien;
	}

	public void setDateEntretien(Date dateEntretien) {
		this.dateEntretien = dateEntretien;
	}

	public String getNoteTotale() {
		return noteTotale;
	}

	public void setNoteTotale(String noteTotale) {
		this.noteTotale = noteTotale;
	}

	public String getFormation() {
		return formation;
	}

	public void setFormation(String formation) {
		this.formation = formation;
	}

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
	public String getStringDateObtentionDiplome() {
		if (dateObtentionDiplome != null) {
			stringDateObtentionDiplome = sdf.format(dateObtentionDiplome);
		}
		return stringDateObtentionDiplome;
	}

	@Transient
	public void setStringDateObtentionDiplome(String stringDateObtentionDiplome) {
		this.stringDateObtentionDiplome = stringDateObtentionDiplome;
	}

	public String getIdCv() {
		return idCv;
	}

	public void setIdCv(String idCv) {
		this.idCv = idCv;
	}

	public String getTechnologie() {
		return technologie;
	}

	public void setTechnologie(String technologie) {
		this.technologie = technologie;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getOrigine() {
		return origine;
	}

	public void setOrigine(String origine) {
		this.origine = origine;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getPertinence() {
		return pertinence;
	}

	public void setPertinence(Integer pertinence) {
		this.pertinence = pertinence;
	}

	public String getDisponibilite() {
		return disponibilite;
	}

	public void setDisponibilite(String disponibilite) {
		this.disponibilite = disponibilite;
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

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
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
