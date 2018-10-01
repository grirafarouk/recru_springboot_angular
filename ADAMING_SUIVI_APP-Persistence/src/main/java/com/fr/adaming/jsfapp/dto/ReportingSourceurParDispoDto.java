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
	
	private BigDecimal taux_hors;

	/**
	 * 
	 */
	public ReportingSourceurParDispoDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param idUser
	 * @param nomSourceur
	 * @param nbrTotal
	 * @param nbrDsipo
	 * @param nbrHors
	 * @param autre
	 * @param taux
	 * @param taux_hors
	 */
	public ReportingSourceurParDispoDto(BigInteger idUser, String nomSourceur,
			BigDecimal nbrTotal, BigDecimal nbrDsipo, BigDecimal nbrHors,
			BigDecimal autre, BigDecimal taux, BigDecimal taux_hors) {
		super();
		this.idUser = idUser;
		this.nomSourceur = nomSourceur;
		this.nbrTotal = nbrTotal;
		this.nbrDsipo = nbrDsipo;
		this.nbrHors = nbrHors;
		this.autre = autre;
		this.taux = taux;
		this.taux_hors = taux_hors;
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



	public BigDecimal getTaux_hors() {
		return taux_hors;
	}



	public void setTaux_hors(BigDecimal taux_hors) {
		this.taux_hors = taux_hors;
	}
	
	
	


}
