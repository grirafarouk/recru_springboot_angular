package com.fr.adaming.jsfapp.services;

import com.fr.adaming.jsfapp.model.Role;

public interface IRoleService extends IManagerService<Role, Long> {
	Role rechercherRoleParLibelle(String libelle);
}
