package com.fr.adaming.jsfapp.mapper;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import com.fr.adaming.jsfapp.dto.DisponibiliteDto;
import com.fr.adaming.jsfapp.model.Disponibilite;

@Mapper(uses = { Disponibilite.class })
public interface DisponibiliteMapper {
	List<DisponibiliteDto> DisponibiliteToDisponibiliteDtos(List<Disponibilite> disponibilite);

	List<Disponibilite> DisponibiliteDtosToDisponibilite(List<DisponibiliteDto> disponibiliteDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle")})

	DisponibiliteDto DisponibiliteToDisponibiliteDto(Disponibilite disponibilite);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle")})

	Disponibilite DisponibiliteDtoToDisponibilite(DisponibiliteDto disponibiliteDto);
}
