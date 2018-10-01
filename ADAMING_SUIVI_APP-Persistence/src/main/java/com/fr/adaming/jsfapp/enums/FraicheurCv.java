package com.fr.adaming.jsfapp.enums;

public enum FraicheurCv {
	MOIN_UN_MOIS("Moins 1 mois"), ENTRE_UN_ET_SIX_MOIS("Entre 1 et 6 mois"), PLUS_DE_DE_SIX_MOIS("Plus de 6 mois");
	private String label;
	
	private FraicheurCv(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
}