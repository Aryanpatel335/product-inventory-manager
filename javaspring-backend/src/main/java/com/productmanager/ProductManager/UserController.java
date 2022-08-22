package com.productmanager.ProductManager;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController // This allows for automatic response body
@RequestMapping(path="/")
public class UserController{
    @Autowired

    private UserRepository userRepository;

    @PutMapping(path="/findUser")
    public boolean findUser(@RequestBody HashMap<String,String> user){



        User userFound = userRepository.checkUserInDatabase(user.get("subid"), user.get("email"));
        if (userFound ==null){
            return false;
        }
        return true;

    }

    @GetMapping(path="/allUsers")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }
}