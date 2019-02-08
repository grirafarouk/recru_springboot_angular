package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.OrigineDto;
import com.fr.adaming.jsfapp.model.Origine;

@Mapper(uses = { Origine.class })
public interface OrigineMapper {
	List<OrigineDto> originesToOrigineDtos(List<Origine> origines);

	List<Origine> origineDtosToOrigines(List<OrigineDto> origineDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	OrigineDto origineToOrigineDto(Origine origine);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	Origine origineDtoToOrigine(OrigineDto origineDto);
}
