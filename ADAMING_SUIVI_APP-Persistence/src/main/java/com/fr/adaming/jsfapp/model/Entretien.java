package com.fr.adaming.jsfapp.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.Proxy;
import com.fr.adaming.jsfapp.enums.Disponibilite;

@Entity
@Table(name = "entretien")
@Proxy(lazy = false)
public class Entretien implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6568203169805450828L;
	private Long id;
	private Utilisateur charge;
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

	
	public Entretien() {
		super();
	}

	public Entretien(Long id, Utilisateur charge, Disponibilite disponible, Date date, Lieu lieu, Boolean relance,
			Boolean confirmation, Boolean directEmploi, String commentaire, Integer pertinence, Date dateRelance,
			String mobilteCharge, Boolean mobilteTouFrance) {
		super();
		this.id = id;
		this.charge = charge;
		this.disponible = disponible;
		this.date = date;
		this.lieu = lieu;
		this.relance = relance;
		this.confirmation = confirmation;
		this.directEmploi = directEmploi;
		this.commentaire = commentaire;
		this.pertinence = pertinence;
		this.dateRelance = dateRelance;
		this.mobilteCharge = mobilteCharge;
		this.mobilteTouFrance = mobilteTouFrance;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CHARGE", nullable = true)
	//@JsonIgnore
	public Utilisateur getCharge() {
		return charge;
	}

	public void setCharge(Utilisateur charge) {
		this.charge = charge;
	}

	@Enumerated(EnumType.ORDINAL)
	@Column(name = "DISPONIBLE", nullable = true)
	public Disponibilite getDisponible() {
		return disponible;
	}

	public void setDisponible(Disponibilite disponible) {
		this.disponible = disponible;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "DATE", nullable = true, length = 0)
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "LIEU", nullable = true)
	public Lieu getLieu() {
		return lieu;
	}

	public void setLieu(Lieu lieu) {
		this.lieu = lieu;
	}

	@Column(name = "RELANCE", nullable = true)
	public Boolean getRelance() {
		return relance;
	}

	public void setRelance(Boolean relance) {
		this.relance = relance;
	}

	@Column(name = "CONFIRMATION", nullable = true)
	public Boolean getConfirmation() {
		return confirmation;
	}

	public void setConfirmation(Boolean confirmation) {
		this.confirmation = confirmation;
	}

	@Column(name = "COMMENTAIRE", nullable = true)
	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	@Column(name = "PERTINENCE")
	public Integer getPertinence() {
		return pertinence;
	}

	public void setPertinence(Integer pertinence) {
		this.pertinence = pertinence;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "DATE_RELANCE", nullable = true, length = 0)
	public Date getDateRelance() {
		return dateRelance;
	}

	public void setDateRelance(Date dateRelance) {
		this.dateRelance = dateRelance;
	}

	@Column(name = "MOBILITE_CHARGE", nullable = true)
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

	public Boolean getDirectEmploi() {
		return directEmploi;
	}

	public void setDirectEmploi(Boolean directEmploi) {
		this.directEmploi = directEmploi;
	}

}
