package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import com.fr.adaming.jsfapp.dto.ProfilDto;
import com.fr.adaming.jsfapp.model.Profil;

@Mapper(uses = { Profil.class })
public interface profileMapper {
	List<ProfilDto> ProfilsToProfilDtos(List<Profil> Profils);

	List<Profil> ProfilDtosToProfils(List<ProfilDto> ProfilDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "typeProfil", target = "typeProfil") })

	ProfilDto ProfilToProfilDto(Profil Profil);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "typeProfil", target = "typeProfil") })

	Profil ProfilDtoToProfil(ProfilDto ProfilDto);

}
