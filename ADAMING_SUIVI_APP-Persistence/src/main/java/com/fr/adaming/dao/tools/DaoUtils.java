package com.fr.adaming.dao.tools;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import com.fr.adaming.jsfapp.enums.Disponibilite;

public class DaoUtils {

	public static void addEqRestrictionIfNotNull(Criteria crit, String field, String value) {
		if (StringUtils.isNotEmpty(field) && StringUtils.isNotEmpty(value)) {
			crit.add(Restrictions.eq(field, value));
		}

	}

	public static void addEqRestrictionIfNotNull(Criteria crit, String field, Disponibilite value) {
		if (StringUtils.isNotEmpty(field) && value != null) {
			crit.add(Restrictions.eq(field, value));
		}

	}

	public static void addEqRestrictionIfNotNull(Criteria crit, String field, Long value) {
		if (StringUtils.isNotEmpty(field) && value != null) {
			crit.add(Restrictions.eq(field, value));
		}

	}

	public static void addEqRestrictionIfNotNull(Criteria crit, String field, Date value) {
		if (StringUtils.isNotEmpty(field) && value != null) {
			crit.add(Restrictions.eq(field, value));
		}

	}

	public static void addEqRestrictionIfNotNull(Criteria crit, String field, Boolean value) {
		if (StringUtils.isNotEmpty(field) && value != null) {
			crit.add(Restrictions.eq(field, value));
		}

	}

	public static void addLikeRestrictionIfNotNull(Criteria crit, String field, String value) {
		if (StringUtils.isNotEmpty(field) && StringUtils.isNotEmpty(value)) {
			crit.add(Restrictions.like(field, value, MatchMode.ANYWHERE));
		}

	}

	public static void addLikeStartRestrictionIfNotNull(Criteria crit, String field, String value) {
		if (StringUtils.isNotEmpty(field) && StringUtils.isNotEmpty(value)) {
			crit.add(Restrictions.like(field, value, MatchMode.START));
		}

	}

	public static <T> List<T> castList(Class<? extends T> clazz, Collection<?> c) {
		List<T> r = new ArrayList<T>(c.size());
		for (Object o : c)
			r.add(clazz.cast(o));
		return r;
	}
	
	public static Date getDateWithoutTime(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return cal.getTime();
	}
}
