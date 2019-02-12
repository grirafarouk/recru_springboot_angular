package com.fr.adaming.rest.controller.administration;

import java.util.Collection;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

	@GetMapping(path = "/reporting")
	public List<Region> rechercherRegionPourReporting() {
		return regionService.rechercherRegionPourReporting();
	}

	@GetMapping(path = "recherche/{text}")
	public List<Region> rechercherRegion(@PathVariable String text) {
		return regionService.rechercherRegion(text);
	}

	@PostMapping(path = "/update")
	public RegionDto update(@RequestBody RegionDto regionDto) {
		Region region = regionMapper.regionDtoToRegion(regionDto);
		region = regionService.update(region);
		return regionMapper.regionToRegionDto(region);
	}

	@PostMapping(path = "")
	public RegionDto createOrUpdate(@RequestBody RegionDto regionDto) {
		Region region = regionMapper.regionDtoToRegion(regionDto);
		region = regionService.createOrUpdate(region);
		return regionMapper.regionToRegionDto(region);
	}

	@GetMapping(path = "/id/{id}")
	public Region findById(@PathVariable Long id) {
		return regionService.findById(id);
	}

	@GetMapping(path = "")
	public Collection<Region> findAll() {
		return regionService.findAll();
	}

	@DeleteMapping(path = "")
	public void delete(@RequestBody RegionDto regionDto) {
		Region region = regionMapper.regionDtoToRegion(regionDto);
		regionService.delete(region);
	}

	@DeleteMapping(path = "/{ID}")
	public void deleteById(@PathVariable Long id) {
		regionService.deleteById(id);
	}

}
