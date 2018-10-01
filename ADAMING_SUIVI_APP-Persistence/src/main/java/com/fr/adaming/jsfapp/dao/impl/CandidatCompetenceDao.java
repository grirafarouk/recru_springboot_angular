package com.fr.adaming.jsfapp.dao.impl;

import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.ICandidatCompetenceDao;
import com.fr.adaming.jsfapp.model.CandidatCompetence;


@Repository("candidatCompetenceDao")
public class CandidatCompetenceDao extends ManagerDao<CandidatCompetence, Long> implements ICandidatCompetenceDao {

}
