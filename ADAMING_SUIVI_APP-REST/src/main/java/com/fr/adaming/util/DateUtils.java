package com.fr.adaming.util;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

public class DateUtils {
	
	private DateUtils() {
	    throw new IllegalStateException("Utility class");
	  }

	
	DateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
	
	public static Date getYesterday() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, -1);
		return cal.getTime();
	}

	public static Date getFirstDayOfWeek() {
		Calendar calendar = GregorianCalendar.getInstance(Locale.FRANCE);
		calendar.add(Calendar.DATE, -1);
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		return calendar.getTime();
	}
	public static Date getLastDayOfWeek() {
		Calendar calendar = GregorianCalendar.getInstance(Locale.FRANCE);
		calendar.add(Calendar.DATE, -1);
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		return calendar.getTime();
	}
	public static int getCurrentDayOfWeek() {
		Calendar calendar = GregorianCalendar.getInstance(Locale.FRANCE);
		calendar.add(Calendar.DATE, -1);
		return calendar.get(Calendar.DAY_OF_WEEK);
	}

	public static int getWeekNumber(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.WEEK_OF_YEAR);
	}
	
	public static Date getFirstDayOfMont() {
		Calendar calendar = GregorianCalendar.getInstance(Locale.FRANCE);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		return calendar.getTime();
	}

	public static Date getLastDayOfMonth() {
		Calendar calendar = GregorianCalendar.getInstance(Locale.FRANCE);
		calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
		return calendar.getTime();
	}
}