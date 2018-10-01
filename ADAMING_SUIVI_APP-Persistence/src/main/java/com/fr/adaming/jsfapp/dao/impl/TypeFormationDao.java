package com.fr.adaming.jsfapp.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.ITypeFormationDao;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.TypeFormation;

@Repository("typeFormationDao")
public class TypeFormationDao extends ManagerDao<TypeFormation, Long> implements
		ITypeFormationDao {

	@Override
	public TypeFormation rechercherTypeFormationParLibelle(String libelle) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(TypeFormation.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "libelle", libelle);

		return (TypeFormation) crit.uniqueResult();
	}

	@Override
	public List<TypeFormation> findAllTypesFormation() {
		String query = "SELECT * FROM type_formation ";

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<TypeFormation> liste = (List<TypeFormation>) st.addEntity(
				TypeFormation.class).list();
		return liste;
	}
}
