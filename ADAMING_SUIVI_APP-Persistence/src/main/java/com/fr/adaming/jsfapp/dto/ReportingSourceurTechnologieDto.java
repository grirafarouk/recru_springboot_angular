package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;

public class ReportingSourceurTechnologieDto implements Serializable  {
	
	private static final long serialVersionUID = 1055919298931903979L;
	
	
	private String nom;

	private BigDecimal nbrCvMainframe;
	
	private BigDecimal nbrCvMainframePlus;
	
	private BigDecimal nbrCvNtic;
	
	private BigDecimal autreTechnologie;
	
	private BigInteger  total;
	
	public  ReportingSourceurTechnologieDto()
	{
		super();
	}
	

	public ReportingSourceurTechnologieDto(String nom,
			BigDecimal nbrCvMainframe, BigDecimal nbrCvMainframePlus,
			BigDecimal nbrCvNtic, BigDecimal autreTechnologie, BigInteger  total) {
		super();
		this.nom = nom;
		this.nbrCvMainframe = nbrCvMainframe;
		this.nbrCvMainframePlus = nbrCvMainframePlus;
		this.nbrCvNtic = nbrCvNtic;
		this.autreTechnologie = autreTechnologie;
		this.total = total;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public BigDecimal getNbrCvMainframe() {
		return nbrCvMainframe;
	}

	public void setNbrCvMainframe(BigDecimal nbrCvMainframe) {
		this.nbrCvMainframe = nbrCvMainframe;
	}

	public BigDecimal getNbrCvMainframePlus() {
		return nbrCvMainframePlus;
	}

	public void setNbrCvMainframePlus(BigDecimal nbrCvMainframePlus) {
		this.nbrCvMainframePlus = nbrCvMainframePlus;
	}

	public BigDecimal getNbrCvNtic() {
		return nbrCvNtic;
	}

	public void setNbrCvNtic(BigDecimal nbrCvNtic) {
		this.nbrCvNtic = nbrCvNtic;
	}

	public BigDecimal getAutreTechnologie() {
		return autreTechnologie;
	}

	public void setAutreTechnologie(BigDecimal autreTechnologie) {
		this.autreTechnologie = autreTechnologie;
	}

	public BigInteger  getTotal() {
		return total;
	}

	public void setTotal(BigInteger  total) {
		this.total = total;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
	
}