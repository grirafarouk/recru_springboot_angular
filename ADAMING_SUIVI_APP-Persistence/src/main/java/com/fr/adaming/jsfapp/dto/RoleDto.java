package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class RoleDto implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8247403532006781599L;
	private long id;
	private String libelle;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}

}