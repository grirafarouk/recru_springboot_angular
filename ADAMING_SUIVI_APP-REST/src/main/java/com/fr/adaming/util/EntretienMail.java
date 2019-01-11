package com.fr.adaming.util;

import java.util.List;

import org.apache.chemistry.opencmis.commons.impl.json.JSONObject;

import com.fr.adaming.jsfapp.model.Candidat;

public class EntretienMail {
	
	private Candidat candidat;
	private List<String> distCopie;
	private List<JSONObject> pieceJoites;
	private String msg;
	public Candidat getCandidat() {
		return candidat;
	}
	public void setCandidat(Candidat candidat) {
		this.candidat = candidat;
	}
	public List<String> getDistCopie() {
		return distCopie;
	}
	public void setDistCopie(List<String> distCopie) {
		this.distCopie = distCopie;
	}
	public List<JSONObject> getPieceJoites() {
		return pieceJoites;
	}
	public void setPieceJoites(List<JSONObject> pieceJoites) {
		this.pieceJoites = pieceJoites;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	

}
