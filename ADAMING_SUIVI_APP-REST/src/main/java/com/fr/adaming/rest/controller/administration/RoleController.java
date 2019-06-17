package com.fr.adaming.rest.controller.administration;

import java.util.Collection;
import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.dto.RoleDto;

import com.fr.adaming.jsfapp.mapper.RoleMapper;
import com.fr.adaming.jsfapp.model.Competence;
import com.fr.adaming.jsfapp.model.Role;
import com.fr.adaming.jsfapp.services.IRoleService;

@RestController
@RequestMapping(value = "/api/role")
@CrossOrigin("*")
public class RoleController {

	@Autowired
	private IRoleService roleService;

	private RoleMapper roleMapper = Mappers.getMapper(RoleMapper.class);

	@GetMapping("/libelle/{libelle}")
	public Role rechercherRoleParLibelle(@PathVariable String libelle) {
		return roleService.rechercherRoleParLibelle(libelle);
	}

	@PostMapping("")
	public RoleDto createOrUpdate(@RequestBody RoleDto roleDto) {
		Role role = roleMapper.roleDtoToRole(roleDto);
		role = roleService.createOrUpdate(role);
		return roleMapper.roleToRoleDto(role);
	}
	@RequestMapping(value = "recherche/{text}", method = RequestMethod.GET)
	public List<Role> rechercherRole(@PathVariable String text) {
		return roleService.rechercheRole(text);
	}

	@PostMapping("/add")
	public RoleDto create(@RequestBody RoleDto roleDto) {
		Role role = roleMapper.roleDtoToRole(roleDto);
		role = roleService.create(role);
		return roleMapper.roleToRoleDto(role);
	}

	@PostMapping("/update")
	public RoleDto update(@RequestBody RoleDto roleDto) {
		Role role = roleMapper.roleDtoToRole(roleDto);
		role = roleService.update(role);
		return roleMapper.roleToRoleDto(role);
	}

	@GetMapping("/id/{id}")
	public Role findById(@PathVariable Long id) {
		return roleService.findById(id);
	}

	@GetMapping("")
	public Collection<Role> findAll() {
		return roleService.findAll();
	}

	@DeleteMapping("")
	public void delete(@RequestBody RoleDto roleDto) {
		Role role = roleMapper.roleDtoToRole(roleDto);
		roleService.delete(role);
	}

	@DeleteMapping("{id}")
	public void deleteById(@PathVariable Long id) {
		roleService.deleteById(id);
	}

}

