package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;

import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IDepartementDao;
import com.fr.adaming.jsfapp.model.Departement;

@Repository("departementDao")
public class DepartementDao extends ManagerDao<Departement, Long> implements IDepartementDao ,Serializable{

	
	private static final long serialVersionUID = 1787793861310622081L;

}
