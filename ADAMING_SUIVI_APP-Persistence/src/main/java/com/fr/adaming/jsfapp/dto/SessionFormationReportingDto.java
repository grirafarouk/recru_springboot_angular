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

	public SessionFormationReportingDto(Builder builder) {
		super();
		this.nomFormation = builder.nomFormation;
		this.lieuFormation = builder.lieuFormation;
		this.typeFormation = builder.typeFormation;
		this.dateDemarrage = builder.dateDemarrage;
		this.candidatAffectation = builder.candidatAffectation;
		this.candidatAcceptation = builder.candidatAcceptation;
		this.nombrePlace = builder.nombrePlace;
		this.tauxAcceptation = builder.tauxAcceptation;
		this.tauxRemplissage = builder.tauxRemplissage;
		this.idSession = builder.idSession;
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

	public static class Builder {
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

		public Builder() {
		}

		public Builder setNomFormation(String nomFormation) {
			this.nomFormation = nomFormation;
			return this;
		}

		public Builder setLieuFormation(String lieuFormation) {
			this.lieuFormation = lieuFormation;
			return this;
		}

		public Builder setTypeFormation(String typeFormation) {
			this.typeFormation = typeFormation;
			return this;
		}

		public Builder setDateDemarrage(String dateDemarrage) {
			this.dateDemarrage = dateDemarrage;
			return this;
		}

		public Builder setCandidatAffectation(BigDecimal candidatAffectation) {
			this.candidatAffectation = candidatAffectation;
			return this;
		}

		public Builder setCandidatAcceptation(BigDecimal candidatAcceptation) {
			this.candidatAcceptation = candidatAcceptation;
			return this;
		}

		public Builder setNombrePlace(Integer nombrePlace) {
			this.nombrePlace = nombrePlace;
			return this;
		}

		public Builder setTauxAcceptation(BigDecimal tauxAcceptation) {
			this.tauxAcceptation = tauxAcceptation;
			return this;
		}

		public Builder setTauxRemplissage(BigDecimal tauxRemplissage) {
			this.tauxRemplissage = tauxRemplissage;
			return this;
		}

		public Builder setIdSession(BigInteger idSession) {
			this.idSession = idSession;
			return this;
		}

		public SessionFormationReportingDto buildSessionFormationReportingDto() {
			return new SessionFormationReportingDto(this);
		}
	}

}