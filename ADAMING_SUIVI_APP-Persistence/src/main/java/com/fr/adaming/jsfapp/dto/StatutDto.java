package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class StatutDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3656001385205610350L;
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
