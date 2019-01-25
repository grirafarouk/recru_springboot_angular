package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.LieuDto;
import com.fr.adaming.jsfapp.model.Lieu;

@Mapper(uses = { Lieu.class })
public interface LieuMapper {

	List<LieuDto> lieuxToLieuDtos(List<Lieu> lieux);

	List<Lieu> lieuDtosToLieux(List<LieuDto> lieuDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle"),
			@Mapping(source = "adresseAdaming", target = "adresseAdaming") })

	LieuDto lieuToLieuDto(Lieu lieu);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle"),
			@Mapping(source = "adresseAdaming", target = "adresseAdaming") })

	Lieu lieuDtoToLieu(LieuDto lieuDto);

}
