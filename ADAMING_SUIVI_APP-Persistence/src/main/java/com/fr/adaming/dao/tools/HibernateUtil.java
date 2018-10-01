package com.fr.adaming.dao.tools;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.ImportResource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;


public class HibernateUtil {

	/*
	 * For test
	 */
	public static int isTest = 0;
	private static Session session;

	@Autowired()
	@Qualifier("sessionFactory")
	public LocalSessionFactoryBean localSessionFactory;

	public Session getSession() {
		if (isTest == 1) {
			return session;
		}
		// return localSessionFactory.getObject().openSession();
		return localSessionFactory.getObject().getCurrentSession();
	}

	/*
	 * For test
	 */

	@SuppressWarnings("static-access")
	public void OpenSession(Session session) {
		this.session = session;
	}

}
