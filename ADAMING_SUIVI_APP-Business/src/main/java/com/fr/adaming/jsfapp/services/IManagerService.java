package com.fr.adaming.jsfapp.services;

import java.io.Serializable;
import java.util.Collection;

public interface IManagerService<T, Id extends Serializable>  {


	T create(T entity);

	T update(T entity);

	T merge(T entity);

	T createOrUpdate(T entity);

	T findById(Id id);

	Collection<T> findAll();

	void delete(T entity);

	void deleteById(Id id);
	
}
