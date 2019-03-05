
package com.fr.adaming.jsfapp.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Proxy;
import com.fr.adaming.jsfapp.model.Role;

@Entity
@Table(name = "utilisateur")
@Proxy(lazy = false)
public class Utilisateur implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1944958863913119945L;
	private Long id;
	private Role profil;
	private String nom;
	private String prenom;
	private String login;
	private String email;
	private String password;
	private Date dateCreation;
	private Boolean actif;
	private String token;
	private Boolean expire;
	private Date dateModificationMotPasse;
	private boolean reporting;
	private String numeroTelF;
	private String numeroTelP;

	public Utilisateur() {
		super();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	@ManyToOne(cascade = CascadeType.DETACH)
	@JoinColumn(name = "PROFIL")
	public Role getProfil() {
		return profil;
	}

	public void setProfil(Role profil) {
		this.profil = profil;
	}

	@Column(name = "NOM", nullable = false)
	public String getNom() {
		return this.nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	@Column(name = "PRENOM", nullable = false)
	public String getPrenom() {
		return this.prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	@Column(name = "LOGIN", nullable = false, length = 100)
	public String getLogin() {
		return this.login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	@Column(name = "PASSWORD", nullable = false, length = 200)
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "DATE_CREATION", nullable = false, length = 0)
	public Date getDateCreation() {
		return this.dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	@Column(name = "TOKEN")
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Column(name = "ACTIF", nullable = false)
	public Boolean isActif() {
		return actif;
	}

	public void setActif(Boolean actif) {
		this.actif = actif;
	}

	@Column(name = "EXPIRE", nullable = false)

	public Boolean isExpire() {
		return expire;
	}

	public void setExpire(Boolean expire) {
		this.expire = expire;
	}

	@Column(name = "Email", nullable = false, length = 100)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "DATE_MODIFICATION_MP", nullable = false, length = 0)
	public Date getDateModificationMotPasse() {
		return dateModificationMotPasse;
	}

	public void setDateModificationMotPasse(Date dateModificationMotPasse) {
		this.dateModificationMotPasse = dateModificationMotPasse;
	}

	@Column(name = "REPORTING", nullable = true)
	public boolean getReporting() {
		return reporting;
	}

	public void setReporting(boolean reporting) {
		this.reporting = reporting;
	}

	@Column(name = "NUMERO_TEL_F", nullable = true)
	public String getNumeroTelF() {
		return numeroTelF;
	}

	public void setNumeroTelF(String numeroTelF) {
		this.numeroTelF = numeroTelF;
	}

	@Column(name = "NUMERO_TEL_P", nullable = true)
	public String getNumeroTelP() {
		return numeroTelP;
	}

	public void setNumeroTelP(String numeroTelP) {
		this.numeroTelP = numeroTelP;
	}

	@Override
	public String toString() {
		return "Utilisateur [profil=" + profil + "]";
	}

}
