package com.fr.adaming.jsfapp.services;

import java.util.List;

import com.fr.adaming.jsfapp.model.Role;

public interface IRoleService extends IManagerService<Role, Long> {
	List<Role> rechercheRole(String Role);
	Role rechercherRoleParLibelle(String libelle);
}
