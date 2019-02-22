package com.fr.adaming.jsfapp.model;

import java.util.Date;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "suivi")
@Proxy(lazy = false)
public class Suivi implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7334718478667556938L;

	private Long id;
	private Utilisateur charge;
	private Boolean mobilite;
	private Boolean relance;
	private Integer anglais;
	private Date dateRelance;
	private Double notePresentation;
	private Double noteSavoir;
	private Double noteFiabilite;
	private Double noteAttrait;
	private Double notePret;
	private Double noteMobilite;
	private Double noteResultat;
	private Double noteCoherence;
	private Double notePistes;
	private String commentaire;
	private Set<Region> regions;

	public Suivi() {
		super();
	}

	public Suivi(Builder builder) {
		super();
		this.id = builder.id;
		this.charge = builder.charge;
		this.mobilite = builder.mobilite;
		this.relance = builder.relance;
		this.anglais = builder.anglais;
		this.dateRelance = builder.dateRelance;
		this.notePresentation = builder.notePresentation;
		this.noteSavoir = builder.noteSavoir;
		this.noteFiabilite = builder.noteFiabilite;
		this.noteAttrait = builder.noteAttrait;
		this.notePret = builder.notePret;
		this.noteMobilite = builder.noteMobilite;
		this.noteResultat = builder.noteResultat;
		this.noteCoherence = builder.noteCoherence;
		this.notePistes = builder.notePistes;
		this.commentaire = builder.commentaire;
		this.regions = builder.regions;
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

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "CHARGE", nullable = true)
	public Utilisateur getCharge() {
		return charge;
	}

	public void setCharge(Utilisateur charge) {
		this.charge = charge;
	}

	@Column(name = "MOBILITE", nullable = true)
	public Boolean getMobilite() {
		return mobilite;
	}

	public void setMobilite(Boolean mobilite) {
		this.mobilite = mobilite;
	}

	@Column(name = "RELANCE", nullable = true)
	public Boolean getRelance() {
		return relance;
	}

	public void setRelance(Boolean relance) {
		this.relance = relance;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "DATE_RELANCE", nullable = true, length = 0)
	public Date getDateRelance() {
		return dateRelance;
	}

	public void setDateRelance(Date dateRelance) {
		this.dateRelance = dateRelance;
	}

	@Column(name = "NOTE_PRESENTATION", nullable = true)
	public Double getNotePresentation() {
		return notePresentation;
	}

	public void setNotePresentation(Double notePresentation) {
		this.notePresentation = notePresentation;
	}

	@Column(name = "NOTE_SAVOIR", nullable = true)
	public Double getNoteSavoir() {
		return noteSavoir;
	}

	public void setNoteSavoir(Double noteSavoir) {
		this.noteSavoir = noteSavoir;
	}

	@Column(name = "NOTE_FIABILITE", nullable = true)
	public Double getNoteFiabilite() {
		return noteFiabilite;
	}

	public void setNoteFiabilite(Double noteFiabilite) {
		this.noteFiabilite = noteFiabilite;
	}

	@Column(name = "NOTE_ATTRAIT", nullable = true)
	public Double getNoteAttrait() {
		return noteAttrait;
	}

	public void setNoteAttrait(Double noteAttrait) {
		this.noteAttrait = noteAttrait;
	}

	@Column(name = "NOTE_PRET", nullable = true)
	public Double getNotePret() {
		return notePret;
	}

	public void setNotePret(Double notePret) {
		this.notePret = notePret;
	}

	@Column(name = "NOTE_MOBILIOTE", nullable = true)
	public Double getNoteMobilite() {
		return noteMobilite;
	}

	public void setNoteMobilite(Double noteMobilite) {
		this.noteMobilite = noteMobilite;
	}

	@Column(name = "NOTE_RESULTAT", nullable = true)
	public Double getNoteResultat() {
		return noteResultat;
	}

	public void setNoteResultat(Double noteResultat) {
		this.noteResultat = noteResultat;
	}

	@Column(name = "NOTE_COHERENCE", nullable = true)
	public Double getNoteCoherence() {
		return noteCoherence;
	}

	public void setNoteCoherence(Double noteCoherence) {
		this.noteCoherence = noteCoherence;
	}

	@Column(name = "NOTE_PISTES", nullable = true)
	public Double getNotePistes() {
		return notePistes;
	}

	public void setNotePistes(Double notePistes) {
		this.notePistes = notePistes;
	}

	@Column(name = "COMMENTAIRE", nullable = true)
	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "suivi_region", joinColumns = @JoinColumn(name = "suivi_id"), inverseJoinColumns = @JoinColumn(name = "region_id"))
	public Set<Region> getRegions() {
		return regions;
	}

	public void setRegions(Set<Region> regions) {
		this.regions = regions;
	}

	@Column(name = "ANGLAIS", nullable = true)
	public Integer getAnglais() {
		return anglais;
	}

	public void setAnglais(Integer anglais) {
		this.anglais = anglais;
	}

	public static class Builder {
		private Long id;
		private Utilisateur charge;
		private Boolean mobilite;
		private Boolean relance;
		private Integer anglais;
		private Date dateRelance;
		private Double notePresentation;
		private Double noteSavoir;
		private Double noteFiabilite;
		private Double noteAttrait;
		private Double notePret;
		private Double noteMobilite;
		private Double noteResultat;
		private Double noteCoherence;
		private Double notePistes;
		private String commentaire;
		private Set<Region> regions;

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

		public Builder setMobilite(Boolean mobilite) {
			this.mobilite = mobilite;
			return this;
		}

		public Builder setRelance(Boolean relance) {
			this.relance = relance;
			return this;
		}

		public Builder setAnglais(Integer anglais) {
			this.anglais = anglais;
			return this;
		}

		public Builder setDateRelance(Date dateRelance) {
			this.dateRelance = dateRelance;
			return this;
		}

		public Builder setNotePresentation(Double notePresentation) {
			this.notePresentation = notePresentation;
			return this;
		}

		public Builder setNoteSavoir(Double noteSavoir) {
			this.noteSavoir = noteSavoir;
			return this;
		}

		public Builder setNoteFiabilite(Double noteFiabilite) {
			this.noteFiabilite = noteFiabilite;
			return this;
		}

		public Builder setNoteAttrait(Double noteAttrait) {
			this.noteAttrait = noteAttrait;
			return this;
		}

		public Builder setNotePret(Double notePret) {
			this.notePret = notePret;
			return this;
		}

		public Builder setNoteMobilite(Double noteMobilite) {
			this.noteMobilite = noteMobilite;
			return this;
		}

		public Builder setNoteResultat(Double noteResultat) {
			this.noteResultat = noteResultat;
			return this;
		}

		public Builder setNoteCoherence(Double noteCoherence) {
			this.noteCoherence = noteCoherence;
			return this;
		}

		public Builder setNotePistes(Double notePistes) {
			this.notePistes = notePistes;
			return this;
		}

		public Builder setCommentaire(String commentaire) {
			this.commentaire = commentaire;
			return this;
		}

		public Builder setRegions(Set<Region> regions) {
			this.regions = regions;
			return this;
		}

		public Suivi buildSuivi() {
			return new Suivi(this);
		}

	}
}
