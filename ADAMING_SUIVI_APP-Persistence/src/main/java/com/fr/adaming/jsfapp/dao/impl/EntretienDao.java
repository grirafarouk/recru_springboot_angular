package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;

import javax.sql.DataSource;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.fr.adaming.jsfapp.dao.IEntretienDao;
import com.fr.adaming.jsfapp.model.Entretien;

@Repository("entretienDao")
public class EntretienDao extends ManagerDao<Entretien, Long> implements IEntretienDao,Serializable {
//	 private SessionFactory sessionFactory;

//	    public void setSessionFactory(SessionFactory sf){
//	        this.sessionFactory = sf;
//	    }
//	    
//	    
//	    public void setDataSource(DataSource dataSource) {
//	       this.dataSource = dataSource;
//	       this.jdbcTemplateObject = new JdbcTemplate(dataSource);
//	    }
//	    public void update(Integer id, Integer age){
//	    	Session session = this.sessionFactory.getCurrentSession();
//		
//			Query query = session.createQuery("update entretien set Disponible=0 ");
//			query.executeUpdate();}
//	       return;
//	    }

	private static final long serialVersionUID = -139561281086987868L;

//	@Override
//	public void updateDisponiblite(String id) {
//		Session session = this.sessionFactory.getCurrentSession();
//        Query query = session.createQuery("update entretien set Disponible=0 where id = :id ");  
//        query.executeUpdate();
//       }
//    

}
