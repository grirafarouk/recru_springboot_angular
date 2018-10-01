package com.fr.adaming.jsfapp.enums;

public enum Profil {
	ADMINISTRATEUR("Administrateur"),CHARGE("Charge"),SOURCEUR("Sourceur"),COMMERCIAL("Commercial"),DIRECTION("Direction");
	private String label;

	private Profil(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

}