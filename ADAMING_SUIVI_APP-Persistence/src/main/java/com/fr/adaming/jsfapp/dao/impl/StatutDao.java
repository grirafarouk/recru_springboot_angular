package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.IStatutDao;
import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.model.Disponibilite;
import com.fr.adaming.jsfapp.model.Statut;

@Repository("statutDao")
public class StatutDao extends ManagerDao<Statut, Long> implements IStatutDao, Serializable {
	/**
	* 
	*/
	private static final long serialVersionUID = 5937262967419436839L;

	{

	}

	@Override
	public Statut rechercherStatusParLibelle(String libelle) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Statut.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "libelle", libelle);

		return (Statut) crit.uniqueResult();
	}

	@Override
	public List<Statut> findAllStatus() {
		String query = "SELECT * FROM statut ";

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Statut> liste = (List<Statut>) st.addEntity(Statut.class).list();
		return liste;
	}

	@Override
	public List<Statut> rechercherStatut(String statut) {
		String query = "SELECT * FROM statut where libelle LIKE '%" + statut + "%'" ;
		@SuppressWarnings("unchecked")
		SQLQuery st = getSession().createSQLQuery(query);
		List<Statut> liste = (List<Statut>) st.addEntity(Statut.class).list();
		return liste;
	}
}
