package com.xmlparser.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.xmlparser.entity.Products;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long> {
	
	@Query(value = "SELECT DISTINCT category FROM products" , nativeQuery = true)
	List<String> findDistinctCategories();
}
