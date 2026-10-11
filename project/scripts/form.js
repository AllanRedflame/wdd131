const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

confirmPassword.addEventListener('input', () => {
    if (confirmPassword.value !== password.value) {
        
        confirmPassword.setCustomValidity("Passwords do not match");
    
    } else {
        
        confirmPassword.setCustomValidity("");
    
    }
});