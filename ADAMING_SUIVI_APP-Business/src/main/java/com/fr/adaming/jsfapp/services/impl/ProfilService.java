package com.fr.adaming.jsfapp.services.impl;

import java.util.List;

import javax.persistence.Transient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.dao.IProfilDao;
import com.fr.adaming.jsfapp.model.Profil;
import com.fr.adaming.jsfapp.services.IProfilService;

@Service("profilService")
public class ProfilService extends ManagerService<Profil, Long> implements IProfilService {

	private static final long serialVersionUID = -5779552717054541372L;
	@Autowired()
	@Qualifier("profilDao")
	@Transient
	private IProfilDao profilDao;

	@Override
	public IManagerDao<Profil, Long> getDao() {
		return profilDao;
	}

	@Override
	public Profil rechercherProfilParLibelle(String libelle) {
		return profilDao.rechercherProfilParTypeProfil(libelle);
	}

	@Override
	public List<Profil> findAllProfil() {
		return profilDao.findAllProfil();
	}

}
