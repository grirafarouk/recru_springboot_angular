package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IOrigineDao;
import com.fr.adaming.jsfapp.model.Motif;
import com.fr.adaming.jsfapp.model.Origine;

@Repository("origineDao")
public class OrigineDao extends ManagerDao<Origine, Long> implements IOrigineDao,Serializable {

	
	private static final long serialVersionUID = -1832801984520480939L;

	@Override
	public Origine rechercherOrigineParLibelle(String libelle) {
		String query = "SELECT *  FROM origine  WHERE 1=1";
		if (libelle != null) {
			query = query + " AND  origine.libelle = :libelle";
		}
		SQLQuery st = (SQLQuery) this.getSession().createSQLQuery(query).setParameter("libelle", libelle);

		return (Origine) st.addEntity(Origine.class).uniqueResult();
	}

	@Override
	public List<Origine> findAllOrigines() {
		String query = "  SELECT *  FROM origine ";

		SQLQuery st = this.getSession().createSQLQuery(query);

		return (List<Origine>) st.addEntity(Origine.class).list();
	}

	@Override
	public List<Origine> rechercherOrigine(String orgine) {
		String query = "SELECT * FROM origine where libelle LIKE '%" + orgine + "%'" ;
		@SuppressWarnings("unchecked")
		SQLQuery st = getSession().createSQLQuery(query);
		List<Origine> liste = (List<Origine>) st.addEntity(Origine.class).list();
		return liste;
	}

}
