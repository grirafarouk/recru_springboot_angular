package com.fr.adaming.jsfapp.enums;

public enum Profil {
	ADMINISTRATEUR("Administrateur"),CHARGE("Charge"),SOURCEUR("Sourceur"),COMMERCIAL("Commercial"),DIRECTION("Direction"),PROFILSPECIAL("Profil spécial");
	private String label;

	private Profil(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

}