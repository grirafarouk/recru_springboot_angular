package com.fr.adaming.jsfapp.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "lieu")
@Proxy(lazy = false)
public class Lieu implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7396150275100274892L;
	private Long id;
	private String libelle;
	private String adresseAdaming;

	public Lieu() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "LIBELLE", nullable = false)
	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
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
		Lieu other = (Lieu) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		else return true;
		return true;
	}

	@Column(name = "ADRESSE_ADAMING", nullable = true)
	public String getAdresseAdaming() {
		return adresseAdaming;
	}

	public void setAdresseAdaming(String adresseAdaming) {
		this.adresseAdaming = adresseAdaming;
	}
}
