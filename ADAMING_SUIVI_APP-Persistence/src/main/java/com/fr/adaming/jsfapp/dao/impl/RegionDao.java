package com.fr.adaming.jsfapp.dao.impl;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.DaoUtils;
import com.fr.adaming.jsfapp.dao.IRegionDao;
import com.fr.adaming.jsfapp.model.Region;

@Repository("regionDao")
public class RegionDao extends ManagerDao<Region, Long> implements IRegionDao {

	private static final long serialVersionUID = 7444035908063684921L;

	@Override
	public List<Region> rechercherRegionPourReporting() {
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Region.class);
		crit.add(Restrictions.eq("reporting", true));
		List<Region> ref = DaoUtils.castList(Region.class, crit.list());
		return ref;

	}

	@Override
	public List<Region> rechercherRegion(String text) {

		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Region.class);

		DaoUtils.addLikeStartRestrictionIfNotNull(crit, "code", text);
		crit.setMaxResults(10);

		return DaoUtils.castList(Region.class, crit.list());
	}

}
