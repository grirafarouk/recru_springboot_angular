package com.fr.adaming.util;

import java.util.List;

public interface IConvocationMail {
	
	void envoyerMail(String objet, String message, List<String> destinataires, String destCc,String destCcTwo,String destCcThree, List<PieceJointe> pjList);
	
}
