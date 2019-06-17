package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;
import java.util.List;

import com.fr.adaming.jsfapp.model.ClientSession;


public interface IClientSessionDao extends IManagerDao<ClientSession, Long>,Serializable {
	
	public ClientSession rechercheClientSessionParLibelle(String libelle);
	List<ClientSession> rechercherClientSession(String clientSession);


}
