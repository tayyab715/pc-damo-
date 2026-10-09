/**
 * PEARL CUISINE RESTAURANT (PC) - Core Application Logic
 * Chichawatni Bypass, Punjab, Pakistan
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    cart: JSON.parse(localStorage.getItem('pearl_cart')) || [],
    activeCategory: 'all',
    searchQuery: '',
    galleryCategory: 'all',
    orderType: 'delivery', // 'delivery' or 'pickup'
    selectedModalItem: null,
    modalQty: 1,
    threeEngine: null
  };

  // Sync config from localStorage if edited by owner
  loadCustomConfig();

  // Initialize Modules
  initHeaderScroll();
  initMobileNav();
  initStatsCounter();
  init3DEngine();
  renderMenu();
  initMenuFilters();
  initMenuSearch();
  initCart();
  initTableBooking();
  initGallery();
  initFaqAccordion();
  initSpecialOffers();
  initReviews();
  initFoodShowcase();
  initOwnerConfigPanel();
  initFloatingActions();

  /* ==========================================================================
     1. 3D ENGINE INITIALIZATION
     ========================================================================== */
  function init3DEngine() {
    if (typeof Pearl3DEngine !== 'undefined') {
      state.threeEngine = new Pearl3DEngine();

      // Hook up Section 4 controls
      const dishButtons = document.querySelectorAll('.dish-tab-btn');
      dishButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          dishButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (state.threeEngine) {
            state.threeEngine.switchExperienceDish(index);
          }
        });
      });

      const rotBtn = document.getElementById('btn-toggle-rot');
      if (rotBtn) {
        rotBtn.addEventListener('click', () => {
          const paused = state.threeEngine.toggleRotation();
          rotBtn.classList.toggle('active', paused);
          rotBtn.innerHTML = paused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
        });
      }

      const steamBtn = document.getElementById('btn-toggle-steam');
      if (steamBtn) {
        steamBtn.addEventListener('click', () => {
          const active = state.threeEngine.toggleSteam();
          steamBtn.classList.toggle('active', active);
        });
      }
    }
  }

  /* ==========================================================================
     2. NAVIGATION & HEADER
     ========================================================================== */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.mobile-nav');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
      });

      links.forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
        });
      });
    }
  }

  /* ==========================================================================
     3. MENU SYSTEM & CATEGORY FILTERING
     ========================================================================== */
  function renderMenu() {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;

    let items = PEARL_CONFIG.menuItems;

    // Filter by Category
    if (state.activeCategory !== 'all') {
      items = items.filter(item => item.category === state.activeCategory);
    }

    // Filter by Search
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) || 
        (item.nameUrdu && item.nameUrdu.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q)
      );
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <i class="fa-solid fa-utensils" style="font-size: 2.5rem; color: var(--gold-border); margin-bottom: 1rem;"></i>
          <h3 style="color: var(--gold-light);">No dishes found</h3>
          <p style="color: var(--text-muted);">Try a different search keyword or category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => `
      <div class="food-card" data-id="${item.id}">
        <div class="food-img-holder" onclick="window.PearlApp.openFoodModal('${item.id}')">
          <img src="${item.image}" alt="${item.name}" class="food-img" loading="lazy">
          ${item.badge ? `<span class="food-badge">${item.badge}</span>` : ''}
          <div class="food-quick-view-overlay">
            <span class="btn btn-sm btn-primary">
              <i class="fa-solid fa-eye"></i> View Details
            </span>
          </div>
        </div>
        <div class="food-details">
          <div class="food-header">
            <h3 class="food-title" onclick="window.PearlApp.openFoodModal('${item.id}')">
              ${item.name}
              ${item.nameUrdu ? `<span class="food-urdu-name">${item.nameUrdu}</span>` : ''}
            </h3>
            <span class="food-price">${PEARL_CONFIG.restaurant.defaultCurrency} ${item.price.toLocaleString()}</span>
          </div>
          <p class="food-desc">${item.description}</p>
          <div class="food-footer">
            <span class="food-time"><i class="fa-regular fa-clock"></i> ${item.prepTime || '15-20 mins'}</span>
            <button class="btn btn-sm btn-outline-gold" onclick="window.PearlApp.addToCart('${item.id}')">
              <i class="fa-solid fa-cart-plus"></i> Add to Order
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach 3D Card Tilt effects
    attachCardTilt();
  }

  function initMenuFilters() {
    const tabsContainer = document.getElementById('category-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = PEARL_CONFIG.categories.map(cat => `
      <button class="category-btn ${cat.id === state.activeCategory ? 'active' : ''}" data-cat="${cat.id}">
        <i class="fa-solid ${cat.icon}"></i> ${cat.name}
      </button>
    `).join('');

    tabsContainer.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeCategory = btn.getAttribute('data-cat');
        renderMenu();
      });
    });
  }

  function initMenuSearch() {
    const searchInput = document.getElementById('menu-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenu();
    });
  }

  /* 3D Interactive Card Tilt on Mouse Move */
  function attachCardTilt() {
    if (window.innerWidth < 768) return; // avoid on mobile for performance

    const cards = document.querySelectorAll('.food-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ==========================================================================
     4. FOOD MODAL POPUP
     ========================================================================== */
  function openFoodModal(itemId) {
    const item = PEARL_CONFIG.menuItems.find(i => i.id === itemId);
    if (!item) return;

    state.selectedModalItem = item;
    state.modalQty = 1;

    const modal = document.getElementById('food-modal-backdrop');
    if (!modal) return;

    document.getElementById('modal-food-img').src = item.image;
    document.getElementById('modal-food-img').alt = item.name;
    document.getElementById('modal-food-badge').innerText = item.badge || 'Chef Selection';
    document.getElementById('modal-food-title').innerHTML = `${item.name} ${item.nameUrdu ? `<span style="display:block; font-size:1.15rem; color:var(--gold-rich); margin-top:0.3rem; font-family:var(--font-sans);">${item.nameUrdu}</span>` : ''}`;
    document.getElementById('modal-food-desc').innerText = item.description;
    document.getElementById('modal-food-price').innerText = `${PEARL_CONFIG.restaurant.defaultCurrency} ${item.price.toLocaleString()}`;
    document.getElementById('modal-qty-num').innerText = state.modalQty;

    modal.classList.add('open');
  }

  function closeFoodModal() {
    const modal = document.getElementById('food-modal-backdrop');
    if (modal) modal.classList.remove('open');
  }

  // Bind modal event listeners
  const modalClose = document.getElementById('modal-close-btn');
  if (modalClose) modalClose.addEventListener('click', closeFoodModal);

  const modalBackdrop = document.getElementById('food-modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeFoodModal();
    });
  }

  const btnQtyMinus = document.getElementById('modal-qty-minus');
  if (btnQtyMinus) {
    btnQtyMinus.addEventListener('click', () => {
      if (state.modalQty > 1) {
        state.modalQty--;
        document.getElementById('modal-qty-num').innerText = state.modalQty;
      }
    });
  }

  const btnQtyPlus = document.getElementById('modal-qty-plus');
  if (btnQtyPlus) {
    btnQtyPlus.addEventListener('click', () => {
      state.modalQty++;
      document.getElementById('modal-qty-num').innerText = state.modalQty;
    });
  }

  const btnModalAddToCart = document.getElementById('modal-add-cart-btn');
  if (btnModalAddToCart) {
    btnModalAddToCart.addEventListener('click', () => {
      if (state.selectedModalItem) {
        addToCart(state.selectedModalItem.id, state.modalQty);
        closeFoodModal();
      }
    });
  }

  /* ==========================================================================
     5. CART MANAGEMENT & ORDER SYSTEM
     ========================================================================== */
  function addToCart(itemId, qty = 1) {
    const item = PEARL_CONFIG.menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existing = state.cart.find(c => c.id === itemId);
    if (existing) {
      existing.quantity += qty;
    } else {
      state.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: qty
      });
    }

    saveCart();
    renderCart();
    showNotification(`Added ${qty}x ${item.name} to order!`);
  }

  function changeCartQty(itemId, delta) {
    const index = state.cart.findIndex(c => c.id === itemId);
    if (index === -1) return;

    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }

    saveCart();
    renderCart();
  }

  function saveCart() {
    localStorage.setItem('pearl_cart', JSON.stringify(state.cart));
  }

  function renderCart() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = (state.orderType === 'delivery' && state.cart.length > 0) ? 150 : 0;
    const grandTotal = subtotal + deliveryFee;

    // Badges in Navbar and Drawer Trigger
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
      b.innerText = totalCount;
      b.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    // Render inside Order Summary Section
    const orderItemsContainer = document.getElementById('order-summary-items');
    const orderSubtotalEl = document.getElementById('order-summary-subtotal');
    const orderDeliveryEl = document.getElementById('order-summary-delivery');
    const orderTotalEl = document.getElementById('order-summary-total');

    if (orderItemsContainer) {
      if (state.cart.length === 0) {
        orderItemsContainer.innerHTML = `
          <div class="cart-empty-message">
            <i class="fa-solid fa-cart-shopping" style="font-size: 2rem; color: var(--gold-border); margin-bottom: 0.6rem;"></i>
            <p>Your order cart is currently empty.</p>
            <a href="#menu" class="btn btn-sm btn-outline-gold" style="margin-top: 0.8rem;">Browse Our Menu</a>
          </div>
        `;
      } else {
        orderItemsContainer.innerHTML = state.cart.map(item => `
          <div class="cart-item-row">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <span>${PEARL_CONFIG.restaurant.defaultCurrency} ${item.price.toLocaleString()} x ${item.quantity}</span>
            </div>
            <div class="cart-qty-ctrls">
              <button class="qty-btn" onclick="window.PearlApp.changeCartQty('${item.id}', -1)">-</button>
              <span style="font-weight: 700; min-width: 20px; text-align: center;">${item.quantity}</span>
              <button class="qty-btn" onclick="window.PearlApp.changeCartQty('${item.id}', 1)">+</button>
            </div>
          </div>
        `).join('');
      }
    }

    if (orderSubtotalEl) orderSubtotalEl.innerText = `${PEARL_CONFIG.restaurant.defaultCurrency} ${subtotal.toLocaleString()}`;
    if (orderDeliveryEl) orderDeliveryEl.innerText = state.orderType === 'delivery' ? `${PEARL_CONFIG.restaurant.defaultCurrency} ${deliveryFee}` : 'Free';
    if (orderTotalEl) orderTotalEl.innerText = `${PEARL_CONFIG.restaurant.defaultCurrency} ${grandTotal.toLocaleString()}`;

    // Render Drawer items too
    const drawerItemsContainer = document.getElementById('drawer-cart-items');
    const drawerTotalEl = document.getElementById('drawer-cart-total');
    if (drawerItemsContainer) {
      if (state.cart.length === 0) {
        drawerItemsContainer.innerHTML = `
          <div class="cart-empty-message">
            <p>No items in your cart yet.</p>
          </div>
        `;
      } else {
        drawerItemsContainer.innerHTML = state.cart.map(item => `
          <div class="cart-item-row">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <span>${PEARL_CONFIG.restaurant.defaultCurrency} ${item.price.toLocaleString()} x ${item.quantity}</span>
            </div>
            <div class="cart-qty-ctrls">
              <button class="qty-btn" onclick="window.PearlApp.changeCartQty('${item.id}', -1)">-</button>
              <span style="font-weight: 700; min-width: 20px; text-align: center;">${item.quantity}</span>
              <button class="qty-btn" onclick="window.PearlApp.changeCartQty('${item.id}', 1)">+</button>
            </div>
          </div>
        `).join('');
      }
    }
    if (drawerTotalEl) drawerTotalEl.innerText = `${PEARL_CONFIG.restaurant.defaultCurrency} ${grandTotal.toLocaleString()}`;
  }

  function initCart() {
    renderCart();

    // Drawer Open / Close
    const triggers = document.querySelectorAll('.cart-trigger-btn');
    const drawerOverlay = document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer');
    const closeDrawerBtn = document.getElementById('cart-drawer-close');

    triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        if (drawerOverlay && drawer) {
          drawerOverlay.classList.add('open');
          drawer.classList.add('open');
        }
      });
    });

    const closeCart = () => {
      if (drawerOverlay && drawer) {
        drawerOverlay.classList.remove('open');
        drawer.classList.remove('open');
      }
    };

    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeCart);
    if (drawerOverlay) drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeCart();
    });

    // Delivery vs Pickup switch
    const deliveryBtn = document.getElementById('order-btn-delivery');
    const pickupBtn = document.getElementById('order-btn-pickup');
    const addressGroup = document.getElementById('order-address-group');

    if (deliveryBtn && pickupBtn) {
      deliveryBtn.addEventListener('click', () => {
        state.orderType = 'delivery';
        deliveryBtn.classList.add('active');
        pickupBtn.classList.remove('active');
        if (addressGroup) addressGroup.style.display = 'block';
        renderCart();
      });

      pickupBtn.addEventListener('click', () => {
        state.orderType = 'pickup';
        pickupBtn.classList.add('active');
        deliveryBtn.classList.remove('active');
        if (addressGroup) addressGroup.style.display = 'none';
        renderCart();
      });
    }

    // Submit Order & Generate WhatsApp Message
    const orderForm = document.getElementById('order-checkout-form');
    if (orderForm) {
      orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (state.cart.length === 0) {
          alert('Your cart is empty! Please select delicious dishes from the menu first.');
          return;
        }

        const name = document.getElementById('order-cust-name').value.trim();
        const phone = document.getElementById('order-cust-phone').value.trim();
        const address = state.orderType === 'delivery' ? document.getElementById('order-cust-address').value.trim() : 'Pickup at Restaurant';
        const notes = document.getElementById('order-cust-notes') ? document.getElementById('order-cust-notes').value.trim() : '';

        if (!name || !phone) {
          alert('Please enter your Name and Phone Number.');
          return;
        }

        if (state.orderType === 'delivery' && !address) {
          alert('Please enter your delivery address in Chichawatni.');
          return;
        }

        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = state.orderType === 'delivery' ? 150 : 0;
        const total = subtotal + deliveryFee;

        // Build elegant structured WhatsApp Order Message
        let msg = `*NEW ORDER - PEARL CUISINE RESTAURANT*\n`;
        msg += `------------------------------------\n`;
        msg += `👤 *Customer Name:* ${name}\n`;
        msg += `📞 *Phone:* ${phone}\n`;
        msg += `🛵 *Order Type:* ${state.orderType.toUpperCase()}\n`;
        if (state.orderType === 'delivery') {
          msg += `📍 *Delivery Address:* ${address}\n`;
        }
        if (notes) {
          msg += `📝 *Special Instructions:* ${notes}\n`;
        }
        msg += `\n*ORDERED DISHES:*\n`;
        state.cart.forEach((item, i) => {
          msg += `${i + 1}. ${item.name} x ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
        });
        msg += `------------------------------------\n`;
        msg += `Subtotal: Rs. ${subtotal.toLocaleString()}\n`;
        if (state.orderType === 'delivery') {
          msg += `Delivery Charges: Rs. ${deliveryFee}\n`;
        }
        msg += `*GRAND TOTAL: Rs. ${total.toLocaleString()}*\n`;
        msg += `------------------------------------\n`;
        msg += `_Sent via Pearl Cuisine Online Order Portal_`;

        const encoded = encodeURIComponent(msg);
        const whatsappUrl = `https://wa.me/${PEARL_CONFIG.restaurant.whatsappNumber}?text=${encoded}`;

        // Clear cart & open WhatsApp
        state.cart = [];
        saveCart();
        renderCart();
        orderForm.reset();

        showOrderSuccessModal(name, total, whatsappUrl);
      });
    }
  }

  function showOrderSuccessModal(name, total, whatsappUrl) {
    const modal = document.getElementById('order-success-modal');
    if (!modal) {
      window.open(whatsappUrl, '_blank');
      return;
    }

    document.getElementById('success-cust-name').innerText = name;
    document.getElementById('success-order-total').innerText = `Rs. ${total.toLocaleString()}`;
    const waBtn = document.getElementById('success-whatsapp-btn');
    if (waBtn) waBtn.href = whatsappUrl;

    modal.classList.add('open');
  }

  /* ==========================================================================
     6. TABLE BOOKING SYSTEM
     ========================================================================== */
  function initTableBooking() {
    const bookingForm = document.getElementById('table-booking-form');
    if (!bookingForm) return;

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('book-name').value.trim();
      const phone = document.getElementById('book-phone').value.trim();
      const date = document.getElementById('book-date').value;
      const time = document.getElementById('book-time').value;
      const guests = document.getElementById('book-guests').value;
      const request = document.getElementById('book-requests').value.trim() || 'None';

      if (!name || !phone || !date || !time || !guests) {
        alert('Please fill out all required reservation fields.');
        return;
      }

      // Build structured WhatsApp reservation message
      let msg = `*TABLE RESERVATION - PEARL CUISINE RESTAURANT*\n`;
      msg += `------------------------------------\n`;
      msg += `👤 *Name:* ${name}\n`;
      msg += `📞 *Phone:* ${phone}\n`;
      msg += `📅 *Date:* ${date}\n`;
      msg += `⏰ *Time:* ${time}\n`;
      msg += `👥 *Number of Guests:* ${guests} Person(s)\n`;
      msg += `✨ *Special Request:* ${request}\n`;
      msg += `------------------------------------\n`;
      msg += `_Please confirm my reservation. Thank you!_`;

      const encoded = encodeURIComponent(msg);
      const whatsappUrl = `https://wa.me/${PEARL_CONFIG.restaurant.whatsappNumber}?text=${encoded}`;

      // Show confirmation modal
      const bookingModal = document.getElementById('booking-confirm-modal');
      if (bookingModal) {
        document.getElementById('confirm-book-name').innerText = name;
        document.getElementById('confirm-book-date').innerText = `${date} at ${time}`;
        document.getElementById('confirm-book-guests').innerText = `${guests} Guests`;
        const waLink = document.getElementById('confirm-book-whatsapp-link');
        if (waLink) waLink.href = whatsappUrl;

        bookingModal.classList.add('open');
      }

      bookingForm.reset();
    });
  }

  /* ==========================================================================
     7. GALLERY WITH LIGHTBOX
     ========================================================================== */
  function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const tabsContainer = document.getElementById('gallery-tabs');
    if (!galleryGrid) return;

    // Render filter tabs
    const categories = ['all', 'Food', 'Interior', 'Restaurant', 'BBQ', 'Drinks', 'Family Dining'];
    if (tabsContainer) {
      tabsContainer.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat.toLowerCase() === state.galleryCategory ? 'active' : ''}" data-gcat="${cat.toLowerCase()}">
          ${cat === 'all' ? 'All Photos' : cat}
        </button>
      `).join('');

      tabsContainer.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          tabsContainer.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.galleryCategory = btn.getAttribute('data-gcat');
          renderGalleryItems();
        });
      });
    }

    renderGalleryItems();

    // Lightbox modal setup
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && lightboxClose) {
      lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
      });
    }
  }

  function renderGalleryItems() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    let items = PEARL_CONFIG.gallery;
    if (state.galleryCategory !== 'all') {
      items = items.filter(i => i.category.toLowerCase() === state.galleryCategory);
    }

    galleryGrid.innerHTML = items.map((item, idx) => `
      <div class="gallery-item" onclick="window.PearlApp.openLightbox('${item.image}')">
        <img src="${item.image}" alt="${item.title}" class="gallery-img" loading="lazy">
        <div class="gallery-overlay">
          <div class="gallery-caption">
            <h4>${item.title}</h4>
            <p>${item.subtitle}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  function openLightbox(imgSrc) {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
      lightboxImg.src = imgSrc;
      lightbox.classList.add('active');
    }
  }

  /* ==========================================================================
     8. SPECIAL OFFERS & FOOD SHOWCASE
     ========================================================================== */
  function initSpecialOffers() {
    const container = document.getElementById('offers-grid');
    if (!container) return;

    container.innerHTML = PEARL_CONFIG.specialOffers.map(deal => `
      <div class="offer-card">
        <span class="offer-ribbon">${deal.discountTag}</span>
        <div class="offer-img-box">
          <img src="${deal.image}" alt="${deal.title}" loading="lazy">
        </div>
        <div class="offer-details">
          <h3 style="font-size: 1.25rem; margin-bottom: 0.3rem;">${deal.title}</h3>
          ${deal.titleUrdu ? `<div style="font-size: 0.95rem; color: var(--gold-rich); margin-bottom: 0.6rem; font-weight: 600;">${deal.titleUrdu}</div>` : ''}
          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">${deal.desc}</p>
          <div class="offer-prices">
            <span class="offer-discount-price">${PEARL_CONFIG.restaurant.defaultCurrency} ${deal.discountPrice.toLocaleString()}</span>
            <span class="offer-original-price">${PEARL_CONFIG.restaurant.defaultCurrency} ${deal.originalPrice.toLocaleString()}</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--gold-light); margin-bottom: 1.2rem;">
            <i class="fa-solid fa-clock-rotate-left"></i> ${deal.validity}
          </p>
          <button class="btn btn-primary" style="width: 100%;" onclick="window.PearlApp.addDealToCart('${deal.id}', '${deal.title}', ${deal.discountPrice}, '${deal.image}')">
            <i class="fa-solid fa-cart-shopping"></i> Order This Deal
          </button>
        </div>
      </div>
    `).join('');
  }

  function initFoodShowcase() {
    const track = document.getElementById('showcase-track');
    if (!track) return;

    // Duplicate list for infinite smooth marquee
    const showcaseDishes = [...PEARL_CONFIG.menuItems.slice(0, 7), ...PEARL_CONFIG.menuItems.slice(0, 7)];
    track.innerHTML = showcaseDishes.map(dish => `
      <div class="showcase-item-card" onclick="window.PearlApp.openFoodModal('${dish.id}')">
        <img src="${dish.image}" alt="${dish.name}" class="showcase-img" loading="lazy">
        <div class="showcase-content">
          <h4 style="font-size: 1.05rem; margin-bottom: 0.3rem;">${dish.name}</h4>
          <span style="color: var(--gold-primary); font-weight: 700;">${PEARL_CONFIG.restaurant.defaultCurrency} ${dish.price.toLocaleString()}</span>
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     9. GOOGLE REVIEWS CAROUSEL & HIGHLIGHTS
     ========================================================================== */
  function initReviews() {
    const track = document.getElementById('reviews-track');
    if (!track) return;

    // Duplicate list for seamless infinite loop
    const allReviews = [...PEARL_CONFIG.googleReviews, ...PEARL_CONFIG.googleReviews];
    track.innerHTML = allReviews.map(r => `
      <div class="review-card">
        <div>
          <div class="review-header">
            <div class="review-avatar" style="background: ${r.avatarColor};">
              ${r.name.charAt(0)}
            </div>
            <div>
              <h4 class="review-author">${r.name}</h4>
              <span class="review-meta">${r.source} • ${r.date}</span>
            </div>
          </div>
          <div class="review-stars">
            ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
          </div>
          <p class="review-body">"${r.text}"</p>
        </div>
        <div style="margin-top: 1.2rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; color: var(--gold-light);">
          <i class="fa-brands fa-google"></i> Verified Diner
        </div>
      </div>
    `).join('');

    // Render Highlights
    const highlightsContainer = document.getElementById('highlights-grid');
    if (highlightsContainer) {
      highlightsContainer.innerHTML = PEARL_CONFIG.highlights.map(h => `
        <div class="highlight-card">
          <div class="highlight-icon">
            <i class="fa-solid ${h.icon}"></i>
          </div>
          <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">${h.title}</h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">${h.desc}</p>
        </div>
      `).join('');
    }
  }

  /* ==========================================================================
     10. FAQ ACCORDION
     ========================================================================== */
  function initFaqAccordion() {
    const container = document.getElementById('faq-accordion');
    if (!container) return;

    container.innerHTML = PEARL_CONFIG.faqs.map((faq, index) => `
      <div class="faq-item ${index === 0 ? 'active' : ''}">
        <div class="faq-header" onclick="this.parentElement.classList.toggle('active')">
          <h4>${faq.q}</h4>
          <i class="fa-solid fa-chevron-down faq-icon"></i>
        </div>
        <div class="faq-body">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     11. ANIMATED STATS COUNTER
     ========================================================================== */
  function initStatsCounter() {
    const statsContainer = document.getElementById('stats-grid');
    if (!statsContainer) return;

    statsContainer.innerHTML = PEARL_CONFIG.stats.map(s => `
      <div class="stat-card">
        <div class="stat-number">${s.value}</div>
        <div class="stat-label">${s.label}</div>
        <div class="stat-desc">${s.desc}</div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     12. FLOATING ACTION BUTTONS
     ========================================================================== */
  function initFloatingActions() {
    const waFloat = document.getElementById('floating-whatsapp-btn');
    if (waFloat) {
      const defaultMsg = encodeURIComponent("Assalam-o-Alaikum, I would like to contact Pearl Cuisine Restaurant regarding an order/booking.");
      waFloat.href = `https://wa.me/${PEARL_CONFIG.restaurant.whatsappNumber}?text=${defaultMsg}`;
    }

    const callFloat = document.getElementById('floating-call-btn');
    if (callFloat) {
      callFloat.href = `tel:${PEARL_CONFIG.restaurant.phoneTel}`;
    }
  }

  /* ==========================================================================
     13. OWNER / ADMIN QUICK CONFIG PANEL
     ========================================================================== */
  function initOwnerConfigPanel() {
    const trigger = document.getElementById('owner-panel-trigger');
    const modal = document.getElementById('owner-panel-modal');
    const closeBtn = document.getElementById('owner-panel-close');
    const form = document.getElementById('owner-config-form');

    if (!trigger || !modal) return;

    trigger.addEventListener('click', () => {
      // Pre-fill fields with current config
      document.getElementById('cfg-restaurant-name').value = PEARL_CONFIG.restaurant.name;
      document.getElementById('cfg-phone').value = PEARL_CONFIG.restaurant.phoneDisplay;
      document.getElementById('cfg-whatsapp').value = PEARL_CONFIG.restaurant.whatsappNumber;
      document.getElementById('cfg-hours').value = PEARL_CONFIG.restaurant.hoursDisplay;
      modal.classList.add('open');
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        PEARL_CONFIG.restaurant.name = document.getElementById('cfg-restaurant-name').value.trim();
        PEARL_CONFIG.restaurant.phoneDisplay = document.getElementById('cfg-phone').value.trim();
        PEARL_CONFIG.restaurant.phoneTel = document.getElementById('cfg-phone').value.replace(/[^0-9+]/g, '');
        PEARL_CONFIG.restaurant.whatsappNumber = document.getElementById('cfg-whatsapp').value.trim().replace(/[^0-9]/g, '');
        PEARL_CONFIG.restaurant.hoursDisplay = document.getElementById('cfg-hours').value.trim();

        localStorage.setItem('pearl_custom_config', JSON.stringify({
          name: PEARL_CONFIG.restaurant.name,
          phoneDisplay: PEARL_CONFIG.restaurant.phoneDisplay,
          phoneTel: PEARL_CONFIG.restaurant.phoneTel,
          whatsappNumber: PEARL_CONFIG.restaurant.whatsappNumber,
          hoursDisplay: PEARL_CONFIG.restaurant.hoursDisplay
        }));

        modal.classList.remove('open');
        showNotification("Restaurant settings updated successfully!");
        setTimeout(() => location.reload(), 800);
      });
    }
  }

  function loadCustomConfig() {
    try {
      const saved = localStorage.getItem('pearl_custom_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) PEARL_CONFIG.restaurant.name = parsed.name;
        if (parsed.phoneDisplay) PEARL_CONFIG.restaurant.phoneDisplay = parsed.phoneDisplay;
        if (parsed.phoneTel) PEARL_CONFIG.restaurant.phoneTel = parsed.phoneTel;
        if (parsed.whatsappNumber) PEARL_CONFIG.restaurant.whatsappNumber = parsed.whatsappNumber;
        if (parsed.hoursDisplay) PEARL_CONFIG.restaurant.hoursDisplay = parsed.hoursDisplay;
      }
    } catch (e) {
      console.error(e);
    }
  }

  function showNotification(text) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 2.5rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(14, 11, 8, 0.95);
      border: 1.5px solid var(--gold-primary);
      color: var(--gold-light);
      padding: 0.8rem 1.6rem;
      border-radius: var(--radius-full);
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      font-size: 0.92rem;
      font-weight: 600;
      z-index: 9999;
      opacity: 0;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    `;
    toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color: var(--gold-primary);"></i> ${text}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  // Global window methods
  window.PearlApp = {
    addToCart,
    changeCartQty,
    openFoodModal,
    closeFoodModal,
    openLightbox,
    addDealToCart: (dealId, title, price, img) => {
      const existing = state.cart.find(c => c.id === dealId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({
          id: dealId,
          name: title,
          price: price,
          image: img,
          quantity: 1
        });
      }
      saveCart();
      renderCart();
      showNotification(`Added ${title} to your order!`);
    }
  };
});
