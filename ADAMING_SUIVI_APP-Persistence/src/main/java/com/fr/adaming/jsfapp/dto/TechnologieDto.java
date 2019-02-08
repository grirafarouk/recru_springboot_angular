package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class TechnologieDto implements Serializable {

	private static final long serialVersionUID = 1055919298931903979L;
	private Long id;
	private String libelle;
	private boolean reporting;

	public TechnologieDto() {
		super();
	}

	public TechnologieDto(String libelle) {
		super();
		this.libelle = libelle;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isReporting() {
		return reporting;
	}

	public void setReporting(boolean reporting) {
		this.reporting = reporting;
	}

}