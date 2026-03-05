package Ecom.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Ecom.Model.User;
import Ecom.ModelDTO.AdminDTO;
import Ecom.ModelDTO.UserDTO;
import Ecom.Service.UserService;

@RestController
@RequestMapping("/ecom/admin")
public class AdminController {

    private final UserService userService;

    // Constructor for dependency injection
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    // Method to add a new user
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody AdminDTO user) {
        User addedUser = userService.addUserAdmin(user); // Add user via service
        return ResponseEntity.ok(addedUser); // Return added user
    }

    // Method to update user password
    @PutMapping("/updatepassword/{adminId}")
    public ResponseEntity<User> updateUserPassword(@PathVariable("adminId") Integer adminId,
            @RequestBody UserDTO userdto) {
        User updatedUser = userService.changePassword(adminId, userdto); // Update password via service
        return ResponseEntity.ok(updatedUser); // Return updated user
    }
}
