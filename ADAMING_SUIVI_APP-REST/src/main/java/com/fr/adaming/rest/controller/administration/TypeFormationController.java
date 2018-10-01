package com.fr.adaming.rest.controller.administration;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.TypeFormation;
import com.fr.adaming.jsfapp.services.ITypeFormationService;

@RestController
@RequestMapping(value = "typeformation")
@CrossOrigin("*")
public class TypeFormationController {

	@Autowired
	private ITypeFormationService typeFormationService;

	@RequestMapping(value = "/libelle/{libelle}", method = RequestMethod.GET)
	public TypeFormation rechercherTypeFormationParLibelle(@PathVariable String libelle) {
		return typeFormationService.rechercherTypeFormationParLibelle(libelle);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public TypeFormation createOrUpdate(@RequestBody TypeFormation entity) {
		return typeFormationService.createOrUpdate(entity);
	}

	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public TypeFormation findById(@PathVariable Long id) {
		return typeFormationService.findById(id);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<TypeFormation> findAll() {
		return typeFormationService.findAll();
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public void delete(@RequestBody TypeFormation entity) {
		typeFormationService.delete(entity);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable
			Long id) {
		typeFormationService.deleteById(id);
	}

}
