package com.xmlparser.payload.request;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JacksonXmlRootElement(localName = "product")
public class Product {
	private String id;
	private String category;
	private String name;
	private int quantity;
	
	public Product(String id, String category, String name, int quantity) {
		super();
		this.id = id;
		this.category = category;
		this.name = name;
		this.quantity = quantity;
	}
}
