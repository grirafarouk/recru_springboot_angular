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
@Table(name = "role")
@Proxy(lazy = false)
public class Role implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4574342240531736454L;
	private long id;
	private String libelle;
	public Role() {
		super();
	}

	public Role(int id, String libelle) {
		super();
		this.id = id;
		this.libelle = libelle;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	public long getId() {
		return id;
	}

	public void setId(long id) {
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
	public String toString() {
		return "Role [id=" + id + ", libelle=" + libelle + "]";
	}

}
