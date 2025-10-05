// Variables globales
        let currentTicketId = null;
        let selectedStatus = null;
        let contextMenuTicketId = null;
        let selectedProvince = "all";
        let currentEquipmentId = null;
        let selectedEquipmentStatus = null;
        let currentInventoryTab = "lots";
        let ticketsSubmenuOpen = true; // El submenú de tickets está abierto por defecto

        // Datos iniciales de ejemplo
        const initialTickets = [
            {
                id: "DI-012",
                client: "Carlos Mendoza",
                phone: "809-555-0123",
                email: "carlos.mendoza@email.com",
                province: "santiago",
                equipment: "Servidor Dell",
                serial: "789XZ",
                problem: "No inicia, posible falla de disco.",
                priority: "critical",
                technician: "unassigned",
                status: "new",
                timestamp: new Date().getTime() - 15 * 60 * 1000, // Hace 15 minutos
                incidentDate: new Date().getTime() - 2 * 24 * 60 * 60 * 1000 // Hace 2 días
            },
            {
                id: "DI-010",
                client: "Fendi",
                phone: "809-555-4567",
                email: "contacto@fendi.com",
                province: "santo-domingo",
                equipment: "Impresora Epson",
                serial: "455DE",
                problem: "Atascamiento de papel frecuente.",
                priority: "high",
                technician: "MG",
                status: "diagnosis",
                timestamp: new Date().getTime() - 2 * 24 * 60 * 60 * 1000, // Hace 2 días
                incidentDate: new Date().getTime() - 3 * 24 * 60 * 60 * 1000 // Hace 3 días
            },
            {
                id: "DI-009",
                client: "Jorge López",
                phone: "809-555-8910",
                email: "jlopez@empresa.com",
                province: "santiago",
                equipment: "Monitor LG",
                serial: "654GH",
                problem: "Esperando aprobación de cotización.",
                priority: "medium",
                technician: "AR",
                status: "waiting",
                timestamp: new Date().getTime() - 4 * 24 * 60 * 60 * 1000, // Hace 4 días
                incidentDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 // Hace 5 días
            },
            {
                id: "DI-008",
                client: "Marta Villegas",
                phone: "809-555-1122",
                email: "marta.villegas@negocio.com",
                province: "santo-domingo",
                equipment: "Laptop Lenovo",
                serial: "147OPQ",
                problem: "Instalación de software especializado.",
                priority: "low",
                technician: "MG",
                status: "process",
                timestamp: new Date().getTime() - 6 * 24 * 60 * 60 * 1000, // Hace 6 días
                incidentDate: new Date().getTime() - 7 * 24 * 60 * 60 * 1000 // Hace 7 días
            }
        ];

        // Datos iniciales para inventario
        const initialLots = [
            {
                id: "LOTE-001",
                quantity: 15,
                equipmentType: "laptop",
                initialStatus: "received",
                notes: "Lote de laptops Dell recibidas el lunes",
                date: new Date().getTime() - 5 * 24 * 60 * 60 * 1000,
                equipments: [
                    { id: "EQ-001", type: "laptop", status: "received", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-002", type: "laptop", status: "diagnosis", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-003", type: "laptop", status: "repair", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-004", type: "laptop", status: "ready", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-005", type: "laptop", status: "discarded", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-006", type: "laptop", status: "received", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-007", type: "laptop", status: "received", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-008", type: "laptop", status: "diagnosis", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-009", type: "laptop", status: "repair", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-010", type: "laptop", status: "ready", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-011", type: "laptop", status: "ready", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-012", type: "laptop", status: "discarded", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-013", type: "laptop", status: "received", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-014", type: "laptop", status: "diagnosis", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-015", type: "laptop", status: "repair", lotId: "LOTE-001", receivedDate: new Date().getTime() - 5 * 24 * 60 * 60 * 1000 }
                ]
            },
            {
                id: "LOTE-002",
                quantity: 8,
                equipmentType: "desktop",
                initialStatus: "diagnosis",
                notes: "Desktops para reparación general",
                date: new Date().getTime() - 3 * 24 * 60 * 60 * 1000,
                equipments: [
                    { id: "EQ-016", type: "desktop", status: "diagnosis", lotId: "LOTE-002", receivedDate: new Date().getTime() - 3 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-017", type: "desktop", status: "repair", lotId: "LOTE-002", receivedDate: new Date().getTime() - 3 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-018", type: "desktop", status: "ready", lotId: "LOTE-002", receivedDate: new Date().getTime() - 3 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-019", type: "desktop", status: "discarded", lotId: "LOTE-002", receivedDate: new Date().getTime() - 3 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-020", type: "desktop", status: "diagnosis", lotId: "LOTE-002", receivedDate: new Date().getTime() - 3 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-021", type: "desktop", status: "repair", lotId: "LOTE-002", receivedDate: new Date().getTime() - 3 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-022", type: "desktop", status: "ready", lotId: "LOTE-002", receivedDate: new Date().getTime() - 3 * 24 * 60 * 60 * 1000 },
                    { id: "EQ-023", type: "desktop", status: "discarded", lotId: "LOTE-002", receivedDate: new Date().getTime() - 3 * 24 * 60 * 60 * 1000 }
                ]
            }
        ];

        // Función de logout
        function logout() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.href = 'login.html';
        }

        // Función para mostrar notificaciones toast
        function showToast(message, type = 'info', title = '', duration = 5000) {
            const toastContainer = document.getElementById('toast-container');
            const toastId = 'toast-' + Date.now();

            const icons = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                warning: 'fa-exclamation-triangle',
                info: 'fa-info-circle'
            };

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.id = toastId;
            toast.innerHTML = `
                <i class="toast-icon fas ${icons[type]}"></i>
                <div class="toast-content">
                    ${title ? `<div class="toast-title">${title}</div>` : ''}
                    <div class="toast-message">${message}</div>
                </div>
                <button class="toast-close" onclick="dismissToast('${toastId}')">
                    <i class="fas fa-times"></i>
                </button>
                <div class="toast-progress">
                    <div class="toast-progress-bar"></div>
                </div>
            `;

            toastContainer.appendChild(toast);

            // Trigger reflow for animation
            void toast.offsetWidth;

            // Show toast
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);

            // Auto dismiss after duration
            const timeout = setTimeout(() => {
                dismissToast(toastId);
            }, duration);

            // Store timeout reference for manual dismissal
            toast.timeout = timeout;
        }

        // Función para descartar notificaciones toast
        function dismissToast(toastId) {
            const toast = document.getElementById(toastId);
            if (!toast) return;

            clearTimeout(toast.timeout);
            toast.classList.remove('show');
            toast.classList.add('hide');

            // Remove toast after animation completes
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 500);
        }

        // Inicializar la aplicación
        function initApp() {
            // Cargar tickets desde localStorage o usar datos iniciales
            let tickets = JSON.parse(localStorage.getItem('tickets')) || initialTickets;
            localStorage.setItem('tickets', JSON.stringify(tickets));

            // Cargar lotes desde localStorage o usar datos iniciales
            let lots = JSON.parse(localStorage.getItem('inventoryLots')) || initialLots;
            localStorage.setItem('inventoryLots', JSON.stringify(lots));

            // Configurar el sidebar
            setupSidebar();
            toggleBtn.addEventListener('click', function () {
                const sidebar = document.getElementById('provinceSidebar');
                const icon = toggleBtn.querySelector('i');
                const submenu = document.getElementById('tickets-submenu');
                const arrow = document.getElementById('tickets-arrow');

                sidebar.classList.toggle('collapsed');

                if (sidebar.classList.contains('collapsed')) {
                    // fuerza cierre visual del submenú en estado colapsado
                    submenu.classList.remove('open');
                    arrow.style.transform = 'rotate(0deg)';
                    ticketsSubmenuOpen = false;
                    icon.className = 'fas fa-chevron-right';
                    showToast('Barra lateral contraída', 'info', '', 2000);
                } else {
                    // reabre si el usuario lo dejó abierto
                    if (ticketsSubmenuOpen) {
                        submenu.classList.add('open');
                        arrow.style.transform = 'rotate(180deg)';
                    }
                    icon.className = 'fas fa-chevron-left';
                    showToast('Barra lateral expandida', 'info', '', 2000);
                }
            });

            // Renderizar tickets
            renderTickets();

            // Actualizar estadísticas
            updateStats();

            // Configurar el formulario de creación
            document.getElementById('create-ticket-form').addEventListener('submit', function (e) {
                e.preventDefault();
                createNewTicket();
            });

            // Configurar el formulario de inventario
            document.getElementById('lot-form').addEventListener('submit', function (e) {
                e.preventDefault();
                createNewLot();
            });

            // Establecer la fecha actual por defecto
            document.getElementById('incident-date').valueAsDate = new Date();
            document.getElementById('lot-date').valueAsDate = new Date();

            // Configurar event listeners para los filtros
            document.getElementById('technician').addEventListener('change', filterTickets);
            document.getElementById('priority').addEventListener('change', filterTickets);
            document.getElementById('search').addEventListener('input', filterTickets);
            document.getElementById('lot-filter').addEventListener('change', filterEquipment);

            // Cargar inventario
            renderLots();
            renderEquipmentBoard();
            updateLotFilterOptions();

            // Mostrar mensaje de bienvenida
            showToast('Sistema cargado correctamente', 'success', '¡Bienvenido!', 3000);
        }

        // Cambiar entre vistas (Tickets e Inventario)
        function changeView(view) {
            if (view === 'inventory') {
                document.getElementById('tickets-content').style.display = 'none';
                document.getElementById('inventory-content').style.display = 'block';

                // Actualizar el menú lateral
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelector('[data-view="inventory"]').classList.add('active');

                // Mostrar la primera pestaña del inventario
                showInventoryTab('lots');

                showToast('Vista de inventario activada', 'info', 'Vista cambiada', 2000);
            } else {
                document.getElementById('tickets-content').style.display = 'block';
                document.getElementById('inventory-content').style.display = 'none';
                showToast('Vista de tickets activada', 'info', 'Vista cambiada', 2000);
            }
        }

        // Mostrar la pestaña específica del inventario
        function showInventoryTab(tabName) {
            // Ocultar todas las secciones
            document.getElementById('lots-section').style.display = 'none';
            document.getElementById('equipment-section').style.display = 'none';
            document.getElementById('reports-section').style.display = 'none';

            // Desactivar todas las pestañas
            document.querySelectorAll('.view-tab').forEach(tab => {
                tab.classList.remove('active');
            });

            // Mostrar la sección seleccionada y activar su pestaña
            document.getElementById(`${tabName}-section`).style.display = 'block';
            document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

            currentInventoryTab = tabName;

            // Si es la pestaña de equipos, actualizar el tablero
            if (tabName === 'equipment') {
                renderEquipmentBoard();
            } else if (tabName === 'reports') {
                generateReport();
            }

            showToast(`Mostrando pestaña de ${tabName}`, 'info', 'Pestaña cambiada', 2000);
        }

        // Configurar eventos para el sidebar
        function setupSidebar() {
            const sidebar = document.getElementById('provinceSidebar');
            const toggleBtn = document.getElementById('toggleSidebar');
            const mobileBtn = document.getElementById('mobileSidebarBtn');
            const overlay = document.getElementById('sidebarOverlay');

            // Toggle sidebar en desktop
            toggleBtn.addEventListener('click', function () {
                sidebar.classList.toggle('collapsed');

                // Cambiar icono según el estado
                const icon = toggleBtn.querySelector('i');
                if (sidebar.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-right';
                    showToast('Barra lateral contraída', 'info', '', 2000);
                } else {
                    icon.className = 'fas fa-chevron-left';
                    showToast('Barra lateral expandida', 'info', '', 2000);
                }
            });

            // Mostrar/ocultar sidebar en móviles
            mobileBtn.addEventListener('click', function () {
                sidebar.classList.add('show');
                overlay.classList.add('active');
            });

            // Ocultar sidebar al hacer clic en el overlay
            overlay.addEventListener('click', function () {
                sidebar.classList.remove('show');
                overlay.classList.remove('active');
            });

            // Ajustar el sidebar según el tamaño de la pantalla al cargar
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('collapsed');
                toggleBtn.querySelector('i').className = 'fas fa-chevron-left';
            }
        }

        // Expandir/colapsar subelementos
        function toggleSubItems(submenuId) {
            const sidebar = document.getElementById('provinceSidebar');
            if (sidebar.classList.contains('collapsed')) return;

            const submenu = document.getElementById(submenuId);
            const arrow = document.getElementById('tickets-arrow');

            if (submenu.classList.contains('open')) {
                submenu.classList.remove('open');
                arrow.style.transform = 'rotate(0deg)';
                ticketsSubmenuOpen = false;
            } else {
                submenu.classList.add('open');
                arrow.style.transform = 'rotate(180deg)';
                ticketsSubmenuOpen = true;
            }
        }

        // Cambiar provincia
        function changeProvince(province) {
            selectedProvince = province;

            // Actualizar la selección en el menú
            document.querySelectorAll('.submenu-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(`[data-province="${province}"]`).classList.add('active');

            // Filtrar tickets
            filterTickets();

            showToast(`Filtrado por: ${province === 'all' ? 'Todas las sucursales' : province}`, 'info', 'Filtro aplicado', 2000);
        }

        // Renderizar todos los tickets
        function renderTickets() {
            // Limpiar todas las columnas
            document.querySelectorAll('.tickets-list').forEach(column => {
                column.innerHTML = '';
            });

            // Obtener tickets desde localStorage
            const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

            // Actualizar los contadores de provincia
            updateProvinceCounts(tickets);

            // Renderizar cada ticket en su columna correspondiente
            tickets.forEach(ticket => {
                renderTicket(ticket);
            });

            // Agregar estado vacío a columnas sin tickets
            document.querySelectorAll('.tickets-list').forEach(column => {
                if (column.children.length === 0) {
                    column.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-check-circle"></i>
                            <p>No hay tickets en esta categoría</p>
                        </div>
                    `;
                }
            });
        }

        // Actualizar los contadores de tickets por provincia
        function updateProvinceCounts(tickets) {
            // Contar tickets por provincia
            const counts = {
                'all': tickets.length,
                'santiago': tickets.filter(ticket => ticket.province === 'santiago').length,
                'santo-domingo': tickets.filter(ticket => ticket.province === 'santo-domingo').length
            };

            // Actualizar los badges con los contadores
            document.getElementById('count-all').textContent = counts.all;
            document.getElementById('count-all-sub').textContent = counts.all;
            document.getElementById('count-santiago').textContent = counts.santiago;
            document.getElementById('count-santo-domingo').textContent = counts['santo-domingo'];
        }

        // Renderizar un ticket individual
        function renderTicket(ticket) {
            const column = document.querySelector(`.tickets-list#${ticket.status}-tickets`);
            if (!column) return;

            // Determinar el texto para la prioridad
            let priorityText = '';
            switch (ticket.priority) {
                case 'critical': priorityText = 'Crítico'; break;
                case 'high': priorityText = 'Alto'; break;
                case 'medium': priorityText = 'Medio'; break;
                case 'low': priorityText = 'Bajo'; break;
            }

            // Determinar el texto para el tiempo transcurrido
            const timeDiff = Math.floor((new Date().getTime() - ticket.timestamp) / 1000);
            let timeText = '';

            if (timeDiff < 60) {
                timeText = `Hace ${timeDiff} seg`;
            } else if (timeDiff < 3600) {
                timeText = `Hace ${Math.floor(timeDiff / 60)} min`;
            } else if (timeDiff < 86400) {
                timeText = `Hace ${Math.floor(timeDiff / 3600)} h`;
            } else {
                timeText = `Hace ${Math.floor(timeDiff / 86400)} días`;
            }

            // Crear elemento HTML del ticket
            const ticketElement = document.createElement('div');
            ticketElement.className = 'ticket-card';
            ticketElement.dataset.id = ticket.id;
            ticketElement.dataset.priority = ticket.priority;
            ticketElement.dataset.technician = ticket.technician;
            ticketElement.dataset.province = ticket.province;

            ticketElement.innerHTML = `
                <div class="ticket-id">${ticket.id}</div>
                <div class="ticket-client">${ticket.client}</div>
                <div class="ticket-province province-${ticket.province}">
                    <i class="fas fa-map-marker-alt"></i> ${ticket.province === 'santiago' ? 'Santiago' : 'Santo Domingo'}
                </div>
                <div class="ticket-details">${ticket.problem}</div>
                <div class="ticket-priority priority-${ticket.priority}" onclick="togglePrioritySelector(this)">
                    ${priorityText}
                    <div class="priority-selector">
                        <div class="priority-option critical" onclick="changePriority('${ticket.id}', 'critical')">
                            <span class="priority-indicator"></span>Crítico
                        </div>
                        <div class="priority-option high" onclick="changePriority('${ticket.id}', 'high')">
                            <span class="priority-indicator"></span>Alto
                        </div>
                        <div class="priority-option medium" onclick="changePriority('${ticket.id}', 'medium')">
                            <span class="priority-indicator"></span>Medio
                        </div>
                        <div class="priority-option low" onclick="changePriority('${ticket.id}', 'low')">
                            <span class="priority-indicator"></span>Bajo
                        </div>
                    </div>
                </div>
                <div class="ticket-meta">
                    ${ticket.technician === 'unassigned' ?
                    `<div class="ticket-status" style="color: #f72585;">Sin asignar</div>` :
                    `<div class="ticket-assignee">
                            <div class="assignee-avatar">${ticket.technician}</div>
                            <span>${getTechnicianName(ticket.technician)}</span>
                        </div>`
                }
                    <div class="ticket-time">${timeText}</div>
                </div>
                <div class="ticket-actions">
                    <button class="ticket-action-btn assign-btn" onclick="openAssignModal('${ticket.id}')">
                        <i class="fas ${ticket.technician === 'unassigned' ? 'fa-user-plus' : 'fa-user-edit'}"></i> 
                        ${ticket.technician === 'unassigned' ? 'Asignar' : 'Reasignar'}
                    </button>
                    <button class="ticket-action-btn move-btn" onclick="openMoveModal('${ticket.id}')">
                        <i class="fas fa-arrow-right"></i> Mover
                    </button>
                </div>
            `;

            column.appendChild(ticketElement);
        }

        // Obtener nombre del técnico por sus iniciales
        function getTechnicianName(initials) {
            const technicians = {
                'MG': 'María García',
                'AR': 'Ana Rodríguez',
                'CL': 'Carlos López',
                'JP': 'Juan Pérez'
            };
            return technicians[initials] || 'Sin asignar';
        }

        // Actualizar estadísticas
        function updateStats() {
            const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

            // Contar tickets abiertos (todos excepto resueltos)
            const openTickets = tickets.filter(t => t.status !== 'resolved').length;
            document.getElementById('open-tickets').textContent = openTickets;

            // Contar tickets en proceso
            const processTickets = tickets.filter(t => t.status === 'process').length;
            document.getElementById('in-process-tickets').textContent = processTickets;

            // Contar tickets críticos
            const criticalTickets = tickets.filter(t => t.priority === 'critical').length;
            document.getElementById('critical-tickets').textContent = criticalTickets;
        }

        // Abrir modal de creación de ticket
        function openCreateModal() {
            document.getElementById('create-modal').style.display = 'flex';
        }

        // Crear nuevo ticket
        function createNewTicket() {
            // Obtener valores del formulario
            const clientName = document.getElementById('client-name').value;
            const clientPhone = document.getElementById('client-phone').value;
            const clientEmail = document.getElementById('client-email').value;
            const province = document.getElementById('client-province').value;
            const equipmentType = document.getElementById('equipment-type').value;
            const serialNumber = document.getElementById('serial-number').value;
            const problemDescription = document.getElementById('problem-description').value;
            const isCritical = document.getElementById('critical-issue').checked;
            const incidentDate = document.getElementById('incident-date').value;
            let priority = document.getElementById('ticket-priority').value;

            // Validaciones básicas
            if (!clientName || !clientPhone || !province || !equipmentType || !problemDescription || !priority) {
                showToast('Por favor, complete todos los campos obligatorios', 'error', 'Error de validación');
                document.getElementById('create-ticket-form').classList.add('shake');
                setTimeout(() => {
                    document.getElementById('create-ticket-form').classList.remove('shake');
                }, 500);
                return;
            }

            // Si es crítico, forzar prioridad crítica
            if (isCritical) {
                priority = 'critical';
            }

            // Generar ID único para el ticket
            const ticketId = generateTicketId();

            // Crear objeto de ticket
            const newTicket = {
                id: ticketId,
                client: clientName,
                phone: clientPhone,
                email: clientEmail,
                province: province,
                equipment: equipmentType,
                serial: serialNumber,
                problem: problemDescription,
                priority: priority,
                technician: 'unassigned',
                status: 'new',
                timestamp: new Date().getTime(),
                incidentDate: new Date(incidentDate).getTime() || new Date().getTime()
            };

            // Obtener tickets existentes
            let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

            // Agregar el nuevo ticket
            tickets.push(newTicket);

            // Guardar en localStorage
            localStorage.setItem('tickets', JSON.stringify(tickets));

            // Cerrar modal
            closeModal('create-modal');

            // Resetear formulario
            document.getElementById('create-ticket-form').reset();
            document.getElementById('incident-date').valueAsDate = new Date();

            // Actualizar la interfaz
            renderTickets();
            updateStats();

            // Mostrar notificación de éxito
            showToast(`Ticket ${ticketId} creado correctamente`, 'success', 'Ticket creado');
        }

        // Generar ID único para el ticket
        function generateTicketId() {
            const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
            let maxId = 12; // Empezar desde DI-012

            tickets.forEach(ticket => {
                const idNum = parseInt(ticket.id.split('-')[1]);
                if (idNum > maxId) {
                    maxId = idNum;
                }
            });

            return 'DI-' + String(maxId + 1).padStart(3, '0');
        }

        // Funciones para abrir y cerrar modales
        function openAssignModal(ticketId) {
            currentTicketId = ticketId;
            document.getElementById('assign-modal').style.display = 'flex';
        }

        function openMoveModal(ticketId) {
            currentTicketId = ticketId;
            document.getElementById('move-modal').style.display = 'flex';
            // Reset selection
            document.querySelectorAll('.move-option').forEach(option => {
                option.classList.remove('selected');
            });
            selectedStatus = null;
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Seleccionar opción de movimiento
        function selectMoveOption(element, status) {
            // Deseleccionar todas las opciones
            document.querySelectorAll('.move-option').forEach(option => {
                option.classList.remove('selected');
            });

            // Seleccionar la opción clickeada
            element.classList.add('selected');
            selectedStatus = status;
        }

        // Mostrar/ocultar selector de prioridad
        function togglePrioritySelector(element) {
            // Cerrar otros selectores abiertos
            document.querySelectorAll('.priority-selector').forEach(selector => {
                if (selector !== element.querySelector('.priority-selector')) {
                    selector.style.display = 'none';
                }
            });

            // Toggle del selector actual
            const selector = element.querySelector('.priority-selector');
            selector.style.display = selector.style.display === 'block' ? 'none' : 'block';

            // Prevenir que el evento se propague
            event.stopPropagation();
        }

        // Cerrar selectores de prioridad al hacer clic en cualquier lugar
        document.addEventListener('click', function () {
            document.querySelectorAll('.priority-selector').forEach(selector => {
                selector.style.display = 'none';
            });
        });

        // Cambiar prioridad de un ticket
        function changePriority(ticketId, priority) {
            // Obtener tickets desde localStorage
            let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

            // Encontrar y actualizar el ticket
            const ticketIndex = tickets.findIndex(t => t.id === ticketId);
            if (ticketIndex !== -1) {
                tickets[ticketIndex].priority = priority;

                // Guardar en localStorage
                localStorage.setItem('tickets', JSON.stringify(tickets));

                // Volver a renderizar
                renderTickets();

                // Actualizar estadísticas
                updateStats();

                // Mostrar notificación de éxito
                showToast(`Prioridad actualizada a ${priority}`, 'success', 'Prioridad actualizada');
            }

            // Prevenir que el evento se propague
            event.stopPropagation();
        }

        // Asignar técnico a ticket
        function assignTechnician() {
            const technicianSelect = document.getElementById('assign-technician');
            const technicianId = technicianSelect.value;

            // Obtener tickets desde localStorage
            let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

            // Encontrar y actualizar el ticket
            const ticketIndex = tickets.findIndex(t => t.id === currentTicketId);
            if (ticketIndex !== -1) {
                tickets[ticketIndex].technician = technicianId;

                // Guardar en localStorage
                localStorage.setItem('tickets', JSON.stringify(tickets));

                // Volver a renderizar
                renderTickets();

                // Mostrar notificación de éxito
                showToast(`Técnico asignado: ${getTechnicianName(technicianId)}`, 'success', 'Técnico asignado');
            }

            closeModal('assign-modal');
        }

        // Mover ticket entre columnas
        function moveTicket() {
            if (!currentTicketId || !selectedStatus) {
                showToast('Por favor, seleccione un estado de destino', 'warning', 'Acción requerida');
                return;
            }

            // Obtener tickets desde localStorage
            let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

            // Encontrar y actualizar el ticket
            const ticketIndex = tickets.findIndex(t => t.id === currentTicketId);
            if (ticketIndex !== -1) {
                // Aplicar animación de salida
                const ticketElement = document.querySelector(`.ticket-card[data-id="${currentTicketId}"]`);
                if (ticketElement) {
                    ticketElement.classList.add('slide-out');
                }

                // Después de la animación, actualizar el estado
                setTimeout(() => {
                    tickets[ticketIndex].status = selectedStatus;

                    // Guardar en localStorage
                    localStorage.setItem('tickets', JSON.stringify(tickets));

                    // Volver a renderizar
                    renderTickets();

                    // Actualizar estadísticas
                    updateStats();

                    // Mostrar notificación de éxito
                    showToast(`Ticket movido a ${selectedStatus}`, 'success', 'Ticket movido');
                }, 500);
            }

            closeModal('move-modal');
        }

        // Filtrar tickets
        function filterTickets() {
            const technicianFilter = document.getElementById('technician').value;
            const priorityFilter = document.getElementById('priority').value;
            const searchFilter = document.getElementById('search').value.toLowerCase();

            document.querySelectorAll('.ticket-card').forEach(ticket => {
                const ticketTechnician = ticket.dataset.technician;
                const ticketPriority = ticket.dataset.priority;
                const ticketProvince = ticket.dataset.province;
                const ticketText = ticket.textContent.toLowerCase();

                const matchesTechnician = technicianFilter === 'all' || ticketTechnician === technicianFilter;
                const matchesPriority = priorityFilter === 'all' || ticketPriority === priorityFilter;
                const matchesProvince = selectedProvince === 'all' || ticketProvince === selectedProvince;
                const matchesSearch = ticketText.includes(searchFilter);

                if (matchesTechnician && matchesPriority && matchesProvince && matchesSearch) {
                    ticket.style.display = 'block';
                } else {
                    ticket.style.display = 'none';
                }
            });
        }

        // Cerrar modal al hacer clic fuera del contenido
        window.addEventListener('click', function (event) {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Context Menu Functionality
        document.addEventListener('contextmenu', function (e) {
            // Check if right-click was on a ticket card
            const ticketCard = e.target.closest('.ticket-card');
            if (ticketCard) {
                e.preventDefault();
                contextMenuTicketId = ticketCard.dataset.id;

                const contextMenu = document.getElementById('context-menu');
                contextMenu.style.display = 'block';
                contextMenu.style.left = e.pageX + 'px';
                contextMenu.style.top = e.pageY + 'px';
            }
        });

        // Hide context menu on click
        document.addEventListener('click', function () {
            document.getElementById('context-menu').style.display = 'none';
        });

        // Abrir detalles del ticket
        function openTicketDetails() {
            if (contextMenuTicketId) {
                // Obtener tickets desde localStorage
                const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

                // Encontrar el ticket
                const ticket = tickets.find(t => t.id === contextMenuTicketId);

                if (ticket) {
                    showTicketDetails(ticket);
                }
            }
        }

        // Mostrar detalles del ticket en un modal
        function showTicketDetails(ticket) {
            const modalContent = document.getElementById('ticket-details-content');

            // Determinar el texto para la prioridad
            let priorityText = '';
            let priorityClass = '';
            switch (ticket.priority) {
                case 'critical':
                    priorityText = 'Crítico';
                    priorityClass = 'priority-critical-badge';
                    break;
                case 'high':
                    priorityText = 'Alto';
                    priorityClass = 'priority-high-badge';
                    break;
                case 'medium':
                    priorityText = 'Medio';
                    priorityClass = 'priority-medium-badge';
                    break;
                case 'low':
                    priorityText = 'Bajo';
                    priorityClass = 'priority-low-badge';
                    break;
            }

            // Formatear fecha del incidente
            const incidentDate = new Date(ticket.incidentDate);
            const formattedDate = incidentDate.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            // Formatear fecha de creación
            const createdDate = new Date(ticket.timestamp);
            const formattedCreatedDate = createdDate.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            // Crear HTML para los detalles del ticket
            modalContent.innerHTML = `
                <div class="ticket-detail-field">
                    <div class="ticket-detail-label">ID del Ticket</div>
                    <div class="ticket-detail-value">${ticket.id}</div>
                </div>
                
                <div class="ticket-detail-field">
                    <div class="ticket-detail-label">Cliente</div>
                    <div class="ticket-detail-value">${ticket.client}</div>
                </div>
                
                <div class="form-row">
                    <div class="ticket-detail-field">
                        <div class="ticket-detail-label">Teléfono</div>
                        <div class="ticket-detail-value">${ticket.phone || 'No especificado'}</div>
                    </div>
                    
                    <div class="ticket-detail-field">
                        <div class="ticket-detail-label">Email</div>
                        <div class="ticket-detail-value">${ticket.email || 'No especificado'}</div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="ticket-detail-field">
                        <div class="ticket-detail-label">Provincia</div>
                        <div class="ticket-detail-value">${ticket.province === 'santiago' ? 'Santiago' : 'Santo Domingo'}</div>
                    </div>
                    
                    <div class="ticket-detail-field">
                        <div class="ticket-detail-label">Fecha del Incidente</div>
                        <div class="ticket-detail-value">${formattedDate}</div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="ticket-detail-field">
                        <div class="ticket-detail-label">Equipo</div>
                        <div class="ticket-detail-value">${ticket.equipment}</div>
                    </div>
                    
                    <div class="ticket-detail-field">
                        <div class="ticket-detail-label">Número de Serie</div>
                        <div class="ticket-detail-value">${ticket.serial || 'No especificado'}</div>
                    </div>
                </div>
                
                <div class="ticket-detail-field">
                    <div class="ticket-detail-label">Descripción del Problema</div>
                    <div class="ticket-detail-value">${ticket.problem}</div>
                </div>
                
                <div class="form-row">
                    <div class="ticket-detail-field">
                        <div class="ticket-detail-label">Prioridad</div>
                        <div class="ticket-detail-value">
                            <span class="priority-badge ${priorityClass}">${priorityText}</span>
                        </div>
                    </div>
                    
                    <div class="ticket-detail-field">
                        <div class="ticket-detail-label">Técnico Asignado</div>
                        <div class="ticket-detail-value">${getTechnicianName(ticket.technician)}</div>
                    </div>
                </div>
                
                <div class="ticket-detail-field">
                    <div class="ticket-detail-label">Estado</div>
                    <div class="ticket-detail-value">
                        ${ticket.status === 'new' ? 'Nuevo / Sin asignar' :
                    ticket.status === 'diagnosis' ? 'En diagnóstico' :
                        ticket.status === 'waiting' ? 'Esperando respuesta del cliente' :
                            ticket.status === 'process' ? 'En proceso / Reparación' :
                                'Resuelto / Cerrado'}
                    </div>
                </div>
                
                <div class="ticket-detail-field">
                    <div class="ticket-detail-label">Fecha de Creación</div>
                    <div class="ticket-detail-value">${formattedCreatedDate}</div>
                </div>
            `;

            // Mostrar el modal
            document.getElementById('ticket-details-modal').style.display = 'flex';
        }

        // Context menu actions
        function archiveTicket() {
            if (contextMenuTicketId) {
                showToast(`Ticket ${contextMenuTicketId} archivado`, 'success', 'Ticket archivado');
                // Aquí puedes agregar la lógica para archivar el ticket
            }
        }

        function deleteTicket() {
            if (contextMenuTicketId) {
                if (confirm(`¿Estás seguro de que quieres eliminar el ticket ${contextMenuTicketId}?`)) {
                    // Obtener tickets desde localStorage
                    let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

                    // Encontrar y eliminar el ticket
                    const ticketIndex = tickets.findIndex(t => t.id === contextMenuTicketId);
                    if (ticketIndex !== -1) {
                        // Aplicar animación de salida
                        const ticketElement = document.querySelector(`.ticket-card[data-id="${contextMenuTicketId}"]`);
                        if (ticketElement) {
                            ticketElement.classList.add('slide-out');
                        }

                        // Después de la animación, eliminar el ticket
                        setTimeout(() => {
                            tickets.splice(ticketIndex, 1);

                            // Guardar en localStorage
                            localStorage.setItem('tickets', JSON.stringify(tickets));

                            // Volver a renderizar
                            renderTickets();

                            // Actualizar estadísticas
                            updateStats();

                            showToast(`Ticket ${contextMenuTicketId} eliminado`, 'success', 'Ticket eliminado');
                        }, 500);
                    }
                }
            }
        }

        // Mejora: Hacer las tarjetas de estadísticas clickeables
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('click', function () {
                const label = this.querySelector('.stat-label').textContent;
                showToast(`Filtrando por: ${label}`, 'info', 'Filtro aplicado');

                // Aquí podrías implementar la lógica de filtrado específico
                if (label.includes('Abiertos')) {
                    document.getElementById('priority').value = 'all';
                    filterTickets();
                } else if (label.includes('Críticos')) {
                    document.getElementById('priority').value = 'critical';
                    filterTickets();
                }
            });
        });

        // =============================================
        // FUNCIONALIDAD DE INVENTARIO DE LOTES
        // =============================================

        // Crear un nuevo lote
        function createNewLot() {
            // Obtener valores del formulario
            const lotId = document.getElementById('lot-id').value;
            const quantity = parseInt(document.getElementById('lot-quantity').value);
            const equipmentType = document.getElementById('equipment-type-ticket').value;
            const initialStatus = document.getElementById('initial-status').value;
            const notes = document.getElementById('lot-notes').value;
            const date = document.getElementById('lot-date').value;

            // Validaciones básicas
            if (!lotId || !quantity || !equipmentType || !initialStatus || !date) {
                showToast('Por favor, complete todos los campos obligatorios', 'error', 'Error de validación');
                document.getElementById('lot-form').classList.add('shake');
                setTimeout(() => {
                    document.getElementById('lot-form').classList.remove('shake');
                }, 500);
                return;
            }

            // Verificar si el ID del lote ya existe
            const lots = JSON.parse(localStorage.getItem('inventoryLots')) || [];
            if (lots.some(lot => lot.id === lotId)) {
                showToast('El ID del lote ya existe. Por favor, use un ID único.', 'error', 'Error de validación');
                document.getElementById('lot-id').classList.add('shake');
                setTimeout(() => {
                    document.getElementById('lot-id').classList.remove('shake');
                }, 500);
                return;
            }

            // Crear array de equipos
            const equipments = [];
            for (let i = 1; i <= quantity; i++) {
                const equipmentId = `EQ-${String(lots.reduce((acc, lot) => acc + lot.equipments.length, 0) + i).padStart(3, '0')}`;
                equipments.push({
                    id: equipmentId,
                    type: equipmentType,
                    status: initialStatus,
                    lotId: lotId,
                    receivedDate: new Date(date).getTime()
                });
            }

            // Crear objeto de lote
            const newLot = {
                id: lotId,
                quantity: quantity,
                equipmentType: equipmentType,
                initialStatus: initialStatus,
                notes: notes,
                date: new Date(date).getTime(),
                equipments: equipments
            };

            // Agregar el nuevo lote
            lots.push(newLot);

            // Guardar en localStorage
            localStorage.setItem('inventoryLots', JSON.stringify(lots));

            // Resetear formulario
            document.getElementById('lot-form').reset();
            document.getElementById('lot-date').valueAsDate = new Date();

            // Actualizar la interfaz
            renderLots();
            updateLotFilterOptions();
            updateInventoryCounts();

            // Mostrar notificación de éxito
            showToast(`Lote ${lotId} registrado correctamente`, 'success', 'Lote registrado');
        }

        // Renderizar la lista de lotes
        function renderLots() {
            const lotsContainer = document.getElementById('lots-container');
            lotsContainer.innerHTML = '';

            // Obtener lotes desde localStorage
            const lots = JSON.parse(localStorage.getItem('inventoryLots')) || [];

            // Actualizar contador en el sidebar
            document.getElementById('count-inventory').textContent = lots.length;

            if (lots.length === 0) {
                lotsContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-box-open"></i>
                        <p>No hay lotes registrados</p>
                    </div>
                `;
                return;
            }

            // Renderizar cada lote
            lots.forEach(lot => {
                // Contar equipos por estado
                const statusCounts = {
                    received: lot.equipments.filter(e => e.status === 'received').length,
                    diagnosis: lot.equipments.filter(e => e.status === 'diagnosis').length,
                    repair: lot.equipments.filter(e => e.status === 'repair').length,
                    ready: lot.equipments.filter(e => e.status === 'ready').length,
                    discarded: lot.equipments.filter(e => e.status === 'discarded').length
                };

                // Formatear fecha
                const receivedDate = new Date(lot.date);
                const formattedDate = receivedDate.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                // Determinar texto para tipo de equipo
                let typeText = '';
                switch (lot.equipmentType) {
                    case 'laptop': typeText = 'Laptops'; break;
                    case 'desktop': typeText = 'Desktops'; break;
                    case 'server': typeText = 'Servidores'; break;
                    case 'printer': typeText = 'Impresoras'; break;
                    case 'network': typeText = 'Equipos de Red'; break;
                }

                // Crear elemento HTML del lote
                const lotElement = document.createElement('div');
                lotElement.className = 'lot-card';
                lotElement.innerHTML = `
                    <div class="lot-card-header">
                        <div class="lot-id">${lot.id}</div>
                        <div class="lot-date">${formattedDate}</div>
                    </div>
                    <div class="lot-details">
                        <div class="lot-detail-item">
                            <div class="lot-detail-value">${lot.quantity}</div>
                            <div class="lot-detail-label">Total</div>
                        </div>
                        <div class="lot-detail-item">
                            <div class="lot-detail-value">${statusCounts.received}</div>
                            <div class="lot-detail-label">Recibidos</div>
                        </div>
                        <div class="lot-detail-item">
                            <div class="lot-detail-value">${statusCounts.diagnosis}</div>
                            <div class="lot-detail-label">En diagnóstico</div>
                        </div>
                        <div class="lot-detail-item">
                            <div class="lot-detail-value">${statusCounts.repair}</div>
                            <div class="lot-detail-label">En reparación</div>
                        </div>
                        <div class="lot-detail-item">
                            <div class="lot-detail-value">${statusCounts.ready}</div>
                            <div class="lot-detail-label">Listos</div>
                        </div>
                        <div class="lot-detail-item">
                            <div class="lot-detail-value">${statusCounts.discarded}</div>
                            <div class="lot-detail-label">Descartados</div>
                        </div>
                    </div>
                    <div style="margin-top: 15px;">
                        <div><strong>Tipo:</strong> ${typeText}</div>
                        <div><strong>Observaciones:</strong> ${lot.notes || 'Ninguna'}</div>
                    </div>
                `;

                lotsContainer.appendChild(lotElement);
            });
        }

        // Renderizar el tablero de equipos
        function renderEquipmentBoard() {
            // Limpiar todas las columnas
            document.querySelectorAll('.equipment-list').forEach(column => {
                column.innerHTML = '';
            });

            // Obtener lotes desde localStorage
            const lots = JSON.parse(localStorage.getItem('inventoryLots')) || [];

            // Obtener filtro de lote
            const lotFilter = document.getElementById('lot-filter').value;

            // Recopilar todos los equipos
            let allEquipments = [];
            lots.forEach(lot => {
                if (lotFilter === 'all' || lot.id === lotFilter) {
                    allEquipments = allEquipments.concat(lot.equipments);
                }
            });

            // Renderizar cada equipo en su columna correspondiente
            allEquipments.forEach(equipment => {
                renderEquipment(equipment);
            });

            // Agregar estado vacío a columnas sin equipos
            document.querySelectorAll('.equipment-list').forEach(column => {
                if (column.children.length === 0) {
                    column.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-check-circle"></i>
                            <p>No hay equipos en esta categoría</p>
                        </div>
                    `;
                }
            });

            // Actualizar contadores
            updateInventoryCounts();
        }

        // Renderizar un equipo individual
        function renderEquipment(equipment) {
            const column = document.querySelector(`.equipment-list#${equipment.status}-equipment`);
            if (!column) return;

            // Determinar el texto para el tipo de equipo
            let typeText = '';
            switch (equipment.type) {
                case 'laptop': typeText = 'Laptop'; break;
                case 'desktop': typeText = 'Desktop'; break;
                case 'server': typeText = 'Servidor'; break;
                case 'printer': typeText = 'Impresora'; break;
                case 'network': typeText = 'Equipo de Red'; break;
            }

            // Formatear fecha de recepción
            const receivedDate = new Date(equipment.receivedDate);
            const formattedDate = receivedDate.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            // Crear elemento HTML del equipo
            const equipmentElement = document.createElement('div');
            equipmentElement.className = 'equipment-card';
            equipmentElement.dataset.id = equipment.id;
            equipmentElement.dataset.lot = equipment.lotId;

            equipmentElement.innerHTML = `
                <div class="equipment-id">${equipment.id}</div>
                <div class="equipment-type">${typeText}</div>
                <div style="margin-bottom: 10px;">
                    <span class="equipment-status status-${equipment.status}">
                        ${equipment.status === 'received' ? 'Recibido' :
                    equipment.status === 'diagnosis' ? 'En diagnóstico' :
                        equipment.status === 'repair' ? 'En reparación' :
                            equipment.status === 'ready' ? 'Listo para venta' :
                                'Descartado'}
                    </span>
                </div>
                <div style="font-size: 12px; color: var(--gray); margin-bottom: 10px;">
                    <div>Lote: ${equipment.lotId}</div>
                    <div>Recibido: ${formattedDate}</div>
                </div>
                <div class="ticket-actions">
                    <button class="ticket-action-btn move-btn" onclick="openMoveEquipmentModal('${equipment.id}')">
                        <i class="fas fa-arrow-right"></i> Mover
                    </button>
                </div>
            `;

            column.appendChild(equipmentElement);
        }

        // Abrir modal para mover equipo
        function openMoveEquipmentModal(equipmentId) {
            currentEquipmentId = equipmentId;
            document.getElementById('move-equipment-modal').style.display = 'flex';
            // Reset selection
            document.querySelectorAll('.move-option').forEach(option => {
                option.classList.remove('selected');
            });
            selectedEquipmentStatus = null;
        }

        // Seleccionar opción de movimiento para equipo
        function selectEquipmentMoveOption(element, status) {
            // Deseleccionar todas las opciones
            document.querySelectorAll('.move-option').forEach(option => {
                option.classList.remove('selected');
            });

            // Seleccionar la opción clickeada
            element.classList.add('selected');
            selectedEquipmentStatus = status;
        }

        // Mover equipo entre columnas
        function moveEquipment() {
            if (!currentEquipmentId || !selectedEquipmentStatus) {
                showToast('Por favor, seleccione un estado de destino', 'warning', 'Acción requerida');
                return;
            }

            // Obtener lotes desde localStorage
            let lots = JSON.parse(localStorage.getItem('inventoryLots')) || [];

            // Encontrar y actualizar el equipo
            let equipmentUpdated = false;
            for (let i = 0; i < lots.length; i++) {
                const equipmentIndex = lots[i].equipments.findIndex(e => e.id === currentEquipmentId);
                if (equipmentIndex !== -1) {
                    // Aplicar animación de salida
                    const equipmentElement = document.querySelector(`.equipment-card[data-id="${currentEquipmentId}"]`);
                    if (equipmentElement) {
                        equipmentElement.classList.add('slide-out');
                    }

                    // Después de la animación, actualizar el estado
                    setTimeout(() => {
                        lots[i].equipments[equipmentIndex].status = selectedEquipmentStatus;

                        // Guardar en localStorage
                        localStorage.setItem('inventoryLots', JSON.stringify(lots));

                        // Volver a renderizar
                        renderEquipmentBoard();

                        // Mostrar notificación de éxito
                        showToast(`Equipo movido a ${selectedEquipmentStatus}`, 'success', 'Equipo movido');
                    }, 500);

                    equipmentUpdated = true;
                    break;
                }
            }

            if (!equipmentUpdated) {
                showToast('No se pudo encontrar el equipo', 'error', 'Error');
            }

            closeModal('move-equipment-modal');
        }

        // Actualizar contadores de inventario
        function updateInventoryCounts() {
            // Obtener lotes desde localStorage
            const lots = JSON.parse(localStorage.getItem('inventoryLots')) || [];

            // Obtener filtro de lote
            const lotFilter = document.getElementById('lot-filter').value;

            // Contar equipos por estado
            let statusCounts = {
                received: 0,
                diagnosis: 0,
                repair: 0,
                ready: 0,
                discarded: 0
            };

            lots.forEach(lot => {
                if (lotFilter === 'all' || lot.id === lotFilter) {
                    lot.equipments.forEach(equipment => {
                        statusCounts[equipment.status]++;
                    });
                }
            });

            // Actualizar los contadores
            document.getElementById('count-received').textContent = statusCounts.received;
            document.getElementById('count-diagnosis').textContent = statusCounts.diagnosis;
            document.getElementById('count-repair').textContent = statusCounts.repair;
            document.getElementById('count-ready').textContent = statusCounts.ready;
            document.getElementById('count-discarded').textContent = statusCounts.discarded;
        }

        // Actualizar opciones del filtro de lotes
        function updateLotFilterOptions() {
            const lotFilter = document.getElementById('lot-filter');
            const reportLotFilter = document.getElementById('report-lot');

            // Limpiar opciones existentes (excepto la primera)
            while (lotFilter.options.length > 1) {
                lotFilter.remove(1);
            }
            while (reportLotFilter.options.length > 1) {
                reportLotFilter.remove(1);
            }

            // Obtener lotes desde localStorage
            const lots = JSON.parse(localStorage.getItem('inventoryLots')) || [];

            // Agregar opciones para cada lote
            lots.forEach(lot => {
                const option = document.createElement('option');
                option.value = lot.id;
                option.textContent = lot.id;

                lotFilter.appendChild(option.cloneNode(true));
                reportLotFilter.appendChild(option);
            });
        }

        // Filtrar equipos por lote
        function filterEquipment() {
            renderEquipmentBoard();
        }

        // Generar reporte de inventario
        function generateReport() {
            const reportTableBody = document.getElementById('report-table-body');
            reportTableBody.innerHTML = '';

            // Obtener filtros
            const lotFilter = document.getElementById('report-lot').value;
            const dateFrom = document.getElementById('report-date-from').value;
            const dateTo = document.getElementById('report-date-to').value;

            // Obtener lotes desde localStorage
            const lots = JSON.parse(localStorage.getItem('inventoryLots')) || [];

            // Filtrar lotes según los criterios
            const filteredLots = lots.filter(lot => {
                if (lotFilter !== 'all' && lot.id !== lotFilter) {
                    return false;
                }

                if (dateFrom) {
                    const fromDate = new Date(dateFrom).getTime();
                    if (lot.date < fromDate) {
                        return false;
                    }
                }

                if (dateTo) {
                    const toDate = new Date(dateTo).getTime() + 86400000; // Agregar un día para incluir la fecha completa
                    if (lot.date > toDate) {
                        return false;
                    }
                }

                return true;
            });

            if (filteredLots.length === 0) {
                reportTableBody.innerHTML = `
                    <tr>
                        <td colspan="10" style="text-align: center; padding: 20px;">
                            No hay datos que coincidan con los filtros seleccionados
                        </td>
                    </tr>
                `;
                return;
            }

            // Generar filas de la tabla
            filteredLots.forEach(lot => {
                // Contar equipos por estado
                const statusCounts = {
                    received: lot.equipments.filter(e => e.status === 'received').length,
                    diagnosis: lot.equipments.filter(e => e.status === 'diagnosis').length,
                    repair: lot.equipments.filter(e => e.status === 'repair').length,
                    ready: lot.equipments.filter(e => e.status === 'ready').length,
                    discarded: lot.equipments.filter(e => e.status === 'discarded').length
                };

                // Calcular tiempo promedio (días desde recepción)
                const now = new Date().getTime();
                const avgTime = Math.round(lot.equipments.reduce((sum, equipment) => {
                    return sum + Math.floor((now - equipment.receivedDate) / (1000 * 60 * 60 * 24));
                }, 0) / lot.equipments.length);

                // Formatear fecha de recepción
                const receivedDate = new Date(lot.date);
                const formattedDate = receivedDate.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                // Determinar texto para tipo de equipo
                let typeText = '';
                switch (lot.equipmentType) {
                    case 'laptop': typeText = 'Laptops'; break;
                    case 'desktop': typeText = 'Desktops'; break;
                    case 'server': typeText = 'Servidores'; break;
                    case 'printer': typeText = 'Impresoras'; break;
                    case 'network': typeText = 'Equipos de Red'; break;
                }

                // Crear fila de la tabla
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${lot.id}</td>
                    <td>${formattedDate}</td>
                    <td>${typeText}</td>
                    <td>${lot.quantity}</td>
                    <td>${statusCounts.received}</td>
                    <td>${statusCounts.diagnosis}</td>
                    <td>${statusCounts.repair}</td>
                    <td>${statusCounts.ready}</td>
                    <td>${statusCounts.discarded}</td>
                    <td>${avgTime || 0}</td>
                `;

                reportTableBody.appendChild(row);
            });

            showToast('Reporte generado correctamente', 'success', 'Reporte generado');
        }

        // Inicializar la aplicación cuando se carga la página
        document.addEventListener('DOMContentLoaded', initApp);