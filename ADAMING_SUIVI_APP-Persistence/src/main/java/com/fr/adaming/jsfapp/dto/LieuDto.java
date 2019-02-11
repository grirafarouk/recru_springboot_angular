package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class LieuDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private String libelle;
	private String adresseAdaming;

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

	public String getAdresseAdaming() {
		return adresseAdaming;
	}

	public void setAdresseAdaming(String adresseAdaming) {
		this.adresseAdaming = adresseAdaming;
	}

}
