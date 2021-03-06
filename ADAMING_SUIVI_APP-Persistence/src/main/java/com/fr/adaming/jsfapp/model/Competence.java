package com.fr.adaming.jsfapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "competence")
@Proxy(lazy = false)
public class Competence implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private String libelle;

	public Competence() {

		super();
	}

	public Competence(Long id, String libelle) {
		super();
		this.id = id;
		this.libelle = libelle;
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

}
