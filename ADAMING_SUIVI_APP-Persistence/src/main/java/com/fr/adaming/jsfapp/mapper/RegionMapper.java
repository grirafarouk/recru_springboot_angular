package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


import com.fr.adaming.jsfapp.dto.RegionDto;
import com.fr.adaming.jsfapp.model.Region;


@Mapper(uses = { Region.class })
public interface RegionMapper {
	List<RegionDto> regionsToRegionDtos(List<Region> regions);

	List<Region> regionDtosToRegions(List<RegionDto> regionDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "code", target = "code"),
			@Mapping(source = "designation", target = "designation"), @Mapping(source = "actif", target = "actif"),
			@Mapping(source = "reporting", target = "reporting") })

	RegionDto regionToRegionDto(Region region);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "code", target = "code"),
			@Mapping(source = "designation", target = "designation"), @Mapping(source = "actif", target = "actif"), 
			@Mapping(source = "reporting", target = "reporting") })

	Region regionDtoToRegion(RegionDto regionDto);
}
