package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;

public class ReportingSourceurParDispoDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1055919298931903979L;

	private BigInteger idUser;

	private String nomSourceur;

	private BigDecimal nbrTotal;

	private BigDecimal nbrDsipo;

	private BigDecimal nbrHors;

	private BigDecimal autre;

	private BigDecimal taux;

	private BigDecimal tauxHors;

	public ReportingSourceurParDispoDto() {
		super();
	}

	public ReportingSourceurParDispoDto(Builder builder) {
		super();
		this.idUser = builder.idUser;
		this.nomSourceur = builder.nomSourceur;
		this.nbrTotal = builder.nbrTotal;
		this.nbrDsipo = builder.nbrDsipo;
		this.nbrHors = builder.nbrHors;
		this.autre = builder.autre;
		this.taux = builder.taux;
		this.tauxHors = builder.tauxHors;
	}

	public BigInteger getIdUser() {
		return idUser;
	}

	public void setIdUser(BigInteger idUser) {
		this.idUser = idUser;
	}

	public String getNomSourceur() {
		return nomSourceur;
	}

	public void setNomSourceur(String nomSourceur) {
		this.nomSourceur = nomSourceur;
	}

	public BigDecimal getNbrTotal() {
		return nbrTotal;
	}

	public void setNbrTotal(BigDecimal nbrTotal) {
		this.nbrTotal = nbrTotal;
	}

	public BigDecimal getNbrDsipo() {
		return nbrDsipo;
	}

	public void setNbrDsipo(BigDecimal nbrDsipo) {
		this.nbrDsipo = nbrDsipo;
	}

	public BigDecimal getNbrHors() {
		return nbrHors;
	}

	public void setNbrHors(BigDecimal nbrHors) {
		this.nbrHors = nbrHors;
	}

	public BigDecimal getAutre() {
		return autre;
	}

	public void setAutre(BigDecimal autre) {
		this.autre = autre;
	}

	public BigDecimal getTaux() {
		return taux;
	}

	public void setTaux(BigDecimal taux) {
		this.taux = taux;
	}

	public BigDecimal getTauxHors() {
		return tauxHors;
	}

	public void setTauxHors(BigDecimal tauxHors) {
		this.tauxHors = tauxHors;
	}

	public static class Builder {
		private BigInteger idUser;

		private String nomSourceur;

		private BigDecimal nbrTotal;

		private BigDecimal nbrDsipo;

		private BigDecimal nbrHors;

		private BigDecimal autre;

		private BigDecimal taux;

		private BigDecimal tauxHors;

		public Builder() {
		}

		public Builder setIdUser(BigInteger idUser) {
			this.idUser = idUser;
			return this;
		}

		public Builder setNomSourceur(String nomSourceur) {
			this.nomSourceur = nomSourceur;
			return this;
		}

		public Builder setNbrTotal(BigDecimal nbrTotal) {
			this.nbrTotal = nbrTotal;
			return this;
		}

		public Builder setNbrDsipo(BigDecimal nbrDsipo) {
			this.nbrDsipo = nbrDsipo;
			return this;
		}

		public Builder setNbrHors(BigDecimal nbrHors) {
			this.nbrHors = nbrHors;
			return this;
		}

		public Builder setAutre(BigDecimal autre) {
			this.autre = autre;
			return this;
		}

		public Builder setTaux(BigDecimal taux) {
			this.taux = taux;
			return this;
		}

		public Builder setTauxHors(BigDecimal tauxHors) {
			this.tauxHors = tauxHors;
			return this;
		}

		public ReportingSourceurParDispoDto buildReportingSourceurParDispoDto() {
			return new ReportingSourceurParDispoDto(this);
		}
	}

}
