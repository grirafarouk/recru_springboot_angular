package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.util.Date;

import com.fr.adaming.jsfapp.enums.Profil;

public class UtilisateurDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Profil profil;
	private String nom;
	private String prenom;
	private String login;
	private String email;
	private String password;
	private Date dateCreation;
	private Boolean actif;
	private String token;
	private Boolean expire;
	private Boolean reporting;
	private String numeroTelF;
	private String numeroTelP;


	public UtilisateurDto() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Profil getProfil() {
		return profil;
	}

	public void setProfil(Profil profil) {
		this.profil = profil;
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

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	public Boolean getActif() {
		return actif;
	}

	public void setActif(Boolean actif) {
		this.actif = actif;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Boolean getExpire() {
		return expire;
	}

	public void setExpire(Boolean expire) {
		this.expire = expire;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UtilisateurDto other = (UtilisateurDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		else return true;
		return true;
	}

	public Boolean getReporting() {
		return reporting;
	}

	public void setReporting(Boolean reporting) {
		this.reporting = reporting;
	}

	public String getNumeroTelF() {
		return numeroTelF;
	}

	public void setNumeroTelF(String numeroTelF) {
		this.numeroTelF = numeroTelF;
	}

	public String getNumeroTelP() {
		return numeroTelP;
	}

	public void setNumeroTelP(String numeroTelP) {
		this.numeroTelP = numeroTelP;
	}
	

}
