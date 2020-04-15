package com.fr.adaming.dao.tools;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

public class HibernateUtil {

	private static int isTest = 0;
	private static Session session;

	@Autowired()
	@Qualifier("sessionFactory")
	public LocalSessionFactoryBean localSessionFactory;

	public Session getSession() {
		if (isTest == 1) {
			return session;
		}

		return localSessionFactory.getObject().getCurrentSession();

	}

}
