package com.fr.adaming.jsfapp.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "enumerated")
public enum enumerated {
	
  Disponiblite;
	@Id
    public String name = toString();

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
    
}