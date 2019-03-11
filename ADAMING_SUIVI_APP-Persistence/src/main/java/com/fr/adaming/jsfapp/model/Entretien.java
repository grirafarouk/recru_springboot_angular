package com.fr.adaming.jsfapp.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Proxy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fr.adaming.jsfapp.model.Disponibilite;

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

	public Entretien(Builder builder) {
		super();
		this.id = builder.id;
		this.charge = builder.charge;
		this.disponible = builder.disponible;
		this.date = builder.date;
		this.lieu = builder.lieu;
		this.relance = builder.relance;
		this.confirmation = builder.confirmation;
		this.directEmploi = builder.directEmploi;
		this.commentaire = builder.commentaire;
		this.pertinence = builder.pertinence;
		this.dateRelance = builder.dateRelance;
		this.mobilteCharge = builder.mobilteCharge;
		this.mobilteTouFrance = builder.mobilteTouFrance;
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
		public Utilisateur getCharge() {
		return charge;
	}

	public void setCharge(Utilisateur charge) {
		this.charge = charge;
		
	}
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "DISPONIBLE", nullable = false)
	@NotFound(action = NotFoundAction.IGNORE)
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

	public static class Builder {
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

		public Builder() {
		}

		public Builder setId(Long id) {
			this.id = id;
			return this;
		}

		public Builder setCharge(Utilisateur charge) {
			this.charge = charge;
			return this;
		}

		public Builder setDisponible(Disponibilite disponible) {
			this.disponible = disponible;
			return this;
		}

		public Builder setDate(Date date) {
			this.date = date;
			return this;
		}

		public Builder setLieu(Lieu lieu) {
			this.lieu = lieu;
			return this;
		}

		public Builder setRelance(Boolean relance) {
			this.relance = relance;
			return this;
		}

		public Builder setConfirmation(Boolean confirmation) {
			this.confirmation = confirmation;
			return this;
		}

		public Builder setDirectEmploi(Boolean directEmploi) {
			this.directEmploi = directEmploi;
			return this;
		}

		public Builder setCommentaire(String commentaire) {
			this.commentaire = commentaire;
			return this;
		}

		public Builder setPertinence(Integer pertinence) {
			this.pertinence = pertinence;
			return this;
		}

		public Builder setDateRelance(Date dateRelance) {
			this.dateRelance = dateRelance;
			return this;
		}

		public Builder setMobilteCharge(String mobilteCharge) {
			this.mobilteCharge = mobilteCharge;
			return this;
		}

		public Builder setMobilteTouFrance(Boolean mobilteTouFrance) {
			this.mobilteTouFrance = mobilteTouFrance;
			return this;
		}

		public Entretien buildEntretien() {
			return new Entretien(this);
		}
	}
}
