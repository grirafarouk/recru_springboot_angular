package com.fr.adaming.jsfapp.services.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.adaming.jsfapp.dto.SyntheseCandidatDto;
import com.fr.adaming.jsfapp.model.Origine;
import com.fr.adaming.jsfapp.model.Region;
import com.fr.adaming.jsfapp.model.Technologie;
import com.fr.adaming.jsfapp.model.Utilisateur;
import com.fr.adaming.jsfapp.services.ICandidatService;
import com.fr.adaming.jsfapp.services.IExporterReportingExcelService;
import com.fr.adaming.jsfapp.services.IOrigineService;
import com.fr.adaming.jsfapp.services.IRegionService;
import com.fr.adaming.jsfapp.services.ITechnologieService;
import com.fr.adaming.jsfapp.services.IUtilisateurService;
import com.fr.adaming.jsfapp.utils.DateUtils;

@Service("exporterReportingExcelService")
public class ExporterReportingExcelServiceImpl implements
		IExporterReportingExcelService {

	private static final String SEMAINE_SHEET_NAME = "Résumé de la semaine";
	private static final String JOURNEE_SHEET_NAME = "Résumé de la journée";
	private static final String REPORTING = "Reporting";
	private SimpleDateFormat sdfNoTime = new SimpleDateFormat("dd/MM/yyyy");
	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:mm");
	private SimpleDateFormat SHEET_TITLE_FORMAT = new SimpleDateFormat("dd-MM");

	@Autowired(required = true)
	@Qualifier("candidatService")
	private ICandidatService candidatService;

	@Autowired
	@Qualifier("technologieService")
	private ITechnologieService technologieService;

	@Autowired
	@Qualifier("utilisateurService")
	private IUtilisateurService utilisateurService;

	@Autowired
	@Qualifier("regionService")
	private IRegionService regionService;

	@Autowired
	@Qualifier("origineService")
	private IOrigineService origineService;

	List<Region> regions;

	List<Technologie> technologies;

	List<Utilisateur> utilisateurs;

	List<Utilisateur> charges;

	List<Origine> origines;

	private String inputDateDebut;

	private String inputDateFin;

	private Date dateDebut;

	private Date dateFin;

	public XSSFWorkbook exporterExcel() {
		regions = new ArrayList<>(regionService.rechercherRegionPourReporting());
		technologies = new ArrayList<>(
				technologieService.rechercherTechnologiePourReporting());
		utilisateurs = utilisateurService.rechercherSourceurPourReporting();

		XSSFWorkbook wb = new XSSFWorkbook();
		createSyntheseSheet(wb);
		createDaysSheets(wb);
		return wb;
	}

	public XSSFWorkbook contenuMail() {
		regions = new ArrayList<>(regionService.rechercherRegionPourReporting());
		technologies = new ArrayList<>(
				technologieService.rechercherTechnologiePourReporting());
		utilisateurs = utilisateurService.rechercherSourceurPourReporting();

		XSSFWorkbook wb = new XSSFWorkbook();
		createSyntheseSheet(wb);
		return wb;
	}

	private Sheet createSyntheseSheet(XSSFWorkbook wb) {
		ArrayList<SyntheseCandidatDto> listeSynthese = (ArrayList<SyntheseCandidatDto>) candidatService
				.rechercherSyntheseJournee(DateUtils.getYesterday());
		List<SyntheseCandidatDto> listeSyntheseSemaine = candidatService
				.rechercherSyntheseSemaine(DateUtils.getFirstDayOfWeek(),
						DateUtils.getYesterday());
		Sheet sh = wb.createSheet(SEMAINE_SHEET_NAME);
		// sh.setDisplayGridlines(false);
		int rowNum = 0;
		// putting header section
		sh.createRow(rowNum++);
		sh.createRow(rowNum++);
		Row headerRow = sh.createRow(rowNum++);

		Font headerFont = wb.createFont();
		headerFont.setFontHeightInPoints((short) 18);
		headerFont.setColor(IndexedColors.WHITE.getIndex());
		headerFont.setBoldweight(Font.BOLDWEIGHT_BOLD);

		XSSFCellStyle csHeader = wb.createCellStyle();
		csHeader.setFont(headerFont);

		csHeader.setFillForegroundColor(new XSSFColor(new byte[] { (byte) 0,
				(byte) 0, (byte) 102 }));
		csHeader.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csHeader.setAlignment(CellStyle.ALIGN_CENTER);
		Cell headerCell = headerRow.createCell(3);
		headerCell.setCellStyle(csHeader);
		headerCell.setCellValue(SEMAINE_SHEET_NAME + " "
				+ DateUtils.getWeekNumber(DateUtils.getYesterday()) + " du "
				+ sdfNoTime.format(DateUtils.getFirstDayOfWeek()) + " au "
				+ sdfNoTime.format(DateUtils.getLastDayOfWeek()));
		sh.setColumnWidth(headerCell.getColumnIndex(), (short) (50 * 300));

		// style cellule header villes
		XSSFCellStyle csCellVille = wb.createCellStyle();
		csCellVille.setFillForegroundColor(new XSSFColor(new byte[] {
				(byte) 221, (byte) 235, (byte) 247 }));
		csCellVille.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csCellVille.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellVille.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellVille.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellVille.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csCellVille.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		// style cellule total du header
		XSSFCellStyle csCellTot = wb.createCellStyle();
		csCellTot.setFillForegroundColor(new XSSFColor(new byte[] { (byte) 0,
				(byte) 176, (byte) 80 }));
		csCellTot.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csCellTot.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellTot.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellTot.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellTot.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csCellTot.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		// style cellule techno
		XSSFCellStyle csCellTechno = wb.createCellStyle();
		csCellTechno.setFillForegroundColor(new XSSFColor(new byte[] {
				(byte) 255, (byte) 192, (byte) 0 }));
		csCellTechno.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csCellTechno.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellTechno.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellTechno.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellTechno.setBorderLeft(HSSFCellStyle.BORDER_THIN);

		XSSFCellStyle csCellNumber = wb.createCellStyle();
		csCellNumber.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellNumber.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellNumber.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellNumber.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csCellNumber.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		// style cellule total de la valeur
		Font totalFont = wb.createFont();
		totalFont.setFontHeightInPoints((short) 11);
		totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
		XSSFCellStyle csCellTotVal = wb.createCellStyle();
		csCellTotVal.setFont(totalFont);
		csCellTotVal.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellTotVal.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellTotVal.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellTotVal.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csCellTotVal.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		// saut de ligne
		sh.createRow(rowNum++);
		Row ligneVilles = sh.createRow(rowNum++);
		Cell cellHdrVille;
		for (int i = 0; i < technologies.size(); i++) {
			cellHdrVille = ligneVilles.createCell(i + 4);
			cellHdrVille.setCellValue(technologies.get(i).getLibelle());
			cellHdrVille.setCellStyle(csCellVille);
			sh.setColumnWidth(cellHdrVille.getColumnIndex(), (short) (50 * 100));

		}
		Row lignValTech;
		long val = 0;
		int sommeTech = 0;
		Cell cell;
		for (int i = 0; i < regions.size(); i++) {
			lignValTech = sh.createRow(rowNum++);
			cell = lignValTech.createCell(3);
			cell.setCellValue(regions.get(i).getCode());
			cell.setCellStyle(csCellTechno);
			sh.setColumnWidth(cell.getColumnIndex(), (short) (50 * 160));
			sommeTech = 0;
			for (int j = 0; j < technologies.size(); j++) {
				Boolean found = false;
				for (SyntheseCandidatDto syntheseCandidatDto : listeSyntheseSemaine) {
					if (syntheseCandidatDto.getRegion().equalsIgnoreCase(
							regions.get(i).getCode())
							&& syntheseCandidatDto.getTechnologie()
									.getLibelle()
									.equals(technologies.get(j).getLibelle())) {
						val = syntheseCandidatDto.getTotalCandidat();
						sommeTech += val;
						found = true;
						Cell cellNumber = lignValTech.createCell(j + 4);
						cellNumber.setCellStyle(csCellNumber);
						cellNumber.setCellValue(val + "");
					}
				}
				if (!found) {

					Cell cellNumber = lignValTech.createCell(j + 4);
					cellNumber.setCellStyle(csCellNumber);
					cellNumber.setCellValue("-");
				}
			}
		}
		int r = sh.getLastRowNum();
		sh.createRow(r);
		Row ligneVil = sh.createRow(r);
		Cell cellHdrVill;
		cellHdrVill = ligneVil.createCell(3);
		cellHdrVill.setCellValue("Total");
		cellHdrVill.setCellStyle(csCellTot);

		for (int i = 0; i < technologies.size(); i++) {
			int sumtech = 0;
			for (SyntheseCandidatDto syntheseCandidatDto : listeSyntheseSemaine) {

				if (syntheseCandidatDto.getTechnologie().equals(
						technologies.get(i))) {
					val = syntheseCandidatDto.getTotalCandidat();
					sumtech += val;
				}

			}
			cellHdrVill = ligneVil.createCell(i + 4);
			cellHdrVill.setCellValue(sumtech);
			cellHdrVill.setCellStyle(csCellTot);
		}
		sh.createRow(rowNum++);
		sh.createRow(rowNum++);
		headerRow = sh.createRow(rowNum++);

		headerCell = headerRow.createCell(3);
		headerCell.setCellStyle(csHeader);
		headerCell.setCellValue(JOURNEE_SHEET_NAME + " "
				+ sdfNoTime.format(DateUtils.getYesterday()));
		CellUtil.setAlignment(headerCell, wb, CellStyle.ALIGN_CENTER);

		sh.createRow(rowNum++);

		ligneVilles = sh.createRow(rowNum++);
		for (int i = 0; i < technologies.size(); i++) {
			cellHdrVille = ligneVilles.createCell(i + 4);
			cellHdrVille.setCellValue(technologies.get(i).getLibelle());
			cellHdrVille.setCellStyle(csCellVille);

		}
		val = 0;
		sommeTech = 0;
		for (int i = 0; i < regions.size(); i++) {
			lignValTech = sh.createRow(rowNum++);
			cell = lignValTech.createCell(3);
			cell.setCellValue(regions.get(i).getCode());
			cell.setCellStyle(csCellTechno);
			sommeTech = 0;
			for (int j = 0; j < technologies.size(); j++) {
				Boolean found = false;
				for (SyntheseCandidatDto syntheseCandidatDto : listeSynthese) {
					if (syntheseCandidatDto.getRegion().equals(
							regions.get(i).getCode())
							&& syntheseCandidatDto.getTechnologie().equals(
									technologies.get(j))) {
						val = syntheseCandidatDto.getTotalCandidat();
						sommeTech += val;
						found = true;
						Cell cellNumber = lignValTech.createCell(j + 4);
						cellNumber.setCellStyle(csCellNumber);
						cellNumber.setCellValue(val + "");
					}
				}
				if (!found) {
					Cell cellNumber = lignValTech.createCell(j + 4);
					cellNumber.setCellStyle(csCellNumber);
					cellNumber.setCellValue("-");
				}
			}

		}
		int r1 = sh.getLastRowNum();
		sh.createRow(r1);
		Row ligneVil1 = sh.createRow(r1);
		Cell cellHdrVill1;
		cellHdrVill1 = ligneVil1.createCell(3);
		cellHdrVill1.setCellValue("Total");
		cellHdrVill1.setCellStyle(csCellTot);

		for (int i1 = 0; i1 < technologies.size(); i1++) {
			int sumtech = 0;
			for (SyntheseCandidatDto syntheseCandidatDto : listeSynthese) {
				if (syntheseCandidatDto.getTechnologie().equals(
						technologies.get(i1))) {
					val = syntheseCandidatDto.getTotalCandidat();
					sumtech += val;
				}
			}
			cellHdrVill1 = ligneVil1.createCell(i1 + 4);
			cellHdrVill1.setCellValue(sumtech);
			cellHdrVill1.setCellStyle(csCellTot);
		}
		sh.createRow(rowNum);
		sh.addMergedRegion(new CellRangeAddress(rowNum, rowNum, 0, regions
				.size()));
		rowNum++;
		return sh;
	}

	private void createDaysSheets(XSSFWorkbook wb) {
		Calendar calendar = GregorianCalendar.getInstance(Locale.FRANCE);
		calendar.setTime(DateUtils.getFirstDayOfWeek());
		for (int i = 0; i < DateUtils.getCurrentDayOfWeek(); i++) {
			Date date = calendar.getTime();
			List<SyntheseCandidatDto> listeSynthese = candidatService
					.rechercherSyntheseCandidatParDate(date);
			createDaySheet(wb, listeSynthese, date);
			calendar.add(Calendar.DAY_OF_MONTH, 1);
		}

	}

	private void createDaySheet(XSSFWorkbook wb,
			List<SyntheseCandidatDto> listeSyntheseCandidatDto, Date date) {
		Sheet sh = wb.createSheet(REPORTING + " "
				+ SHEET_TITLE_FORMAT.format(date.getTime()));

		sh.setDisplayGridlines(false);

		int rowNum = 0;
		// putting header section
		Row headerRow = sh.createRow(rowNum++);
		sh.addMergedRegion(new CellRangeAddress(0, 0, 0, 3));
		// font du titre
		Font titleFont = wb.createFont();
		titleFont.setFontHeightInPoints((short) 15);
		titleFont.setColor(IndexedColors.BLUE.getIndex());
		titleFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
		CellStyle csTitle = wb.createCellStyle();
		csTitle.setFont(titleFont);

		// font du sous titre
		Font sousTitreFont = wb.createFont();
		sousTitreFont.setFontHeightInPoints((short) 12);
		sousTitreFont.setColor(IndexedColors.BLUE.getIndex());
		titleFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
		CellStyle sousTitre = wb.createCellStyle();
		sousTitre.setFont(sousTitreFont);

		// font nom sourceur
		Font nomSourceurFont = wb.createFont();
		nomSourceurFont.setFontHeightInPoints((short) 12);
		nomSourceurFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
		CellStyle csNomSrc = wb.createCellStyle();
		csNomSrc.setFont(nomSourceurFont);

		// style cellule header villes
		XSSFCellStyle csCellVille = wb.createCellStyle();
		csCellVille.setFillForegroundColor(new XSSFColor(new byte[] {
				(byte) 255, (byte) 192, (byte) 0 }));
		csCellVille.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csCellVille.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellVille.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellVille.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellVille.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		// style cellule total du header
		XSSFCellStyle csCellTot = wb.createCellStyle();
		csCellTot.setFillForegroundColor(new XSSFColor(new byte[] { (byte) 0,
				(byte) 176, (byte) 80 }));
		csCellTot.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csCellTot.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellTot.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellTot.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellTot.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		// style cellule techno
		XSSFCellStyle csCellTechno = wb.createCellStyle();
		csCellTechno.setFillForegroundColor(new XSSFColor(new byte[] {
				(byte) 221, (byte) 235, (byte) 247 }));
		csCellTechno.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csCellTechno.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellTechno.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellTechno.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellTechno.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csCellTechno.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		XSSFCellStyle csCellNumber = wb.createCellStyle();
		csCellNumber.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellNumber.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellNumber.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellNumber.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csCellNumber.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		// style cellule total de la valeur
		Font totalFont = wb.createFont();
		totalFont.setFontHeightInPoints((short) 11);
		totalFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
		XSSFCellStyle csCellTotVal = wb.createCellStyle();
		csCellTotVal.setFont(totalFont);
		csCellTotVal.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellTotVal.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellTotVal.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellTotVal.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		Cell cellTitle = headerRow.createCell(0);
		cellTitle.setCellType(Cell.CELL_TYPE_STRING);
		cellTitle.setCellValue("Reporting Sourcing du "
				+ sdfNoTime.format(date));
		cellTitle.setCellStyle(csTitle);

		// saut de ligne
		sh.createRow(rowNum++);

		// content

		HashMap<Utilisateur, List<SyntheseCandidatDto>> map = new HashMap<Utilisateur, List<SyntheseCandidatDto>>();
		List<Utilisateur> utilisateurs = new ArrayList<>();
		for (SyntheseCandidatDto syntheseCandidatDto : listeSyntheseCandidatDto) {
			if (!map.containsKey(syntheseCandidatDto.getCreePar())) {
				List<SyntheseCandidatDto> liste = new ArrayList<>();
				liste.add(syntheseCandidatDto);
				map.put(syntheseCandidatDto.getCreePar(), liste);
				utilisateurs.add(syntheseCandidatDto.getCreePar());
			} else {
				List<SyntheseCandidatDto> liste = map.get(syntheseCandidatDto
						.getCreePar());
				liste.add(syntheseCandidatDto);
			}
		}
		//
		for (int i = 0, j = 1, k = 2; k <= utilisateurs.size(); i = i + 3, j = j + 3, k = k + 3) {
			Utilisateur u1 = null;
			Utilisateur u2 = null;
			Utilisateur u3 = null;
			int totaleU1 = 0;
			int totaleU2 = 0;
			int totaleU3 = 0;
			List<SyntheseCandidatDto> listeU1;
			List<SyntheseCandidatDto> listeU2;
			List<SyntheseCandidatDto> listeU3;
			if (utilisateurs.size() - i >= 3) {
				u1 = utilisateurs.get(i);
				u2 = utilisateurs.get(j);
				u3 = utilisateurs.get(k);
			} else if (utilisateurs.size() - i == 2) {
				u1 = utilisateurs.get(i);
				u2 = utilisateurs.get(j);
			} else if (utilisateurs.size() - i == 1) {
				u1 = utilisateurs.get(i);
			}
			Row hderRow;
			Cell hdrCell;
			Cell nomSourceurCell;
			hderRow = sh.createRow(rowNum++);
			if (u1 != null) {
				hdrCell = hderRow.createCell(0);
				hdrCell.setCellValue("Sourceur: ");
				hdrCell.setCellStyle(sousTitre);
				nomSourceurCell = hderRow.createCell(1);
				nomSourceurCell.setCellValue(utilisateurs.get(i).getNom() + " "
						+ utilisateurs.get(i).getPrenom());
				nomSourceurCell.setCellStyle(csNomSrc);
				sh.addMergedRegion(new CellRangeAddress(rowNum - 1, rowNum - 1,
						1, 2));
			}
			if (u2 != null) {
				Cell cell = hderRow.createCell(technologies.size() + 2);
				cell.setCellValue("Sourceur: ");
				cell.setCellStyle(sousTitre);
				nomSourceurCell = hderRow.createCell(technologies.size() + 3);
				nomSourceurCell
						.setCellValue(u2.getNom() + " " + u2.getPrenom());
				nomSourceurCell.setCellStyle(csNomSrc);
				sh.addMergedRegion(new CellRangeAddress(rowNum - 1, rowNum - 1,
						technologies.size() + 3, technologies.size() + 4));
			}
			if (u3 != null) {
				Cell cellSrc = hderRow.createCell(2 * technologies.size() + 3);
				cellSrc.setCellValue("Sourceur: ");
				cellSrc.setCellStyle(sousTitre);
				nomSourceurCell = hderRow
						.createCell(2 * technologies.size() + 4);
				nomSourceurCell
						.setCellValue(u3.getNom() + " " + u3.getPrenom());
				nomSourceurCell.setCellStyle(csNomSrc);
				sh.addMergedRegion(new CellRangeAddress(rowNum - 1, rowNum - 1,
						2 * technologies.size() + 4,
						2 * technologies.size() + 5));
			}
			if (u1 != null) {
				Row technoRow = sh.createRow(rowNum++);
				Cell technoCell;
				for (int l = 0; l < technologies.size(); l++) {
					if (u1 != null) {
						technoCell = technoRow.createCell(l + 1);
						technoCell.setCellValue(technologies.get(l)
								.getLibelle());
						technoCell.setCellStyle(csCellTechno);
						sh.setColumnWidth(technoCell.getColumnIndex(),
								(short) (50 * 80));
					}
					if (u2 != null) {
						technoCell = technoRow.createCell(l
								+ technologies.size() + 2);
						technoCell.setCellValue(technologies.get(l)
								.getLibelle());
						technoCell.setCellStyle(csCellTechno);
						sh.setColumnWidth(technoCell.getColumnIndex(),
								(short) (50 * 80));
					}
					if (u3 != null) {
						technoCell = technoRow.createCell(l + 2
								* technologies.size() + 3);
						technoCell.setCellValue(technologies.get(l)
								.getLibelle());
						technoCell.setCellStyle(csCellTechno);
						sh.setColumnWidth(technoCell.getColumnIndex(),
								(short) (50 * 80));
					}
				}
			}
			long val = 0;
			Row villeRow;
			for (int m = 0; m < regions.size(); m++) {
				villeRow = sh.createRow(rowNum++);
				Cell cellVille;
				cellVille = villeRow.createCell(0);
				cellVille.setCellValue(regions.get(m).getCode());
				cellVille.setCellStyle(csCellVille);
				sh.setColumnWidth(cellVille.getColumnIndex(),
						(short) (50 * 150));
				Cell cellTechno;
				if (u1 != null) {

					listeU1 = map.get(u1);
					for (int l = 0; l < technologies.size(); l++) {
						Boolean foundU1 = false;
						int sommeRegionU1 = 0;

						Boolean foundU2 = false;
						int sommeRegionU2 = 0;

						Boolean foundU3 = false;
						int sommeRegionU3 = 0;
						for (SyntheseCandidatDto candidatDtoU1 : listeU1) {
							if (candidatDtoU1.getRegion().equals(
									regions.get(m).getCode())
									&& candidatDtoU1
											.getTechnologie()
											.getLibelle()
											.equals(technologies.get(l)
													.getLibelle())) {
								sommeRegionU1 += candidatDtoU1
										.getTotalCandidat();
								foundU1 = true;
							}
						}
						if (u2 != null) {
							listeU2 = map.get(u2);
							for (SyntheseCandidatDto candidatDtoU2 : listeU2) {
								if (candidatDtoU2.getRegion().equals(
										regions.get(m).getCode())
										&& candidatDtoU2
												.getTechnologie()
												.getLibelle()
												.equals(technologies.get(l)
														.getLibelle())) {
									sommeRegionU2 += candidatDtoU2
											.getTotalCandidat();
									foundU2 = true;
								}
							}
							if (u3 != null) {
								listeU3 = map.get(u3);
								for (SyntheseCandidatDto candidatDtoU3 : listeU3) {
									if (candidatDtoU3.getRegion().equals(
											regions.get(m).getCode())
											&& candidatDtoU3
													.getTechnologie()
													.getLibelle()
													.equals(technologies.get(l)
															.getLibelle())) {
										val = candidatDtoU3.getTotalCandidat();
										sommeRegionU3 += candidatDtoU3
												.getTotalCandidat();
										foundU3 = true;
									}
								}
							}
							if (foundU1) {
								cellTechno = villeRow.createCell(l + 1);
								cellTechno.setCellValue(sommeRegionU1 + "");
								cellTechno.setCellStyle(csCellNumber);
							} else {
								cellTechno = villeRow.createCell(l + 1);
								cellTechno.setCellValue("-");
								cellTechno.setCellStyle(csCellNumber);
							}

							if (u2 != null) {
								if (foundU2) {
									cellTechno = villeRow.createCell(l
											+ technologies.size() + 2);
									cellTechno.setCellValue(sommeRegionU2 + "");
									cellTechno.setCellStyle(csCellNumber);
								} else {
									cellTechno = villeRow.createCell(l
											+ technologies.size() + 2);
									cellTechno.setCellValue("-");
									cellTechno.setCellStyle(csCellNumber);
								}
							}

							if (u3 != null) {
								if (foundU3) {
									cellTechno = villeRow.createCell(l + 2
											* technologies.size() + 3);
									cellTechno.setCellValue(sommeRegionU3 + "");
									cellTechno.setCellStyle(csCellNumber);
								} else {
									cellTechno = villeRow.createCell(l + 2
											* technologies.size() + 3);
									cellTechno.setCellValue("-");
									cellTechno.setCellStyle(csCellNumber);
								}
							}

						}
					}
				}
			}
			if (u1 != null) {
				listeU1 = map.get(u1);
				Row totRow = sh.createRow(rowNum++);
				Cell totCell;
				Cell cellHdrVill1;
				sh.addMergedRegion(new CellRangeAddress(rowNum - 1, rowNum, 0,
						0));
				cellHdrVill1 = totRow.createCell(0);
				cellHdrVill1.setCellValue("Total");
				cellHdrVill1.setCellStyle(csCellTot);

				for (int l = 0; l < technologies.size(); l++) {
					int sumtechU1 = 0;
					int sumtechU2 = 0;
					int sumtechU3 = 0;
					for (SyntheseCandidatDto syntheseCandidatDto : listeU1) {
						if (syntheseCandidatDto.getTechnologie().equals(
								technologies.get(l))) {
							sumtechU1 += syntheseCandidatDto.getTotalCandidat();
						}
					}
					totCell = totRow.createCell(l + 1);
					totCell.setCellValue(sumtechU1);
					totCell.setCellStyle(csCellTot);

					if (u2 != null) {
						listeU2 = map.get(u2);
						for (SyntheseCandidatDto syntheseCandidatDto : listeU2) {

							if (syntheseCandidatDto.getTechnologie().equals(
									technologies.get(l))) {
								sumtechU2 += syntheseCandidatDto
										.getTotalCandidat();

							}
						}
						totCell = totRow
								.createCell(l + technologies.size() + 2);
						totCell.setCellValue(sumtechU2);
						totCell.setCellStyle(csCellTot);

					}
					if (u3 != null) {
						listeU3 = map.get(u3);
						for (SyntheseCandidatDto syntheseCandidatDto : listeU3) {

							if (syntheseCandidatDto.getTechnologie().equals(
									technologies.get(l))) {
								sumtechU3 += syntheseCandidatDto
										.getTotalCandidat();
							}
						}
						totCell = totRow.createCell(l + 2 * technologies.size()
								+ 3);
						totCell.setCellValue(sumtechU3);
						totCell.setCellStyle(csCellTot);
					}
					totaleU1 += sumtechU1;
					totaleU2 += sumtechU2;
					totaleU3 += sumtechU3;
				}
			}
			Row totUserRow = sh.createRow(rowNum++);
			Cell totCell = totUserRow.createCell(0);
			totCell.setCellValue("");

			totCell.setCellStyle(csCellTot);
			Cell totCellValue = totUserRow.createCell(1);
			totCellValue.setCellValue(totaleU1);
			totCellValue.setCellStyle(csCellTot);

			totCell = totUserRow.createCell(technologies.size() + 2);
			totCell.setCellValue(totaleU2);
			totCell.setCellStyle(csCellTot);

			totCellValue = totUserRow.createCell(2 * technologies.size() + 3);
			totCellValue.setCellValue(totaleU3);
			totCellValue.setCellStyle(csCellTot);
			rowNum++;
		}
	}

	public String getInputDateDebut() {
		return inputDateDebut;
	}

	public void setInputDateDebut(String inputDateDebut) {
		this.inputDateDebut = inputDateDebut;
	}

	public String getInputDateFin() {
		return inputDateFin;
	}

	public void setInputDateFin(String inputDateFin) {
		this.inputDateFin = inputDateFin;
	}

	public XSSFWorkbook creerRapportHebdomadaire(XSSFWorkbook wb) {

		// have regions and users lists
		regions = new ArrayList<>(regionService.findAll());
		utilisateurs = utilisateurService.findAllSourceurs();
		charges = utilisateurService.findAllCharges();
		origines = new ArrayList<>(origineService.findAll());
		technologies = new ArrayList<>(technologieService.findAll());

		dateDebut = DateUtils.getFirstDayOfWeek();
		dateFin = DateUtils.getLastDayOfWeek();
		int i;
		int j;

		// create sheet
		Sheet sheet = wb.createSheet(REPORTING);

		Row row = null;
		Cell cell = null;

		// set row index to first row
		int rowIndex = 0;

		// start a new line
		sheet.createRow(rowIndex++);
		sheet.createRow(rowIndex++);

		// create header row and set row to specific height
		row = sheet.createRow(rowIndex++);
		row.setHeight((short) 0x349);
		// create header title cell
		cell = row.createCell((short) 1);

		Font fontNormale = wb.createFont();
		fontNormale.setCharSet(HSSFFont.ANSI_CHARSET);

		// set font for title
		Font fontTitre = wb.createFont();
		fontTitre.setFontHeightInPoints((short) 35);
		fontTitre.setBoldweight(Font.BOLDWEIGHT_BOLD);
		// set font for subtitle
		Font fontSousTitre = wb.createFont();
		fontSousTitre.setFontHeightInPoints((short) 15);
		fontSousTitre.setBoldweight(Font.BOLDWEIGHT_BOLD);

		// set style for title
		CellStyle csStyleTitre = wb.createCellStyle();
		csStyleTitre.setFont(fontTitre);
		cell.setCellType(Cell.CELL_TYPE_STRING);

		// style for region cell
		XSSFCellStyle csRow = wb.createCellStyle();
		csRow.setFillForegroundColor(new XSSFColor(new byte[] { (byte) 255,
				(byte) 192, (byte) 0 }));
		csRow.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csRow.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csRow.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csRow.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csRow.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csRow.setFont(fontNormale);

		XSSFCellStyle csCellUser = wb.createCellStyle();
		csCellUser.setFillForegroundColor(new XSSFColor(new byte[] {
				(byte) 221, (byte) 235, (byte) 247 }));
		csCellUser.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csCellUser.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellUser.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellUser.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellUser.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csCellUser.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		csCellUser.setFont(fontNormale);

		XSSFCellStyle csStyleNumber = wb.createCellStyle();
		csStyleNumber.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csStyleNumber.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csStyleNumber.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csStyleNumber.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csStyleNumber.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		XSSFCellStyle csStyleTotale = wb.createCellStyle();
		csStyleTotale.setFillForegroundColor(new XSSFColor(new byte[] {
				(byte) 0, (byte) 176, (byte) 80 }));
		csStyleTotale.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csStyleTotale.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csStyleTotale.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csStyleTotale.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csStyleTotale.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csStyleTotale.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		
		// set style for subtitle
		CellStyle csStyleSousTitre = wb.createCellStyle();
		csStyleSousTitre.setFont(fontSousTitre);
		csStyleTitre.setWrapText(true);
		cell.setCellValue("Hebdomadaire");
		sheet.setColumnWidth(cell.getColumnIndex(), (short) (50 * 300));
		cell.setCellStyle(csStyleTitre);

		// create row for commentaire
		row = sheet.createRow(rowIndex++);
		cell = row.createCell((short) 1);
		cell.setCellValue("Nombre de CVs mis par tous les sourceurs par région, et par technologie et par outil, nombre de CVs mis sur toute la France");
		sheet.setColumnWidth(cell.getColumnIndex(), (short) (30 * 300));
		sheet.createRow(rowIndex++);

		row = sheet.createRow(rowIndex++);
		cell = row.createCell((short) 1);
		cell.setCellType(Cell.CELL_TYPE_STRING);
		cell.setCellValue("Nombre de CVs mis par tous les sourceurs par région");
		cell.setCellStyle(csStyleSousTitre);
		sheet.setColumnWidth(cell.getColumnIndex(), (short) (30 * 300));

		// start a new line
		sheet.createRow(rowIndex++);

		row = sheet.createRow(rowIndex++);
		for (j = 0; j < utilisateurs.size(); j++) {
			cell = row.createCell((short) j + 2);
			sheet.setColumnWidth(cell.getColumnIndex(), (short) (50 * 100));
			cell.setCellValue(utilisateurs.get(j).getNom() + " "
					+ utilisateurs.get(j).getPrenom());
			cell.setCellStyle(csCellUser);
		}
		cell = row.createCell((short) j + 2);
		cell.setCellValue("TOTAL");
		cell.setCellStyle(csCellUser);

		List<Integer> totParSourceur = new ArrayList<>();
		for (j = 0; j < utilisateurs.size(); j++) {
			totParSourceur.add(0);
		}

		for (i = 0; i < regions.size(); i++) {
			row = sheet.createRow(rowIndex++);
			cell = row.createCell(1);
			cell.setCellValue(regions.get(i).getCode());
			cell.setCellStyle(csRow);
			int totale = 0;
			for (j = 0; j < utilisateurs.size(); j++) {
				int valeur = utilisateurService
						.nbrCVParSourceurParRegion(utilisateurs.get(j),
								regions.get(i), dateDebut, dateFin);
				cell = row.createCell(j + 2);
				cell.setCellValue(valeur);
				cell.setCellStyle(csStyleNumber);
				totale = totale + valeur;
				totParSourceur.set(j, totParSourceur.get(j) + valeur);
			}
			cell = row.createCell(j + 2);
			cell.setCellValue(totale);
			cell.setCellStyle(csStyleNumber);
		}
		row = sheet.createRow(rowIndex++);
		cell = row.createCell(1);
		cell.setCellValue("TOTAL");
		cell.setCellStyle(csStyleTotale);

		int totSrcs = 0;
		for (j = 0; j < totParSourceur.size(); j++) {
			cell = row.createCell(j + 2);
			cell.setCellValue(totParSourceur.get(j));
			cell.setCellStyle(csStyleTotale);
			totSrcs = totSrcs + totParSourceur.get(j);
		}

		cell = row.createCell(j + 2);
		cell.setCellValue(totSrcs);
		cell.setCellStyle(csStyleTotale);

		sheet.createRow(rowIndex++);
		row = sheet.createRow(rowIndex++);
		cell = row.createCell((short) 1);
		cell.setCellType(Cell.CELL_TYPE_STRING);
		cell.setCellValue("Nombre de CVs technologie et par origine");
		cell.setCellStyle(csStyleSousTitre);
		sheet.createRow(rowIndex++);

		row = sheet.createRow(rowIndex++);
		for (i = 0; i < technologies.size(); i++) {
			cell = row.createCell((short) i + 2);
			sheet.setColumnWidth(cell.getColumnIndex(), (short) (50 * 100));
			cell.setCellValue(technologies.get(i).getLibelle());
			cell.setCellStyle(csCellUser);
		}
		cell = row.createCell((short) i + 2);
		cell.setCellValue("TOTAL");
		cell.setCellStyle(csCellUser);

		List<Integer> totParTechnologie = new ArrayList<>();
		for (j = 0; j < technologies.size(); j++) {
			totParTechnologie.add(0);
		}

		for (i = 0; i < origines.size(); i++) {
			row = sheet.createRow(rowIndex++);
			cell = row.createCell(1);
			cell.setCellValue(origines.get(i).getLibelle());
			cell.setCellStyle(csRow);
			int totale = 0;
			for (j = 0; j < technologies.size(); j++) {
				int valeur = utilisateurService.nbrCVParOrigineParTechnologie(
						origines.get(i), technologies.get(j), dateDebut,
						dateFin);
				cell = row.createCell(j + 2);
				cell.setCellValue(valeur);
				cell.setCellStyle(csStyleNumber);
				totale = totale + valeur;
				totParTechnologie.set(j, totParTechnologie.get(j) + valeur);
			}
			cell = row.createCell(j + 2);
			cell.setCellValue(totale);
			cell.setCellStyle(csStyleNumber);
		}
		row = sheet.createRow(rowIndex++);
		cell = row.createCell(1);
		cell.setCellValue("TOTAL");
		cell.setCellStyle(csStyleTotale);

		int totTechngs = 0;
		for (j = 0; j < totParTechnologie.size(); j++) {
			cell = row.createCell(j + 2);
			cell.setCellValue(totParTechnologie.get(j));
			cell.setCellStyle(csStyleTotale);
			totTechngs = totTechngs + totParTechnologie.get(j);
		}
		cell = row.createCell(j + 2);
		cell.setCellValue(totTechngs);
		cell.setCellStyle(csStyleTotale);
		sheet.createRow(rowIndex++);
		row = sheet.createRow(rowIndex++);
		cell = row.createCell((short) 1);
		cell.setCellType(Cell.CELL_TYPE_STRING);
		cell.setCellValue("Nombre de CVs appelés par chaque chargée de recrutement");
		cell.setCellStyle(csStyleSousTitre);
		sheet.createRow(rowIndex++);

		row = sheet.createRow(rowIndex++);
		for (i = 0; i < technologies.size(); i++) {
			cell = row.createCell((short) i + 2);
			sheet.setColumnWidth(cell.getColumnIndex(), (short) (50 * 100));
			cell.setCellValue(technologies.get(i).getLibelle());
			cell.setCellStyle(csCellUser);
		}

		cell = row.createCell((short) i + 2);
		cell.setCellValue("TOTAL");
		cell.setCellStyle(csCellUser);

		List<Integer> totParCharge = new ArrayList<>();
		for (j = 0; j < technologies.size(); j++) {
			totParCharge.add(0);
		}
		for (i = 0; i < charges.size(); i++) {
			row = sheet.createRow(rowIndex++);
			cell = row.createCell(1);
			cell.setCellValue(charges.get(i).getNom() + " "
					+ charges.get(i).getPrenom());
			cell.setCellStyle(csRow);
			int totale = 0;
			for (j = 0; j < technologies.size(); j++) {
				int valeur = utilisateurService
						.nbrCVParChargeParTechnologie(charges.get(i),
								technologies.get(j), dateDebut, dateFin);
				cell = row.createCell(j + 2);
				cell.setCellValue(valeur);
				cell.setCellStyle(csStyleNumber);
				totale = totale + valeur;
				totParCharge.set(j, totParCharge.get(j) + valeur);
			}
			cell = row.createCell(j + 2);
			cell.setCellValue(totale);
			cell.setCellStyle(csStyleNumber);
		}
		row = sheet.createRow(rowIndex++);
		cell = row.createCell(1);
		cell.setCellValue("TOTAL");
		cell.setCellStyle(csStyleTotale);
		int totCharges = 0;
		for (j = 0; j < totParCharge.size(); j++) {
			cell = row.createCell(j + 2);
			cell.setCellValue(totParCharge.get(j));
			cell.setCellStyle(csStyleTotale);
			totCharges = totCharges + totParCharge.get(j);
		}
		cell = row.createCell(j + 2);
		cell.setCellValue(totCharges);
		cell.setCellStyle(csStyleTotale);
		csStyleTitre.setWrapText(true);
		// need to merge cells for readable text
		sheet.createRow(rowIndex++);
		sheet.createRow(rowIndex++);
		sheet.createRow(rowIndex++);
		return wb;
	}

	public XSSFWorkbook creerRapportMensuel(XSSFWorkbook wb) {

		origines = new ArrayList<>(origineService.findAll());
		utilisateurs = utilisateurService.findAllSourceurs();
		dateDebut = DateUtils.getFirstDayOfWeek();
		dateFin = DateUtils.getLastDayOfWeek();
		int i;
		int j;

		// create sheet
		Sheet sheet = wb.createSheet(REPORTING);

		Row row = null;
		Cell cell = null;
		
		// set row index to first row
		int rowIndex = 0;

		sheet.createRow(rowIndex++);
		sheet.createRow(rowIndex++);
		
		row = sheet.createRow(rowIndex++);
		cell = row.createCell((short) 1);
		
		Font fontNormale = wb.createFont();
		fontNormale.setCharSet(HSSFFont.ANSI_CHARSET);

		// set font for title
		Font fontTitre = wb.createFont();
		fontTitre.setFontHeightInPoints((short) 35);
		fontTitre.setBoldweight(Font.BOLDWEIGHT_BOLD);
		// set font for subtitle
		Font fontSousTitre = wb.createFont();
		fontSousTitre.setFontHeightInPoints((short) 15);
		fontSousTitre.setBoldweight(Font.BOLDWEIGHT_BOLD);

		// set style for title
		CellStyle csStyleTitre = wb.createCellStyle();
		csStyleTitre.setFont(fontTitre);
		cell.setCellType(Cell.CELL_TYPE_STRING);

		// set style for subtitle
		CellStyle csStyleSousTitre = wb.createCellStyle();
		csStyleSousTitre.setFont(fontSousTitre);
		csStyleTitre.setWrapText(true);
		
		// style for region cell
		XSSFCellStyle csRow = wb.createCellStyle();
		csRow.setFillForegroundColor(new XSSFColor(new byte[] { (byte) 255,
				(byte) 192, (byte) 0 }));
		csRow.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csRow.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csRow.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csRow.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csRow.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csRow.setFont(fontNormale);

		XSSFCellStyle csCellUser = wb.createCellStyle();
		csCellUser.setFillForegroundColor(new XSSFColor(new byte[] {
				(byte) 221, (byte) 235, (byte) 247 }));
		csCellUser.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csCellUser.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csCellUser.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csCellUser.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csCellUser.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csCellUser.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		csCellUser.setFont(fontNormale);

		XSSFCellStyle csStyleNumber = wb.createCellStyle();
		csStyleNumber.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csStyleNumber.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csStyleNumber.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csStyleNumber.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csStyleNumber.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		XSSFCellStyle csStyleTotale = wb.createCellStyle();
		csStyleTotale.setFillForegroundColor(new XSSFColor(new byte[] {
				(byte) 0, (byte) 176, (byte) 80 }));
		csStyleTotale.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
		csStyleTotale.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		csStyleTotale.setBorderTop(HSSFCellStyle.BORDER_THIN);
		csStyleTotale.setBorderRight(HSSFCellStyle.BORDER_THIN);
		csStyleTotale.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		csStyleTotale.setAlignment(HSSFCellStyle.ALIGN_CENTER);

		Date fromDate = DateUtils.getFirstDayOfMont();
		Date toDate = DateUtils.getLastDayOfMonth();
		cell.setCellValue("Mensuel");
		sheet.setColumnWidth(cell.getColumnIndex(), (short) (50 * 200));
		cell.setCellStyle(csStyleTitre);
		row = sheet.createRow(rowIndex++);
		cell = row.createCell((short) 1);
		cell.setCellType(Cell.CELL_TYPE_STRING);
		cell.setCellValue("Nombre de CVs mis par chaque sourceur dans le mois avec le nombre de CVs trouvés dans chaque outil");
		cell.setCellStyle(csStyleSousTitre);
		row = sheet.createRow(rowIndex++);
		for (j = 0; j < utilisateurs.size(); j++) {
			cell = row.createCell((short) j + 2);
			sheet.setColumnWidth(cell.getColumnIndex(), (short) (50 * 100));
			cell.setCellValue(utilisateurs.get(j).getNom() + " "
					+ utilisateurs.get(j).getPrenom());
			cell.setCellStyle(csCellUser);
		}
		cell = row.createCell((short) j + 2);
		cell.setCellValue("TOTAL");
		cell.setCellStyle(csCellUser);
		List<Integer> totParSrcParOrigine = new ArrayList<>();
		for (j = 0; j < utilisateurs.size(); j++) {
			totParSrcParOrigine.add(0);
		}
		for (i = 0; i < origines.size(); i++) {
			row = sheet.createRow(rowIndex++);
			cell = row.createCell(1);
			cell.setCellValue(origines.get(i).getLibelle());
			cell.setCellStyle(csRow);
			int totale = 0;
			for (j = 0; j < utilisateurs.size(); j++) {
				int valeur = utilisateurService.nbrCVParSourceurParOrigine(
						utilisateurs.get(j), origines.get(i), fromDate, toDate,
						false);
				cell = row.createCell(j + 2);
				cell.setCellValue(valeur);
				cell.setCellStyle(csStyleNumber);
				totale = totale + valeur;
				totParSrcParOrigine.set(j, totParSrcParOrigine.get(j) + valeur);
			}
			cell = row.createCell(j + 2);
			cell.setCellValue(totale);
			cell.setCellStyle(csStyleNumber);
		}
		row = sheet.createRow(rowIndex++);
		cell = row.createCell(1);
		cell.setCellValue("TOTAL");
		cell.setCellStyle(csStyleTotale);
		int totSrcsOrigines = 0;
		for (j = 0; j < totParSrcParOrigine.size(); j++) {
			cell = row.createCell(j + 2);
			cell.setCellValue(totParSrcParOrigine.get(j));
			cell.setCellStyle(csStyleTotale);
			totSrcsOrigines = totSrcsOrigines + totParSrcParOrigine.get(j);
		}
		cell = row.createCell(j + 2);
		cell.setCellValue(totSrcsOrigines);
		cell.setCellStyle(csStyleTotale);
		csStyleTitre.setWrapText(true);

		sheet.createRow(rowIndex++);
		sheet.createRow(rowIndex++);
		sheet.createRow(rowIndex++);
		row = sheet.createRow(rowIndex++);
		cell = row.createCell((short) 1);
		cell.setCellType(Cell.CELL_TYPE_STRING);
		cell.setCellValue("Nombre de CVs hors cible par sourceur dans le mois (ce qui nous permettra de mesurer la qualité de profils mis dans l’outil)");
		cell.setCellStyle(csStyleSousTitre);
		row = sheet.createRow(rowIndex++);
		for (j = 0; j < utilisateurs.size(); j++) {
			cell = row.createCell((short) j + 2);
			sheet.setColumnWidth(cell.getColumnIndex(), (short) (50 * 100));
			cell.setCellValue(utilisateurs.get(j).getNom() + " "
					+ utilisateurs.get(j).getPrenom());
			cell.setCellStyle(csCellUser);
		}
		cell = row.createCell((short) j + 2);
		cell.setCellValue("TOTAL");
		cell.setCellStyle(csCellUser);
		List<Integer> totHorsCible = new ArrayList<>();
		for (j = 0; j < utilisateurs.size(); j++) {
			totHorsCible.add(0);
		}
		for (i = 0; i < origines.size(); i++) {
			row = sheet.createRow(rowIndex++);
			cell = row.createCell(1);
			cell.setCellValue(origines.get(i).getLibelle());
			cell.setCellStyle(csRow);
			int totale = 0;
			for (j = 0; j < utilisateurs.size(); j++) {
				int valeur = utilisateurService.nbrCVParSourceurParOrigine(
						utilisateurs.get(j), origines.get(i), fromDate, toDate,
						true);
				cell = row.createCell(j + 2);
				cell.setCellValue(valeur);
				cell.setCellStyle(csStyleNumber);
				totale = totale + valeur;
				totHorsCible.set(j, totHorsCible.get(j) + valeur);
			}
			cell = row.createCell(j + 2);
			cell.setCellValue(totale);
			cell.setCellStyle(csStyleNumber);
		}
		row = sheet.createRow(rowIndex++);
		cell = row.createCell(1);
		cell.setCellValue("TOTAL");
		cell.setCellStyle(csStyleTotale);
		int totCvsHorsCible = 0;
		for (j = 0; j < totHorsCible.size(); j++) {
			cell = row.createCell(j + 2);
			cell.setCellValue(totHorsCible.get(j));
			cell.setCellStyle(csStyleTotale);
			totCvsHorsCible = totCvsHorsCible + totHorsCible.get(j);
		}
		cell = row.createCell(j + 2);
		cell.setCellValue(totCvsHorsCible);
		cell.setCellStyle(csStyleTotale);
		csStyleTitre.setWrapText(true);
		return wb;
	}
}