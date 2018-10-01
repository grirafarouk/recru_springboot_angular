package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IRegionDao;
import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.services.IRegionService;

@Service("regionService")
public class RegionService extends ManagerService<Region, Long> implements IRegionService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8250035448282687024L;

	@Autowired()
	@Qualifier("regionDao")
	private IRegionDao regionDao;

	@Override
	public IManagerDao<Region, Long> getDao() {
		return regionDao;
	}

	@Override
	public List<Region> rechercherRegionPourReporting() {
		return regionDao.rechercherRegionPourReporting();
	}

	@Override
	public List<Region> rechercherRegion(String text) {
		return regionDao.rechercherRegion(text);
	}

}
