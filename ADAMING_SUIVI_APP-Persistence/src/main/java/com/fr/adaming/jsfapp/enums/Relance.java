package com.fr.adaming.jsfapp.enums;

public enum Relance {
	MOIS("Mois"), PERIODE("Periode");
	private String label;

	private Relance(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

}