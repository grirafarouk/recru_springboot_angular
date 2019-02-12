package com.fr.adaming.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.aspose.cells.Workbook;
import com.fr.adaming.jsfapp.services.IExporterReportingExcelService;

@Component("eMailMensuelJob")
public class EMailMensuelJobImpl {
	Logger LOGGER = LoggerFactory.getLogger(EMailEvaluationJobImpl.class);
	@Autowired
	@Qualifier("exporterReportingExcelService")
	private IExporterReportingExcelService exportExcelService;

	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	/**
	 * class logger
	 */
	private Logger logger = LoggerFactory.getLogger(EMailReportingJobImpl.class);

	public void doBusiness() throws Exception {
		logger.info("Email reporting started...");
		IEMailApi eMailApi = new JavaMailApi();
		// creation de la liste des destinataires
		List<String> destinataires = new ArrayList<>();
		// generer la flux de sortie de la piece jointe
		XSSFWorkbook wbMensuel = new XSSFWorkbook();
		wbMensuel = exportExcelService.creerRapportMensuel(wbMensuel);
		ByteArrayOutputStream reportContentMensuel = (ByteArrayOutputStream) writeToOutputStream(wbMensuel);
		String contentMensuel = parse(wbMensuel);

		// creation de la piece jointe
		PieceJointe pjMensuel = createPj(reportContentMensuel);
		List<PieceJointe> pjListMensuel = new ArrayList<>();
		pjListMensuel.add(pjMensuel);
		// message du mail
		// objet du mail
		String objetMensuel = "rapport mensuel du sourcing ("
				+ sdf.format(DateUtils.getYesterday()) + ")";
		eMailApi.envoyerMail(objetMensuel, contentMensuel, destinataires, "","","", pjListMensuel);
		logger.info("Email reporting finished.");
	}

	private PieceJointe createPj(ByteArrayOutputStream reportContent) {
		PieceJointe pjMensuel = new PieceJointe();
		String fileNameMensuel = "rapport_" + sdf.format(DateUtils.getYesterday())
				+ ".xlsx";
		pjMensuel.setFileName(fileNameMensuel);
		pjMensuel.setMimeType(PieceJointe.MIME_TYPE_EXCEL_DOCUMENT);
		pjMensuel.setContent(reportContent);
		return pjMensuel;
	}

	private String parse(XSSFWorkbook wb1) throws Exception {
		String realPathMensuel = File.separator+"opt"+File.separator+"apache-tomcat8097"+File.separator+"reporting"+File.separator;
		String nameFileMensuel = "rapport.xls";
		FileOutputStream fileOutMensuel = new FileOutputStream(realPathMensuel + nameFileMensuel);
		wb1.write(fileOutMensuel);
		Workbook workbookMensuel = new Workbook(realPathMensuel + nameFileMensuel);
		workbookMensuel.save(realPathMensuel + "out1.xls");
		HSSFWorkbook myWorkBookMensuel = new HSSFWorkbook(new POIFSFileSystem(
				new FileInputStream(realPathMensuel + "out1.xls")));
		ExcelToHtml nExcelToHtmlMensuel = new ExcelToHtml(myWorkBookMensuel);
		String contentMensuel = nExcelToHtmlMensuel.getHTML();
		return contentMensuel;
	}

	private OutputStream writeToOutputStream(XSSFWorkbook wb) {
		OutputStream osMensuel = null;
		try {
			osMensuel = new ByteArrayOutputStream();
			wb.write(osMensuel);
			osMensuel.close();
		} catch (IOException e) {
			LOGGER.info("context", e);
		}
		return osMensuel;
	}
}
