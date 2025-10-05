// Función para generar ID de ticket (similar a la del sistema)
        function generateTicketId() {
            // Intentamos obtener los tickets existentes en localStorage
            let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
            let maxId = 12; // Empezar desde DI-012 como en el sistema

            tickets.forEach(ticket => {
                const idNum = parseInt(ticket.id.split('-')[1]);
                if (idNum > maxId) {
                    maxId = idNum;
                }
            });

            return 'DI-' + String(maxId + 1).padStart(3, '0');
        }

        document.getElementById('ticketForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar captcha
            if (!document.getElementById('notRobot').checked) {
                alert('Por favor, confirme que no es un robot.');
                return;
            }
            
            // Validar provincia
            const provinceSelect = document.getElementById('clientProvince');
            if (!provinceSelect.value) {
                alert('Por favor, seleccione una provincia.');
                provinceSelect.focus();
                return;
            }
            
            // Mapear la prioridad
            let priorityValue = document.getElementById('priority').value;
            let priority = priorityValue;
            
            // Si es crítico, forzar prioridad crítica
            if (document.getElementById('criticalStatus').checked) {
                priority = 'critical';
            }
            
            // Recopilar datos del formulario
            const formData = {
                clientName: document.getElementById('clientName').value,
                clientPhone: document.getElementById('clientPhone').value,
                clientEmail: document.getElementById('clientEmail').value,
                clientProvince: document.getElementById('clientProvince').value,
                equipmentName: document.getElementById('equipmentName').value,
                serialNumber: document.getElementById('serialNumber').value,
                problemDescription: document.getElementById('problemDescription').value,
                incidentDate: document.getElementById('incidentDate').value,
                priority: priority
            };
            
            // Generar ID del ticket
            const ticketId = generateTicketId();
            
            // Crear objeto ticket con la estructura esperada por el sistema principal
            const newTicket = {
                id: ticketId,
                client: formData.clientName,
                phone: formData.clientPhone,
                email: formData.clientEmail,
                province: formData.clientProvince,
                equipment: formData.equipmentName,
                serial: formData.serialNumber,
                problem: formData.problemDescription,
                priority: formData.priority,
                technician: 'unassigned',
                status: 'new',
                timestamp: new Date().getTime(),
                incidentDate: new Date(formData.incidentDate).getTime() || new Date().getTime()
            };
            
            // Obtener tickets existentes
            let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
            
            // Agregar el nuevo ticket
            tickets.push(newTicket);
            
            // Guardar en localStorage
            localStorage.setItem('tickets', JSON.stringify(tickets));
            
            // Mostrar mensaje de éxito con el ID del ticket creado
            document.getElementById('createdTicketId').textContent = ticketId;
            document.getElementById('successAlert').style.display = 'block';
            
            // Ocultar el formulario
            document.getElementById('ticketForm').style.display = 'none';
        });

        // Botón para crear otro ticket
        document.getElementById('createAnotherBtn').addEventListener('click', function() {
            // Mostrar el formulario
            document.getElementById('ticketForm').style.display = 'block';
            
            // Ocultar el mensaje de éxito
            document.getElementById('successAlert').style.display = 'none';
            
            // Resetear el formulario
            document.getElementById('ticketForm').reset();
            
            // Restablecer la fecha actual
            document.getElementById('incidentDate').valueAsDate = new Date();
            
            // Restablecer contadores
            document.getElementById('nameCount').textContent = '0';
            document.getElementById('descCount').textContent = '0';
            
            // Asegurarse de que el campo de prioridad esté habilitado
            document.getElementById('priority').disabled = false;
            
            // Ocultar información de provincia
            document.querySelectorAll('.province-info').forEach(function(el) {
                el.style.display = 'none';
            });
        });

        // Contador de caracteres
        document.getElementById('clientName').addEventListener('input', function() {
            document.getElementById('nameCount').textContent = this.value.length;
        });
        
        document.getElementById('problemDescription').addEventListener('input', function() {
            document.getElementById('descCount').textContent = this.value.length;
        });
        
        // Establecer fecha actual por defecto
        document.getElementById('incidentDate').valueAsDate = new Date();
        
        // Manejar cambio de provincia
        document.getElementById('clientProvince').addEventListener('change', function() {
            document.querySelectorAll('.province-info').forEach(function(el) {
                el.style.display = 'none';
            });
            
            if (this.value === 'santo-domingo') {
                document.getElementById('santoDomingoInfo').style.display = 'block';
            } else if (this.value === 'santiago') {
                document.getElementById('santiagoInfo').style.display = 'block';
            }
        });

        // Si el checkbox de crítico está marcado, establecer prioridad como crítica
        document.getElementById('criticalStatus').addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('priority').value = 'critical';
                document.getElementById('priority').disabled = true;
            } else {
                document.getElementById('priority').disabled = false;
                document.getElementById('priority').value = 'medium';
            }
        });