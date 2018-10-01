package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class ReportingChargeDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1055919298931903979L;

	private String nom;

	private String prenom;

	private Integer nbrCv;



	public ReportingChargeDto(String nom, String prenom, Integer nbrCv) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.nbrCv = nbrCv;
		
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public Integer getNbrCv() {
		return nbrCv;
	}

	public void setNbrCv(Integer nbrCv) {
		this.nbrCv = nbrCv;
	}



}
