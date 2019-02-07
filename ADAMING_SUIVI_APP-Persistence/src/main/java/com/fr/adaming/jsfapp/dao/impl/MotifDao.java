package com.fr.adaming.jsfapp.dao.impl;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IMotifDao;
import com.fr.adaming.jsfapp.model.Motif;

@Repository("motifDao")
public class MotifDao extends ManagerDao<Motif, Long> implements IMotifDao{

	@Override
	public Motif rechercheMotifParLibelle(String libelle) {
		
		String query = "SELECT *  FROM motif  WHERE   1=1";
		if (libelle != null) {
			query = query + " AND  motif.libelle = :libelle";
		}
		SQLQuery st = (SQLQuery) this.getSession().createSQLQuery(query).setParameter("libelle", libelle);

		Motif motif = (Motif) st.addEntity(Motif.class).uniqueResult();

		return motif;
	}

}
