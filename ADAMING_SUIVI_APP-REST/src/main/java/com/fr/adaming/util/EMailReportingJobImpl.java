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


@Component("eMailReportingJob")
public class EMailReportingJobImpl {

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
		List<String> destinataires = new ArrayList<>();

		destinataires.add("mounir.oueslati@sesame.com.tn");
		// generer la flux de sortie de la piece jointe

		XSSFWorkbook wb = exportExcelService.exporterExcel();
		XSSFWorkbook wb1 = exportExcelService.contenuMail();

		ByteArrayOutputStream reportContent = (ByteArrayOutputStream) writeToOutputStreamRopJob(wb);
		String content = parseRopJob(wb1);

		// creation de la piece jointe
		PieceJointe pjRopJob = createPjRopJob(reportContent);
		List<PieceJointe> pjListRopJob = new ArrayList<>();
		pjListRopJob.add(pjRopJob);
		// message du mail
		// objet du mail
		String objetRopJob = "Compte rendu quotidien de sourcing ("
				+ sdf.format(DateUtils.getYesterday()) + ")";
		eMailApi.envoyerMail(objetRopJob, content, destinataires, "","","", pjListRopJob);
		logger.info("Email reporting finished.");
	}

	private PieceJointe createPjRopJob(ByteArrayOutputStream reportContentRopJob) {
		PieceJointe pjListRopJob = new PieceJointe();

		String fileNameRopJob = "reporting_" + sdf.format(DateUtils.getYesterday())
				+ ".xlsx";
		pjListRopJob.setFileName(fileNameRopJob);
		pjListRopJob.setMimeType(PieceJointe.MIME_TYPE_EXCEL_DOCUMENT);
		pjListRopJob.setContent(reportContentRopJob);
		return pjListRopJob;
	}

	private String parseRopJob(XSSFWorkbook wb1RopJob) throws Exception {
		String realPathRopJob = File.separator+"opt"+File.separator+"apache-tomcat8097"+File.separator+"reporting"+File.separator;
		String nameFile = "reporting.xls";
		FileOutputStream fileOut = new FileOutputStream(realPathRopJob + nameFile);
		wb1RopJob.write(fileOut);
		Workbook workbook = new Workbook(realPathRopJob + nameFile);
		workbook.save(realPathRopJob + "out1.xls");
		HSSFWorkbook myWorkBookRopJob = new HSSFWorkbook(new POIFSFileSystem(
				new FileInputStream(realPathRopJob + "out1.xls")));
		ExcelToHtml nExcelToHtmlRopJob = new ExcelToHtml(myWorkBookRopJob);
		String contentRopJob = nExcelToHtmlRopJob.getHTML();
		return contentRopJob;
	}

	private OutputStream writeToOutputStreamRopJob(XSSFWorkbook wbRopJob) {
		OutputStream osRopJob = null;
		try {
			osRopJob = new ByteArrayOutputStream();
			wbRopJob.write(osRopJob);
			osRopJob.close();
		} catch (IOException e) {
			logger.info("contest"+e);
		}
		return osRopJob;
	}
}
