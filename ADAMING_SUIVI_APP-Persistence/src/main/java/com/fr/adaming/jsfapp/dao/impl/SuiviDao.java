package com.fr.adaming.jsfapp.dao.impl;

import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.ISuiviDao;
import com.fr.adaming.jsfapp.model.Suivi;

@Repository("suiviDao")
public class SuiviDao extends ManagerDao<Suivi, Long> implements ISuiviDao {

}
