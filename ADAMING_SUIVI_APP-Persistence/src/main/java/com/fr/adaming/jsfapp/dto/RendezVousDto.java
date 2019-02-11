package com.fr.adaming.jsfapp.dto;

import java.util.Date;

public class RendezVousDto {

	private Long id;
	private String titre;
	private UtilisateurDto utilisateur;
	private CandidatDto candidat;
	private Date dateRendezVous;

	public RendezVousDto() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UtilisateurDto getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(UtilisateurDto utilisateur) {
		this.utilisateur = utilisateur;
	}

	public CandidatDto getCandidat() {
		return candidat;
	}

	public void setCandidat(CandidatDto candidat) {
		this.candidat = candidat;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public Date getDateRendezVous() {
		return dateRendezVous;
	}

	public void setDateRendezVous(Date dateRendezVous) {
		this.dateRendezVous = dateRendezVous;
	}

}
