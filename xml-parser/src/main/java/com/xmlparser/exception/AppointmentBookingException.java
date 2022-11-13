package com.xmlparser.exception;

public class AppointmentBookingException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public AppointmentBookingException(String errorMessage) {  
    	super(errorMessage);  
    } 
	
}
