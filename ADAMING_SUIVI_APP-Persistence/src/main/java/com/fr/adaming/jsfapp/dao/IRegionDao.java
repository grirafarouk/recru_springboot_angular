package com.fr.adaming.jsfapp.dao;

import java.util.List;

import com.fr.adaming.jsfapp.model.Region;

public interface IRegionDao extends IManagerDao<Region, Long> {

	List<Region> rechercherRegionPourReporting();

	List<Region> rechercherRegion(String text);

}
