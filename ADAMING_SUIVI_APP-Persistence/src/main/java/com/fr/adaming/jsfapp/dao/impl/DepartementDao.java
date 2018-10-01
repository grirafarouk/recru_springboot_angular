package com.fr.adaming.jsfapp.dao.impl;

import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IDepartementDao;
import com.fr.adaming.jsfapp.model.Departement;

@Repository("departementDao")
public class DepartementDao extends ManagerDao<Departement, Long> implements IDepartementDao {

}
