package com.xmlparser.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.xmlparser.entity.Orders;
import com.xmlparser.entity.Products;
import com.xmlparser.entity.Users;
import com.xmlparser.payload.request.Order;
import com.xmlparser.payload.request.OrderDto;
import com.xmlparser.payload.request.Product;
import com.xmlparser.payload.response.OrdersResponse;
import com.xmlparser.repository.OrderRepository;
import com.xmlparser.repository.ProductRepository;
import com.xmlparser.repository.UserRepository;

@Service
public class XmlFileService {
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	OrderRepository orderRepo;
	
	@Autowired
	ProductRepository productRepo;
	
	@Autowired
	EntityManager entityManager;

	public List<OrdersResponse> readXmlFile(long userId, MultipartFile request) throws IOException {
			  
			  Optional<Users> optional = userRepo.findById(userId);
				if(optional.isPresent()) {
					
					String content = new String(request.getBytes());
					 XmlMapper xmlMapper = new XmlMapper();
					 Order value = xmlMapper.readValue(content, Order.class);
					 
					 Orders order = new Orders();
					 order.setAddedBy(optional.get());
					 order.setAddedAt(LocalDateTime.now());
					 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
					 LocalDate dateTime = LocalDate.parse(value.getDue_date(), formatter);
					 order.setAccount(value.getAccount());
					 order.setDueDate(dateTime);
					 order.setProductsList(formProductList(value.getProduct()));
					 System.out.println(value);
					System.out.println(content);
					return formOrderResponse(orderRepo.save(order));
				}
			  return null;
	}
	
	private List<Products> formProductList(List<Product> productDto){
		//return productDto.stream().filter(each -> !isProductAlreadyAdded(each.getId()))
		//		.map(e -> new Products(Long.parseLong(e.getId()), e.getCategory(), e.getName(), e.getQuantity()))
		//		.collect(Collectors.toList());
		List<Products> prodList = new ArrayList<Products>();
		for(Product e : productDto) {
			if(!isProductAlreadyAdded(e.getId())) {
				prodList.add(new Products(Long.parseLong(e.getId()), e.getCategory(), e.getName(), e.getQuantity()));
			} else {
				prodList.add(productRepo.findById(Long.parseLong(e.getId())).get());
			}
		}
		return prodList;
	}
	
	private boolean isProductAlreadyAdded(String id) {
		return productRepo.findById(Long.parseLong(id)).isPresent();
	}
	
	private List<OrdersResponse> formOrderResponse(Orders order) {
		List<OrdersResponse> list = new ArrayList<OrdersResponse>();
		for (Products prod : order.getProductsList()) {
			OrdersResponse res = new OrdersResponse();
			res.setAccount(order.getAccount());
			res.setDueDate(order.getDueDate());
			res.setProductId(prod.getId());
			res.setName(prod.getName());
			res.setCategory(prod.getCategory());
			res.setQuantity(prod.getQuantity());
			list.add(res);
		}
		return list;
	}
	
	private List<OrdersResponse> formOrderDtoResponse(Set<OrderDto> order) {
		List<OrdersResponse> list = new ArrayList<OrdersResponse>();
		for (OrderDto each : order) {
			OrdersResponse res = new OrdersResponse();
			res.setAccount(each.getAccount());
			System.out.println(each.getDD());
			System.out.println(each.getAddedAt());
			res.setDueDate(LocalDate.parse(each.getDD()));
			res.setProductId(each.getId());
			res.setName(each.getName());
			res.setCategory(each.getCategory());
			res.setQuantity(each.getQuantity());
			list.add(res);
		}
		return list;
	}

	public List<OrdersResponse> readOrderData(String name, String category, LocalDate startDate, LocalDate endDate) {
		System.out.println(startDate);
		List<Orders> list = null;
		List<OrdersResponse> lists = new ArrayList<OrdersResponse>();
		if(!name.trim().equals("") && !category.equals("") && startDate != null && endDate != null) {
			Set<OrderDto> set = orderRepo.findAllByAccountOrProductsListNameOrCategoryAndStartAndEndDate(name, name, category, startDate, endDate);;
			return formOrderDtoResponse(set);
		} else if(!name.trim().equals("") && !category.equals("")) {
			Set<OrderDto> set = orderRepo.findAllByAccountOrProductsListNameOrCategory(name, name, category);
			return formOrderDtoResponse(set);
		} else if(!name.trim().equals("") && category.equals("") && startDate != null && endDate != null) {
			Set<OrderDto> set = orderRepo.findAllByAccountOrProductsNameAndStartAndEndDate(name, startDate, endDate);
			return formOrderDtoResponse(set);
		} else if(!name.trim().equals("") && category.equals("")) {
			Set<OrderDto> set = orderRepo.findAllByAccountOrProductsListName(name, name);
			return formOrderDtoResponse(set);
		} else if(name.trim().equals("") && !category.equals("") && startDate != null && endDate != null) {
			Set<OrderDto> set = orderRepo.findAllByProductsCategoryAndStartAndEndDate(category, startDate, endDate);
			return formOrderDtoResponse(set);
		} else if(name.trim().equals("") && !category.equals("")) {
			Set<OrderDto> set = orderRepo.findAllByProductsCategory(category);
			return formOrderDtoResponse(set);
		} else if(name.equals("") && category.equals("") && startDate != null && endDate != null) {
			Set<OrderDto> set = orderRepo.findAllByStartAndEndDate(startDate, endDate);
			return formOrderDtoResponse(set);
		} else if(name.equals("") && category.equals("")) {
			list = orderRepo.findAll();
			return list.stream().map(each -> formOrderResponse(each)).collect(Collectors.toList()).stream()
					.flatMap(Collection::stream).collect(Collectors.toList());
		}
		
		return lists;
		
		
	}

	public List<String> getAllCategory() {
		return productRepo.findDistinctCategories();
	}
	
	public List<OrdersResponse> getAllByCategory(String category) {
		Set<OrderDto> set = orderRepo.findAllByOrderByCategoryAsc(category);
		return formOrderDtoResponse(set);
	}
	
	public List<OrdersResponse> getAllByAccount(String account) {
		Set<OrderDto> set = orderRepo.findAllByOrderByAccountAsc(account);
		return formOrderDtoResponse(set);
	}
	
	public List<OrdersResponse> getAllByDate() {
		Set<OrderDto> set = orderRepo.findAllByOrderByDateAsc();
		return formOrderDtoResponse(set);
	}

}
