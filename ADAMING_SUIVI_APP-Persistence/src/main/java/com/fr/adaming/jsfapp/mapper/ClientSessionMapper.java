package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.fr.adaming.jsfapp.dto.ClientSessionDto;
import com.fr.adaming.jsfapp.model.ClientSession;

@Mapper(uses = { ClientSession.class })
public interface ClientSessionMapper {

	List<ClientSessionDto> clientSessionsToClientSessionDtos(List<ClientSession> clientSessions);

	List<ClientSession> clientSessionDtosToClientSessions(List<ClientSessionDto> clientSessionDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	ClientSessionDto motifToMotifDto(ClientSession clientSession);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	ClientSession clientSessionDtoToClientSession(ClientSessionDto clientSessionDto);

}
