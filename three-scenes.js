/**
 * PEARL CUISINE RESTAURANT (PC) - 3D Interactive Graphics Engine
 * Powered by Three.js
 * 
 * Features:
 * 1. Full-screen Cinematic Hero 3D background (floating spices, rotating cloche/plate, golden embers, steam)
 * 2. Dedicated Section 4 Interactive 3D Food Showcase (3D textured gourmet plate, floating PC monogram crest, steam particles, mouse-follow dynamic lighting)
 * 3. Ambient 3D Footer background (floating golden luxury embers)
 * 4. Responsive & optimized with automatic mobile downscaling
 */

class Pearl3DEngine {
  constructor() {
    this.isMobile = window.innerWidth < 768;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.heroScene = null;
    this.heroCamera = null;
    this.heroRenderer = null;
    this.heroObjects = {};

    this.expScene = null;
    this.expCamera = null;
    this.expRenderer = null;
    this.expObjects = {};
    this.expActiveDish = 0;
    this.expRotationPaused = false;
    this.expSteamActive = true;

    this.footerScene = null;
    this.footerCamera = null;
    this.footerRenderer = null;
    this.footerParticles = null;

    this.init();
  }

  init() {
    this.setupListeners();
    this.initHeroScene();
    this.initExperienceScene();
    this.initFooterScene();
    this.animate();
  }

  setupListeners() {
    window.addEventListener('mousemove', (e) => {
      // Normalized screen coordinates [-1, 1]
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
      this.handleResize();
    });
  }

  /* ============================================================
     1. HERO 3D SCENE: Cinematic Floating Particles, Spices & Plate
     ============================================================ */
  initHeroScene() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const width = canvas.parentElement.clientWidth || window.innerWidth;
    const height = canvas.parentElement.clientHeight || window.innerHeight;

    this.heroScene = new THREE.Scene();
    this.heroScene.fog = new THREE.FogExp2(0x0a0907, 0.04);

    this.heroCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.heroCamera.position.set(0, 1.2, 5.5);

    this.heroRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: !this.isMobile,
      powerPreference: 'high-performance'
    });
    this.heroRenderer.setSize(width, height);
    this.heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.heroRenderer.toneMappingExposure = 1.1;

    // --- Cinematic Lights ---
    const ambientLight = new THREE.AmbientLight(0xffecd2, 0.6);
    this.heroScene.add(ambientLight);

    const warmKeyLight = new THREE.PointLight(0xd4af37, 3.5, 20);
    warmKeyLight.position.set(3, 4, 3);
    this.heroScene.add(warmKeyLight);
    this.heroObjects.keyLight = warmKeyLight;

    const coolRimLight = new THREE.PointLight(0xc5a059, 2.0, 15);
    coolRimLight.position.set(-4, -1, 2);
    this.heroScene.add(coolRimLight);

    // --- Floating Spices & Golden Embers ---
    const emberCount = this.isMobile ? 120 : 350;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    const emberScale = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 16;
      emberPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      emberPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      emberScale[i] = Math.random() * 0.8 + 0.3;
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
    emberGeo.setAttribute('scale', new THREE.BufferAttribute(emberScale, 1));

    // Create glowing circle sprite
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 230, 160, 1)');
    grad.addColorStop(0.3, 'rgba(212, 175, 55, 0.7)');
    grad.addColorStop(0.8, 'rgba(180, 130, 30, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(spriteCanvas);
    const emberMat = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffd27d
    });

    const embers = new THREE.Points(emberGeo, emberMat);
    this.heroScene.add(embers);
    this.heroObjects.embers = embers;

    // --- Floating 3D Spice Pods (Cardamoms, Star Anise, Cloves stylized) ---
    const spicesGroup = new THREE.Group();
    const spiceCount = this.isMobile ? 12 : 28;

    const spiceMats = [
      new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.6, metalness: 0.2 }), // clove/cinnamon
      new THREE.MeshStandardMaterial({ color: 0x556b2f, roughness: 0.5, metalness: 0.1 }), // cardamom
      new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 })  // golden garnish flakes
    ];

    for (let i = 0; i < spiceCount; i++) {
      let geo;
      const type = i % 3;
      if (type === 0) {
        geo = new THREE.DodecahedronGeometry(0.12, 0); // Star anise / spice node
      } else if (type === 1) {
        geo = new THREE.CylinderGeometry(0.04, 0.08, 0.25, 6); // Cardamom pod
      } else {
        geo = new THREE.OctahedronGeometry(0.08, 0); // Gold crystal flakes
      }

      const mesh = new THREE.Mesh(geo, spiceMats[type]);
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6 - 0.5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        driftY: (Math.random() * 0.005) + 0.002,
        driftX: (Math.random() - 0.5) * 0.003
      };
      spicesGroup.add(mesh);
    }
    this.heroScene.add(spicesGroup);
    this.heroObjects.spices = spicesGroup;

    // --- Elegant 3D Cloche / Golden Plate Rig in Background Right ---
    const plateGroup = new THREE.Group();
    plateGroup.position.set(2.4, -0.6, 0.5);
    plateGroup.rotation.x = 0.45;

    // Base porcelain plate with gold rim
    const plateRimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x4a3b10,
      emissiveIntensity: 0.2
    });
    const plateBaseMat = new THREE.MeshStandardMaterial({
      color: 0x1a1815,
      roughness: 0.3,
      metalness: 0.4
    });

    const plateGeo = new THREE.CylinderGeometry(1.6, 1.3, 0.12, 48);
    const plateMesh = new THREE.Mesh(plateGeo, plateBaseMat);
    plateGroup.add(plateMesh);

    const rimGeo = new THREE.TorusGeometry(1.62, 0.045, 16, 64);
    rimGeo.rotateX(Math.PI / 2);
    const rimMesh = new THREE.Mesh(rimGeo, plateRimMat);
    plateGroup.add(rimMesh);

    // Inner gourmet dish disc with texture
    const dishTopGeo = new THREE.CylinderGeometry(1.48, 1.48, 0.04, 48);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('assets/images/plate_3d_render.png', (tex) => {
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      const dishMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.4,
        metalness: 0.2
      });
      const dishMesh = new THREE.Mesh(dishTopGeo, dishMat);
      dishMesh.position.y = 0.06;
      plateGroup.add(dishMesh);
    });

    // 3D Steam particles rising from the hero plate
    const steamGeo = new THREE.BufferGeometry();
    const steamCount = 35;
    const steamPos = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 1.5;
      steamPos[i * 3 + 1] = Math.random() * 2.2 + 0.2;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xfff0dd
    });
    const steam = new THREE.Points(steamGeo, steamMat);
    plateGroup.add(steam);
    this.heroObjects.steam = steam;

    this.heroScene.add(plateGroup);
    this.heroObjects.plate = plateGroup;
  }

  /* ============================================================
     2. DEDICATED 3D EXPERIENCE: Interactive Showcase & 3D Model
     ============================================================ */
  initExperienceScene() {
    const canvas = document.getElementById('experience-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = canvas.parentElement;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    this.expScene = new THREE.Scene();
    this.expCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    this.expCamera.position.set(0, 1.8, 4.6);
    this.expCamera.lookAt(0, 0, 0);

    this.expRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.expRenderer.setSize(width, height);
    this.expRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.expRenderer.shadowMap.enabled = true;
    this.expRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- Studio Lighting Setup ---
    const ambient = new THREE.AmbientLight(0xfff6ea, 0.8);
    this.expScene.add(ambient);

    // Dynamic mouse-following key light
    const expLight = new THREE.SpotLight(0xffe6a3, 5, 20, Math.PI / 4, 0.5, 1);
    expLight.position.set(2, 5, 4);
    expLight.castShadow = true;
    this.expScene.add(expLight);
    this.expObjects.spotLight = expLight;

    const goldRim = new THREE.PointLight(0xd4af37, 3, 10);
    goldRim.position.set(-3, 2, -2);
    this.expScene.add(goldRim);

    const floorLight = new THREE.PointLight(0xb8860b, 1.5, 8);
    floorLight.position.set(0, -1.5, 2);
    this.expScene.add(floorLight);

    // --- Master 3D Showcase Group ---
    const rootGroup = new THREE.Group();
    this.expScene.add(rootGroup);
    this.expObjects.root = rootGroup;

    // 1. Luxury Pedestal / Marble Plinth with Gold Inlay
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x141210,
      roughness: 0.4,
      metalness: 0.6
    });
    const pedestalGeo = new THREE.CylinderGeometry(1.8, 2.1, 0.35, 64);
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.85;
    pedestal.receiveShadow = true;
    rootGroup.add(pedestal);

    // Pedestal Gold Ring
    const goldRingMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x3d300d,
      emissiveIntensity: 0.3
    });
    const ringGeo = new THREE.TorusGeometry(1.82, 0.04, 16, 64);
    ringGeo.rotateX(Math.PI / 2);
    const ring = new THREE.Mesh(ringGeo, goldRingMat);
    ring.position.y = -0.68;
    rootGroup.add(ring);

    // 2. Gourmet Rotating Serving Plate (Detailed 3D mesh)
    const plateContainer = new THREE.Group();
    plateContainer.position.y = -0.4;
    rootGroup.add(plateContainer);
    this.expObjects.plateContainer = plateContainer;

    const mainPlateGeo = new THREE.CylinderGeometry(1.5, 1.25, 0.15, 64);
    const blackPorcelainMat = new THREE.MeshStandardMaterial({
      color: 0x11100e,
      roughness: 0.3,
      metalness: 0.5
    });
    const mainPlate = new THREE.Mesh(mainPlateGeo, blackPorcelainMat);
    mainPlate.castShadow = true;
    mainPlate.receiveShadow = true;
    plateContainer.add(mainPlate);

    const plateRim = new THREE.Mesh(new THREE.TorusGeometry(1.52, 0.05, 16, 64), goldRingMat);
    plateRim.rotation.x = Math.PI / 2;
    plateRim.position.y = 0.07;
    plateContainer.add(plateRim);

    // 3. Dish Surface with Swappable Textures
    const dishTextureLoader = new THREE.TextureLoader();
    this.dishTextures = [
      dishTextureLoader.load('assets/images/plate_3d_render.png'),
      dishTextureLoader.load('assets/images/bbq_special.jpg'),
      dishTextureLoader.load('assets/images/karahi_special.jpg'),
      dishTextureLoader.load('assets/images/pizza_burger.jpg')
    ];

    const foodDiscGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.03, 64);
    this.foodMat = new THREE.MeshStandardMaterial({
      map: this.dishTextures[0],
      roughness: 0.45,
      metalness: 0.15
    });
    const foodDisc = new THREE.Mesh(foodDiscGeo, this.foodMat);
    foodDisc.position.y = 0.085;
    plateContainer.add(foodDisc);

    // 4. Hovering Floating 3D Restaurant Crest / Monogram (PC Crest)
    const crestGroup = new THREE.Group();
    crestGroup.position.set(0, 1.15, 0);
    rootGroup.add(crestGroup);
    this.expObjects.crest = crestGroup;

    // Elegant 3D Octagonal / Torus Medallion
    const medallionGeo = new THREE.TorusGeometry(0.55, 0.04, 16, 8);
    const medallion = new THREE.Mesh(medallionGeo, goldRingMat);
    crestGroup.add(medallion);

    // Floating inner gemstone / PC symbol representation
    const innerGemGeo = new THREE.OctahedronGeometry(0.28, 0);
    const innerGemMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x5a4410,
      emissiveIntensity: 0.4
    });
    const innerGem = new THREE.Mesh(innerGemGeo, innerGemMat);
    crestGroup.add(innerGem);
    this.expObjects.innerGem = innerGem;

    // 5. Rising Steam & Aromatic Spice Particles
    const expSteamGeo = new THREE.BufferGeometry();
    const expSteamCount = 50;
    const expSteamPos = new Float32Array(expSteamCount * 3);
    for (let i = 0; i < expSteamCount; i++) {
      expSteamPos[i * 3] = (Math.random() - 0.5) * 1.8;
      expSteamPos[i * 3 + 1] = Math.random() * 2.0;
      expSteamPos[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
    }
    expSteamGeo.setAttribute('position', new THREE.BufferAttribute(expSteamPos, 3));

    // Particle sprite
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 240, 200, 0.9)');
    grad.addColorStop(0.4, 'rgba(212, 175, 55, 0.5)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();

    const expParticleTexture = new THREE.CanvasTexture(spriteCanvas);
    const expSteamMat = new THREE.PointsMaterial({
      size: 0.22,
      map: expParticleTexture,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffe9b8
    });
    const expSteam = new THREE.Points(expSteamGeo, expSteamMat);
    expSteam.position.y = -0.2;
    plateContainer.add(expSteam);
    this.expObjects.steam = expSteam;
    this.expObjects.steamMat = expSteamMat;

    // Orbit/Mouse Drag Interaction for 3D Experience Box
    this.setupExperienceControls(canvas);
  }

  setupExperienceControls(canvas) {
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!isDragging || !this.expObjects.root) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      this.expObjects.root.rotation.y += deltaX * 0.008;
      this.expObjects.root.rotation.x = Math.max(-0.3, Math.min(0.5, this.expObjects.root.rotation.x + deltaY * 0.005));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    // Touch support for mobile 3D interaction
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (!isDragging || !this.expObjects.root || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;

      this.expObjects.root.rotation.y += deltaX * 0.008;
      this.expObjects.root.rotation.x = Math.max(-0.3, Math.min(0.5, this.expObjects.root.rotation.x + deltaY * 0.005));

      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // Switch dish in 3D interactive viewer
  switchExperienceDish(index) {
    if (!this.dishTextures || !this.foodMat) return;
    this.expActiveDish = index;
    if (this.dishTextures[index]) {
      this.foodMat.map = this.dishTextures[index];
      this.foodMat.needsUpdate = true;
    }
  }

  toggleRotation() {
    this.expRotationPaused = !this.expRotationPaused;
    return this.expRotationPaused;
  }

  toggleSteam() {
    this.expSteamActive = !this.expSteamActive;
    if (this.expObjects.steam) {
      this.expObjects.steam.visible = this.expSteamActive;
    }
    return this.expSteamActive;
  }

  /* ============================================================
     3. FOOTER 3D SCENE: Luxury Ambient Golden Embers
     ============================================================ */
  initFooterScene() {
    const canvas = document.getElementById('footer-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const width = canvas.parentElement.clientWidth || window.innerWidth;
    const height = canvas.parentElement.clientHeight || 350;

    this.footerScene = new THREE.Scene();
    this.footerCamera = new THREE.PerspectiveCamera(50, width / height, 0.1, 50);
    this.footerCamera.position.z = 5;

    this.footerRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false
    });
    this.footerRenderer.setSize(width, height);
    this.footerRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const pCount = this.isMobile ? 80 : 200;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xd4af37,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    this.footerParticles = new THREE.Points(pGeo, pMat);
    this.footerScene.add(this.footerParticles);
  }

  /* ============================================================
     ANIMATION LOOP & RENDER
     ============================================================ */
  animate() {
    requestAnimationFrame(() => this.animate());

    // Mouse smoothing (lerp)
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    const time = performance.now() * 0.001;

    // --- Render Hero ---
    if (this.heroScene && this.heroRenderer && this.heroCamera) {
      // Subtle parallax camera drift
      this.heroCamera.position.x = this.mouse.x * 0.45;
      this.heroCamera.position.y = 1.2 + this.mouse.y * 0.35;
      this.heroCamera.lookAt(0, 0, 0);

      // Light moves gently
      if (this.heroObjects.keyLight) {
        this.heroObjects.keyLight.position.x = 3 + Math.sin(time * 0.8) * 1.5;
        this.heroObjects.keyLight.position.y = 4 + Math.cos(time * 0.6) * 0.8;
      }

      // Rotate hero plate gently
      if (this.heroObjects.plate) {
        this.heroObjects.plate.rotation.y = time * 0.18;
      }

      // Drift floating spices
      if (this.heroObjects.spices) {
        this.heroObjects.spices.children.forEach((mesh) => {
          mesh.rotation.x += mesh.userData.rotSpeedX;
          mesh.rotation.y += mesh.userData.rotSpeedY;
          mesh.position.y += Math.sin(time + mesh.position.x) * 0.002;
        });
      }

      // Animate Hero Steam
      if (this.heroObjects.steam) {
        const positions = this.heroObjects.steam.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.008;
          if (positions[i] > 2.5) positions[i] = 0.1;
        }
        this.heroObjects.steam.geometry.attributes.position.needsUpdate = true;
      }

      this.heroRenderer.render(this.heroScene, this.heroCamera);
    }

    // --- Render Experience 3D Section ---
    if (this.expScene && this.expRenderer && this.expCamera) {
      if (this.expObjects.plateContainer && !this.expRotationPaused) {
        this.expObjects.plateContainer.rotation.y += 0.009;
      }

      // Mouse-follow spotlight
      if (this.expObjects.spotLight) {
        this.expObjects.spotLight.position.x = 2 + this.mouse.x * 2.5;
        this.expObjects.spotLight.position.y = 5 + this.mouse.y * 1.5;
      }

      // Hovering Crest rotation & bob
      if (this.expObjects.crest) {
        this.expObjects.crest.position.y = 1.15 + Math.sin(time * 1.8) * 0.08;
        this.expObjects.crest.rotation.y = time * 0.4;
      }
      if (this.expObjects.innerGem) {
        this.expObjects.innerGem.rotation.x = time * 0.8;
        this.expObjects.innerGem.rotation.z = time * 0.6;
      }

      // Experience Steam animation
      if (this.expObjects.steam && this.expSteamActive) {
        const steamPositions = this.expObjects.steam.geometry.attributes.position.array;
        for (let i = 1; i < steamPositions.length; i += 3) {
          steamPositions[i] += 0.012;
          if (steamPositions[i] > 2.2) {
            steamPositions[i] = 0.1;
          }
        }
        this.expObjects.steam.geometry.attributes.position.needsUpdate = true;
      }

      this.expRenderer.render(this.expScene, this.expCamera);
    }

    // --- Render Footer ---
    if (this.footerScene && this.footerRenderer && this.footerCamera) {
      if (this.footerParticles) {
        this.footerParticles.rotation.y = time * 0.03;
        this.footerParticles.rotation.x = Math.sin(time * 0.02) * 0.1;
      }
      this.footerRenderer.render(this.footerScene, this.footerCamera);
    }
  }

  handleResize() {
    // Hero resize
    const heroCanvas = document.getElementById('hero-3d-canvas');
    if (heroCanvas && this.heroRenderer && this.heroCamera) {
      const width = heroCanvas.parentElement.clientWidth;
      const height = heroCanvas.parentElement.clientHeight;
      this.heroCamera.aspect = width / height;
      this.heroCamera.updateProjectionMatrix();
      this.heroRenderer.setSize(width, height);
    }

    // Experience resize
    const expCanvas = document.getElementById('experience-3d-canvas');
    if (expCanvas && this.expRenderer && this.expCamera) {
      const width = expCanvas.parentElement.clientWidth;
      const height = expCanvas.parentElement.clientHeight;
      this.expCamera.aspect = width / height;
      this.expCamera.updateProjectionMatrix();
      this.expRenderer.setSize(width, height);
    }

    // Footer resize
    const footerCanvas = document.getElementById('footer-3d-canvas');
    if (footerCanvas && this.footerRenderer && this.footerCamera) {
      const width = footerCanvas.parentElement.clientWidth;
      const height = footerCanvas.parentElement.clientHeight;
      this.footerCamera.aspect = width / height;
      this.footerCamera.updateProjectionMatrix();
      this.footerRenderer.setSize(width, height);
    }
  }
}

// Global initialization helper
window.Pearl3DEngine = Pearl3DEngine;
