package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IClientSessionDao;
import com.fr.adaming.jsfapp.model.ClientSession;
import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.model.Role;

@Repository("clientSessionDao")
public class ClientSessionDao extends ManagerDao<ClientSession, Long> implements IClientSessionDao,Serializable {

	private static final long serialVersionUID = 8907123948551527295L;

	@Override
	public ClientSession rechercheClientSessionParLibelle(String libelle) {

		String query = "  SELECT *  FROM clientSession  WHERE   1=1 AND  clientSession.libelle = :libelle";
		SQLQuery st = (SQLQuery) this.getSession().createSQLQuery(query).setParameter("libelle", libelle != null);

		return (ClientSession) st.addEntity(ClientSession.class).uniqueResult();

	}

	@Override
	public List<ClientSession> rechercherClientSession(String clientSession) {
		String query = "SELECT * FROM clientsession where libelle LIKE '%" + clientSession + "%'" ;
		@SuppressWarnings("unchecked")
		SQLQuery st = getSession().createSQLQuery(query);
		List<ClientSession> liste = (List<ClientSession>) st.addEntity(ClientSession.class).list();
		return liste;
	}

}
