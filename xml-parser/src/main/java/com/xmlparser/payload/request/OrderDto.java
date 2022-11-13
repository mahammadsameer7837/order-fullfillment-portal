package com.xmlparser.payload.request;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;


public interface OrderDto {

	String getAccount();
	
	String getDD();

	String getFirstName();

	String getLastName();

	LocalDateTime getAddedAt();

	long getId();

	String getCategory();

	String getName();

	int getQuantity();

}
