package com.fr.adaming.rest.controller.administration;

import java.util.Collection;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.RegionDto;
import com.fr.adaming.jsfapp.mapper.RegionMapper;
import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.services.IRegionService;

@RestController
@RequestMapping(value = "/api/region")
@CrossOrigin("*")
public class RegionController {

	@Autowired
	private IRegionService regionService;

	private RegionMapper regionMapper = Mappers.getMapper(RegionMapper.class);

	@RequestMapping(value = "/reporting", method = RequestMethod.GET)
	public List<Region> rechercherRegionPourReporting() {
		return regionService.rechercherRegionPourReporting();
	}

	@RequestMapping(value = "recherche/{text}", method = RequestMethod.GET)
	public List<Region> rechercherRegion(@PathVariable String text) {
		return regionService.rechercherRegion(text);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public RegionDto update(@RequestBody RegionDto regionDto) {
		Region region = regionMapper.regionDtoToRegion(regionDto);
		region = regionService.update(region);
		return regionMapper.regionToRegionDto(region);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public RegionDto createOrUpdate(@RequestBody RegionDto regionDto) {
		Region region = regionMapper.regionDtoToRegion(regionDto);
		region = regionService.createOrUpdate(region);
		return regionMapper.regionToRegionDto(region);
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
	public void delete(@RequestBody RegionDto regionDto) {
		Region region = regionMapper.regionDtoToRegion(regionDto);
		regionService.delete(region);
	}

	@RequestMapping(value = "/{ID}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable Long id) {
		regionService.deleteById(id);
	}

}
