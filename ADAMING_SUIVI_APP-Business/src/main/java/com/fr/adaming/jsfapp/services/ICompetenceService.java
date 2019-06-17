package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Competence;

public interface ICompetenceService extends IManagerService<Competence, Long> {
	public List<Competence> rechercherCandidatCompetences(long id);

	List<Competence> findAllCompetence();

	Competence findByLibelle(String libelle);

	List<Competence> rechercheCompetence(String competence);
}
