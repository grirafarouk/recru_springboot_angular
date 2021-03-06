package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.ICompetenceDao;
import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.model.Utilisateur;

@Repository("competenceDao")
public class CompetenceDao extends ManagerDao<Competence, Long> implements
		ICompetenceDao ,Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8438368011428264307L;

	public List<Competence> rechercherCandidatCompetences(long id) {
		String query = "SELECT * FROM competence   WHERE competence.ID IN ( SELECT candidat_competence.COMPETENCE_ID  FROM candidat_competence WHERE candidat_competence.CANDIDAT_ID= :id)";
		SQLQuery st = (SQLQuery) getSession().createSQLQuery(query).setParameter("id", id);

		@SuppressWarnings("unchecked")
		List<Competence> liste = (List<Competence>) st.addEntity(
				Competence.class).list();

		return liste;
	}
	
	public List<Competence> findAllCompetence () {
		String query = "SELECT * FROM competence ";
		
		SQLQuery st = getSession().createSQLQuery(query);

		@SuppressWarnings("unchecked")
		List<Competence> liste = (List<Competence>) st.addEntity(
				Competence.class).list();

		return liste;
	}
	
	@Override
	public Competence findByLibelle(String libelle) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Competence.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "libelle", libelle);

		List<Competence> liste = DaoUtils.castList(Competence.class, crit.list());

		if (CollectionUtils.isNotEmpty(liste) && liste.size() == 1) {
			return liste.get(0);
		}
		return null;

	}

	@Override
	public List<Competence> rechercheCompetence(String competence) {
			String query = "SELECT * FROM competence where libelle LIKE '%" + competence + "%'" ;
			@SuppressWarnings("unchecked")
			SQLQuery st = getSession().createSQLQuery(query);
			List<Competence> liste = (List<Competence>) st.addEntity(Competence.class).list();
			return liste;

		}

	
}
