package com.xmlparser.payload.request;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JacksonXmlRootElement(localName = "order")
public class Order {
	private String account;
	private String due_date;
	@JacksonXmlElementWrapper(useWrapping = false)
	private List<Product> product;
}
