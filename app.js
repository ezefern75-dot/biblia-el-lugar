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
        area.innerHTML = `
            <div style="padding:40px; text-align:center;">
                <img src="pez.png" style="width:120px; margin-bottom:20px;" onerror="this.style.display='none'">
                <h3 style="color:#4b0082;">Foro Ictis</h3>
                <p>Bienvenido a la comunidad de El Lugar.</p>
            </div>`;
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