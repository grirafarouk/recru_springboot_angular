package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.CodePostal;

public interface ICodePostalService extends IManagerService<CodePostal, Long> {

	List<CodePostal> rechercherCodePostal(String text);

	CodePostal rechercherCodePostalParCodeEtVille(String code, String ville);
   
	List<String> rechercherRegion(String text);
}
