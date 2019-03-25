package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.SessionFormationDto;
import com.fr.adaming.jsfapp.model.SessionFormation;

@Mapper
public interface SessionFormationMapper {
	List<SessionFormationDto> sessionFormationsToSessionFormationDtos(List<SessionFormation> sessionFormation);

	List<SessionFormation> sessionFormationDtosToSessionFormations(List<SessionFormationDto> sessionFormation);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "dateDemarrage", target = "dateDemarrage"),
			@Mapping(source = "dateFin", target = "dateFin"), @Mapping(source = "formation", target = "formation"),
			@Mapping(source = "fActif", target = "fActif"), @Mapping(source = "nombrePlace", target = "nombrePlace"),
			@Mapping(source = "client", target = "client"), })
	SessionFormationDto sessionFormationToSessionFormationDto(SessionFormation sessionFormation);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "dateDemarrage", target = "dateDemarrage"),
			@Mapping(source = "dateFin", target = "dateFin"), @Mapping(source = "formation", target = "formation"),
			@Mapping(source = "fActif", target = "fActif"), @Mapping(source = "nombrePlace", target = "nombrePlace"),
			@Mapping(source = "client", target = "client"), })
	SessionFormation sessionFormationDtoToSessionFormation(SessionFormationDto sessionFormationDto);
}
