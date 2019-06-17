package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import javax.persistence.Transient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IRoleDao;
import com.fr.adaming.jsfapp.model.Role;
import com.fr.adaming.jsfapp.services.IRoleService;

@Service("roleService")
public class RoleService extends ManagerService<Role, Long> implements IRoleService {

	private static final long serialVersionUID = -5779552717054541372L;
	@Autowired()
	@Qualifier("roleDao")
	@Transient
	private IRoleDao roleDao;

	@Override
	public IManagerDao<Role, Long> getDao() {
		return roleDao;
	}

	@Override
	public Role rechercherRoleParLibelle(String libelle) {
		return roleDao.rechercherRoleParLibelle(libelle);
	}

	@Override
	public List<Role> rechercheRole(String Role) {
		return roleDao.rechercheRole(Role);
	}
}
