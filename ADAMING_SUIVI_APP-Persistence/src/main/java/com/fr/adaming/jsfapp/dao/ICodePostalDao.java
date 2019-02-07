package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.model.CodePostal;

public interface ICodePostalDao extends IManagerDao<CodePostal, Long> , Serializable {

	List<CodePostal> rechercherCodePostal(String text);

	CodePostal rechercherCodePostalParCodeEtVille(String code, String ville);

    List<String> rechercherRegion(String region);
}
