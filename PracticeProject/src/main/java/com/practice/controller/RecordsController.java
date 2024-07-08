package com.practice.controller;

import static com.practice.security.CipherSecurity.decrypt;
import static com.practice.security.CipherSecurity.encrypt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.practice.entity.Book;
import com.practice.entity.AssignBookRecords;
import com.practice.entity.User;
import com.practice.form.UserBook;
import com.practice.service.BookRecordService;
import com.practice.service.BookService;
import com.practice.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class RecordsController {
	
	@Autowired
	BookRecordService bookRecordService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	BookService bookService;

	@RequestMapping(value = "/assignBook", method = {RequestMethod.POST, RequestMethod.GET})
	public String assignBook(HttpServletRequest request, HttpServletResponse response, Model model, @ModelAttribute("userBook") UserBook assignBook) {
		UserBook userBook = new UserBook();
		String action = "";
		List<User> userList = null;
		List<Book> bookList = null;
		
		if(request.getParameter("Action") != null) {
			action = decrypt(request.getParameter("Action"));
		}
		
		switch (action) {
		case "FORM":
			userList = userService.getAllUser();
			bookList = bookService.getBookList();
			
			model.addAttribute("userList", userList);
			model.addAttribute("bookList", bookList);
			model.addAttribute("userBook", userBook);
			break;
			
		case "ADD":
			if(bookRecordService.assignBook(assignBook)) {
				return "HomePage";
			}
			break;

		default:
			break;
		}
		
		
		return "AssignBook";
	}
	
	@RequestMapping(value = "/returnbook", method = RequestMethod.GET)
	public String returnBook(HttpServletRequest request, Model model) {
		String encryptedid = request.getParameter("id");
		Long id;
		String message = "";
		
		if(encryptedid != null) {
			id = Long.parseLong(decrypt(encryptedid));
			
			if(bookRecordService.returnBook(id)) {
				message = encrypt("Book returned successfully");
				return "redirect:/assignedBookList?message=" + message;
			}else {
				message = encrypt("Book return failed");
				return "redirect:/assignedBookList?message=" + message;
			}
		}else {
			message = encrypt("Record does not exist. Please try again");
			return "redirect:/assignedBookList?errorMessage=" + message;
		}
		
	}
	
	@RequestMapping(value = "/assignedBookList", method = RequestMethod.GET)
	public String viewBookList(HttpServletRequest request, Model model) {
		List<AssignBookRecords> bookRecords = null;
		String message = request.getParameter("message");

		
		if(message != null) {
			message = decrypt(message);
			if(message.contains("success")) {
				model.addAttribute("message", message);
			}else {
				model.addAttribute("errorMessage", message);
			}
		}
		
		bookRecords = bookRecordService.getAssignedBookRecords();
		
		model.addAttribute("assignedBooks", bookRecords);
		return "AssignedBookList";
	}
}
