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


@Component("eMailHebdomadaireJob")
public class EMailHebdomadaireJob {

	@Autowired
	@Qualifier("exporterReportingExcelService")
	private IExporterReportingExcelService exportExcelService;

	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	/**
	 * class logger
	 */
	private Logger logger = LoggerFactory
			.getLogger(EMailReportingJobImpl.class);

	public void doBusiness() throws Exception {
		logger.info("Email reporting started...");
		IEMailApi eMailApi = new JavaMailApi();
		// creation de la liste des destinataires
		List<String> destinataires = new ArrayList<String>();
		destinataires.add("mounir.oueslati@sesame.com.tn");

		// generer la flux de sortie de la piece jointe
		XSSFWorkbook wb = new XSSFWorkbook();
		wb = exportExcelService.creerRapportHebdomadaire(wb);
		ByteArrayOutputStream reportContent = (ByteArrayOutputStream) writeToOutputStream(wb);
		String content = parse(wb);

		// creation de la piece jointe
		PieceJointe pj = createPj(reportContent);
		List<PieceJointe> pjList = new ArrayList<PieceJointe>();
		pjList.add(pj);
		// message du mail
		// objet du mail
		String objet = "rapport hebdomadaire du sourcing ("
				+ sdf.format(DateUtils.getYesterday()) + ")";
		eMailApi.envoyerMail(objet, content, destinataires, "","","", pjList);
		logger.info("Email reporting finished.");
	}

	private PieceJointe createPj(ByteArrayOutputStream reportContent) {
		PieceJointe pj = new PieceJointe();

		String fileName = "reporting_" + sdf.format(DateUtils.getYesterday())
				+ ".xlsx";
		pj.setFileName(fileName);
		pj.setMimeType(PieceJointe.MIME_TYPE_EXCEL_DOCUMENT);
		pj.setContent(reportContent);
		return pj;
	}

	private String parse(XSSFWorkbook wb1) throws Exception {
		String realPath = File.separator+"opt"+File.separator+"apache-tomcat8097"+File.separator+"reporting"+File.separator;
		String nameFile = "reporting.xls";
		FileOutputStream fileOut = new FileOutputStream(realPath + nameFile);
		wb1.write(fileOut);
		Workbook workbook = new Workbook(realPath + nameFile);
		workbook.save(realPath + "out1.xls");
		HSSFWorkbook myWorkBook = new HSSFWorkbook(new POIFSFileSystem(
				new FileInputStream(realPath + "out1.xls")));
		ExcelToHtml nExcelToHtml = new ExcelToHtml(myWorkBook);
		String content = nExcelToHtml.getHTML();
		return content.toString();
	}

	private OutputStream writeToOutputStream(XSSFWorkbook wb) {
		OutputStream os = null;
		try {
			os = new ByteArrayOutputStream();
			wb.write(os);
			os.close();
		} catch (IOException e) {
		}
		return os;
	}
}
