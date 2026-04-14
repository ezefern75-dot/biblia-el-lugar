const BIBLIOTECA = {
    antiguo: [
        { original: "בְּרֵאשִׁית", esp: "Génesis" },
        { original: "שְׁמוֹת", esp: "Éxodo" },
        { original: "וַיִּקְרָא", esp: "Levítico" },
        { original: "בְּמִדְבַּר", esp: "Números" },
        { original: "דְּבָרִים", esp: "Deuteronomio" },
        { original: "יְהוֹשֻׁעַ", esp: "Josué" },
        { original: "שׁוֹפְטִים", esp: "Jueces" },
        { original: "רוּת", esp: "Rut" }
    ],
    nuevo: [
        { original: "Ματθαῖον", esp: "Mateo" },
        { original: "Μᾶρκον", esp: "Marcos" },
        { original: "Λουκᾶν", esp: "Lucas" },
        { original: "Ἰωάννην", esp: "Juan" },
        { original: "Πράξεις", esp: "Hechos" },
        { original: "Ἀποκάλυψις", esp: "Apocalipsis" }
    ]
};

// Salida del Splash Screen obligatoria a los 2.5s
window.onload = () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('auth-screen').style.display = 'flex';
    }, 2500);
};

function handleLogin(event) {
    event.preventDefault();
    const n = document.getElementById('user-name').value;
    const a = document.getElementById('user-surname').value;
    window.usuarioLogueado = n + " " + a;
    
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    dibujarBiblioteca();
}

function navegar(seccion, elemento) {
    const area = document.getElementById('content-area');
    const titulo = document.querySelector('#app-header span');
    
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active-nav'));
    elemento.classList.add('active-nav');

    if (seccion === 'biblioteca') {
        titulo.innerText = "Biblioteca Sagrada";
        dibujarBiblioteca();
    } else if (seccion === 'comunidad') {
        titulo.innerText = "Comunidad";
        dibujarForo();
    } else if (seccion === 'perfil') {
        titulo.innerText = "Mi Perfil";
        area.innerHTML = `
            <div style="padding:40px; text-align:center;">
                <h2 style="color:#4b0082;">Shalom, ${window.usuarioLogueado || 'Estudiante'}</h2>
                <button onclick="location.reload()" style="background:#990000; color:white; padding:12px 25px; border:none; border-radius:8px; margin-top:30px; font-weight:bold;">Cerrar Sesión</button>
            </div>`;
    }
}

function dibujarBiblioteca() {
    const area = document.getElementById('content-area');
    area.innerHTML = `
        <h2 class="section-title">Antiguo Pacto</h2>
        <div class="book-grid">${BIBLIOTECA.antiguo.map(l => crearTarjeta(l)).join('')}</div>
        <h2 class="section-title">Nuevo Pacto</h2>
        <div class="book-grid">${BIBLIOTECA.nuevo.map(l => crearTarjeta(l)).join('')}</div>
    `;
}

function crearTarjeta(l) {
    return `
        <div class="book-card" onclick="alert('Abriendo ${l.esp}')">
            <div class="original-name">${l.original}</div>
            <div class="spanish-name">${l.esp}</div>
        </div>`;
}

/* ─────────────────────────────────────────
   FORO ICTIS — publicar y eliminar reflexiones
───────────────────────────────────────── */
function dibujarForo() {
    const area = document.getElementById('content-area');
    const reflexiones = JSON.parse(localStorage.getItem('ictis_reflexiones') || '[]');

    area.innerHTML = `
        <div style="padding:16px 16px 90px;">
            <div style="text-align:center; margin-bottom:18px;">
                <img src="pez.png" style="width:70px; margin-bottom:8px;" onerror="this.style.display:'none'">
                <h3 style="color:#4b0082; font-size:1.2rem;">Foro Ictis</h3>
                <p style="font-size:0.8rem; color:#666;">Bienvenido a la comunidad de El Lugar.</p>
            </div>
            <textarea id="nueva-reflexion"
                placeholder="Comparte tu reflexión…"
                style="width:100%;padding:12px;border:1px solid #c5a059;border-radius:8px;
                       height:90px;font-family:inherit;resize:none;font-size:0.9rem;"></textarea>
            <button onclick="publicarReflexion()"
                style="background:#003399;color:white;padding:11px;border:none;
                       border-radius:8px;width:100%;font-weight:bold;margin-top:6px;cursor:pointer;">
                Publicar
            </button>
            <div id="lista-reflexiones" style="margin-top:18px;">
                ${reflexiones.length === 0
                    ? '<p style="text-align:center;color:#999;font-size:0.85rem;">Sé el primero en compartir una reflexión.</p>'
                    : reflexiones.map((r, i) => renderReflexion(r, i)).join('')}
            </div>
        </div>`;
}

function renderReflexion(r, i) {
    const esMia = r.autor === (window.usuarioLogueado || '');
    return `
        <div style="background:white;border:1px solid #e8d9b0;border-radius:10px;
                    padding:14px;margin-bottom:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <strong style="color:#4b0082;font-size:0.88rem;">${r.autor}</strong>
                ${esMia
                    ? `<button onclick="eliminarReflexion(${i})"
                           style="background:#990000;color:white;border:none;border-radius:6px;
                                  padding:3px 10px;font-size:0.72rem;cursor:pointer;">
                           Eliminar
                       </button>`
                    : ''}
            </div>
            <p style="font-size:0.88rem;color:#3d3a33;line-height:1.5;margin:0 0 6px;">${r.texto}</p>
            <small style="color:#aaa;font-size:0.72rem;">${r.fecha}</small>
        </div>`;
}

function publicarReflexion() {
    const texto = (document.getElementById('nueva-reflexion').value || '').trim();
    if (!texto) return;
    const reflexiones = JSON.parse(localStorage.getItem('ictis_reflexiones') || '[]');
    reflexiones.unshift({
        autor: window.usuarioLogueado || 'Anónimo',
        texto,
        fecha: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })
    });
    localStorage.setItem('ictis_reflexiones', JSON.stringify(reflexiones));
    dibujarForo();
}

function eliminarReflexion(indice) {
    if (!confirm('¿Eliminar esta reflexión?')) return;
    const reflexiones = JSON.parse(localStorage.getItem('ictis_reflexiones') || '[]');
    reflexiones.splice(indice, 1);
    localStorage.setItem('ictis_reflexiones', JSON.stringify(reflexiones));
    dibujarForo();
}

/* ─────────────────────────────────────────
   HISTORIAL DE NAVEGACIÓN — diccionario / Strong
   Uso:
     · Antes de abrir una entrada: dicNavPush({ tipo:'palabra', id:'H7225' })
     · El botón "← Volver" llama a dicNavVolver()
     · mostrarEntrada(id) ya llama a dicNavPush internamente
───────────────────────────────────────── */
const _dicHistorial = [];   // pila interna

function dicNavPush(estado) {
    _dicHistorial.push(estado);
    _dicActualizarBotonVolver();
}

function dicNavVolver() {
    if (_dicHistorial.length === 0) return;
    _dicHistorial.pop();                    // descarta el actual
    const anterior = _dicHistorial.pop();   // recupera el previo (dicNavPush lo re-agregará)
    if (anterior) {
        _abrirEntradaSinHistorial(anterior); // abre sin duplicar en la pila
    } else {
        _ocultarDiccionario();
    }
    _dicActualizarBotonVolver();
}

function _dicActualizarBotonVolver() {
    // Busca o crea el botón en el header del diccionario
    let btn = document.getElementById('dic-btn-volver');
    if (!btn) return;   // el template del diccionario debe incluir el id="dic-btn-volver"
    btn.style.display = _dicHistorial.length > 1 ? 'inline-block' : 'none';
}

// ── Reemplazá tu función "mostrarEntrada" actual por esta versión
// ── (o integrá dicNavPush al inicio de la que ya tenés):
//
// function mostrarEntrada(id) {
//     dicNavPush({ tipo: 'entrada', id });
//     _abrirEntradaSinHistorial({ tipo: 'entrada', id });
// }
//
// function _abrirEntradaSinHistorial(estado) {
//     // ... tu lógica actual para renderizar la entrada del diccionario ...
//     _dicActualizarBotonVolver();
// }
//
// Y en el HTML del panel del diccionario incluí:
// <button id="dic-btn-volver" onclick="dicNavVolver()" style="display:none;">← Volver</button>