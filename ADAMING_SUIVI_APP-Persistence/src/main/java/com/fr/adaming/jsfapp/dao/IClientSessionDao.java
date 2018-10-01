package com.fr.adaming.jsfapp.dao;

import com.fr.adaming.jsfapp.model.ClientSession;


public interface IClientSessionDao extends IManagerDao<ClientSession, Long> {
	
	public ClientSession rechercheClientSessionParLibelle(String libelle);

}
