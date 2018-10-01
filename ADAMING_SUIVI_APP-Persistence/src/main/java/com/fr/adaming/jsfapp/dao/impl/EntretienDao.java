package com.fr.adaming.jsfapp.dao.impl;

import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IEntretienDao;
import com.fr.adaming.jsfapp.model.Entretien;

@Repository("entretienDao")
public class EntretienDao extends ManagerDao<Entretien, Long> implements IEntretienDao {

}
