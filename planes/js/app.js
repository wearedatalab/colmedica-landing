/* ============================================================
   app.js  ·  Lógica y datos de la landing Colmédica
   Aquí viven: planes (PLANS), quiz (COVS/PLAN_COV), clínicas
   (CLINICAS), centros (CENTROS), banner, enlaces/URL de botones,
   carruseles, etc.
   ============================================================ */

/* Canonical + og:url autorreferenciados (portables) */
(function () {
    var url = location.origin + location.pathname;
    var link = document.createElement('link');
    link.rel = 'canonical'; link.href = url;
    document.head.appendChild(link);
    var og = document.createElement('meta');
    og.setAttribute('property', 'og:url'); og.setAttribute('content', url);
    document.head.appendChild(og);
  })();


  // ===== Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== Scroll progress + header
  const progress = document.getElementById('scroll-progress');
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    const st = document.documentElement.scrollTop || document.body.scrollTop;
    const sh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progress.style.width = ((st / sh) * 100) + '%';
    header.classList.toggle('scrolled', st > 20);
  });

  // ===== Mobile menu
  const hb = document.getElementById('hamburgerBtn');
  const mm = document.getElementById('mobileMenu');
  hb.addEventListener('click', () => {
    hb.classList.toggle('open');
    mm.classList.toggle('open');
    document.body.classList.toggle('no-scroll', mm.classList.contains('open'));
  });
  function closeMobile() {
    hb.classList.remove('open');
    mm.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  // ===== Clínicas por ciudad
  // Listado de clínicas — orden tal cual aparece en el sitio oficial
  const CLINICAS = {
    armenia: [
      'Clínica Central del Quindio',
      'Clínica del Parque',
      'Clínica la Sagrada Familia',
      'E.S.E Hospital Departamental San Juan de Dios'
    ],
    barrancabermeja: [
      'Clínica Reina Lucia',
      'Clínica San José',
      'Unidad Clínica la Magdalena',
      'Unidad Clínica San Nicolas'
    ],
    barranquilla: [
      'Clínica Portoazul',
      'Clínica del Caribe',
      'Clínica General del Norte',
      'Clínica Atenas',
      'Clínica la Asunción'
    ],
    bogota: [
      'Clínica del Country',
      'Clínica La Colina',
      'Fundación Santa Fé de Bogotá',
      'Fundación Abood Shaio (Clínica Shaio)',
      'Fundación Cardioinfantil',
      'Clínica de La Mujer',
      'Clínica de Marly',
      'Clínica del Occidente',
      'Clínica los Nogales',
      'Clínica Palermo',
      'Clínica la Sabana'
    ],
    bucaramanga: [
      'FOSCAL',
      'Fosunab',
      'Fundación Cardiovascular de Colombia'
    ],
    cali: [
      'Fundación Valle del Lili',
      'Centro Médico Imbanaco de Cali',
      'Clínica Farallones',
      'Clínica Versalles',
      'Clínica de Occidente',
      'Clínica Basilia',
      'Clínica los Andes',
      'Clínica Med'
    ],
    cartagena: [
      'Centro Hospitalario Serena del Mar',
      'Clínica Medihelp Service',
      'Clínica Blas de Lezo',
      'Clínica la Misericordia',
      'Clínica Madre Bernarda',
      'Nuevo Hospital Bocagrande'
    ],
    chia: [
      'Clínica de Marly Jorge Cavelier Gaviría',
      'Clínica Universidad de la Sabana',
      'Clínica Chía'
    ],
    cucuta: [
      'Clínica Norte',
      'Clínica San José de Cúcuta',
      'Clínica Santa Ana',
      'Profamilia'
    ],
    ibague: [
      'Clínica Avidanti Ibagué',
      'Clínica Asotrauma',
      'Clinaltec - Clínica Internacional de Alta Tecnología'
    ],
    manizales: [
      'Clínica de la Santillana',
      'Clínica de la Presentación',
      'Hospital Universitario de Caldas'
    ],
    medellin: [
      'Hospital Pablo Tobón Uribe',
      'Clínica de Las Américas',
      'Clínica el Rosario',
      'Clínica Medellín',
      'Clínica Cardio Vid',
      'Clínica del Campestre',
      'Clínica del Prado',
      'Clinica Las Vegas',
      'Hospital San Vicente Fundación',
      'Clínica Llanogrande'
    ],
    monteria: [
      'Clínica Montería',
      'Clínica Central O.H.L.',
      'Clínica Materno Infantil Casa del Niño',
      'Clínica Zayma'
    ],
    neiva: [
      'Clínica Alejandría',
      'Clínica Belo Horizonte'
    ],
    pasto: [
      'Clínica Aurora',
      'Clínica Nuestra Señora de Fátima',
      'Fundación Hospital San Pedro',
      'Compañía Operadora Clínica Hispanoamérica'
    ],
    pereira: [
      'Clínica Comfamiliar',
      'Clínica los Rosales'
    ],
    santamarta: [
      'Clínica el Prado - Sociedad Médica Santa Marta',
      'Clínica la Milagrosa',
      'Clínica Mar Caribe',
      'Clínica Avidanti',
      'Clínica de la Mujer',
      'Perfect Body'
    ],
    valledupar: [
      'Instituto Cardiovascular del Cesar',
      'Clínica del Cesar',
      'Clínica Valledupar',
      'Clínica Buenos Aires'
    ],
    villavicencio: [
      'Clínica del Meta',
      'Clínica Emperatriz',
      'Hospital Departamental de Villavicencio',
      'Corporación Clínica Universidad Cooperativa de Colombia'
    ],
    yopal: [
      'Clínica Casanare',
      'Clínica Medicenter Ficubo',
      'E.S.E Salud Yopal',
      'Hospital Regional de la Orinoquia'
    ],
  };
  const CITY_LABELS = {
    armenia: 'Armenia', barrancabermeja: 'Barrancabermeja', barranquilla: 'Barranquilla',
    bogota: 'Bogotá', bucaramanga: 'Bucaramanga', cali: 'Cali', cartagena: 'Cartagena',
    chia: 'Chía', cucuta: 'Cúcuta', ibague: 'Ibagué', manizales: 'Manizales',
    medellin: 'Medellín', monteria: 'Montería', neiva: 'Neiva', pasto: 'Pasto',
    pereira: 'Pereira', santamarta: 'Santa Marta', valledupar: 'Valledupar',
    villavicencio: 'Villavicencio', yopal: 'Yopal',
  };
  // Ruta base de las fotos por ciudad (usada por la sección de Centros Médicos).
  const CLINIC_PHOTO_BASE = 'planes/fotos/img-clinicas/';
  function renderClinicas(city) {
    const items = CLINICAS[city] || [];
    const list = document.getElementById('clinicasList');
    const title = document.getElementById('clinicasCityTitle');
    if (!list || !title) return;
    title.textContent = 'Clínicas en ' + (CITY_LABELS[city] || city);

    // Mostramos TODAS las clínicas + un ítem final "y muchas más"
    // (igual que la landing original — siempre aparece al final de cada ciudad)
    let html = items.map(c => `<li>${c}</li>`).join('');
    html += `<li class="clinicas-more">y muchas más</li>`;
    list.innerHTML = html;
  }
  const clinicasTabs = document.getElementById('clinicasTabs');
  const clinicasTabsDots = document.getElementById('clinicasTabsDots');
  if (clinicasTabs && clinicasTabsDots) {
    const tabsArr = Array.from(clinicasTabs.querySelectorAll('.clinicas-tab'));

    // Construir 1 dot por ciudad
    tabsArr.forEach((tab, i) => {
      const d = document.createElement('button');
      d.className = 'clinicas-tab-dot' + (tab.classList.contains('active') ? ' active' : '');
      d.setAttribute('aria-label', 'Ver ' + tab.textContent);
      d.addEventListener('click', () => {
        // Activa el tab correspondiente y dispara su acción
        activateClinicasTab(tab);
      });
      clinicasTabsDots.appendChild(d);
    });
    const dotsArr = Array.from(clinicasTabsDots.children);

    function activateClinicasTab(btn) {
      tabsArr.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      dotsArr.forEach((d, i) => d.classList.toggle('active', tabsArr[i] === btn));
      renderClinicas(btn.dataset.city);
      // Hace scroll para que el tab activo se vea (especialmente en móvil)
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    clinicasTabs.addEventListener('click', e => {
      const btn = e.target.closest('.clinicas-tab');
      if (!btn) return;
      activateClinicasTab(btn);
    });

    renderClinicas('bogota');
  }

  // ===== Especialidades (complete list, no emojis)
  const ESPECIALIDADES = [
    'Acupuntura',
    'Alergología',
    'Alergología Pediátrica',
    'Alto Riesgo Obstétrico',
    'Cardiología',
    'Cardiología - Electrofisiología',
    'Cardiología Pediátrica',
    'Cirugía Cabeza y Cuello',
    'Cirugía Cardiovascular',
    'Cirugía de Colon y Recto (Coloproctología)',
    'Cirugía de la Mano',
    'Cirugía de Seno - Mastología',
    'Cirugía de Seno - Mastología y Tejidos Blandos',
    'Cirugía de Tórax',
    'Cirugía Gastrointestinal',
    'Cirugía General',
    'Cirugía General - Endoscopia',
    'Cirugía Hepatobiliar',
    'Cirugía Maxilofacial',
    'Cirugía Maxilofacial-Oral',
    'Cirugía Oncológica',
    'Cirugía Oncológica Pediátrica',
    'Cirugía Oncológica Piel y Tejidos Blandos',
    'Cirugía Pediátrica',
    'Cirugía Plástica Oncológica',
    'Cirugía Plástica y Reconstructiva',
    'Cirugía Vascular Periférica',
    'Clínica del Dolor',
    'Consulta Médica Domiciliaria',
    'Dermatología',
    'Dermatología Oncológica',
    'Dermatología Pediátrica',
    'Endocrinología',
    'Endocrinología Pediátrica',
    'Gastroenterología',
    'Gastroenterología Pediátrica',
    'Genética',
    'Geriatría',
    'Ginecología',
    'Ginecología Endocrinológica',
    'Ginecología Oncológica',
    'Ginecología y Obstetricia',
    'Ginecología y Obstetricia (Énfasis en Adolescentes)',
    'Hemato - Oncología Pediátrica',
    'Hematología',
    'Hematología Oncológica',
    'Hematología Pediátrica',
    'Hepatología',
    'Homeopatía',
    'Homeopatía Pediátrica',
    'Infectología',
    'Infectología Pediátrica',
    'Inmunología',
    'Medicina Alternativa',
    'Medicina Alternativa Pediátrica',
    'Medicina Alternativa Pediátrica-Acupuntura',
    'Medicina Bioenergética',
    'Medicina de Adolescentes',
    'Medicina de Aviación',
    'Medicina del Dolor y Cuidado Paliativo',
    'Medicina Deportiva',
    'Medicina Familiar',
    'Medicina Física y Rehabilitación (Fisiatría)',
    'Medicina General',
    'Medicina Interna',
    'Medicina Nuclear',
    'Nefrología',
    'Nefrología Pediátrica',
    'Neonatología',
    'Neumología',
    'Neumología Pediátrica',
    'Neurocirugía',
    'Neurocirugía Pediátrica',
    'Neurología',
    'Neurología Oncológica',
    'Neurología Pediátrica',
    'Neuropsicología',
    'Nutrición y Dietética',
    'Oftalmología',
    'Oftalmología Glaucoma',
    'Oftalmología Oculoplástica',
    'Oftalmología Oncológica',
    'Oftalmología Orbitología',
    'Oftalmología Pediátrica',
    'Oftalmología Retina y Vítreo',
    'Oftalmología Segmento Anterior-Córnea',
    'Oftalmología Uveología',
    'Oncología Clínica',
    'Oncología Pediátrica',
    'Optometría',
    'Optometría Pediátrica',
    'Ortopedia de Cadera',
    'Ortopedia de Columna',
    'Ortopedia de Hombro',
    'Ortopedia de Pie y Cuello de Pie',
    'Ortopedia de Rodilla',
    'Ortopedia Oncológica',
    'Ortopedia y Traumatología',
    'Ortopedia y Traumatología Pediátrica',
    'Ortóptica',
    'Otorrinolaringología',
    'Otorrinolaringología - Otología',
    'Otorrinolaringología Pediátrica',
    'Pediatría',
    'Psicología',
    'Psicología Infantil',
    'Psiquiatría',
    'Psiquiatría Infantil',
    'Radioterapia',
    'Rehabilitación Cardiopulmonar',
    'Reumatología',
    'Reumatología Pediátrica',
    'Terapia de Lenguaje (Fonoaudiología)',
    'Terapia de Lenguaje Domiciliaria',
    'Terapia Física Domiciliaria',
    'Terapia Física y Rehabilitación (Fisioterapia)',
    'Terapia Ocupacional',
    'Terapia Ocupacional Domiciliaria',
    'Terapia Respiratoria',
    'Terapia Respiratoria Domiciliaria',
    'Toxicología',
    'Urología',
    'Urología Oncológica',
    'Urología Pediátrica',
    'Y más'
  ];
  const espGrid = document.getElementById('espGrid');
  const espMQ = window.matchMedia('(max-width: 768px)');
  function renderEsp() {
    if (espMQ.matches) {
      // Móvil → carrusel horizontal en grupos de 8 (2x4)
      const slides = [];
      for (let i = 0; i < ESPECIALIDADES.length; i += 8) {
        const group = ESPECIALIDADES.slice(i, i + 8);
        slides.push(
          '<div class="esp-slide">' +
          group.map(e => `<div class="esp-item">${e}</div>`).join('') +
          '</div>'
        );
      }
      espGrid.innerHTML = slides.join('');
      espGrid.classList.add('is-mobile-carousel');
      espGrid.classList.remove('is-desktop-carousel');
    } else {
      // Desktop → carrusel horizontal en grupos de 12 (3 filas × 4 columnas)
      const slides = [];
      for (let i = 0; i < ESPECIALIDADES.length; i += 12) {
        const group = ESPECIALIDADES.slice(i, i + 12);
        slides.push(
          '<div class="esp-slide">' +
          group.map(e => `<div class="esp-item">${e}</div>`).join('') +
          '</div>'
        );
      }
      espGrid.innerHTML = slides.join('');
      espGrid.classList.add('is-desktop-carousel');
      espGrid.classList.remove('is-mobile-carousel');
    }
    if (typeof window.__mcRebuildAll === 'function') window.__mcRebuildAll();
  }
  renderEsp();
  // Re-render cuando cambia el viewport entre móvil/desktop
  if (espMQ.addEventListener) {
    espMQ.addEventListener('change', renderEsp);
  } else {
    // Safari < 14
    espMQ.addListener(renderEsp);
  }

  // ===== Centros Médicos

  // Datos de centros por ciudad — orden alfabético, cantidades igual al sitio original
  const CENTROS = {
    barranquilla: {
      nombre: 'Barranquilla', cantidad: 2, desc: 'Atención en la costa atlántica',
      medicos: ['Centro Médico Colmédica Barranquilla'],
      odontologicos: ['Centro Odontológico Colmédica Barranquilla'],
      diagnostico: []
    },
    bogota: {
      nombre: 'Bogotá', cantidad: 23,
      desc: 'Red completa: médicos, odontológicos y diagnóstico',
      medicos: ['Belaire','Bulevar Niza','Calle 185','Cedritos','Chapinero','Colina Campestre','Country Park','Metrópolis','Plaza Central','Salitre Capital','Suba','Torre Colmédica Santa Bárbara','Unicentro de Occidente','Zafiro Usaquén'],
      odontologicos: ['Belaire','Calle 84','Cedritos','Chapinero','Salitre Capital','Torre Colmédica Santa Bárbara'],
      diagnostico: ['Bella Suiza','Calle 84','Torre Colmédica Santa Bárbara']
    },
    bucaramanga: {
      nombre: 'Bucaramanga', cantidad: 2, desc: 'Servicios en Santander',
      medicos: ['Centro Médico Colmédica Bucaramanga'],
      odontologicos: ['Centro Odontológico Colmédica Bucaramanga'],
      diagnostico: []
    },
    cali: {
      nombre: 'Cali', cantidad: 3, desc: 'Servicios médicos en el Valle del Cauca',
      medicos: ['Centro Médico Colmédica Cali Norte','Centro Médico Colmédica Cali Sur'],
      odontologicos: ['Centro Odontológico Colmédica Cali'],
      diagnostico: []
    },
    cartagena: {
      nombre: 'Cartagena', cantidad: 2, desc: 'Atención en la ciudad heroica',
      medicos: ['Centro Médico Colmédica Cartagena'],
      odontologicos: ['Centro Odontológico Colmédica Cartagena'],
      diagnostico: []
    },
    chia: {
      nombre: 'Chía', cantidad: 2, desc: 'Centro médico en Cundinamarca',
      medicos: ['Centro Médico Colmédica Chía'],
      odontologicos: ['Centro Odontológico Colmédica Chía'],
      diagnostico: []
    },
    ibague: {
      nombre: 'Ibagué', cantidad: 1, desc: 'Capital musical con atención Colmédica',
      medicos: ['Centro Médico Colmédica Ibagué'],
      odontologicos: [],
      diagnostico: []
    },
    manizales: {
      nombre: 'Manizales', cantidad: 1, desc: 'Atención en el eje cafetero',
      medicos: ['Centro Médico Colmédica Manizales'],
      odontologicos: [],
      diagnostico: []
    },
    medellin: {
      nombre: 'Medellín', cantidad: 3, desc: 'Atención integral en el Valle de Aburrá',
      medicos: ['Centro Médico Colmédica El Poblado','Centro Médico Colmédica Laureles'],
      odontologicos: ['Centro Odontológico Colmédica Medellín'],
      diagnostico: []
    },
    neiva: {
      nombre: 'Neiva', cantidad: 1, desc: 'Servicios en el Huila',
      medicos: ['Centro Médico Colmédica Neiva'],
      odontologicos: [],
      diagnostico: []
    },
    pereira: {
      nombre: 'Pereira', cantidad: 1, desc: 'Atención en el eje cafetero',
      medicos: ['Centro Médico Colmédica Pereira'],
      odontologicos: [],
      diagnostico: []
    },
    villavicencio: {
      nombre: 'Villavicencio', cantidad: 2, desc: 'Servicios médicos en los Llanos',
      medicos: ['Centro Médico Colmédica Villavicencio'],
      odontologicos: ['Centro Odontológico Colmédica Villavicencio'],
      diagnostico: []
    },
    yopal: {
      nombre: 'Yopal', cantidad: 1, desc: 'Centro médico en Casanare',
      medicos: ['Centro Médico Colmédica Yopal'],
      odontologicos: [],
      diagnostico: []
    }
  };

  function renderCentros(city) {
    const d = CENTROS[city];
    if (!d) return;
    document.getElementById('centrosImg').src = CLINIC_PHOTO_BASE + city + '.png';   // foto local por ciudad
    document.getElementById('centrosImg').alt = d.nombre;
    document.getElementById('centrosCity').textContent = d.nombre;
    document.getElementById('centrosCount').textContent = d.cantidad;

    // Si un bloque no tiene sedes, NO lo renderiza (oculto completo).
    const box = (title, icon, items) => {
      if (!items || !items.length) return '';
      const content = `<div class="centros-box-list">${items.map(i=>`<span class="centros-chip">${i}</span>`).join('')}</div>`;
      const count = items.length;
      return `
        <div class="centros-box">
          <div class="centros-box-head">
            <span class="centros-box-icon">${icon}</span>
            <div class="centros-box-title">${title}</div>
            <div class="centros-box-count">${count} ${count === 1 ? 'sede' : 'sedes'}</div>
          </div>
          ${content}
        </div>`;
    };

    const iconMed = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M12 14v4M10 16h4"/></svg>';
    const iconOdo = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5c-2-2-4-3-6-2s-2 4-1 7 1 5 2 7 3 3 4 2 1-3 1-5 2-3 3 0 2 5 3 5 2-3 2-6-1-5-2-7-4-2-6 0z"/></svg>';
    const iconDia = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><circle cx="12" cy="15" r="2"/></svg>';

    document.getElementById('centrosBoxes').innerHTML =
      box('Centros Médicos', iconMed, d.medicos) +
      box('Odontológicos',   iconOdo, d.odontologicos) +
      box('Diagnóstico',     iconDia, d.diagnostico);
  }
  // Tabs de ciudad de Centros (con dots paginadores y scroll al activar)
  (function() {
    const tabsEl = document.getElementById('centrosTabs');
    const dotsEl = document.getElementById('centrosTabsDots');
    if (!tabsEl || !dotsEl) return;
    const tabsArr = Array.from(tabsEl.querySelectorAll('.centros-tab'));

    tabsArr.forEach((tab, i) => {
      const d = document.createElement('button');
      d.className = 'centros-tab-dot' + (tab.classList.contains('active') ? ' active' : '');
      d.setAttribute('aria-label', 'Ver ' + tab.textContent);
      d.addEventListener('click', () => activateCentros(tab));
      dotsEl.appendChild(d);
    });
    const dotsArr = Array.from(dotsEl.children);

    function activateCentros(btn) {
      tabsArr.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      dotsArr.forEach((d, i) => d.classList.toggle('active', tabsArr[i] === btn));
      renderCentros(btn.dataset.city);
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    tabsEl.addEventListener('click', e => {
      const btn = e.target.closest('.centros-tab');
      if (!btn) return;
      activateCentros(btn);
    });
  })();
  renderCentros('bogota');

  // ===== Carrusel de planes (3 visibles + peek)  + pills de nombres sincronizadas
  (function() {
    const track = document.getElementById('planesCarousel');
    const wrap  = track.parentElement;
    const cards = Array.from(track.querySelectorAll('.plan-card'));
    const dotsBox  = document.getElementById('planDots');
    const pillsBox = document.getElementById('planesPills');
    const prevBtn  = document.getElementById('planPrev');
    const nextBtn  = document.getElementById('planNext');

    // Nombres cortos para las pills (sin el prefijo "Planes" en las 3 gamas
    // principales para que las pills queden compactas)
    const SHORT_NAMES = {
      diamante:      'Diamante',
      zafiro:        'Zafiro',
      rubi:          'Rubí',
      hospitalarios: 'Hospitalarios',
      caobo:         'Caobo',
      ambar:         'Ámbar Vital',
      esmeralda:     'Esmeralda',
      domiciliario:  'Domiciliario',
      oncologico:    'Oncológico',
    };

    // Dots
    cards.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Ir al plan ' + (i + 1));
      d.addEventListener('click', () => scrollToCard(i));
      dotsBox.appendChild(d);
    });
    const dots = Array.from(dotsBox.children);

    // Pills (un botón por card, usando data-gama del card)
    cards.forEach((c, i) => {
      const gama = c.dataset.gama || '';
      const label = SHORT_NAMES[gama] || (c.querySelector('.plan-gama')?.textContent || ('Plan ' + (i + 1)));
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'plan-pill' + (i === 0 ? ' active' : '');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Ver ' + label);
      b.textContent = label;
      b.addEventListener('click', () => scrollToCard(i));
      pillsBox.appendChild(b);
    });
    const pills = Array.from(pillsBox.children);

    function scrollToCard(i) {
      const card = cards[i];
      if (!card) return;
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: 'smooth'
      });
    }

    function getActiveIndex() {
      const left = track.scrollLeft;
      let best = 0, bestDist = Infinity;
      cards.forEach((c, i) => {
        const dist = Math.abs((c.offsetLeft - track.offsetLeft) - left);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    }

    function scrollPillIntoView(idx) {
      const pill = pills[idx];
      if (!pill) return;
      // Asegurarnos de que la pill activa quede visible dentro del scroll del pills-wrap
      const pillRect = pill.getBoundingClientRect();
      const boxRect  = pillsBox.getBoundingClientRect();
      if (pillRect.left < boxRect.left || pillRect.right > boxRect.right) {
        pillsBox.scrollTo({
          left: pill.offsetLeft - pillsBox.clientWidth / 2 + pill.offsetWidth / 2,
          behavior: 'smooth'
        });
      }
    }

    function update() {
      const active = getActiveIndex();
      dots.forEach((d, i) => d.classList.toggle('active', i === active));
      pills.forEach((p, i) => p.classList.toggle('active', i === active));
      scrollPillIntoView(active);

      // Detectar si ya está al final (para ocultar fade derecho)
      const maxScroll = track.scrollWidth - track.clientWidth;
      const atEnd = Math.abs(track.scrollLeft - maxScroll) < 4;
      wrap.classList.toggle('at-end', atEnd);

      prevBtn.style.opacity = active === 0 ? '.45' : '1';
      prevBtn.style.pointerEvents = active === 0 ? 'none' : 'auto';
      nextBtn.style.opacity = atEnd ? '.45' : '1';
      nextBtn.style.pointerEvents = atEnd ? 'none' : 'auto';
    }

    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });

    prevBtn.addEventListener('click', () => {
      const i = getActiveIndex();
      scrollToCard(Math.max(0, i - 1));
    });
    nextBtn.addEventListener('click', () => {
      const i = getActiveIndex();
      scrollToCard(Math.min(cards.length - 1, i + 1));
    });

    window.addEventListener('load', update);
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(update, 180);
    });
    update();
  })();

  // ===== Plan modal
  const PLANS = {
    diamante: {
      gama: 'Planes Diamante', tagline: 'Cobertura superior y asistencia en viajes en el exterior.',
      price: '428.782',
      features: [
        'Red hospitalaria VIP',
        'Hospitalización en habitación tipo suite',
        'Médico domiciliario',
        'Servicio de orientación médica 24/7',
        '+100 especialidades de acceso directo',
        '+4.400 profesionales adscritos',
        'Medicamentos ambulatorios pre y post-hospitalarios',
        '34 Centros Médicos, de Diagnóstico y Odontológicos propios',
        '1 Centro médico exclusivo Zafiro en Bogotá',
        'Asistencia en viajes en el exterior',
        'Reembolso para copagos y cuotas moderadoras*',
        'Auxilio diario por hospitalización*',
        'Auxilio para nueva tecnología en servicios ambulatorios y hospitalarios*',
        'Reembolso para que elijas libremente dónde y con quién atenderte aunque no haga parte de nuestra guía médica**'
      ]
    },
    zafiro: {
      gama: 'Planes Zafiro', tagline: 'Coberturas y acceso élite para tu salud.',
      price: '301.786',
      features: [
        'Red hospitalaria VIP',
        'Hospitalización en habitación individual',
        'Médico domiciliario',
        'Servicio de orientación médica 24/7',
        '+100 especialidades de acceso directo',
        '+4.400 profesionales adscritos',
        'Medicamentos ambulatorios pre y post-hospitalarios',
        '34 Centros Médicos, de Diagnóstico y Odontológicos propios',
        '1 Centro médico exclusivo Zafiro en Bogotá',
        'Asistencia en viajes en el exterior',
        'Reembolso para copagos y cuotas moderadoras*',
        'Auxilio diario por hospitalización*',
        'Auxilio para nueva tecnología en servicios ambulatorios y hospitalarios*'
      ]
    },
    rubi: {
      gama: 'Planes Rubí', tagline: 'Protección y cuidado confiable para los tuyos.',
      price: '257.664',
      features: [
        'Red hospitalaria preferente',
        'Hospitalización en habitación individual',
        'Médico domiciliario',
        'Servicio de orientación médica 24/7',
        '+100 especialidades de acceso directo',
        '+4.400 profesionales adscritos',
        'Medicamentos ambulatorios pre y post-hospitalarios',
        '33 Centros Médicos, de Diagnóstico y Odontológicos propios'
      ]
    },
    ambar: {
      gama: 'Ámbar Vital', tagline: 'Incluye acceso a 4 clínicas VIP a nivel nacional.',
      price: '154.219',
      features: [
        'Red hospitalaria preferente + 4 clínicas VIP',
        'Hospitalización en habitación individual',
        'Médico domiciliario',
        'Servicio de orientación médica 24/7',
        '+100 especialidades de acceso directo',
        '+4.400 profesionales adscritos',
        '33 Centros Médicos, de Diagnóstico y Odontológicos propios',
        'Este plan se comercializa a nivel nacional, excluyendo Bogotá y municipios aledaños a Bogotá.'
      ]
    },
    caobo: {
      gama: 'Caobo Integral', tagline: 'Cobertura integral con maternidad y alto costo.',
      price: '129.687',
      features: [
        'Red hospitalaria esencial',
        'Hospitalización en habitación individual',
        'Médico domiciliario',
        'Servicio de orientación médica 24/7',
        'Consultas médicas puerta de entrada a través de los Centros Médicos Colmédica de: Chapinero, Suba, Salitre Capital, Metrópolis, Calle 185, Unicentro de Occidente, Plaza Central y Chía.',
        'Este plan se comercializa únicamente para usuarios con residencia en Bogotá o Chía.'
      ]
    },
    hospitalarios: {
      gama: 'Hospitalarios', tagline: 'Protección con coberturas específicas en servicios hospitalarios.',
      price: '53.122',
      features: [
        'Atención de Urgencias que deriven en Hospitalización o Cirugía',
        'Consultas médicas pre y post - hospitalarias',
        'Hospitalización en habitación individual',
        'Cama de acompañante',
        'Auxiliar de Enfermería',
        'Traslado en Ambulancia Terrestre',
        'Servicio de orientación médica 24/7'
      ]
    },
    esmeralda: {
      gama: 'Esmeralda Ambulatorio', tagline: 'Acceso directo a consultas, exámenes de diagnóstico y terapias.',
      price: '62.432',
      features: [
        'Acceso directo a más de 100 especialidades',
        'Odontología preventiva',
        'Exámenes especializados de diagnóstico',
        'Laboratorio e imagenología simple',
        'Terapia física, respiratoria, ortópica, del lenguaje, ocupacional y pleóptica'
      ]
    },
    domiciliario: {
      gama: 'Domiciliario Superior', tagline: 'Consultas médicas en casa y acceso directo a algunas especialidades.',
      price: '51.255',
      features: [
        'Acceso ilimitado a consulta domiciliaria médica general',
        'Acceso a 13 especialidades, además de psicología, de manera presencial o a través de videollamada',
        'Terapia física (fisioterapia) y respiratoria domiciliarias',
        'Traslado en ambulancia terrestre'
      ]
    },
    oncologico: {
      gama: 'Oncológico Vida Plus', tagline: 'Anticípate ante un diagnóstico de cáncer y recibe atención especializada.',
      price: '46.989',
      features: [
        'Reembolso por gastos de diagnóstico inicial o nuevo cáncer primario',
        'Valoración preventiva oncológica',
        'Servicios ambulatorios y hospitalarios en caso de diagnóstico de cáncer, los cuales contemplan:',
        'Tratamiento ambulatorio',
        'Medicamentos ambulatorios para el tratamiento del cáncer',
        'Medicamentos ambulatorios para efectos secundarios y coadyuvantes de quimioterapia, cobaltoterapia, braquiterapia y radioterapia',
        'Consulta médica general y especializada',
        'Consulta psicológica',
        'Psicoterapia individual',
        'Consulta domiciliaria',
        'Terapia física (fisioterapia), respiratoria, del lenguaje y ocupacional',
        'Laboratorio e imagenología simple',
        'Exámenes especializados de diagnóstico',
        'Tratamiento hospitalario'
      ]
    }
  };

  const modal = document.getElementById('planModal');
  function openPlan(key) {
    const p = PLANS[key]; if (!p) return;
    document.getElementById('modalHead').dataset.gama = key;
    document.getElementById('modalGama').textContent = p.gama;
    document.getElementById('modalTagline').textContent = p.tagline;
    document.getElementById('modalPriceValue').textContent = p.price || '';
    document.getElementById('modalFeatures').innerHTML = p.features.map(f =>
      `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>${f}</li>`
    ).join('');
    const mfBtn = document.querySelector('.modal-footer a.btn-primary');
    if (mfBtn && window.colmedicaAfiliacionUrl) mfBtn.href = window.colmedicaAfiliacionUrl(key);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }
  function closePlan() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
  modal.addEventListener('click', e => { if (e.target === modal) closePlan(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closePlan(); } });

  // ===== Carruseles móviles genéricos (Especialidades / Diferenciales / Testimonios)
  (function() {
    const mqMobile = window.matchMedia('(max-width: 768px)');
    const instances = [];

    function setup(trackId) {
      const track = document.getElementById(trackId);
      if (!track) return null;
      const ctrls = document.querySelector('[data-mcarousel-for="' + trackId + '"]');
      if (!ctrls) return null;
      const prevBtn = ctrls.querySelector('.mc-btn.prev');
      const nextBtn = ctrls.querySelector('.mc-btn.next');
      const dotsBox = ctrls.querySelector('.mc-dots');

      function items() {
        return Array.from(track.children);
      }

      function buildDots() {
        dotsBox.innerHTML = '';
        items().forEach((_, i) => {
          const d = document.createElement('button');
          d.className = 'mc-dot' + (i === 0 ? ' active' : '');
          d.setAttribute('aria-label', 'Ir al grupo ' + (i + 1));
          d.addEventListener('click', () => scrollToIndex(i));
          dotsBox.appendChild(d);
        });
      }

      function scrollToIndex(i) {
        const els = items();
        const el = els[i];
        if (!el) return;
        track.scrollTo({ left: el.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      }

      function activeIndex() {
        const els = items();
        const left = track.scrollLeft;
        let best = 0, bestDist = Infinity;
        els.forEach((el, i) => {
          const dist = Math.abs((el.offsetLeft - track.offsetLeft) - left);
          if (dist < bestDist) { bestDist = dist; best = i; }
        });
        return best;
      }

      function update() {
        const els = items();
        const idx = activeIndex();
        Array.from(dotsBox.children).forEach((d, i) => d.classList.toggle('active', i === idx));
        const maxScroll = track.scrollWidth - track.clientWidth;
        const atEnd = Math.abs(track.scrollLeft - maxScroll) < 4;
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = atEnd || idx >= els.length - 1;
      }

      prevBtn.addEventListener('click', () => {
        scrollToIndex(Math.max(0, activeIndex() - 1));
      });
      nextBtn.addEventListener('click', () => {
        scrollToIndex(Math.min(items().length - 1, activeIndex() + 1));
      });
      track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });

      return { track, buildDots, update, ctrls };
    }

    function rebuildAll() {
      instances.forEach(inst => {
        if (!inst) return;
        inst.buildDots();
        inst.update();
      });
    }

    ['espGrid', 'difGrid', 'testGrid'].forEach(id => {
      const inst = setup(id);
      if (inst) { instances.push(inst); inst.buildDots(); inst.update(); }
    });

    // Al cambiar viewport o re-render de especialidades, reconstruir dots
    const onResize = () => {
      clearTimeout(window.__mcRT);
      window.__mcRT = setTimeout(rebuildAll, 200);
    };
    window.addEventListener('resize', onResize);
    // Exponer para que renderEsp pueda llamar rebuild cuando re-renderiza
    window.__mcRebuildAll = rebuildAll;
  })();

  // ===== Drag-to-scroll estilo Owl: drag 1:1 + snap-to-card al soltar
  (function(){
    const DRAG_THRESHOLD = 5;     // pixels para diferenciar click de drag
    const FLICK_VELOCITY = 0.35;  // px/ms — sobre este umbral consideramos "flick" y avanza 1 card extra
    const SAMPLE_WINDOW  = 80;    // ms — ventana para promediar velocidad

    function enableDragScroll(el) {
      if (!el || el.__dragInit) return;
      el.__dragInit = true;

      let isDown = false, startX = 0, scrollLeft = 0, moved = 0, dragging = false;
      let samples = [];           // [{x, t}, ...] últimas posiciones para velocidad

      const onDown = (clientX) => {
        isDown = true;
        dragging = false;
        moved = 0;
        startX = clientX;
        scrollLeft = el.scrollLeft;
        samples = [{ x: clientX, t: performance.now() }];
        // OJO: NO agregamos is-grabbing aquí — solo si hay drag real,
        // así no bloqueamos clicks normales sobre links/botones internos.
      };

      const onMove = (clientX, ev) => {
        if (!isDown) return;
        const dx = clientX - startX;
        moved = Math.abs(dx);
        if (moved > DRAG_THRESHOLD) {
          if (!dragging) {
            dragging = true;
            el.classList.add('is-grabbing');
          }
          if (ev) ev.preventDefault();
          // Drag 1:1 — la card sigue exactamente al cursor
          el.scrollLeft = scrollLeft - dx;

          // Muestras para calcular velocidad real al soltar
          const now = performance.now();
          samples.push({ x: clientX, t: now });
          while (samples.length > 1 && now - samples[0].t > SAMPLE_WINDOW) samples.shift();
        }
      };

      // Calcula la velocidad horizontal media (px/ms) de los últimos samples
      const computeVelocity = () => {
        if (samples.length < 2) return 0;
        const a = samples[0], b = samples[samples.length - 1];
        const dt = b.t - a.t;
        return dt > 0 ? (b.x - a.x) / dt : 0;
      };

      // Encuentra la card más cercana al inicio visible y anima suavemente
      // hacia ella. Usa getBoundingClientRect para que sea robusto frente a
      // padding/gap del contenedor (Owl-style).
      const snapToNearest = () => {
        const items = Array.from(el.children).filter(c => c.offsetWidth > 0);
        if (items.length === 0) return;
        const elLeft = el.getBoundingClientRect().left;

        // Card cuya borde izquierdo está más cerca del borde izquierdo del track
        let nearestI = 0, bestDist = Infinity;
        items.forEach((c, i) => {
          const d = Math.abs(c.getBoundingClientRect().left - elLeft);
          if (d < bestDist) { bestDist = d; nearestI = i; }
        });

        // Si fue un "flick" rápido, avanzamos en la dirección del flick
        const vx = computeVelocity();           // negativo = hacia la izquierda
        if (Math.abs(vx) > FLICK_VELOCITY) {
          if (vx < 0) nearestI = Math.min(items.length - 1, nearestI + 1);
          else        nearestI = Math.max(0, nearestI - 1);
        }

        const targetLeft = items[nearestI].getBoundingClientRect().left;
        const delta = targetLeft - elLeft;
        el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' });
      };

      const onUp = () => {
        if (!isDown) return;
        isDown = false;
        if (dragging) {
          // Solo si realmente hubo drag, removemos la clase (con un mini delay
          // para que el "click" siguiente quede bloqueado por el handler de abajo).
          setTimeout(() => el.classList.remove('is-grabbing'), 30);
          snapToNearest();
        }
      };

      // Mouse
      el.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        onDown(e.pageX);
      });
      window.addEventListener('mousemove', e => onMove(e.pageX, e));
      window.addEventListener('mouseup', onUp);
      el.addEventListener('mouseleave', onUp);

      // Solo bloqueamos el click si realmente hubo drag (>threshold)
      el.addEventListener('click', e => {
        if (dragging || moved > DRAG_THRESHOLD) {
          e.preventDefault();
          e.stopPropagation();
          moved = 0;
          dragging = false;
        }
      }, true);
    }

    function initAll() {
      document.querySelectorAll(
        '.planes-carousel, .dif-grid, .test-grid, ' +
        '.esp-grid.is-desktop-carousel, .esp-grid.is-mobile-carousel, ' +
        '.promo-slider'
      ).forEach(enableDragScroll);
    }
    initAll();
    // Re-inicializar tras cambios de viewport (especialidades cambia clases)
    window.addEventListener('resize', () => {
      clearTimeout(window.__dragRT);
      window.__dragRT = setTimeout(initAll, 250);
    });
  })();

  // ===== Slider del banner promocional (dots + arrows + auto-advance)
  (function(){
    const slider = document.getElementById('promoSlider');
    if (!slider) return;
    const slides = Array.from(slider.children);
    const dotsBox = document.getElementById('promoDots');
    const prevBtn = document.getElementById('promoPrev');
    const nextBtn = document.getElementById('promoNext');
    const AUTO_MS = 6000;
    let autoTimer = null;

    // Construir dots
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'promo-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
      d.addEventListener('click', () => { goTo(i); restartAuto(); });
      dotsBox.appendChild(d);
    });
    const dots = Array.from(dotsBox.children);

    function activeIndex() {
      const left = slider.scrollLeft;
      let best = 0, bestDist = Infinity;
      slides.forEach((s, i) => {
        const dist = Math.abs(s.offsetLeft - left);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    }
    function goTo(i) {
      const target = slides[i];
      if (!target) return;
      slider.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    }
    function update() {
      const idx = activeIndex();
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === slides.length - 1;
    }
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => {
        const idx = activeIndex();
        const next = (idx + 1) % slides.length;
        goTo(next);
      }, AUTO_MS);
    }
    function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
    function restartAuto() { startAuto(); }

    slider.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    prevBtn.addEventListener('click', () => {
      goTo(Math.max(0, activeIndex() - 1)); restartAuto();
    });
    nextBtn.addEventListener('click', () => {
      goTo(Math.min(slides.length - 1, activeIndex() + 1)); restartAuto();
    });

    // Pausar auto-advance al hover/drag
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
    slider.addEventListener('mousedown',  stopAuto);
    slider.addEventListener('touchstart', stopAuto, { passive: true });
    window.addEventListener('mouseup',    () => { if (!autoTimer) startAuto(); });

    update();
    startAuto();
  })();

  // ===== Quiz "Encuentra tu plan ideal" (matriz del Excel)
  (function(){
    const COVS = {
      'medico-dom':     { name: 'Médico domiciliario',         desc: 'Atención médica en tu casa, las 24 horas.' },
      'orientacion':    { name: 'Orientación médica 24/7',     desc: 'Línea telefónica con un médico siempre disponible.' },
      'ambulancia':     { name: 'Traslado en ambulancia',      desc: 'Transporte médico cuando lo necesites.' },
      'especialistas':  { name: 'Especialistas directos',      desc: 'Acceso a +100 especialidades sin médico general.' },
      'examenes':       { name: 'Exámenes y terapias',         desc: 'Laboratorios, imágenes y rehabilitación.' },
      'hospital':       { name: 'Hospitalización y cirugía',   desc: 'Cobertura completa para procedimientos quirúrgicos.' },
      'vip':            { name: 'Clínicas VIP',                desc: 'Las mejores clínicas con habitación individual.' },
      'maternidad':     { name: 'Maternidad',                  desc: 'Atención integral durante el embarazo y parto.' },
      'alto-costo':     { name: 'Enfermedades de alto costo',  desc: 'Cubrimiento para tratamientos especializados.' },
      'red-centros':    { name: 'Amplia red de centros médicos', desc: '+35 centros médicos Colmédica a nivel nacional.' },
      'internacional':  { name: 'Asistencia en viajes en el exterior', desc: 'Cobertura médica cuando viajas al exterior.' },
      'donde-quieras':  { name: 'Atención donde quieras',      desc: 'Libre escogencia de médicos y prestadores.' },
    };
    const ICONS = {
      'medico-dom':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9 12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>',
      'orientacion':   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
      'ambulancia':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/><path d="M9 10h2M10 9v2"/></svg>',
      'especialistas': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11l-3 3-1.5-1.5"/></svg>',
      'examenes':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2h6v6l3 3v11H6V11l3-3z"/><path d="M9 14h6M9 18h6"/></svg>',
      'hospital':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22V8h20v14M2 22h20"/><path d="M12 12v6M9 15h6"/></svg>',
      'vip':           '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
      'maternidad':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="3"/><path d="M9 22v-6a3 3 0 0 1 6 0v6M9 14c-2 1-3 3-3 5"/></svg>',
      'alto-costo':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2C20 17.5 12 22 12 22z"/><path d="M9 11h6M12 8v6"/></svg>',
      'red-centros':   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3"/></svg>',
      'internacional': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
      'donde-quieras': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    };

    // Matriz Plan → Coberturas (5 niveles que mapean a los planes del landing)
    const PLAN_COV = {
      'domiciliario': ['medico-dom','orientacion','ambulancia','especialistas'],
      'esmeralda':    ['medico-dom','orientacion','ambulancia','especialistas','examenes'],
      'rubi':         ['medico-dom','orientacion','ambulancia','especialistas','examenes','hospital','maternidad','alto-costo','red-centros'],
      'zafiro':       ['medico-dom','orientacion','ambulancia','especialistas','examenes','hospital','vip','maternidad','alto-costo','red-centros','internacional'],
      'diamante':     ['medico-dom','orientacion','ambulancia','especialistas','examenes','hospital','vip','maternidad','alto-costo','red-centros','internacional','donde-quieras'],
    };
    // Orden en que se muestran las cards (las 12 coberturas de la matriz)
    const COV_KEYS = [
      'medico-dom', 'orientacion', 'ambulancia', 'especialistas',
      'examenes', 'hospital', 'vip', 'maternidad',
      'alto-costo', 'red-centros', 'internacional', 'donde-quieras'
    ];

    // Etiquetas específicas por plan (sobrescriben el nombre de la cobertura en el resultado)
    const COV_LABEL_OVERRIDE = {
      domiciliario: { especialistas: 'Acceso directo a algunas especialidades' }
    };

    // Estado
    let chosen = new Set();

    const $ = id => document.getElementById(id);

    function start() {
      chosen.clear();
      // Reset visual selection
      $('qzMultiGrid').querySelectorAll('.qz-multi-card').forEach(c => {
        c.classList.remove('is-selected');
        c.setAttribute('aria-pressed', 'false');
      });
      updateActions();
      closeQzResult();
    }

    const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

    function buildGrid() {
      const grid = $('qzMultiGrid');
      grid.innerHTML = COV_KEYS.map(key => {
        const c = COVS[key];
        return `
          <button type="button" class="qz-multi-card" data-cov="${key}" aria-pressed="false">
            <span class="qz-multi-check">${CHECK_SVG}</span>
            <span class="qz-multi-icon">${ICONS[key] || ''}</span>
            <span class="qz-multi-name">${c.name}</span>
          </button>
        `;
      }).join('');
      grid.querySelectorAll('.qz-multi-card').forEach(card => {
        card.addEventListener('click', () => toggleCov(card));
      });
    }

    function toggleCov(card) {
      const key = card.dataset.cov;
      if (chosen.has(key)) {
        chosen.delete(key);
        card.classList.remove('is-selected');
        card.setAttribute('aria-pressed', 'false');
      } else {
        chosen.add(key);
        card.classList.add('is-selected');
        card.setAttribute('aria-pressed', 'true');
      }
      updateActions();
    }

    function updateActions() {
      const n = chosen.size;
      $('qzMultiCounter').textContent = n === 1 ? '1 seleccionada' : `${n} seleccionadas`;
      $('qzMultiSubmit').disabled = n === 0;
      // Botón "Seleccionar todas" toggle
      const all = $('qzMultiAll');
      const isAll = n === COV_KEYS.length;
      all.classList.toggle('is-active', isAll);
      all.textContent = isAll ? 'Quitar selección' : 'Seleccionar todas';
    }

    function toggleAll() {
      if (chosen.size === COV_KEYS.length) {
        chosen.clear();
        $('qzMultiGrid').querySelectorAll('.qz-multi-card').forEach(c => {
          c.classList.remove('is-selected');
          c.setAttribute('aria-pressed', 'false');
        });
      } else {
        COV_KEYS.forEach(k => chosen.add(k));
        $('qzMultiGrid').querySelectorAll('.qz-multi-card').forEach(c => {
          c.classList.add('is-selected');
          c.setAttribute('aria-pressed', 'true');
        });
      }
      updateActions();
    }

    function submit() {
      if (!chosen.size) return;
      const planKey = findBestPlan([...chosen]);
      showResult(planKey);
    }

    function findBestPlan(sel) {
      if (!sel.length) return 'rubi';
      const full = Object.keys(PLAN_COV).filter(p => sel.every(c => PLAN_COV[p].includes(c)));
      if (full.length) {
        full.sort((a, b) => PLAN_COV[a].length - PLAN_COV[b].length);
        return full[0];
      }
      let best = null, bestScore = -1, bestSize = Infinity;
      for (const p in PLAN_COV) {
        const cov = PLAN_COV[p];
        const score = sel.filter(c => cov.includes(c)).length;
        if (score > bestScore || (score === bestScore && cov.length < bestSize)) {
          bestScore = score; bestSize = cov.length; best = p;
        }
      }
      return best;
    }

    function showResult(planKey) {
      // Datos vienen del PLANS global del modal de la landing
      const plan = (typeof PLANS !== 'undefined' && PLANS[planKey]) || { gama: 'Plan', tagline: '', price: '' };
      const planCovs = PLAN_COV[planKey] || [];

      $('qzResultCard').dataset.plan = planKey;
      $('qzResultName').textContent = plan.gama || plan.name || 'Plan';
      $('qzResultTag').textContent  = plan.tagline || '';
      $('qzResultPrice').textContent = plan.price || '';
      if (window.colmedicaAfiliacionUrl && $('qzResultAfiliar')) $('qzResultAfiliar').href = window.colmedicaAfiliacionUrl(planKey);

      const uniq = [...chosen].filter(c => planCovs.includes(c));
      const extras = planCovs.filter(c => !uniq.includes(c));

      $('qzResultPicks').innerHTML = uniq.map(c => li(c, planKey)).join('') ||
        `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Cobertura para tu bienestar</li>`;
      $('qzResultExtras').innerHTML = extras.map(c => li(c, planKey)).join('');
      $('qzExtrasTitle').style.display = extras.length ? '' : 'none';

      openQzResult();
      fireConfetti();
    }

    function openQzResult() {
      const m = $('qzResultModal');
      m.classList.add('open');
      m.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    }
    window.closeQzResult = function() {
      const m = $('qzResultModal');
      if (!m) return;
      m.classList.remove('open');
      m.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    };

    function li(key, planKey) {
      const ov = COV_LABEL_OVERRIDE[planKey];
      const name = (ov && ov[key]) || COVS[key].name;
      return `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>${name}</li>`;
    }

    function fireConfetti() {
      const box = $('qzConfetti'); if (!box) return;
      box.innerHTML = '';
      const colors = ['#0058A2', '#009FE3', '#E30613', '#8ed8ff', '#ffffff'];
      for (let i = 0; i < 40; i++) {
        const s = document.createElement('span');
        s.style.left = Math.random() * 100 + '%';
        s.style.background = colors[Math.floor(Math.random() * colors.length)];
        s.style.animationDelay = (Math.random() * 0.5) + 's';
        s.style.animationDuration = (2 + Math.random() * 1.2) + 's';
        s.style.transform = `rotate(${Math.random() * 360}deg)`;
        box.appendChild(s);
      }
      setTimeout(() => { box.innerHTML = ''; }, 3500);
    }

    // Bind
    $('qzMultiAll').addEventListener('click', toggleAll);
    $('qzMultiSubmit').addEventListener('click', submit);
    $('qzRestart').addEventListener('click', start);
    // Cerrar popup al click fuera
    $('qzResultModal').addEventListener('click', e => {
      if (e.target === $('qzResultModal')) closeQzResult();
    });
    // Cerrar con ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && $('qzResultModal').classList.contains('open')) closeQzResult();
    });

    // Construir la grilla al cargar — quiz visible desde el primer momento
    buildGrid();
    updateActions();
  })();

  // ===== Reproducción de videos de testimonios (mp4 in-place con controles)
  function playVideo(holder) {
    if (!holder) return;
    const video = holder.querySelector('video');
    if (!video) return;
    // Pausar cualquier otro video que esté reproduciéndose
    document.querySelectorAll('.test-video.is-playing').forEach(h => {
      if (h !== holder) {
        const v = h.querySelector('video');
        if (v) { v.pause(); v.controls = false; v.classList.remove('is-playing'); }
        h.classList.remove('is-playing');
      }
    });
    holder.classList.add('is-playing');
    video.classList.add('is-playing');
    video.controls = true;
    video.play().catch(() => {});
    // Cuando termina, restaurar overlay para volver a verlo si quieren
    video.onended = () => {
      holder.classList.remove('is-playing');
      video.classList.remove('is-playing');
      video.controls = false;
      try { video.currentTime = 0; } catch(_) {}
    };
  }
  // ===== Abrir T&C de planes al hacer click en cualquier superíndice de precio
  (function(){
    document.querySelectorAll('[data-open-terms]').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = document.getElementById('planes-terms');
        if (target) target.open = true;
      });
    });
  })();

  // ===== Enlaces de afiliación (S3) — paso de UTM de la página + plan por gama
  //  • Si la página llega CON UTM  →  https://colmedica.s3.us-east-2.amazonaws.com/index.html + esa UTM
  //  • Si la página llega SIN UTM   →  URL por defecto según la gama:
  //       premium (Diamante/Zafiro/Rubí) → plan=2 · medios (Ámbar/Caobo/Hospitalarios) → plan=7 · livianos (Esmeralda/Domiciliario/Oncológico) → plan=1
  (function(){
    const BASE = 'https://colmedica.s3.us-east-2.amazonaws.com/index.html';
    const PLAN_PARAMS = {
      premium:  'plan=2&subplan=03&crm=Organico&crm-sub=Landing-completos&utm_source=Directo&utm_medium=Directo',
      medios:   'plan=7&subplan=03&crm=Organico&crm-sub=Landing-completos&utm_source=Directo&utm_medium=Directo',
      livianos: 'plan=1&subplan=03&crm=Organico&crm-sub=Landing-completos&utm_source=Directo&utm_medium=Directo'
    };
    const GAMA_GROUP = {
      diamante: 'premium', zafiro: 'premium', rubi: 'premium',
      ambar: 'medios', caobo: 'medios', hospitalarios: 'medios',
      esmeralda: 'livianos', domiciliario: 'livianos', oncologico: 'livianos'
    };
    function buildUrl(group){
      const qs = location.search || '';
      // Si la página llega con CUALQUIER parámetro en la URL (UTM, gclid, fbclid, etc. de una pauta),
      // se conserva tal cual en el botón. Solo si NO hay parámetros se usa la URL por defecto de la gama.
      if (qs) return BASE + qs;
      return BASE + '?' + (PLAN_PARAMS[group] || PLAN_PARAMS.premium);
    }
    // Disponible para el modal de plan y el resultado del quiz (enlaces dinámicos)
    window.colmedicaAfiliacionUrl = (gama) => buildUrl(GAMA_GROUP[gama] || 'premium');
    // Reescribir todos los CTA estáticos que apuntan al sitio genérico
    document.querySelectorAll('a[href="https://www.colmedica.com"]').forEach(a => {
      const card = a.closest('.plan-card');
      a.href = (card && a.classList.contains('btn-plan-cotizar'))
        ? buildUrl(GAMA_GROUP[card.dataset.gama] || 'premium')
        : buildUrl('premium');
    });

    // Abrir la afiliación en una ventana emergente vertical (igual que la landing oficial).
    // Cubre todos los botones que apuntan al formulario S3 (CTA, tarjetas de plan, modal, quiz).
    document.addEventListener('click', function (e) {
      const a = e.target.closest('a[href^="' + BASE + '"]');
      if (!a) return;
      e.preventDefault();
      const w = window.open(a.href, '', 'width=550,height=800,left=50,top=50,toolbar=yes');
      if (w) { try { w.focus(); } catch (_) {} }
      else { window.open(a.href, '_blank'); }   // si el navegador bloquea el popup, abre en pestaña
    });
  })();

  // ===== Centrar el tab de la ciudad activa (Bogotá) en Clínicas y Centros.
  // Se ejecuta tras cargar las fuentes/layout (las fuentes web cambian el ancho de los tabs).
  (function(){
    function center(id, sel){
      const cont = document.getElementById(id); if (!cont) return;
      const act = cont.querySelector(sel); if (!act) return;
      const cr = cont.getBoundingClientRect(), ar = act.getBoundingClientRect();
      cont.scrollLeft += (ar.left - cr.left) - (cr.width - ar.width) / 2;
    }
    function run(){ center('clinicasTabs', '.clinicas-tab.active'); center('centrosTabs', '.centros-tab.active'); }
    requestAnimationFrame(run);
    window.addEventListener('load', run);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
  })();
