package com.xmlparser.repository;

import java.time.LocalDate;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.xmlparser.entity.Orders;
import com.xmlparser.payload.request.OrderDto;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {
	
	//@Query(value = "SELECT * FROM orders WHERE account LIKE %?1%" , nativeQuery = true)
	@Query(value = "SELECT o.account, o.due_date as dd, u.first_name, u.last_name, o.added_at, p.id, p.category, p.name, p.quantity"
			+ " FROM"
			+ "    Orders o"
			+ "    JOIN orders_products_map op ON op.order_id = o.id"
			+ "    JOIN USERS u ON o.added_by = u.id"
			+ "    JOIN Products p ON p.id = op.product_id AND (p.name LIKE %?2% OR o.account LIKE %?1% )"
			+ " ORDER BY o.due_date DESC", nativeQuery = true)
	Set<OrderDto> findAllByAccountOrProductsListName(String account, String name);
	
	@Query(value = "SELECT o.account, o.due_date as dd, u.first_name, u.last_name, o.added_at, p.id, p.category, p.name, p.quantity"
			+ " FROM"
			+ "    Orders o"
			+ "    JOIN orders_products_map op ON op.order_id = o.id"
			+ "    JOIN USERS u ON o.added_by = u.id"
			+ "    JOIN Products p ON p.id = op.product_id AND (p.category LIKE %?1%)"
			+ " ORDER BY o.due_date DESC", nativeQuery = true)
	Set<OrderDto> findAllByProductsCategory(String category);
	
	
	@Query(value = "SELECT o.account, o.due_date as dd, u.first_name, u.last_name, o.added_at, p.id, p.category, p.name, p.quantity"
			+ " FROM"
			+ "    Orders o"
			+ "    JOIN orders_products_map op ON op.order_id = o.id"
			+ "    JOIN USERS u ON o.added_by = u.id"
			+ "    JOIN Products p ON p.id = op.product_id AND (p.name LIKE %?2% OR o.account LIKE %?1% ) "
			+ " AND p.category LIKE %?3% "
			+ " ORDER BY o.due_date DESC", nativeQuery = true)
	Set<OrderDto> findAllByAccountOrProductsListNameOrCategory(String account, String name, String category);
	
	@Query(value = "SELECT o.account, o.due_date as dd, u.first_name, u.last_name, o.added_at, p.id, p.category, p.name, p.quantity"
			+ " FROM"
			+ "    Orders o"
			+ "    JOIN orders_products_map op ON op.order_id = o.id"
			+ "    JOIN USERS u ON o.added_by = u.id"
			+ "    JOIN Products p ON p.id = op.product_id AND (p.name LIKE %?2% OR o.account LIKE %?1% ) "
			+ " AND p.category LIKE %?3% AND o.due_date >=?4 AND o.due_date <=?5 "
			+ " ORDER BY o.due_date DESC", nativeQuery = true)
	Set<OrderDto> findAllByAccountOrProductsListNameOrCategoryAndStartAndEndDate(String account, String name, String category, LocalDate startDate, LocalDate endDate);
	
	
	
	@Query(value = "SELECT o.account, o.due_date as dd, u.first_name, u.last_name, o.added_at, p.id, p.category, p.name, p.quantity"
			+ " FROM"
			+ "    Orders o"
			+ "    JOIN orders_products_map op ON op.order_id = o.id"
			+ "    JOIN USERS u ON o.added_by = u.id"
			+ "    JOIN Products p ON p.id = op.product_id AND (p.name LIKE %?1% OR o.account LIKE %?1% ) "
			+ " AND o.due_date >=?2 AND o.due_date <=?3 "
			+ " ORDER BY o.due_date DESC", nativeQuery = true)
	Set<OrderDto> findAllByAccountOrProductsNameAndStartAndEndDate(String name, LocalDate startDate, LocalDate endDate);
	
	@Query(value = "SELECT o.account, o.due_date as dd, u.first_name, u.last_name, o.added_at, p.id, p.category, p.name, p.quantity"
			+ " FROM"
			+ "    Orders o"
			+ "    JOIN orders_products_map op ON op.order_id = o.id"
			+ "    JOIN USERS u ON o.added_by = u.id"
			+ "    JOIN Products p ON p.id = op.product_id "
			+ " AND p.category LIKE %?1% AND o.due_date >=?2 AND o.due_date <=?3 "
			+ " ORDER BY o.due_date DESC", nativeQuery = true)
	Set<OrderDto> findAllByProductsCategoryAndStartAndEndDate(String category, LocalDate startDate, LocalDate endDate);
	
	
	@Query(value = "SELECT o.account, o.due_date as dd, u.first_name, u.last_name, o.added_at, p.id, p.category, p.name, p.quantity"
			+ " FROM"
			+ "    Orders o"
			+ "    JOIN orders_products_map op ON op.order_id = o.id"
			+ "    JOIN USERS u ON o.added_by = u.id"
			+ "    JOIN Products p ON p.id = op.product_id "
			+ " AND o.due_date >=?1 AND o.due_date <=?2 "
			+ " ORDER BY o.due_date DESC", nativeQuery = true)
	Set<OrderDto> findAllByStartAndEndDate( LocalDate startDate, LocalDate endDate);

	
	
	
	
	
	
	
	@Query(value = "SELECT o.account, o.due_date as dd, u.first_name, u.last_name, o.added_at, p.id, p.category, p.name, p.quantity"
			+ " FROM"
			+ "    Orders o"
			+ "    JOIN orders_products_map op ON op.order_id = o.id"
			+ "    JOIN USERS u ON o.added_by = u.id"
			+ "    JOIN Products p ON p.id = op.product_id "
			+ " AND p.category LIKE %?1%"
			+ " ORDER BY o.due_date DESC", nativeQuery = true)
	Set<OrderDto> findAllByOrderByCategoryAsc(String category);

	
	
	@Query(value = "SELECT o.account, o.due_date as dd, u.first_name, u.last_name, o.added_at, p.id, p.category, p.name, p.quantity"
			+ " FROM"
			+ "    Orders o"
			+ "    JOIN orders_products_map op ON op.order_id = o.id"
			+ "    JOIN USERS u ON o.added_by = u.id"
			+ "    JOIN Products p ON p.id = op.product_id AND o.account LIKE %?1% "
			+ " ORDER BY o.due_date DESC", nativeQuery = true)
	Set<OrderDto> findAllByOrderByAccountAsc(String account);

	
	@Query(value = "SELECT o.account, o.due_date as dd, u.first_name, u.last_name, o.added_at, p.id, p.category, p.name, p.quantity"
			+ " FROM"
			+ "    Orders o"
			+ "    JOIN orders_products_map op ON op.order_id = o.id"
			+ "    JOIN USERS u ON o.added_by = u.id"
			+ "    JOIN Products p ON p.id = op.product_id"
			+ " ORDER BY o.due_date DESC", nativeQuery = true)
	Set<OrderDto> findAllByOrderByDateAsc();
	
	
}
