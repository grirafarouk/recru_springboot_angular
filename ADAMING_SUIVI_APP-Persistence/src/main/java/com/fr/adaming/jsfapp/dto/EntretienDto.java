package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Transient;

import com.fr.adaming.jsfapp.enums.Disponibilite;
import com.fr.adaming.jsfapp.model.Lieu;

public class EntretienDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private UtilisateurDto charge;
	private Disponibilite disponible;
	private Date date;
	private Lieu lieu;
	private Boolean relance;
	private Boolean confirmation;
	private Boolean directEmploi;
	private String commentaire;
	private Integer pertinence;
	private Date dateRelance;
	private String mobilteCharge;
	private Boolean mobilteTouFrance;
	private String dateRel;
	private String dateEntretien;

	public EntretienDto() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UtilisateurDto getCharge() {
		return charge;
	}

	public void setCharge(UtilisateurDto charge) {
		this.charge = charge;
	}

	public Disponibilite getDisponible() {
		return disponible;
	}

	public void setDisponible(Disponibilite disponible) {
		this.disponible = disponible;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Lieu getLieu() {
		return lieu;
	}

	public void setLieu(Lieu lieu) {
		this.lieu = lieu;
	}

	public Boolean getRelance() {
		return relance;
	}

	public void setRelance(Boolean relance) {
		this.relance = relance;
	}

	public Boolean getConfirmation() {
		return confirmation;
	}

	public void setConfirmation(Boolean confirmation) {
		this.confirmation = confirmation;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Integer getPertinence() {
		return pertinence;
	}

	public void setPertinence(Integer pertinence) {
		this.pertinence = pertinence;
	}

	public Date getDateRelance() {
		return dateRelance;
	}

	public void setDateRelance(Date dateRelance) {
		this.dateRelance = dateRelance;
	}

	public String getMobilteCharge() {
		return mobilteCharge;
	}

	public void setMobilteCharge(String mobilteCharge) {
		this.mobilteCharge = mobilteCharge;
	}

	public Boolean getMobilteTouFrance() {
		return mobilteTouFrance;
	}

	public void setMobilteTouFrance(Boolean mobilteTouFrance) {
		this.mobilteTouFrance = mobilteTouFrance;
	}

	@Transient
	public String getDateRel() {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		if (dateRelance != null) {
			dateRel = sdf.format(dateRelance);
		}
		return dateRel;
	}

	@Transient
	public void setDateRel(String daterelance) {
		this.dateRel = daterelance;
	}

	@Transient
	public String getDateEntretien() {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		if (date != null) {
			dateEntretien = sdf.format(date);
		}
		return dateEntretien;
	}

	@Transient
	public void setDateEntretien(String dateEntretien) {
		this.dateEntretien = dateEntretien;
	}

	public Boolean getDirectEmploi() {
		return directEmploi;
	}

	public void setDirectEmploi(Boolean directEmploi) {
		this.directEmploi = directEmploi;
	}

}
