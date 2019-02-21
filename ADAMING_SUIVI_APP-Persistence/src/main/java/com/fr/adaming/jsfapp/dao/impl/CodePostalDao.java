package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.ICodePostalDao;
import com.fr.adaming.jsfapp.model.CodePostal;

@Repository("codePostalDao")
public class CodePostalDao extends ManagerDao<CodePostal, Long> implements
		ICodePostalDao,Serializable {


	private static final long serialVersionUID = 602784068384628060L;

	@Override
	public List<CodePostal> rechercherCodePostal(String text) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(CodePostal.class);

		DaoUtils.addLikeStartRestrictionIfNotNull(crit, "code", text);
		crit.setMaxResults(10);

		return DaoUtils.castList(CodePostal.class, crit.list());
	}

	@Override
	public CodePostal rechercherCodePostalParCodeEtVille(String code,
			String ville) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(CodePostal.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "code", code);
		DaoUtils.addEqRestrictionIfNotNull(crit, "ville", ville);

		return (CodePostal) crit.uniqueResult();
	}

	@Override
	public List<String> rechercherRegion(String region) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(CodePostal.class);
		return DaoUtils.castList(String.class,crit.setProjection(
				Projections.projectionList().add(
						Projections.distinct(Projections.property("region"))))
				.list());

	}
}
