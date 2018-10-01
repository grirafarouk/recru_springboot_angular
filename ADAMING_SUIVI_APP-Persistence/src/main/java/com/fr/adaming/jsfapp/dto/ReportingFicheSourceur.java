package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class ReportingFicheSourceur implements Serializable  {
	
	private static final long serialVersionUID = 1055919298931903979L;
	
	
	private String nom;
	private String prenom;
	private String numero;
	private String email;
	private String nomsourceur;
	private String prenomsourceur;
	private String nomcharge;
	private String prenomcharge;
	
	
	/**
	 * 
	 */
	public ReportingFicheSourceur() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	/**
	 * @param nom
	 * @param prenom
	 * @param numero
	 * @param email
	 * @param nomsourceur
	 * @param prenomsourceur
	 * @param nomcharge
	 * @param prenomcharge
	 */
	public ReportingFicheSourceur(String nom, String prenom, String numero,
			String email, String nomsourceur, String prenomsourceur,
			String nomcharge, String prenomcharge) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.numero = numero;
		this.email = email;
		this.nomsourceur = nomsourceur;
		this.prenomsourceur = prenomsourceur;
		this.nomcharge = nomcharge;
		this.prenomcharge = prenomcharge;
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
	public String getNomsourceur() {
		return nomsourceur;
	}
	public void setNomsourceur(String nomsourceur) {
		this.nomsourceur = nomsourceur;
	}
	public String getPrenomsourceur() {
		return prenomsourceur;
	}
	public void setPrenomsourceur(String prenomsourceur) {
		this.prenomsourceur = prenomsourceur;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getNomcharge() {
		return nomcharge;
	}

	public void setNomcharge(String nomcharge) {
		this.nomcharge = nomcharge;
	}

	public String getPrenomcharge() {
		return prenomcharge;
	}

	public void setPrenomcharge(String prenomcharge) {
		this.prenomcharge = prenomcharge;
	}
	
	
}