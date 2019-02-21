package com.fr.adaming.jsfapp.dto;

import java.io.Serializable;

public class ProfilDto implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8247403532006781599L;
	private long id;
	private String typeProfil;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTypeProfil() {
		return typeProfil;
	}

	public void setTypeProfil(String typeProfil) {
		this.typeProfil = typeProfil;
	}

}
