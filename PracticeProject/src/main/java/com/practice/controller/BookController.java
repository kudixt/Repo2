package com.practice.controller;

import static com.practice.security.CipherSecurity.encrypt;

import java.util.List;

import static com.practice.security.CipherSecurity.decrypt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.practice.entity.Book;
import com.practice.entity.User;
import com.practice.form.UserBook;
import com.practice.security.CipherSecurity;
import com.practice.service.BookRecordService;
import com.practice.service.BookService;
import com.practice.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class BookController {
	
	@Autowired
	BookService bookService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	BookRecordService bookRecordService;
	
	
	@RequestMapping(value = "/bookList", method = RequestMethod.GET)
	public String viewBook(HttpServletRequest request, Model model) {
		List<Book> bookList = null;
		String encryptedMessage = "";
		String message = "";
		encryptedMessage = request.getParameter("message");
		
		if(encryptedMessage != null) {
			message = decrypt(encryptedMessage);
			model.addAttribute("message", message);
		}
		
		bookList = bookService.getBookList();
		
		model.addAttribute("bookList", bookList);
		return "BookList";
	}

	@RequestMapping(value = "/addBook", method = RequestMethod.GET)
	public String addBookForm(HttpServletRequest request, Model model) {
		Book book = new Book();
		
		model.addAttribute("book", book);
		return "AddBook";
	}
	
	@RequestMapping(value = "/addBook", method = RequestMethod.POST)
	public String addBook(HttpServletRequest request, HttpServletResponse response, Model model,
			@ModelAttribute("book") Book book) {
		String message = "";
		if(bookService.addBook(book)) {
			message = encrypt("Book Added Successfully");
			return "redirect:/bookList?message=" + message;
		}
		return "Error";
	}
	
}
