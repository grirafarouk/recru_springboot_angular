package com.fr.adaming.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
public class CustomPasswordEncoder implements PasswordEncoder {

	private static final Logger LOGGER = LoggerFactory.getLogger(CustomPasswordEncoder.class);

	public  String encode(CharSequence rawPassword) {
		StringBuilder res = new StringBuilder();
		try {
			MessageDigest algorithm = MessageDigest.getInstance("MD5");
			algorithm.reset();
			algorithm.update(String.valueOf(rawPassword).getBytes());
			byte[] md5 = algorithm.digest();
			String tmp = "";
			for (int i = 0; i < md5.length; i++) {
				tmp = (Integer.toHexString(0xFF & md5[i]));
				if (tmp.length() == 1) {
					 res.append("0").append(tmp);

				} else {
					res.append(tmp);
				}
			}
		} catch (NoSuchAlgorithmException ex) {
			LOGGER.info("context",ex);

		}
		return res.toString();
	}

	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
		return encode(rawPassword).equals(encodedPassword);
	}

}
