package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;

public class SessionFormationReportingDto implements Serializable  {
	
	private static final long serialVersionUID = 1055919298931903979L;
	
	
	private String nom_Formation;
	private String lieu_Formation;
	private String type_Formation;
	private String date_demarrage;
	private BigDecimal candidat_affectation;
	private BigDecimal candidat_acceptation;
	private Integer nombre_place;
	private BigDecimal taux_acceptation;
	private BigDecimal taux_remplissage;
	private BigInteger idSession;
	

	/**
	 * 
	 */
	public SessionFormationReportingDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	


	/**
	 * @param nom_Formation
	 * @param lieu_Formation
	 * @param type_Formation
	 * @param date_demarrage
	 * @param candidat_affectation
	 * @param candidat_acceptation
	 * @param nombre_place
	 * @param taux_acceptation
	 * @param taux_remplissage
	 * @param idSession
	 */
	public SessionFormationReportingDto(String nom_Formation,
			String lieu_Formation, String type_Formation,
			String date_demarrage, BigDecimal candidat_affectation,
			BigDecimal candidat_acceptation, Integer nombre_place,
			BigDecimal taux_acceptation, BigDecimal taux_remplissage,
			BigInteger idSession) {
		super();
		this.nom_Formation = nom_Formation;
		this.lieu_Formation = lieu_Formation;
		this.type_Formation = type_Formation;
		this.date_demarrage = date_demarrage;
		this.candidat_affectation = candidat_affectation;
		this.candidat_acceptation = candidat_acceptation;
		this.nombre_place = nombre_place;
		this.taux_acceptation = taux_acceptation;
		this.taux_remplissage = taux_remplissage;
		this.idSession = idSession;
	}



	public String getNom_Formation() {
		return nom_Formation;
	}
	public void setNom_Formation(String nom_Formation) {
		this.nom_Formation = nom_Formation;
	}

	public String getLieu_Formation() {
		return lieu_Formation;
	}
	public void setLieu_Formation(String lieu_Formation) {
		this.lieu_Formation = lieu_Formation;
	}

	public String getType_Formation() {
		return type_Formation;
	}

	public void setType_Formation(String type_Formation) {
		this.type_Formation = type_Formation;
	}

	public String getDate_demarrage() {
		return date_demarrage;
	}
	public void setDate_demarrage(String date_demarrage) {
		this.date_demarrage = date_demarrage;
	}
	public BigDecimal getCandidat_affectation() {
		return candidat_affectation;
	}

	public void setCandidat_affectation(BigDecimal candidat_affectation) {
		this.candidat_affectation = candidat_affectation;
	}

	public BigDecimal getCandidat_acceptation() {
		return candidat_acceptation;
	}

	public void setCandidat_acceptation(BigDecimal candidat_acceptation) {
		this.candidat_acceptation = candidat_acceptation;
	}

	public Integer getNombre_place() {
		return nombre_place;
	}

	public void setNombre_place(Integer nombre_place) {
		this.nombre_place = nombre_place;
	}
	

	public BigDecimal getTaux_acceptation() {
		return taux_acceptation;
	}
	public void setTaux_acceptation(BigDecimal taux_acceptation) {
		this.taux_acceptation = taux_acceptation;
	}
	public BigDecimal getTaux_remplissage() {
		return taux_remplissage;
	}

	public void setTaux_remplissage(BigDecimal taux_remplissage) {
		this.taux_remplissage = taux_remplissage;
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