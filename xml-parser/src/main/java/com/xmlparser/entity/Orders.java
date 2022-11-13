package com.xmlparser.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
public class Orders {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  
  @OneToOne
  @JoinColumn(name = "added_by")
  private Users addedBy;
  
  private String account;
  
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = JsonFormat.DEFAULT_TIMEZONE)
  private LocalDate  dueDate;
  
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss", timezone = JsonFormat.DEFAULT_TIMEZONE)
  private LocalDateTime  addedAt;
  
    //@JsonIgnore
	@ManyToMany(targetEntity = Products.class, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
	@JoinTable(name="orders_products_map", 
			joinColumns = {
					@JoinColumn(name = "orderId", referencedColumnName = "id")}, inverseJoinColumns = {
					@JoinColumn(name = "productId", referencedColumnName = "id")
			})
  private List<Products> productsList;

}
