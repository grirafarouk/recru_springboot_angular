package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.ClientSession;


public interface IClientSessionService extends IManagerService<ClientSession, Long> {
	List<ClientSession> rechercherClientSession(String clientSession);

	public ClientSession rechercheClientSessionParLibelle(String libelle);

}
