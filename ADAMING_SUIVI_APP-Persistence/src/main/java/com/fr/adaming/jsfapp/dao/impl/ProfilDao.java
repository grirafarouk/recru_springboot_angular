package com.fr.adaming.jsfapp.dao.impl;
import java.io.Serializable;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.IProfilDao;
import com.fr.adaming.jsfapp.model.Profil;

@Repository("profilDao")
public class ProfilDao extends ManagerDao<Profil, Long> implements IProfilDao, Serializable {
	private static final long serialVersionUID = -4738413226922948317L;

	@Override
	public Profil rechercherProfilParTypeProfil(String libelle) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Profil.class);

		DaoUtils.addEqRestrictionIfNotNull(crit, "typeProfil", libelle);

		return (Profil) crit.uniqueResult();

	}

	@Override
	public List<Profil> findAllProfil() {
		String query = "SELECT * FROM profil ";

		SQLQuery st = getSession().createSQLQuery(query);
		@SuppressWarnings("unchecked")
		List<Profil> liste = (List<Profil>) st.addEntity(Profil.class).list();
		return liste;
	}
}
