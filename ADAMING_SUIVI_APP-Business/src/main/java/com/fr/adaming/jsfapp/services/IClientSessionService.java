package com.fr.adaming.jsfapp.services;

import com.fr.adaming.jsfapp.model.ClientSession;


public interface IClientSessionService extends IManagerService<ClientSession, Long> {
	
	public ClientSession rechercheClientSessionParLibelle(String libelle);

}
