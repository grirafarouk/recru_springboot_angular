package com.fr.adaming.jsfapp.services.impl;

import java.util.List;
import javax.persistence.Transient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.fr.adaming.jsfapp.dao.ICodePostalDao;
import com.fr.adaming.jsfapp.dao.IManagerDao;
import com.fr.adaming.jsfapp.model.CodePostal;
import com.fr.adaming.jsfapp.services.ICodePostalService;

@Service("codePostalService")
public class CodePostalService extends ManagerService<CodePostal, Long> implements ICodePostalService {

	private static final long serialVersionUID = -2768977450715102559L;

	@Autowired()
	@Qualifier("codePostalDao")
	@Transient
	private ICodePostalDao codePostalDao;

	@Override
	public IManagerDao<CodePostal, Long> getDao() {
		return codePostalDao;
	}

	@Override
	public List<CodePostal> rechercherCodePostal(String text) {
		return codePostalDao.rechercherCodePostal(text);
	}

	@Override
	public CodePostal rechercherCodePostalParCodeEtVille(String code, String ville) {
		return codePostalDao.rechercherCodePostalParCodeEtVille(code, ville);

	}

	@Override
	public List<String> rechercherRegion(String region) {
		return codePostalDao.rechercherRegion(region);
	}

}
