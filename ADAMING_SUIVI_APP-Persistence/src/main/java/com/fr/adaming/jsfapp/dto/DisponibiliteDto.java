package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class DisponibiliteDto implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2133168776717881067L;
	private Long id;
	private String libelle;

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

}
