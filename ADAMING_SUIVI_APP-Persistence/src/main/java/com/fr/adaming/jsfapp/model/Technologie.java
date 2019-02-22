package com.fr.adaming.jsfapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "technologie")
@Proxy(lazy = false)
public class Technologie implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1987039925430198808L;
	private Long id;
	private String libelle;
	private boolean reporting;

	public Technologie() {
		super();
	}
	

	public Technologie(Long id, String libelle, boolean reporting) {
		super();
		this.id = id;
		this.libelle = libelle;
		this.reporting = reporting;
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

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	@Column(name = "REPORTING", nullable = true)
	public boolean getReporting() {
		return reporting;
	}

	public void setReporting(boolean reporting) {
		this.reporting = reporting;
	}

}
