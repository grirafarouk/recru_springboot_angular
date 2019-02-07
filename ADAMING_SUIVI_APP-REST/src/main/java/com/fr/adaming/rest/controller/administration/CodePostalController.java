package com.fr.adaming.rest.controller.administration;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fr.adaming.jsfapp.model.CodePostal;
import com.fr.adaming.jsfapp.services.impl.CodePostalService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/codePostal")
public class CodePostalController {

	@Autowired
	private CodePostalService codePostalService;

	@GetMapping(value = "/{id}")
	public CodePostal findById(@PathVariable Long id) {
		return codePostalService.findById(id);
	}

	@GetMapping(value = "")
	public Collection<CodePostal> findAll() {
		return codePostalService.findAll();
	}

	@RequestMapping(value = "/recherche/{query}")
	public Collection<CodePostal> completeCodePostal(@PathVariable String query) {
		return codePostalService.rechercherCodePostal(query);
	}

}
