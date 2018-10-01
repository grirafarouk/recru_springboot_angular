package com.fr.adaming.jsfapp.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "session_formation")
@Proxy(lazy = false)
public class SessionFormation implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 
	 */
	private Long id;
	private Date dateDemarrage;
	private Date dateFin;
	private Formation formation;
	private Boolean FActif;
	private Integer nombrePlace;
	private ClientSession client;

	public SessionFormation() {

	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "DATE_DEMARRAGE", nullable = false)
	public Date getDateDemarrage() {
		return dateDemarrage;
	}

	public void setDateDemarrage(Date dateDemarrage) {
		this.dateDemarrage = dateDemarrage;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "FORMATION", nullable = true)
	public Formation getFormation() {
		return formation;
	}

	public void setFormation(Formation formation) {
		this.formation = formation;
	}

	@Column(name = "DATE_FIN", nullable = true)
	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	@Column(name = "F_Actif", nullable = false)
	public Boolean getFActif() {
		return FActif;
	}

	public void setFActif(Boolean fActif) {
		FActif = fActif;
	}
	@Column(name = "Nombre_Place", nullable = false)
	public Integer getNombrePlace() {
		return nombrePlace;
	}

	public void setNombrePlace(Integer nombrePlace) {
		this.nombrePlace = nombrePlace;
	}
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "Client", nullable = true)
	public ClientSession getClient() {
		return client;
	}

	public void setClient(ClientSession client) {
		this.client = client;
	}
}
