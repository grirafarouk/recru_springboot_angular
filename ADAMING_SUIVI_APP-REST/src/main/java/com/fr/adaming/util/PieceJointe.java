package com.fr.adaming.util;

import java.io.ByteArrayOutputStream;

public class PieceJointe {
	public static final String MIME_TYPE_EXCEL_DOCUMENT = "application/vnd.ms-excel";

	private String fileName;
	private String mimeType;
	private ByteArrayOutputStream content;

	public PieceJointe() {
		super();
	}

	public PieceJointe(String fileName, String mimeType, ByteArrayOutputStream content) {
		super();
		this.mimeType = mimeType;
		this.content = content;
	}

	public String getMimeType() {
		return mimeType;
	}

	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}

	public ByteArrayOutputStream getContent() {
		return content;
	}

	public void setContent(ByteArrayOutputStream content) {
		this.content = content;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}
