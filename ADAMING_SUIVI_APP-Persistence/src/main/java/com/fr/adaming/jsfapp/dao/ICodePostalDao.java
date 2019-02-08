package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import com.fr.adaming.jsfapp.model.CodePostal;

public interface ICodePostalDao extends IManagerDao<CodePostal, Long> , Serializable {

	List<CodePostal> rechercherCodePostal(String text);

	CodePostal rechercherCodePostalParCodeEtVille(String code, String ville);

	List<String> rechercherRegion(String region);
}
