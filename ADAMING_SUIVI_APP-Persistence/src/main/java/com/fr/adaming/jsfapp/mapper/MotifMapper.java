package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.MotifDto;
import com.fr.adaming.jsfapp.model.Motif;

@Mapper(uses = { Motif.class })
public interface MotifMapper {
	List<MotifDto> motifsToMotifDtos(List<Motif> motifs);

	List<Motif> motifDtosToMotifs(List<MotifDto> motifDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	MotifDto motifToMotifDto(Motif motif);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	Motif motifDtoToMotif(MotifDto motifDto);

}
