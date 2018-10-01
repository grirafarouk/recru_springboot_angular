package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Region;

public interface IRegionService extends IManagerService<Region, Long> {

	List<Region> rechercherRegionPourReporting();

	List<Region> rechercherRegion(String text);

}
