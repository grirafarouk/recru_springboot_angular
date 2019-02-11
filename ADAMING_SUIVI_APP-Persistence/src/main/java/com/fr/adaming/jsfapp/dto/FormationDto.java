package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

import com.fr.adaming.jsfapp.model.Lieu;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.TypeFormation;

public class FormationDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nom;
	private String code;
	private Lieu lieu;
	private TypeFormation typeFormation;
	private Technologie technologie;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Lieu getLieu() {
		return lieu;
	}

	public void setLieu(Lieu lieu) {
		this.lieu = lieu;
	}

	public TypeFormation getTypeFormation() {
		return typeFormation;
	}

	public void setTypeFormation(TypeFormation typeFormation) {
		this.typeFormation = typeFormation;
	}

	public Technologie getTechnologie() {
		return technologie;
	}

	public void setTechnologie(Technologie technologie) {
		this.technologie = technologie;
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
		FormationDto other = (FormationDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
				  return false;
		return true;
	}

}
