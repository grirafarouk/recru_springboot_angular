package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.IRoleDao;
import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.model.Role;

@Repository("roleDao")
public class RoleDao extends ManagerDao<Role, Long> implements IRoleDao, Serializable {
	private static final long serialVersionUID = -4738413226922948317L;

	@Override
	public Role rechercherRoleParLibelle(String libelle) {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Role.class);
		DaoUtils.addEqRestrictionIfNotNull(crit, "libelle", libelle);
		return (Role) crit.uniqueResult();
	}

	@Override
	public List<Role> rechercheRole(String role) {
		String query = "SELECT * FROM role where libelle LIKE '%" + role + "%'" ;
		@SuppressWarnings("unchecked")
		SQLQuery st = getSession().createSQLQuery(query);
		List<Role> liste = (List<Role>) st.addEntity(Competence.class).list();
		return liste;
	}
}
