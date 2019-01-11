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

	@ManyToMany( fetch = FetchType.EAGER)
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
}
