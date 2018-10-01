package com.fr.adaming.jsfapp.enums;

public enum CVSource {

	OUI("OUI"), NON("NON");
	private String label;
	
	private CVSource(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}
	
}
