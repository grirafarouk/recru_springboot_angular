package com.fr.adaming.jsfapp.enums;

public enum Civilite {
	M("M"), Mme("Mme");
	private String label;

	private Civilite(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

}