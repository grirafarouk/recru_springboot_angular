package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.util.Date;

import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.Utilisateur;

public class SyntheseCandidatDto implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long totalCandidat;
	private String region;
	private Utilisateur creePar;
	private Technologie technologie;
	private Date dateInscription;
	private Boolean treated;

	
	public SyntheseCandidatDto() {
		super();
	}
	

	public SyntheseCandidatDto(Long totalCandidat, String region, Utilisateur creePar, Technologie technologie,
			Date dateInscription, Boolean treated) {
		super();
		this.totalCandidat = totalCandidat;
		this.region = region;
		this.creePar = creePar;
		this.technologie = technologie;
		this.dateInscription = dateInscription;
		this.treated = treated;
	}


	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public Utilisateur getCreePar() {
		return creePar;
	}

	public void setCreePar(Utilisateur creePar) {
		this.creePar = creePar;
	}

	public Technologie getTechnologie() {
		return technologie;
	}

	public void setTechnologie(Technologie technologie) {
		this.technologie = technologie;
	}

	public Long getTotalCandidat() {
		return totalCandidat;
	}

	public void setTotalCandidat(Long totalCandidat) {
		this.totalCandidat = totalCandidat;
	}

	public Date getDateInscription() {
		return dateInscription;
	}

	public void setDateInscription(Date dateInscription) {
		this.dateInscription = dateInscription;
	}

	public Boolean getTreated() {
		return treated;
	}

	public void setTreated(Boolean treated) {
		this.treated = treated;
	}

}
