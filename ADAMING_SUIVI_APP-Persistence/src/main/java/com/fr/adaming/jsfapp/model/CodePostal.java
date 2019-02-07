package com.fr.adaming.jsfapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "code_postal")
@Proxy(lazy = false)
public class CodePostal implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3531915709348846852L;
	private Long id;
	private Departement departement;
	private String code;
	private String ville;
	private boolean actif;
	private String libelleDepartement;
	private String region;
	private Long idRegion;

	public CodePostal() {
		super();
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

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ID_DEPARTEMENT", nullable = false)
	public Departement getDepartement() {
		return departement;
	}

	public void setDepartement(Departement departement) {
		this.departement = departement;
	}

	@Column(name = "CODE", nullable = false)
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "ACTIF", nullable = false)
	public boolean isActif() {
		return actif;
	}

	public void setActif(boolean actif) {
		this.actif = actif;
	}

	@Column(name = "VILLE", nullable = false)
	public String getVille() {
		return this.ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	@Column(name = "LIBELLE_DEPARTEMENT")
	public String getLibelleDepartement() {
		return libelleDepartement;
	}

	public void setLibelleDepartement(String libelleDepartement) {
		this.libelleDepartement = libelleDepartement;
	}

	@Column(name = "REGION")
	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Column(name = "ID_REGION")
	public Long getIdRegion() {
		return idRegion;
	}

	public void setIdRegion(Long id_region) {
		this.idRegion = id_region;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CodePostal other = (CodePostal) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		else return true;
		return true;
	}
}
