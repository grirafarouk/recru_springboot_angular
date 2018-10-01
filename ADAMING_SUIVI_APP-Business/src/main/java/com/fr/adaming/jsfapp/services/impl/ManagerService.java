package com.fr.adaming.jsfapp.services.impl;

import java.io.Serializable;
import java.util.Collection;

import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.services.IManagerService;


@Service("managerService")
public abstract class ManagerService<T, ID extends Serializable> implements IManagerService<T, ID>, Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5566103257929717385L;
	
	
	@Override
	public T create(T entity) {
		return getDao().create(entity);
	}

	@Override
	public T update(T entity) {
		return getDao().update(entity);
	}

	@Override
	public T merge(T entity) {
		return getDao().merge(entity);
	}

	@Override
	public T createOrUpdate(T entity) {
		return getDao().createOrUpdate(entity);
	}

	@Override
	public T findById(ID id) {
		return getDao().findById(id);
	}

	@Override
	public Collection<T> findAll() {
		return getDao().findAll();
	}

	@Override
	public void delete(T entity) {
		getDao().delete(entity);
	}

	@Override
	public void deleteById(ID id) {
		getDao().deleteById(id);
	}

	public abstract IManagerDao<T, ID> getDao();
}
