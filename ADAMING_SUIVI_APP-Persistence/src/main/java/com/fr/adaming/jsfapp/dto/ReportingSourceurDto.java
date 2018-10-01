package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class ReportingSourceurDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1055919298931903979L;

	private String nom;

	private String prenom;

	private Integer nbrCv;

	private Integer nbrCvHorsCible;

	private Integer nbrCvDisponible;

	public ReportingSourceurDto(String nom, String prenom, Integer nbrCv,
			Integer nbrCvDisponible, Integer nbrCvHorsCible) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.nbrCv = nbrCv;
		this.nbrCvHorsCible = nbrCvHorsCible;
		this.nbrCvDisponible = nbrCvDisponible;
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

	public Integer getNbrCvDisponible() {
		return nbrCvDisponible;
	}

	public void setNbrCvDisponible(Integer nbrCvDisponible) {
		this.nbrCvDisponible = nbrCvDisponible;
	}

	public Integer getNbrCvHorsCible() {
		return nbrCvHorsCible;
	}

	public void setNbrCvHorsCible(Integer nbrCvHorsCible) {
		this.nbrCvHorsCible = nbrCvHorsCible;
	}

}
