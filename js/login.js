document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('loginForm');
            const errorMessage = document.getElementById('errorMessage');
            const errorText = document.getElementById('errorText');
            const successMessage = document.getElementById('successMessage');
            const passwordToggle = document.getElementById('passwordToggle');
            const passwordInput = document.getElementById('password');
            const usernameInput = document.getElementById('username');
            const loginButton = document.getElementById('loginButton');
            const buttonText = document.getElementById('buttonText');
            const buttonLoading = document.getElementById('buttonLoading');
            const usernameError = document.getElementById('usernameError');
            const passwordError = document.getElementById('passwordError');
            const attemptsWarning = document.getElementById('attemptsWarning');
            const attemptsLeft = document.getElementById('attemptsLeft');
            
            let loginAttempts = 0;
            const maxAttempts = 3;
            
            // Alternar visibilidad de contraseña
            passwordToggle.addEventListener('click', function() {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    passwordToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    passwordInput.type = 'password';
                    passwordToggle.innerHTML = '<i class="fas fa-eye"></i>';
                }
                passwordInput.focus();
            });
            
            // Validación en tiempo real
            usernameInput.addEventListener('blur', function() {
                if (!usernameInput.value.trim()) {
                    usernameError.style.display = 'block';
                    usernameInput.classList.add('error');
                } else {
                    usernameError.style.display = 'none';
                    usernameInput.classList.remove('error');
                }
            });
            
            passwordInput.addEventListener('blur', function() {
                if (!passwordInput.value) {
                    passwordError.style.display = 'block';
                    passwordInput.classList.add('error');
                } else {
                    passwordError.style.display = 'none';
                    passwordInput.classList.remove('error');
                }
            });
            
            // Manejar envío del formulario
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validación básica
                let isValid = true;
                
                if (!usernameInput.value.trim()) {
                    usernameError.style.display = 'block';
                    usernameInput.classList.add('error');
                    isValid = false;
                }
                
                if (!passwordInput.value) {
                    passwordError.style.display = 'block';
                    passwordInput.classList.add('error');
                    isValid = false;
                }
                
                if (!isValid) {
                    return;
                }
                
                // Mostrar estado de carga
                buttonText.style.display = 'none';
                buttonLoading.style.display = 'inline-block';
                loginButton.disabled = true;
                
                // Simular proceso de autenticación (en un caso real, esto se haría con el servidor)
                setTimeout(function() {
                    const username = usernameInput.value;
                    const password = passwordInput.value;
                    
                    // En un caso real, estas credenciales se verificarían contra una base de datos
                    // mediante una solicitud segura al servidor
                    const validUsername = 'Anthony Romero';
                    const validPassword = 'admin';
                    
                    if (username === validUsername && password === validPassword) {
                        // Mostrar mensaje de éxito
                        errorMessage.style.display = 'none';
                        attemptsWarning.style.display = 'none';
                        successMessage.style.display = 'block';
                        loginAttempts = 0;
                        
                        // Guardar estado de autenticación
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('username', username);
                        
                        // Redirección a la página principal
                        setTimeout(function() {
                            window.location.href = 'index.html';
                        }, 1000);
                    } else {
                        loginAttempts++;
                        
                        // Mostrar mensaje de error
                        errorMessage.style.display = 'block';
                        successMessage.style.display = 'none';
                        
                        // Mostrar advertencia de intentos
                        if (loginAttempts >= maxAttempts) {
                            errorText.textContent = 'Demasiados intentos fallidos. Por favor, contacte al administrador.';
                            loginButton.disabled = true;
                            setTimeout(function() {
                                loginButton.disabled = false;
                                loginAttempts = 0;
                                attemptsWarning.style.display = 'none';
                                errorText.textContent = 'Credenciales incorrectas. Por favor, intente nuevamente.';
                            }, 60000); // Reactivar después de 1 minuto
                        } else {
                            attemptsLeft.textContent = maxAttempts - loginAttempts;
                            attemptsWarning.style.display = 'block';
                        }
                        
                        // Restablecer botón
                        buttonText.style.display = 'inline';
                        buttonLoading.style.display = 'none';
                        loginButton.disabled = false;
                        
                        // Ocultar mensaje después de 5 segundos
                        setTimeout(function() {
                            errorMessage.style.display = 'none';
                        }, 5000);
                    }
                }, 1500); // Simular tiempo de espera del servidor
            });
            
            // Cargar usuario guardado si existe
            const savedUsername = localStorage.getItem('dataImportUsername');
            const rememberMe = localStorage.getItem('dataImportRemember') === 'true';
            
            if (savedUsername && rememberMe) {
                usernameInput.value = savedUsername;
                document.getElementById('rememberMe').checked = true;
            }
            
            // Guardar usuario si la casilla está marcada
            document.getElementById('rememberMe').addEventListener('change', function() {
                if (this.checked) {
                    localStorage.setItem('dataImportUsername', usernameInput.value);
                    localStorage.setItem('dataImportRemember', 'true');
                } else {
                    localStorage.removeItem('dataImportUsername');
                    localStorage.removeItem('dataImportRemember');
                }
            });

            // Verificar si ya está autenticado
            if (localStorage.getItem('isLoggedIn') === 'true') {
                window.location.href = 'dashboard.html';
            }
        });