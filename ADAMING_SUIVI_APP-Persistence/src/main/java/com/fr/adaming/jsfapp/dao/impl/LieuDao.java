package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.ILieuDao;
import com.fr.adaming.jsfapp.model.Lieu;

@Repository("lieuDao")
public class LieuDao extends ManagerDao<Lieu, Long> implements ILieuDao ,Serializable{


	private static final long serialVersionUID = -5552822211530723503L;

	@Override
	public Lieu rechercherLieu(Lieu lieu) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Lieu.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "libelle", lieu.getLibelle());
		DaoUtils.addEqRestrictionIfNotNull(crit, "adresseAdaming", lieu.getAdresseAdaming());
		return (Lieu) crit.uniqueResult();
	}
	
	@Override
	public Lieu rechercherLieuParLibelle(String libelle) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Lieu.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "libelle", libelle);

		return (Lieu) crit.uniqueResult();
	}
	
	@Override
	public Lieu rechercherLieuParAdresse(String libelle) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Lieu.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "adresseAdaming", libelle);

		return (Lieu) crit.uniqueResult();
	}
	
	public List<Lieu> findAllLieux() {
		String query = "SELECT * FROM lieu ";

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Lieu> liste = (List<Lieu>) st.addEntity(Lieu.class).list();

		return liste;
	}
}
