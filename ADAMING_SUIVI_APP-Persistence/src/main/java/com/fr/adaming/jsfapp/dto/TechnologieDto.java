package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;


public class TechnologieDto implements Serializable  {
	
	private static final long serialVersionUID = 1055919298931903979L;
	
	private String libelle;
	

	public TechnologieDto() {
		super();
		// TODO Auto-generated constructor stub
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

	
	
	
}