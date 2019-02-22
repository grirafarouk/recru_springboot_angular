package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class ReportingFicheSourceur implements Serializable {

	private static final long serialVersionUID = 1055919298931903979L;

	private String nom;
	private String prenom;
	private String numero;
	private String email;
	private String nomsourceur;
	private String prenomsourceur;
	private String nomcharge;
	private String prenomcharge;

	public ReportingFicheSourceur() {
		super();
	}

	public ReportingFicheSourceur(Builder builder) {
		super();
		this.nom = builder.nom;
		this.prenom = builder.prenom;
		this.numero = builder.numero;
		this.email = builder.email;
		this.nomsourceur = builder.nomsourceur;
		this.prenomsourceur = builder.prenomsourceur;
		this.nomcharge = builder.nomcharge;
		this.prenomcharge = builder.prenomcharge;
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

	public static class Builder {
		private String nom;
		private String prenom;
		private String numero;
		private String email;
		private String nomsourceur;
		private String prenomsourceur;
		private String nomcharge;
		private String prenomcharge;

		public Builder() {
		}

		public Builder setNom(String nom) {
			this.nom = nom;
			return this;
		}

		public Builder setPrenom(String prenom) {
			this.prenom = prenom;
			return this;
		}

		public Builder setNumero(String numero) {
			this.numero = numero;
			return this;
		}

		public Builder setEmail(String email) {
			this.email = email;
			return this;
		}

		public Builder setNomsourceur(String nomsourceur) {
			this.nomsourceur = nomsourceur;
			return this;
		}

		public Builder setPrenomsourceur(String prenomsourceur) {
			this.prenomsourceur = prenomsourceur;
			return this;
		}

		public Builder setNomcharge(String nomcharge) {
			this.nomcharge = nomcharge;
			return this;
		}

		public Builder setPrenomcharge(String prenomcharge) {
			this.prenomcharge = prenomcharge;
			return this;
		}

		public ReportingFicheSourceur buildReportingFicheSourceur() {
			return new ReportingFicheSourceur(this);
		}
	}
}