package com.fr.adaming.jsfapp.enums;

public enum Civilite {
	M("M"), MME("Mme");
	private String label;

	private Civilite(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

}