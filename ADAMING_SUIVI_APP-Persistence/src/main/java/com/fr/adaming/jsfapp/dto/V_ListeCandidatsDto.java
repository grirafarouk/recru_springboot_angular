package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Transient;

import com.fr.adaming.jsfapp.enums.CVSource;
import com.fr.adaming.jsfapp.enums.Disponibilite;
import com.fr.adaming.jsfapp.enums.MobiliteSurLille;
import com.fr.adaming.jsfapp.enums.Statut;

public class V_ListeCandidatsDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1167960673108782985L;

	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
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
	private Statut statut;
	private String technologie;
	private String region;
	private String nomSourceur;
	private String prenomSourceur;
	private Disponibilite disponibilite;
	private Boolean relancer;
	private Date dateRelance;
	private Date dateDebut;
	private Date dateFin;
	private Date dateEntretien;
	private String lieuEntretien;
	private Boolean confirmationRdv;
	private String nomCharge;
	private String prenomCharge;
	private String commentaire;
	private String critereRecheche;

	@Transient
	private String dateentretien;
	@Transient
	private String dateisncription;
	@Transient
	private String daterelance;

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

	public String getNumeroTel() {
		return numeroTel;
	}

	public void setNumeroTel(String numeroTel) {
		this.numeroTel = numeroTel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getMobilite() {
		return mobilite;
	}

	public void setMobilite(Boolean mobilite) {
		this.mobilite = mobilite;
	}

	public Boolean getPoleEmploi() {
	 return poleEmploi;
	}

	 public void setPoleEmploi(Boolean poleEmploi) {
	 this.poleEmploi = poleEmploi;
	 }

	public Long getNoteTotale() {
		return noteTotale;
	}

	public void setNoteTotale(Long noteTotale) {
		this.noteTotale = noteTotale;
	}

	public Date getDateInscription() {
		return dateInscription;
	}

	public void setDateInscription(Date dateInscription) {
		this.dateInscription = dateInscription;
	}

	public Statut getStatut() {
		return statut;
	}

	public void setStatut(Statut statut) {
		this.statut = statut;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public Disponibilite getDisponibilite() {
		return disponibilite;
	}

	public void setDisponibilite(Disponibilite disponibilite) {
		this.disponibilite = disponibilite;
	}

	public Boolean getRelancer() {
		return relancer;
	}

	public void setRelancer(Boolean relancer) {
		this.relancer = relancer;
	}

	public Date getDateRelance() {
		return dateRelance;
	}

	public void setDateRelance(Date dateRelance) {
		this.dateRelance = dateRelance;
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

	public Date getDateEntretien() {
		return dateEntretien;
	}

	public void setDateEntretien(Date dateEntretien) {
		this.dateEntretien = dateEntretien;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
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

	public String getTechnologie() {
		return technologie;
	}

	public void setTechnologie(String technologie) {
		this.technologie = technologie;
	}

	public Boolean getConfirmationRdv() {
		return confirmationRdv;
	}

	public void setConfirmationRdv(Boolean confirmationRdv) {
		this.confirmationRdv = confirmationRdv;
	}

	public String getLieuEntretien() {
		return lieuEntretien;
	}

	public void setLieuEntretien(String lieuEntretien) {
		this.lieuEntretien = lieuEntretien;
	}

	@Transient
	public String getDateentretien() {
		if (dateEntretien != null) {
			dateentretien = sdf.format(dateEntretien);
		}
		return dateentretien;
	}

	@Transient
	public void setDateentretien(String dateentretien) {
		this.dateentretien = dateentretien;
	}

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
	public String getDaterelance() {
		if (dateRelance != null) {
			daterelance = sdf.format(dateRelance);
		}
		return daterelance;
	}

	@Transient
	public void setDaterelance(String daterelance) {
		this.daterelance = daterelance;
	}

	public String getCritereRecheche() {
		return critereRecheche;
	}

	public void setCritereRecheche(String critereRecheche) {
		this.critereRecheche = critereRecheche;
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
