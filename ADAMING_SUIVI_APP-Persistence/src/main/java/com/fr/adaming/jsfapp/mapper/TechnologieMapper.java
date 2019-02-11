package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.TechnologieDto;
import com.fr.adaming.jsfapp.model.Technologie;

@Mapper(uses = { Technologie.class })
public interface TechnologieMapper {
	List<TechnologieDto> technologiesToTechnologieDtos(List<Technologie> technologies);

	List<Technologie> technologieDtosToTechnologies(List<TechnologieDto> technologieDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle"),
			@Mapping(source = "reporting", target = "reporting") })

	TechnologieDto technologieToTechnologieDto(Technologie technologie);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle"),
			@Mapping(source = "reporting", target = "reporting") })

	Technologie technologieDtoToTechnologie(TechnologieDto technologieDto);
}
