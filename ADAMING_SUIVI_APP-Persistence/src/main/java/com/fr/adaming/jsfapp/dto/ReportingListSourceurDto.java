package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.math.BigInteger;

public class ReportingListSourceurDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1055919298931903979L;

	private BigInteger idUser;
	private String nomSourceur;

	/**
	 * 
	 */
	public ReportingListSourceurDto() {
		super();
	}

	/**
	 * @param idUser
	 * @param nomSourceur
	 */
	public ReportingListSourceurDto(BigInteger idUser, String nomSourceur) {
		super();
		this.idUser = idUser;
		this.nomSourceur = nomSourceur;
	}

	public String getNomSourceur() {
		return nomSourceur;
	}

	public void setNomSourceur(String nomSourceur) {
		this.nomSourceur = nomSourceur;
	}

	public BigInteger getIdUser() {
		return idUser;
	}

	public void setIdUser(BigInteger idUser) {
		this.idUser = idUser;
	}

}
