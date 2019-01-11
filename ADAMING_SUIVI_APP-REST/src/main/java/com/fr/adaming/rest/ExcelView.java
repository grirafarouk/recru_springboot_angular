//package com.fr.adaming.rest;
//
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.apache.poi.hssf.util.HSSFColor;
//import org.apache.poi.ss.usermodel.CellStyle;
//import org.apache.poi.ss.usermodel.CreationHelper;
//import org.apache.poi.ss.usermodel.Font;
//import org.apache.poi.ss.usermodel.HorizontalAlignment;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.ss.usermodel.Sheet;
//import org.apache.poi.ss.usermodel.Workbook;
//import org.springframework.web.servlet.view.document.AbstractXlsView;
//
//import com.fr.adaming.jsfapp.model.V_ListeCandidats;
//
//public class ExcelView extends AbstractXlsView {
//
//	@Override
//	protected void buildExcelDocument(Map<String, Object> model, Workbook workbook, HttpServletRequest request,
//			HttpServletResponse response) throws Exception {
//
//		// change the file name
//		response.setHeader("Content-Disposition", "attachment; filename=\'candidats.xls'");
//
//		@SuppressWarnings("unchecked")
//		List<V_ListeCandidats> candidats = (List<V_ListeCandidats>) model.get("candidats");
//
//		// create excel xls sheet
//		Sheet sheet = workbook.createSheet("Candidats Detail");
//		sheet.setDefaultColumnWidth(30);
//
//		// create style for header cells
//		CellStyle style = workbook.createCellStyle();
//		Font font = workbook.createFont();
//		font.setFontName("Arial");
//		font.setBold(true);
//		font.setColor(HSSFColor.RED.index);
//		style.setFont(font);
//		style.setAlignment(HorizontalAlignment.CENTER);
//
//		// create header row
//		Row header = sheet.createRow(0);
//		header.createCell(0).setCellValue("Nom");
//		header.getCell(0).setCellStyle(style);
//		header.createCell(1).setCellValue("Prenom");
//		header.getCell(1).setCellStyle(style);
//		header.createCell(2).setCellValue("Num Tel");
//		header.getCell(2).setCellStyle(style);
//		header.createCell(3).setCellValue("Email");
//		header.getCell(3).setCellStyle(style);
//		header.createCell(4).setCellValue("Mobilite Lille");
//		header.getCell(4).setCellStyle(style);
//		header.createCell(5).setCellValue("DateInscription");
//		header.getCell(5).setCellStyle(style);
//		header.createCell(6).setCellValue("Statut");
//		header.getCell(6).setCellStyle(style);
//		header.createCell(7).setCellValue("Technologie");
//		header.getCell(7).setCellStyle(style);
//		header.createCell(8).setCellValue("Region");
//		header.getCell(8).setCellStyle(style);
//		header.createCell(9).setCellValue("Nom Sourceur");
//		header.getCell(9).setCellStyle(style);
//		header.createCell(10).setCellValue("Prenom Sourceur");
//		header.getCell(10).setCellStyle(style);
//
//		int rowCount = 1;
//
//		CellStyle s = workbook.createCellStyle();
//		CreationHelper createHelper = workbook.getCreationHelper();
//		s.setDataFormat(createHelper.createDataFormat().getFormat("dd-mm-yyyy"));
//		Font f = workbook.createFont();
//		f.setFontName("Arial");
//		s.setFont(f);
//		s.setAlignment(HorizontalAlignment.CENTER);
//
//		for (V_ListeCandidats candidat : candidats) {
//			Row CandidatsRow = sheet.createRow(rowCount++);
//			CandidatsRow.createCell(0).setCellValue(candidat.getNom());
//			CandidatsRow.getCell(0).setCellStyle(s);
//			CandidatsRow.createCell(1).setCellValue(candidat.getPrenom());
//			CandidatsRow.getCell(1).setCellStyle(s);
//			CandidatsRow.createCell(2).setCellValue(candidat.getNumeroTel());
//			CandidatsRow.getCell(2).setCellStyle(s);
//			CandidatsRow.createCell(3).setCellValue(candidat.getEmail());
//			CandidatsRow.getCell(3).setCellStyle(s);
//			CandidatsRow.createCell(4).setCellValue(candidat.getMobiliteLille().getLabel());
//			CandidatsRow.getCell(4).setCellStyle(s);
//			CandidatsRow.createCell(5).setCellValue(candidat.getDateInscription());
//			CandidatsRow.getCell(5).setCellStyle(s);
//			CandidatsRow.createCell(6).setCellValue(candidat.getStatut().getLabel());
//			CandidatsRow.getCell(6).setCellStyle(s);
//			CandidatsRow.createCell(7).setCellValue(candidat.getTechnologie());
//			CandidatsRow.getCell(7).setCellStyle(s);
//			CandidatsRow.createCell(8).setCellValue(candidat.getRegion());
//			CandidatsRow.getCell(8).setCellStyle(s);
//			CandidatsRow.createCell(9).setCellValue(candidat.getNomSourceur());
//			CandidatsRow.getCell(9).setCellStyle(s);
//			CandidatsRow.createCell(10).setCellValue(candidat.getPrenomSourceur());
//			CandidatsRow.getCell(10).setCellStyle(s);
//			
//
//		}
//
//	}
//
//}