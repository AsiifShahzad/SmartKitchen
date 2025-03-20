document.addEventListener('DOMContentLoaded', function() {
      // Tab switching functionality
      const tabTriggers = document.querySelectorAll('.tab-trigger');
      const tabContents = document.querySelectorAll('.tab-content');
      
      tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
          // Remove active class from all triggers and contents
          tabTriggers.forEach(t => t.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));
          
          // Add active class to clicked trigger and corresponding content
          trigger.classList.add('active');
          const tabId = trigger.getAttribute('data-tab');
          document.getElementById(`${tabId}-content`).classList.add('active');
        });
      });
      
      // Toggle password visibility
      const togglePasswordButtons = [
        document.getElementById('signin-toggle-password'),
        document.getElementById('signup-toggle-password'),
        document.getElementById('signup-toggle-confirm-password')
      ];
      
      togglePasswordButtons.forEach(button => {
        if (button) {
          button.addEventListener('click', () => {
            const input = button.closest('.relative').querySelector('input');
            const eyeIcon = button.querySelector('.eye-icon');
            const eyeOffIcon = button.querySelector('.eye-off-icon');
            
            if (input.type === 'password') {
              input.type = 'text';
              eyeIcon.classList.add('hidden');
              eyeOffIcon.classList.remove('hidden');
            } else {
              input.type = 'password';
              eyeIcon.classList.remove('hidden');
              eyeOffIcon.classList.add('hidden');
            }
          });
        }
      });
      
      // Forgot password link
      const forgotPasswordLink = document.getElementById('forgot-password-link');
      const authContainer = document.getElementById('auth-container');
      const forgotPasswordContainer = document.getElementById('forgot-password-container');
      const resetSuccessContainer = document.getElementById('reset-success-container');
      
      forgotPasswordLink.addEventListener('click', () => {
        authContainer.classList.add('hidden');
        forgotPasswordContainer.classList.remove('hidden');
      });
      
      // Cancel forgot password
      const forgotCancelButton = document.getElementById('forgot-cancel-button');
      
      forgotCancelButton.addEventListener('click', () => {
        forgotPasswordContainer.classList.add('hidden');
        authContainer.classList.remove('hidden');
      });
      
      // Back to sign in from reset success
      const backToSignInButton = document.getElementById('back-to-signin-button');
      
      backToSignInButton.addEventListener('click', () => {
        resetSuccessContainer.classList.add('hidden');
        authContainer.classList.remove('hidden');
      });
      
      // Form validation and submission
      const signInForm = document.getElementById('sign-in-form');
      const signUpForm = document.getElementById('sign-up-form');
      const forgotPasswordForm = document.getElementById('forgot-password-form');
      
      // Sign In Form Submission
      signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset previous errors
        clearErrors('signin');
        
        // Get form values
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Validate form
        let isValid = true;
        
        if (!validateEmail(email)) {
          showError('signin-email', 'Please enter a valid email address');
          isValid = false;
        }
        
        if (password.length < 8) {
          showError('signin-password', 'Password must be at least 8 characters');
          isValid = false;
        }
        
        if (isValid) {
          // Show loading state
          const signInButton = document.getElementById('signin-button');
          const signInButtonText = document.getElementById('signin-button-text');
          const signInSpinner = document.getElementById('signin-spinner');
          
          signInButton.disabled = true;
          signInButtonText.classList.add('hidden');
          signInSpinner.classList.remove('hidden');
          
          // Simulate API call
          try {
            await simulateApiCall({ email, password, rememberMe });
            
            // Show success toast
            showToast('Signed in successfully!', 'Welcome to FreshTrack!');
            
            // Redirect to dashboard (simulated)
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 1500);
          } catch (error) {
            // Show error toast
            showToast('Authentication failed', 'Please check your credentials and try again.', true);
            
            // Reset button state
            signInButton.disabled = false;
            signInButtonText.classList.remove('hidden');
            signInSpinner.classList.add('hidden');
          }
        }
      });
      
      // Sign Up Form Submission
      signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset previous errors
        clearErrors('signup');
        
        // Get form values
        const username = document.getElementById('signup-username').value;
        const fullName = document.getElementById('signup-fullname').value;
        const email = document.getElementById('signup-email').value;
        const dateOfBirth = document.getElementById('signup-dob').value;
        const gender = document.getElementById('signup-gender').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const termsAccepted = document.getElementById('terms-accepted').checked;
        
        // Validate form
        let isValid = true;
        
        if (username.length < 3) {
          showError('signup-username', 'Username must be at least 3 characters');
          isValid = false;
        }
        
        if (fullName.length < 2) {
          showError('signup-fullname', 'Full name must be at least 2 characters');
          isValid = false;
        }
        
        if (!validateEmail(email)) {
          showError('signup-email', 'Please enter a valid email address');
          isValid = false;
        }
        
        if (!dateOfBirth) {
          showError('signup-dob', 'Please enter your date of birth');
          isValid = false;
        } else {
          // Check if user is at least 13 years old
          const dob = new Date(dateOfBirth);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();
          
          if (age < 13 || (age === 13 && monthDiff < 0)) {
            showError('signup-dob', 'You must be at least 13 years old');
            isValid = false;
          }
        }
        
        if (password.length < 8) {
          showError('signup-password', 'Password must be at least 8 characters');
          isValid = false;
        }
        
        if (password !== confirmPassword) {
          showError('signup-confirm-password', 'Passwords do not match');
          isValid = false;
        }
        
        if (!termsAccepted) {
          showError('terms-accepted', 'You must accept the terms and conditions');
          isValid = false;
        }
        
        if (isValid) {
          // Show loading state
          const signUpButton = document.getElementById('signup-button');
          const signUpButtonText = document.getElementById('signup-button-text');
          const signUpSpinner = document.getElementById('signup-spinner');
          
          signUpButton.disabled = true;
          signUpButtonText.classList.add('hidden');
          signUpSpinner.classList.remove('hidden');
          
          // Simulate API call
          try {
            await simulateApiCall({ 
              username, 
              fullName, 
              email, 
              dateOfBirth, 
              gender, 
              password,
              termsAccepted
            });
            
            // Show success toast
            showToast('Account created successfully!', 'Welcome to FreshTrack!');
            
            // Redirect to dashboard (simulated)
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 1500);
          } catch (error) {
            // Show error toast
            showToast('Registration failed', 'Please check your information and try again.', true);
            
            // Reset button state
            signUpButton.disabled = false;
            signUpButtonText.classList.remove('hidden');
            signUpSpinner.classList.add('hidden');
          }
        }
      });
      
      // Forgot Password Form Submission
      forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset previous errors
        clearErrors('forgot');
        
        // Get form values
        const email = document.getElementById('forgot-email').value;
        
        // Validate form
        let isValid = true;
        
        if (!validateEmail(email)) {
          showError('forgot-email', 'Please enter a valid email address');
          isValid = false;
        }
        
        if (isValid) {
          // Show loading state
          const forgotButton = document.getElementById('forgot-submit-button');
          const forgotButtonText = document.getElementById('forgot-button-text');
          const forgotSpinner = document.getElementById('forgot-spinner');
          
          forgotButton.disabled = true;
          forgotButtonText.classList.add('hidden');
          forgotSpinner.classList.remove('hidden');
          
          // Simulate API call
          try {
            await simulateApiCall({ email });
            
            // Show success toast
            showToast('Reset link sent!', 'Check your email for instructions to reset your password.');
            
            // Show success screen
            forgotPasswordContainer.classList.add('hidden');
            resetSuccessContainer.classList.remove('hidden');
          } catch (error) {
            // Show error toast
            showToast('Something went wrong', 'We couldn\'t send a reset link. Please try again.', true);
            
            // Reset button state
            forgotButton.disabled = false;
            forgotButtonText.classList.remove('hidden');
            forgotSpinner.classList.add('hidden');
          }
        }
      });
      
      // Helper functions
      function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
      
      function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add error class to input
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
          inputElement.classList.add('border-red-500');
        }
      }
      
      function clearErrors(prefix) {
        const errorElements = document.querySelectorAll(`[id^="${prefix}-"][id$="-error"]`);
        errorElements.forEach(element => {
          element.textContent = '';
          element.style.display = 'none';
        });
        
        // Remove error class from inputs
        const inputElements = document.querySelectorAll(`[id^="${prefix}-"]`);
        inputElements.forEach(element => {
          if (element.id.indexOf('-error') === -1) {
            element.classList.remove('border-red-500');
          }
        });
      }
      
      function showToast(title, message, isError = false) {
        const toastContainer = document.getElementById('toast-container');
        
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'toast-error' : ''}`;
        
        toast.innerHTML = `
          <div class="toast-title">${title}</div>
          <div class="toast-message">${message}</div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Remove toast after 5 seconds
        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => {
            toastContainer.removeChild(toast);
          }, 300);
        }, 5000);
      }
      
      async function simulateApiCall(data) {
        // Log the data that would be sent to the server
        console.log('API call data:', data);
        
        // Simulate network delay
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate successful API call (90% success rate)
            if (Math.random() < 0.9) {
              resolve({ success: true });
            } else {
              reject(new Error('API call failed'));
            }
          }, 1500);
        });
      }
    });
