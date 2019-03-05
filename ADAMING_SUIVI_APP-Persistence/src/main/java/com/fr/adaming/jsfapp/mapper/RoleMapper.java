package com.fr.adaming.jsfapp.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import com.fr.adaming.jsfapp.dto.RoleDto;
import com.fr.adaming.jsfapp.model.Role;

@Mapper(uses = { Role.class })
public interface RoleMapper {
	List<RoleDto> rolesToRoleDtos(List<Role> roles);

	List<Role> roleDtosToRoles(List<RoleDto> roleDtos);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	RoleDto roleToRoleDto(Role role);

	@Mappings({ @Mapping(source = "id", target = "id"), @Mapping(source = "libelle", target = "libelle") })

	Role roleDtoToRole(RoleDto roleDto);

}
