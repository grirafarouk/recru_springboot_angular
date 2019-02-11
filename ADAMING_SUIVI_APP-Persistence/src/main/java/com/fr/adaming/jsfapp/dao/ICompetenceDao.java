package com.fr.adaming.jsfapp.dao;

import java.util.List;

import com.fr.adaming.jsfapp.model.Competence;

public interface ICompetenceDao extends IManagerDao<Competence, Long> {
	public List<Competence> rechercherCandidatCompetences(long id);

	List<Competence> findAllCompetence();

	Competence findByLibelle(String libelle);
}
