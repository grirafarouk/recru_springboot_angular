package com.fr.adaming.jsfapp.model;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "disponibilite")
@Proxy(lazy = false)
public class Disponibilite implements Serializable {

	/**
	 * 
	 */

	private static final long serialVersionUID = -2342709719141203480L;

	public Disponibilite() {

		super();
	}

	

	//@GeneratedValue(strategy=GenerationType.SEQUENCE)
//	@Id
//	@Basic(optional = false)
//	@Column(name = "ID", nullable = false)
//	@GenericGenerator(name = "seq_id", strategy = "com.fr.adaming.jsfapp.model.CustomGenerator", parameters =@Parameter (name = "sequence", value = "II_FIRM_DOC_PRM_SEQ") )
//	@GeneratedValue(generator = "seq_id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column(name = "LIBELLE", nullable = false)
	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}
	
	

	private long id=0;
	private String libelle;
}
