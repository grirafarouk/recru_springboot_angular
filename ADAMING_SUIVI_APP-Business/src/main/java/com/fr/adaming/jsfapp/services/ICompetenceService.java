package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.model.Utilisateur;

public interface ICompetenceService extends IManagerService<Competence, Long>{
	 public List<Competence> rechercherCandidatCompetences(long id);
	 List<Competence> findAllCompetence ();
	 Competence findByLibelle(String libelle);
}
