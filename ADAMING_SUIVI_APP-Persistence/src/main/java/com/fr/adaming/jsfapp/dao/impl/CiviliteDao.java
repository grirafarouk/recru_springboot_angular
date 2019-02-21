package com.fr.adaming.jsfapp.dao.impl;

import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.ICiviliteDao;
import com.fr.adaming.jsfapp.model.Civilite;

@Repository("civiliteDao")
public class CiviliteDao extends ManagerDao<Civilite, Long> implements ICiviliteDao {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1735275018669321505L;

}
