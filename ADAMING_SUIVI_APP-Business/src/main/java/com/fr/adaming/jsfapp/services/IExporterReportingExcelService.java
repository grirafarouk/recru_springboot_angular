package com.fr.adaming.jsfapp.services;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public interface IExporterReportingExcelService {

	XSSFWorkbook exporterExcel();
	XSSFWorkbook contenuMail();
	XSSFWorkbook creerRapportHebdomadaire(XSSFWorkbook wb);
	XSSFWorkbook creerRapportMensuel(XSSFWorkbook wb);
}
