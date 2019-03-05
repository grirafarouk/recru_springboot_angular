package com.fr.adaming.jsfapp.dao;

import java.io.Serializable;

import com.fr.adaming.jsfapp.model.Role;

public interface IRoleDao extends IManagerDao<Role, Long>, Serializable {
	Role rechercherRoleParLibelle(String libelle);
}
