package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;

public class SessionFormationReportingDto implements Serializable {

	private static final long serialVersionUID = 8909913779116184745L;

	private String nomFormation;
	private String lieuFormation;
	private String typeFormation;
	private String dateDemarrage;
	private BigDecimal candidatAffectation;
	private BigDecimal candidatAcceptation;
	private Integer nombrePlace;
	private BigDecimal tauxAcceptation;
	private BigDecimal tauxRemplissage;
	private BigInteger idSession;
	
	public SessionFormationReportingDto() {
		super();

	}
	

	public SessionFormationReportingDto(String nomFormation, String lieuFormation, String typeFormation,
			String dateDemarrage, BigDecimal candidatAffectation, BigDecimal candidatAcceptation, Integer nombrePlace,
			BigDecimal tauxAcceptation, BigDecimal tauxRemplissage, BigInteger idSession) {
		super();
		this.nomFormation = nomFormation;
		this.lieuFormation = lieuFormation;
		this.typeFormation = typeFormation;
		this.dateDemarrage = dateDemarrage;
		this.candidatAffectation = candidatAffectation;
		this.candidatAcceptation = candidatAcceptation;
		this.nombrePlace = nombrePlace;
		this.tauxAcceptation = tauxAcceptation;
		this.tauxRemplissage = tauxRemplissage;
		this.idSession = idSession;
	}



	public String getNomFormation() {
		return nomFormation;
	}

	public void setNomFormation(String nomFormation) {
		this.nomFormation = nomFormation;
	}

	public String getLieuFormation() {
		return lieuFormation;
	}

	public void setLieuFormation(String lieuFormation) {
		this.lieuFormation = lieuFormation;
	}

	public String getTypeFormation() {
		return typeFormation;
	}

	public void setTypeFormation(String typeFormation) {
		this.typeFormation = typeFormation;
	}

	public String getDateDemarrage() {
		return dateDemarrage;
	}

	public void setDateDemarrage(String dateDemarrage) {
		this.dateDemarrage = dateDemarrage;
	}

	public BigDecimal getCandidatAffectation() {
		return candidatAffectation;
	}

	public void setCandidatAffectation(BigDecimal candidatAffectation) {
		this.candidatAffectation = candidatAffectation;
	}

	public BigDecimal getCandidatAcceptation() {
		return candidatAcceptation;
	}

	public void setCandidatAcceptation(BigDecimal candidatAcceptation) {
		this.candidatAcceptation = candidatAcceptation;
	}

	public Integer getNombrePlace() {
		return nombrePlace;
	}

	public void setNombrePlace(Integer nombrePlace) {
		this.nombrePlace = nombrePlace;
	}

	public BigDecimal getTauxAcceptation() {
		return tauxAcceptation;
	}

	public void setTauxAcceptation(BigDecimal tauxAcceptation) {
		this.tauxAcceptation = tauxAcceptation;
	}

	public BigDecimal getTauxRemplissage() {
		return tauxRemplissage;
	}

	public void setTauxRemplissage(BigDecimal tauxRemplissage) {
		this.tauxRemplissage = tauxRemplissage;
	}

	public BigInteger getIdSession() {
		return idSession;
	}


	public void setIdSession(BigInteger idSession) {
		this.idSession = idSession;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}