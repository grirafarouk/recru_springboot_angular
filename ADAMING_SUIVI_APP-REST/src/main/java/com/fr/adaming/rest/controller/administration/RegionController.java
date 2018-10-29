package com.fr.adaming.rest.controller.administration;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.CodePostal;
import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.services.IRegionService;

@RestController
@RequestMapping(value = "/region")
@CrossOrigin("*")
public class RegionController {

	@Autowired
	private IRegionService regionService;

	@RequestMapping(value = "/reporting", method = RequestMethod.GET)
	public List<Region> rechercherRegionPourReporting() {
		return regionService.rechercherRegionPourReporting();
	}

	@RequestMapping(value = "recherche/{text}", method = RequestMethod.GET)
	public List<Region> rechercherRegion(@PathVariable String text) {
		return regionService.rechercherRegion(text);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public Region update(@RequestBody Region entity) {
		return regionService.update(entity);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public Region createOrUpdate(@RequestBody Region entity) {
		return regionService.createOrUpdate(entity);
	}

	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public Region findById(@PathVariable Long id) {
		return regionService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Region> findAll() {
		return regionService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody Region entity) {
		regionService.delete(entity);
	}

	@RequestMapping(value = "/{ID}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		regionService.deleteById(id);
	}

}
