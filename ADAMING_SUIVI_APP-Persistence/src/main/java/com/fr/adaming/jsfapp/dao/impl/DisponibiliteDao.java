package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.IDisponibiliteDao;
import com.fr.adaming.jsfapp.model.Disponibilite;

@Repository("disponibiliteDao")
public class DisponibiliteDao extends ManagerDao<Disponibilite, Long> implements IDisponibiliteDao, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -425724228394290508L;

	/**
	* 
	*/

	{

	}

	@Override
	public Disponibilite rechercherDisponibiliteParLibelle(String libelle) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Disponibilite.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "libelle", libelle);

		return (Disponibilite) crit.uniqueResult();
	}

	@Override
	public List<Disponibilite> findAllDisponibilite() {
		String query = "SELECT * FROM disponibilite ";

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Disponibilite> liste = (List<Disponibilite>) st.addEntity(Disponibilite.class).list();
		return liste;
	}
}
