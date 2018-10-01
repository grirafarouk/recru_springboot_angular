package com.fr.adaming.jsfapp.dao.impl;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IClientSessionDao;
import com.fr.adaming.jsfapp.model.ClientSession;


@Repository("clientSessionDao")
public class ClientSessionDao extends ManagerDao<ClientSession, Long> implements IClientSessionDao{

	@Override
	public ClientSession rechercheClientSessionParLibelle(String libelle) {
		
		String query = "  SELECT *  FROM clientSession  WHERE   1=1     ";
		if (libelle != null) {
			query = query + " AND  clientSession.libelle = '" + libelle + "'";
		}
		SQLQuery st = this.getSession().createSQLQuery(query);

		ClientSession client = (ClientSession) st.addEntity(ClientSession.class).uniqueResult();

		return client;
	}

}
