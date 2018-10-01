package com.fr.adaming.jsfapp.enums;

public enum MobiliteSurLille {

	OUI("OUI"), NON("NON"), NON_RENSEIGNEE("NON_RENSEIGNEE");
	private String label;
	
	private MobiliteSurLille(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}
	
}
