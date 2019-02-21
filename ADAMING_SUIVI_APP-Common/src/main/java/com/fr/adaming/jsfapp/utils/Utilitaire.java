package com.fr.adaming.jsfapp.utils;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.DirectoryNotEmptyException;
import java.nio.file.NoSuchFileException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Utilitaire {
	
	public Utilitaire() {
		super();
	}

	public static String hashMD5Crypt(String input) throws NoSuchAlgorithmException {
		MessageDigest m = MessageDigest.getInstance("MD5");
		m.reset();
		m.update(input.getBytes());
		byte[] digest = m.digest();
		BigInteger bigInt = new BigInteger(1, digest);
		StringBuilder hashtext = new StringBuilder();
		hashtext.append(bigInt.toString(16));
		while (hashtext.length() < 32) {
			hashtext.append("0" + hashtext);
		}
		return hashtext.toString();
	}
	
	public static void deleteDir(File dir) throws NoSuchFileException, DirectoryNotEmptyException, IOException{
	    if (dir.isDirectory()) {
	        String[] children = dir.list();
	        for (int i=0; i<children.length; i++) {
	            deleteDir(new File(dir, children[i]));
	        }
	    }
	    if (dir.delete()) {
	    	
	    System.out.println(dir.getName()+"file is deleted");	
	    }
	    else {
	    	
	    	System.out.println("Delete operation is failed ");
	    }
	}

}