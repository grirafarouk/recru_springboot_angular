package com.fr.adaming.jsfapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "region")
@Proxy(lazy = false)
public class Region implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3564667234044147665L;

	private Long id;
	private String code;
	private String designation;
	private boolean actif;
	private boolean reporting;

	public Region() {
	}

	public Region(Long id, String code, String designation, boolean actif) {
		super();
		this.id = id;
		this.code = code;
		this.designation = designation;
		this.actif = actif;
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

	@Column(name = "CODE", nullable = false)
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "DESIGNATION", nullable = false)
	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	@Column(name = "ACTIF", nullable = false)
	public boolean getActif() {
		return actif;
	}

	public void setActif(boolean actif) {
		this.actif = actif;
	}

	@Column(name = "REPORTING", nullable = true)
	public boolean getReporting() {
		return reporting;
	}

	public void setReporting(boolean reporting) {
		this.reporting = reporting;
	}

	@Override
	public String toString() {
		return code;
	}

}
