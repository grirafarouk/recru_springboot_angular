package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;

public class ReportingChargeRelanceDto implements Serializable{
	
	private static final long serialVersionUID = 1055919298931903979L;
	private String nomCharge;
	private BigDecimal nombreCvRelance;
	private BigInteger idUser;
	/**
	 * 
	 */
	public ReportingChargeRelanceDto() {
		super();
	
	}
	/**
	 * 
	 */
	/**
	 * @param nomCharge
	 * @param nombreCvRelance
	 * @param idUser
	 */
	public ReportingChargeRelanceDto(String nomCharge,
			BigDecimal nombreCvRelance, BigInteger idUser) {
		super();
		this.nomCharge = nomCharge;
		this.nombreCvRelance = nombreCvRelance;
		this.idUser = idUser;
	}
	/**
	 * 
	 */
	public String getNomCharge() {
		return nomCharge;
	}
	public void setNomCharge(String nomCharge) {
		this.nomCharge = nomCharge;
	}
	public BigDecimal getNombreCvRelance() {
		return nombreCvRelance;
	}
	public void setNombreCvRelance(BigDecimal nombreCvRelance) {
		this.nombreCvRelance = nombreCvRelance;
	}
	public BigInteger getIdUser() {
		return idUser;
	}
	public void setIdUser(BigInteger idUser) {
		this.idUser = idUser;
	}
	
	
}
