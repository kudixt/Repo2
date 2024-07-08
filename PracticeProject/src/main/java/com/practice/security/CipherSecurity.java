package com.practice.security;

import java.nio.charset.StandardCharsets;
import java.security.spec.KeySpec;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;


public class CipherSecurity {

	private static final String ENC_KEY = "G8D#B2f^HK9l@n4P*Q6r&s1v%x3Y!Z5u?C7J";
	private static final String SALT_VALUE = "aB7#dE4@H2";
	
	public static String encrypt(String data) {
		
		try {
			
		      byte[] iv = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}; 
			IvParameterSpec ivspec = new IvParameterSpec(iv);
			
			 SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			
			KeySpec keySpec = new PBEKeySpec(ENC_KEY.toCharArray(), SALT_VALUE.getBytes(), 65536, 256);
			
			SecretKey sk = factory.generateSecret(keySpec);
			SecretKeySpec secretKey = new SecretKeySpec(sk.getEncoded(), "AES");
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivspec);
//			String encrypted = new String(Base64.getEncoder().withoutPadding().encode(cipher.doFinal(data.getBytes(StandardCharsets.UTF_8))));
			byte[] encryptedData = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
			String encrypted = Base64.getUrlEncoder().withoutPadding().encodeToString(encryptedData);
			return encrypted;
		} catch (Exception e) {
			System.out.println("Encryption Failed");
			e.printStackTrace();
		}
		return null;
	}
	
	public static String decrypt(String data) {
		
		try {
		      byte[] iv = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};  
			IvParameterSpec ivspec = new IvParameterSpec(iv);
			
			
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			
			KeySpec keySpec = new PBEKeySpec(ENC_KEY.toCharArray(), SALT_VALUE.getBytes(), 65536, 256);
			
			SecretKey sk = factory.generateSecret(keySpec);
			SecretKeySpec secretKey = new SecretKeySpec(sk.getEncoded(), "AES");
			
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, secretKey, ivspec);
			
			byte[] decodedData = Base64.getUrlDecoder().decode(data);
			byte[] decryptedData = cipher.doFinal(decodedData);
			return new String(decryptedData, StandardCharsets.UTF_8);
		} catch (Exception e) {
			System.out.println("Decryption Failed");
			e.printStackTrace();
		}
		return null;
		
	}

}
