package com.fr.adaming.jsfapp.dao.impl;

import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IOrigineDao;
import com.fr.adaming.jsfapp.model.Origine;

@Repository("origineDao")
public class OrigineDao extends ManagerDao<Origine, Long> implements
		IOrigineDao {

	@Override
	public Origine rechercherOrigineParLibelle(String libelle) {
		String query = "  SELECT *  FROM origine  WHERE   1=1     ";
		if (libelle != null) {
			query = query + " AND  origine.libelle = '" + libelle + "'";
		}
		SQLQuery st = this.getSession().createSQLQuery(query);

		Origine origine = (Origine) st.addEntity(Origine.class).uniqueResult();

		return origine;
	}
	@Override
	public List<Origine>findAllOrigines() {
		String query = "  SELECT *  FROM origine ";
		
		SQLQuery st = this.getSession().createSQLQuery(query);

		List<Origine> origine = (List<Origine>) st.addEntity(Origine.class).list();

		return origine;
	}


}
