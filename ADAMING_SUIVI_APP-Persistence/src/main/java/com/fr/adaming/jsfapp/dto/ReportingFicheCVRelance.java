package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class ReportingFicheCVRelance implements Serializable  {
	
	private static final long serialVersionUID = 1055919298931903979L;
	
	
	private String nom;
	private String prenom;
	private String numero;
	private String email;
	private String date;
	private String technologie;
	/**
	 * 
	 */
	public ReportingFicheCVRelance() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	/**
	 * @param nom
	 * @param prenom
	 * @param numero
	 * @param email
	 * @param date
	 * @param technologie
	 */
	public ReportingFicheCVRelance(String nom, String prenom, String numero,
			String email, String date, String technologie) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.numero = numero;
		this.email = email;
		this.date = date;
		this.technologie = technologie;
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
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTechnologie() {
		return technologie;
	}
	public void setTechnologie(String technologie) {
		this.technologie = technologie;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}