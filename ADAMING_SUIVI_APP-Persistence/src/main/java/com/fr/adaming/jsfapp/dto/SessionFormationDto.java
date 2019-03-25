package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.persistence.Transient;

import com.fr.adaming.jsfapp.model.ClientSession;
import com.fr.adaming.jsfapp.model.Formation;

public class SessionFormationDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Date dateDemarrage;
	private Date dateFin;
	private Formation formation;
	private String itemLabel;
	private String dateDem;
	private Boolean fActif;
	private Integer  nombrePlace;
	private ClientSession client;

	public Integer getNombrePlace() {
		return nombrePlace;
	}

	public void setNombrePlace(Integer nombrePlace) {
		this.nombrePlace = nombrePlace;
	}

	public ClientSession getClient() {
		return client;
	}

	public void setClient(ClientSession client) {
		this.client = client;
	}

	public SessionFormationDto() {
		super();

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDateDemarrage() {
		return dateDemarrage;
	}

	public void setDateDemarrage(Date dateDemarrage) {
		this.dateDemarrage = dateDemarrage;
	}

	public Formation getFormation() {
		return formation;
	}

	public void setFormation(Formation formation) {
		this.formation = formation;
	}

	public String getItemLabel() {
		return itemLabel;
	}

	public void setItemLabel(String itemLabel) {
		this.itemLabel = itemLabel;
	}

	public void populateItemLabel() {
		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		this.itemLabel = formation.getCode() + " " + format.format(dateDemarrage);
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	@Transient
	public String getDateDem() {
		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		if (dateDemarrage != null) {
			dateDem = format.format(dateDemarrage);
		}
		return dateDem;
	}

	@Transient
	public void setDateDem(String dateDem) {
		this.dateDem = dateDem;
	}

	public Boolean getfActif() {
		return fActif;
	}

	public void setfActif(Boolean fActif) {
		this.fActif = fActif;
	}

}
