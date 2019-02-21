package com.fr.adaming.jsfapp.dao.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collection;

import org.springframework.stereotype.Repository;

import com.fr.adaming.dao.tools.HibernateUtil;
import com.fr.adaming.jsfapp.dao.IManagerDao;

@Repository("managerDao")
public abstract class ManagerDao<T, K extends Serializable> extends HibernateUtil
		implements IManagerDao<T, K>,Serializable{

	private static final long serialVersionUID = -7987645081089471537L;
	private Class<T> persistentClass;

	/**
	 * Default constructor of the GenericPlainHibernateDao class
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ManagerDao() {
		Type class1 = getClass();
		while (!(class1 instanceof ParameterizedType) && class1 != null) {
			class1 = ((Class) class1).getGenericSuperclass();
		}
		if (class1 != null) {
			this.persistentClass = (Class<T>) ((ParameterizedType) class1).getActualTypeArguments()[0];
		}
	}

	/**
	 * getPersistentClass() method
	 * 
	 * @return {@link Class}
	 */
	public Class<T> getPersistentClass() {
		return persistentClass;
	}

	/**
	 * create method implementation
	 * 
	 * @see com.inetpsa.fwk.v3.dao.GenericDao#create(java.lang.Object)
	 * @inheritDoc {@inheritDoc}
	 */
	public T create(T entity) {
		this.getSession().save(entity);
		if (refreshWhenCreateOrUpdate())
			this.getSession().refresh(entity);

		return entity;
	}

	/**
	 * createOrUpdate method implementation
	 * 
	 * @see com.inetpsa.fwk.v3.dao.GenericDao#createOrUpdate(java.lang.Object)
	 * @inheritDoc {@inheritDoc}
	 */
	public T createOrUpdate(T entity) {
		this.getSession().saveOrUpdate(entity);
		if (refreshWhenCreateOrUpdate())
			this.getSession().refresh(entity);

		return entity;
	}

	/**
	 * update method implementation
	 * 
	 * @see com.inetpsa.fwk.v3.dao.GenericDao#update(java.lang.Object)
	 * @inheritDoc {@inheritDoc}
	 */
	public T update(T entity) {
		this.getSession().update(entity);
		if (refreshWhenCreateOrUpdate())
			this.getSession().refresh(entity);

		return entity;
	}

	public T merge(T entity) {
		this.getSession().merge(entity);
		if (refreshWhenCreateOrUpdate())
			this.getSession().refresh(entity);

		return entity;
	}

	/**
	 * delete method implementation
	 * 
	 * @see com.inetpsa.fwk.v3.dao.GenericDao#delete(java.lang.Object)
	 * @inheritDoc {@inheritDoc}
	 */
	public void delete(T entity) {
		this.getSession().delete(entity);
	}

	/**
	 * deleteById method implementation
	 * 
	 * @see com.inetpsa.fwk.v3.dao.GenericDao#deleteById(java.io.Serializable)
	 * @inheritDoc {@inheritDoc}
	 */
	public void deleteById(K id) {
		T entity = findById(id);
		this.getSession().delete(entity);
	}

	/**
	 * findAll method implementation
	 * 
	 * @see com.inetpsa.fwk.v3.dao.GenericDao#findAll()
	 * @inheritDoc {@inheritDoc}
	 */
	@SuppressWarnings("unchecked")
	public Collection<T> findAll() {
		return this.getSession().createCriteria(getPersistentClass()).list();
	}

	/**
	 * findById method implementation
	 * 
	 * @see com.inetpsa.fwk.v3.dao.GenericDao#findById(java.io.Serializable)
	 * @inheritDoc {@inheritDoc}
	 */
	@SuppressWarnings("unchecked")
	public T findById(K id) {
		return (T) this.getSession().load(getPersistentClass(), id);
	}

	/**
	 * Indicates if a create or an update has to followed by a session refresh.
	 * 
	 * @return boolean
	 */
	protected boolean refreshWhenCreateOrUpdate() {
		return false;
	}

}
