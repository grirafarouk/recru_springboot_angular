package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;

import javax.sql.DataSource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fr.adaming.jsfapp.model.Entretien;
import com.fr.adaming.jsfapp.model.Statut;
@Repository
public interface IEntretienDao extends  IManagerDao<Entretien, Long>, Serializable{
//	public void updateDisponiblite(String id);
	//public void setDataSource(DataSource ds);
	  // public void update(Integer id, Integer age);

}
