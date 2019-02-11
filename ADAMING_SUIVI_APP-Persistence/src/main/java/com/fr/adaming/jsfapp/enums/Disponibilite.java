package com.fr.adaming.jsfapp.enums;

public enum Disponibilite {
	DISPONIBLE("Disponible"), EN_POSTE("En poste"), PREAVIS("Préavis"), MESSAGE_VOCAL(
			"message vocal"), PAS_INTERESSE("pas intéressé"), ENVOI_DE_LA_PLAQUETTE(
			"envoi de la plaquette"), EN_ATTENTE_FORMATION(
			"en attente pour une prochaine formation"), MAIL_ENVOYE(
			"mail envoyé"), HORS_CIBLE("hors cible"), DEJA_CHEZ_ADAMING(
			"Déjà chez ADAMING");
	private String label;

	private Disponibilite(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

}