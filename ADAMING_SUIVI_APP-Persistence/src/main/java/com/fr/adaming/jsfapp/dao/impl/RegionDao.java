package com.fr.adaming.jsfapp.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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

	@Override
	public List<Region> rechercherRegionPourReporting() {
		final Calendar cal = Calendar.getInstance();
		Date dt = new Date();
		Session hibernateSession = this.getSession();
		Criteria crit = hibernateSession.createCriteria(Region.class);

		crit.add(Restrictions.eq("reporting", true));
		List<Region> ref = DaoUtils.castList(Region.class, crit.list());
		Date dt2 = new Date();
		long a = dt2.getTime() - dt.getTime();
		cal.setTimeInMillis(a);
		final int minutes = cal.get(Calendar.MINUTE);
		// and here's how to get the String representation
		final String timeString = new SimpleDateFormat("mm:ss:SSS").format(cal.getTime());
		System.out.println(minutes);
		System.out.println(timeString);
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
