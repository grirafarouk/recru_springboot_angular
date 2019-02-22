package com.fr.adaming.jsfapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "profil")
@Proxy(lazy = false)
public class Profil {

	private long id;
	private String typeProfil;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	public long getId() {
		return id;
	}

	public Profil() {

		super();

	}

	public Profil(long id, String typeProfil) {
		super();
		this.id = id;
		this.typeProfil = typeProfil;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column(name = "TYPEPROFIL", nullable = false)
	public String getTypeProfil() {
		return typeProfil;
	}

	public void setTypeProfil(String typeProfil) {
		this.typeProfil = typeProfil;
	}

}
