package com.fr.adaming.jsfapp.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.ITechnologieDao;
import com.fr.adaming.jsfapp.dto.TechnologieDto;
import com.fr.adaming.jsfapp.model.Technologie;

@Repository("technologieDao")
public class TechnologieDao extends ManagerDao<Technologie, Long> implements
		ITechnologieDao {

	@Override
	public Technologie rechercherTechnologieParLibelle(String libelle) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Technologie.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "libelle", libelle);

		return (Technologie) crit.uniqueResult();
	}

	@Override
	public List<Technologie> rechercherTechnologiePourReporting() {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Technologie.class);

		crit.add(Restrictions.eq("reporting", true));
		return DaoUtils.castList(Technologie.class, crit.list());
	}

	@Override
	public List<Technologie> findAllTechnologies() {
		String query = "SELECT * FROM technologie ";

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Technologie> liste = (List<Technologie>) st.addEntity(
				Technologie.class).list();

		return liste;
	}
	
	@Override
	public List<TechnologieDto> findAllTechnologiesByLibelle() {
		String query = "SELECT t.libelle AS nom_techno FROM technologie t";

		SQLQuery st = getSession().createSQLQuery(query);
		List<TechnologieDto> data = new  ArrayList<>();
		@SuppressWarnings("unchecked")
		final List<String> dataObject = (List<String>) st.list();
		if(!dataObject.isEmpty())
		{
			for(String o : dataObject)
			{
				String nom = (String) o;

				data.add(new TechnologieDto(nom));
				
			}
		}
		
		return data;
	}
}
