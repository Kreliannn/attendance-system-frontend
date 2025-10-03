import Swal from "sweetalert2";
import { successAlert } from "./alert";

export const changePasswordModal = (email : string, callback : (password : string) => void) => {
    Swal.fire({
      title: "Change Password",
      html: `
        <input id="new-pass" type="password" class="swal2-input" placeholder="New Password"/>
        <input id="confirm-pass" type="password" class="swal2-input" placeholder="Confirm Password"/>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: () => {
        const newPass = (document.getElementById("new-pass") as HTMLInputElement).value;
        const confirmPass = (document.getElementById("confirm-pass") as HTMLInputElement).value;
  
        if (!newPass || !confirmPass) {
          Swal.showValidationMessage("Please fill in both fields");
          return false;
        }
        if (newPass !== confirmPass) {
          Swal.showValidationMessage("Passwords do not match");
          return false;
        }
        return newPass; // return the password
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("New Password:", result.value); 
        callback(result.value)
      }
    });
  }

export const verificationCodeModal = (pin : string, callback : () => void) => {
    Swal.fire({
      title: "Enter Verification Code",
      input: "text",
      inputPlaceholder: "Enter your code",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "Please enter the code";
        }
        if (value !== String(pin)) {
          return "Incorrect code, please try again";
        }
        return null; 
      }
    }).then((result) => {
      if (result.isConfirmed) {
        successAlert("correct pin")
        callback()
      }
    });
  }

export const submitEmailModal = (callback : (email : string) => void) => {
    Swal.fire({
      title: "Forgot Password",
      input: "email", // 🔹 SweetAlert input type
      inputPlaceholder: "Enter your email",
      text: "We will send a verification code to this email.",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "Please enter your email address";
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value; // ✅ SweetAlert gives the value here
        callback(email)
      }
    });
  }
  