package com.fr.adaming.jsfapp.dao.impl;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IMotifDao;
import com.fr.adaming.jsfapp.model.Motif;

@Repository("motifDao")
public class MotifDao extends ManagerDao<Motif, Long> implements IMotifDao{

	private static final long serialVersionUID = -1900986981797983836L;

	@Override
	public Motif rechercheMotifParLibelle(String libelle) {
		
		String query = "SELECT *  FROM motif  WHERE   1=1";
		if (libelle != null) {
			query = query + " AND  motif.libelle = :libelle";
		}
		SQLQuery st = (SQLQuery) this.getSession().createSQLQuery(query).setParameter("libelle", libelle);
		return (Motif) st.addEntity(Motif.class).uniqueResult();
	}

}
