package com.practice.controller;

import static com.practice.security.CipherSecurity.encrypt;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import static com.practice.security.CipherSecurity.decrypt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.practice.entity.AssignBookRecords;
import com.practice.service.BookRecordService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class CostController {
	
	@Autowired
	BookRecordService bookRecordService;
	
	@Autowired
	RecordsController recordsController;

	@RequestMapping(value = "/calculateCost", method = RequestMethod.GET)
	public Long costCalculator(HttpServletRequest request, Model model) {
		AssignBookRecords assignBookRecord = null;
		Long id;
		String encryptedid = request.getParameter("id");
		Long cost = null;
		
		if(encryptedid != null) {
			id = Long.parseLong(decrypt(encryptedid));
			
			assignBookRecord = bookRecordService.getAssignRecordById(id);
			
			Date assignDate = assignBookRecord.getAssignDate();
			Date todayDate = new Date();
			
			long diffInMillies = Math.abs(todayDate.getTime() - assignDate.getTime());

	        // Convert milliseconds to days
	        long diffInDays = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
	        
	        if(diffInDays > 1) {
	        	cost = diffInDays * 100;
	        }else {
	        	cost = 100L;
	        }
	        
	        model.addAttribute("cost", cost);
		}
		
		return cost;
	}
}
