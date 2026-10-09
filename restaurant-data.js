/**
 * PEARL CUISINE RESTAURANT (PC) - Central Configuration & Authentic Menu Data
 * Chichawatni Bypass, Chichawatni, Punjab, Pakistan
 * Real Menu extracted from Official Pearl Cuisine Menu Card
 */

const PEARL_CONFIG = {
  restaurant: {
    name: "Pearl Cuisine Restaurant (PC)",
    shortName: "Pearl Cuisine",
    brandTag: "PC",
    tagline: "A Taste of Elegance in Every Bite",
    subtext: "Experience delicious food, a welcoming atmosphere and memorable dining at Pearl Cuisine Restaurant.",
    location: "Chichawatni Bypass, Chichawatni, 57200, Punjab, Pakistan",
    phoneDisplay: "+92 322 7500800",
    phoneTel: "+923227500800",
    whatsappDisplay: "+92 322 7500800",
    whatsappNumber: "923227500800",
    googleRating: "4.5",
    googleReviewsCount: 42,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pearl+Cuisine+Restaurant+Chichawatni+Bypass+Chichawatni+Pakistan",
    hoursDisplay: "Open Daily: 12:00 PM – 01:30 AM",
    diningOptions: "Dine-in • Drive-Through • Home Delivery",
    familyFriendly: "100% Dedicated Family Halls & Private Seating",
    defaultCurrency: "Rs."
  },

  developer: {
    name: "M Tayyab Ijaz",
    role: "Web Developer",
    phoneDisplay: "0317 0286300",
    phoneRaw: "+923170286300",
    whatsappNumber: "923170286300",
    whatsappUrl: "https://wa.me/923170286300?text=Hello%20M%20Tayyab%20Ijaz%2C%20I%20saw%20your%20work%20on%20the%20Pearl%20Cuisine%20Restaurant%20website."
  },

  socialMedia: {
    facebook: "https://facebook.com/pearlcuisinechichawatni",
    instagram: "https://instagram.com/pearlcuisineofficial",
    tiktok: "https://tiktok.com/@pearlcuisine",
    youtube: "https://youtube.com/@pearlcuisine"
  },

  stats: [
    { label: "Google Rating", value: "4.5★", desc: "Based on 42 verified diners" },
    { label: "Reviews", value: "42+", desc: "Happy customer recommendations" },
    { label: "Dining Options", value: "3 Modes", desc: "Dine-in, Drive-through, Delivery" },
    { label: "Family Friendly", value: "100%", desc: "Spacious private family halls" }
  ],

  highlights: [
    { icon: "fa-crown", title: "Royal Atmosphere", desc: "Luxurious ambience with chandelier lighting and modern architectural decor." },
    { icon: "fa-sparkles", title: "Immaculate Cleanliness", desc: "High hygiene standards with open live view kitchen & clean dining." },
    { icon: "fa-users-roof", title: "Family Friendly", desc: "Private partitioned family partitions, baby chairs, and serene ambiance." },
    { icon: "fa-fire", title: "Live Charcoal BBQ", desc: "Authentic Malai Boti, Seekh Kabab, Afghani Boti & Kalmi Tikka." },
    { icon: "fa-utensils", title: "Desi & Continental", desc: "Traditional Chicken Karahi, Handi, Biryani, Burgers & Sandwiches." },
    { icon: "fa-user-tie", title: "Attentive Staff", desc: "Well-trained hospitality team catering to your every dining need." },
    { icon: "fa-square-parking", title: "Secure Parking", desc: "Ample hassle-free private car parking on Chichawatni Bypass." },
    { icon: "fa-truck-fast", title: "Fast Delivery", desc: "Hot & fresh food delivered swiftly anywhere across Chichawatni city." }
  ],

  categories: [
    { id: "all", name: "All Menu", icon: "fa-layer-group" },
    { id: "deals", name: "Special Deals & Platters", icon: "fa-gift" },
    { id: "bbq", name: "BBQ Specialties", icon: "fa-fire" },
    { id: "kabab", name: "Kababs", icon: "fa-drumstick-bite" },
    { id: "naan-roti", name: "Naan & Roti", icon: "fa-bread-slice" },
    { id: "special-drinks", name: "Special Drinks & Shakes", icon: "fa-martini-glass-citrus" },
    { id: "cold-beverages", name: "Cold Beverages", icon: "fa-glass-water" },
    { id: "hot-beverages", name: "Hot Beverages (Tea/Coffee)", icon: "fa-mug-hot" },
    { id: "sandwiches", name: "Sandwiches", icon: "fa-burger" },
    { id: "desserts", name: "Desserts & Ice Cream", icon: "fa-ice-cream" },
    { id: "salads-raita", name: "Salads & Raita", icon: "fa-bowl-food" },
    { id: "pakistani", name: "Pakistani Karahi & Handi", icon: "fa-pot-food" },
    { id: "biryani", name: "Biryani & Rice", icon: "fa-bowl-rice" },
    { id: "pizza", name: "Stone Oven Pizza", icon: "fa-pizza-slice" }
  ],

  // Real Menu Items from Pearl Cuisine Official Menu Card
  menuItems: [
    // --- SPECIAL DEALS & PLATTERS ---
    {
      id: "pc-deal-bbq2",
      category: "deals",
      name: "BBQ Platter Deal (2 Persons)",
      nameUrdu: "بی بی کیو پلیٹر ڈیل (2 پرسن)",
      price: 2250,
      badge: "Bestseller Deal",
      image: "assets/images/bbq_special.jpg",
      description: "2pcs Chicken Reshmi Kabab + 2pcs Kalmi Tikka + 4pcs Chicken Tikka Boti + 4pcs Malai Boti + 4pcs Achari Boti + Fried Rice/Biryani (Optional for 2).",
      prepTime: "25 mins",
      isSpecial: true
    },
    {
      id: "pc-deal-bbq4",
      category: "deals",
      name: "BBQ Platter Deal (4 Persons)",
      nameUrdu: "بی بی کیو پلیٹر ڈیل (4 پرسن)",
      price: 3750,
      badge: "Grand Feast",
      image: "assets/images/bbq_special.jpg",
      description: "4pcs Chicken Reshmi Kabab/Chicken Kabab + 4pcs Kalmi/Rajasthani Tikka + 6pcs Tikka Boti + 6pcs Malai Boti + 6pcs Achari Boti + Fried Rice/Biryani (Optional for 4).",
      prepTime: "30 mins",
      isSpecial: true
    },
    {
      id: "pc-deal-1",
      category: "deals",
      name: "PC Special Deal 1",
      nameUrdu: "پی سی اسپیشل ڈیل نمبر 1",
      price: 1000,
      badge: "Value Deal",
      image: "assets/images/hero_luxury_dish.jpg",
      description: "Chicken Ginger + Fried Rice + 4pcs Tikka Boti + 2 Rotti + Fresh Raita + Crisp Salad.",
      prepTime: "20 mins",
      isSpecial: true
    },
    {
      id: "pc-deal-2",
      category: "deals",
      name: "PC Special Deal 2",
      nameUrdu: "پی سی اسپیشل ڈیل نمبر 2",
      price: 1000,
      badge: "Popular Combo",
      image: "assets/images/karahi_special.jpg",
      description: "Chicken Karahi + Dum Biryani + 1pc Chicken Kabab + 2pcs Tikka Boti + 2 Rotti + Fresh Raita + Crisp Salad.",
      prepTime: "20 mins",
      isSpecial: true
    },

    // --- BBQ (From Menu Card) ---
    {
      id: "pc-bbq-malai",
      category: "bbq",
      name: "Malai Boti (12 Pcs)",
      nameUrdu: "ملائی بوٹی",
      price: 1080,
      badge: "Chef Signature",
      image: "assets/images/hero_luxury_dish.jpg",
      description: "Tender boneless chicken marinated in pure fresh cream, green chilies, white pepper and royal spices.",
      prepTime: "20 mins",
      isSpecial: true
    },
    {
      id: "pc-bbq-afghani",
      category: "bbq",
      name: "Afghani Boti (12 Pcs)",
      nameUrdu: "افغانی بوٹی",
      price: 1080,
      badge: "Mild & Rich",
      image: "assets/images/bbq_special.jpg",
      description: "Traditional Afghan marinade with yogurt, lemon juice and crushed black pepper, charcoal grilled to juicy perfection.",
      prepTime: "20 mins"
    },
    {
      id: "pc-bbq-shish",
      category: "bbq",
      name: "Shish Taouk Boti (12 Pcs)",
      nameUrdu: "شیش تاؤک بوٹی",
      price: 1080,
      badge: "Middle Eastern",
      image: "assets/images/bbq_special.jpg",
      description: "Skewered marinated chicken cubes infused with garlic, lemon and aromatic Mediterranean herbs.",
      prepTime: "20 mins"
    },
    {
      id: "pc-bbq-kastoori",
      category: "bbq",
      name: "Kastoori Boti (12 Pcs)",
      nameUrdu: "کستوری بوٹی",
      price: 1200,
      badge: "Royal Flavour",
      image: "assets/images/hero_luxury_dish.jpg",
      description: "Juicy chicken cubes bathed in rich saffron kastoori masala with a blanket of spiced egg coating.",
      prepTime: "25 mins"
    },
    {
      id: "pc-bbq-kalmi",
      category: "bbq",
      name: "Kalmi Tikka (6 Pcs)",
      nameUrdu: "قلمی تکہ",
      price: 1200,
      badge: "Spicy & Crispy",
      image: "assets/images/bbq_special.jpg",
      description: "Prime chicken drumsticks / leg pieces coated in secret fiery tandoori rub, roasted over charcoal coals.",
      prepTime: "25 mins"
    },
    {
      id: "pc-bbq-rajasthani",
      category: "bbq",
      name: "Rajasthani Tikka (6 Pcs)",
      nameUrdu: "راجستھانی تکہ",
      price: 1200,
      badge: "Desi Kick",
      image: "assets/images/bbq_special.jpg",
      description: "Authentic Rajasthani spiced tikka cuts, smoked over clay coals for a burst of rich rustic aroma.",
      prepTime: "25 mins"
    },
    {
      id: "pc-bbq-tikka-boti",
      category: "bbq",
      name: "Chicken Tikka Boti (12 Pcs)",
      nameUrdu: "چکن تکہ بوٹی",
      price: 850,
      badge: "Classic",
      image: "assets/images/bbq_special.jpg",
      description: "Traditional spicy chicken tikka cubes with crushed coriander, cumin and red chili marinade.",
      prepTime: "20 mins"
    },
    {
      id: "pc-bbq-achari",
      category: "bbq",
      name: "Chicken Achari Boti (12 Pcs)",
      nameUrdu: "چکن اچاری بوٹی",
      price: 850,
      badge: "Tangy",
      image: "assets/images/bbq_special.jpg",
      description: "Tangy pickle-spiced chicken cubes grilled on skewers, bursting with fennel and mustard seed flavors.",
      prepTime: "20 mins"
    },
    {
      id: "pc-bbq-chatkhara",
      category: "bbq",
      name: "Chicken Chatkhara Boti (With Bone 12 Pcs)",
      nameUrdu: "چکن چٹخارا بوٹی (ود بون)",
      price: 900,
      badge: "Chatpata",
      image: "assets/images/bbq_special.jpg",
      description: "Bone-in chicken chunks seasoned with tart lemon, chaat masala and crushed roasted chilies.",
      prepTime: "20 mins"
    },
    {
      id: "pc-bbq-green",
      category: "bbq",
      name: "Chicken Green Boti Boneless (12 Pcs)",
      nameUrdu: "چکن گرین بوٹی بون لیس",
      price: 1080,
      badge: "Herb Fresh",
      image: "assets/images/bbq_special.jpg",
      description: "Succulent chicken marinated in fresh coriander, mint leaves, green chili paste and yogurt.",
      prepTime: "20 mins"
    },
    {
      id: "pc-bbq-fish",
      category: "bbq",
      name: "Fish Tikka (8 Pcs)",
      nameUrdu: "فش تکہ",
      price: 1600,
      badge: "Seafood Special",
      image: "assets/images/hero_luxury_dish.jpg",
      description: "Fresh tender boneless river fish fillets seasoned with carom seeds, turmeric and lemon zest.",
      prepTime: "20 mins"
    },
    {
      id: "pc-bbq-tikka-pc",
      category: "bbq",
      name: "Chicken Tikka Piece",
      nameUrdu: "چکن تکہ پیس",
      price: 350,
      badge: "Hot Single",
      image: "assets/images/bbq_special.jpg",
      description: "Choice of leg or breast quarter piece roasted over glowing coals, served with lemon slice.",
      prepTime: "15 mins"
    },
    {
      id: "pc-bbq-angara",
      category: "bbq",
      name: "Chicken Angara (Full)",
      nameUrdu: "چکن انگارا فل",
      price: 1600,
      badge: "Showstopper",
      image: "assets/images/bbq_special.jpg",
      description: "Full whole chicken marinated in smoky fiery Angara marinade, served flaming on a sizzling platter.",
      prepTime: "30 mins"
    },

    // --- KABAB (From Menu Card) ---
    {
      id: "pc-kbb-special",
      category: "kabab",
      name: "Chicken Special Kabab (6 Pcs)",
      nameUrdu: "چکن اسپیشل کباب",
      price: 1080,
      badge: "Pearl Specialty",
      image: "assets/images/bbq_special.jpg",
      description: "Minced chicken seasoned with chef's special herbs, ginger, onion, and charcoal grilled.",
      prepTime: "20 mins"
    },
    {
      id: "pc-kbb-reshmi",
      category: "kabab",
      name: "Reshmi Kabab (6 Pcs)",
      nameUrdu: "ریشمی کباب",
      price: 1000,
      badge: "Silky Soft",
      image: "assets/images/hero_luxury_dish.jpg",
      description: "Ultra-tender minced chicken combined with melted butter, cream, and gentle spices that melt on your tongue.",
      prepTime: "20 mins"
    },
    {
      id: "pc-kbb-chicken",
      category: "kabab",
      name: "Chicken Kabab (6 Pcs)",
      nameUrdu: "چکن کباب",
      price: 900,
      badge: "Classic",
      image: "assets/images/bbq_special.jpg",
      description: "Traditional spicy minced chicken seekh kababs grilled over hot coal skewers.",
      prepTime: "18 mins"
    },
    {
      id: "pc-kbb-veg",
      category: "kabab",
      name: "Chicken Vegetable Kabab (4 Pcs)",
      nameUrdu: "چکن ویجیٹیبل کباب",
      price: 800,
      badge: "Herb Crunch",
      image: "assets/images/bbq_special.jpg",
      description: "Savory blend of minced chicken breast and finely chopped fresh garden bell peppers, carrots, and herbs.",
      prepTime: "18 mins"
    },
    {
      id: "pc-kbb-beef",
      category: "kabab",
      name: "Beef Kabab (4 Pcs)",
      nameUrdu: "بیف کباب",
      price: 850,
      badge: "Prime Beef",
      image: "assets/images/plate_3d_render.png",
      description: "Aromatic prime minced beef seekh kababs seasoned with crushed coriander, green chilies, and onion.",
      prepTime: "20 mins"
    },
    {
      id: "pc-kbb-lubnani",
      category: "kabab",
      name: "Lubnani Kabab (4 Pcs)",
      nameUrdu: "لبنانی کباب",
      price: 800,
      badge: "Lebanese Style",
      image: "assets/images/bbq_special.jpg",
      description: "Authentic Lebanese minced skewers flavoured with parsley, sumac, garlic, and cracked pepper.",
      prepTime: "20 mins"
    },

    // --- NAAN & ROTI (From Menu Card) ---
    {
      id: "pc-naan-cheeze",
      category: "naan-roti",
      name: "Cheeze Naan",
      nameUrdu: "چیز نان",
      price: 450,
      badge: "Cheesy",
      image: "assets/images/pizza_burger.jpg",
      description: "Fluffy tandoori naan stuffed generously with molten mozzarella and cheddar cheese.",
      prepTime: "10 mins"
    },
    {
      id: "pc-naan-ginger",
      category: "naan-roti",
      name: "Ginger Naan",
      nameUrdu: "جنجر نان",
      price: 100,
      badge: "Aromatic",
      image: "assets/images/karahi_special.jpg",
      description: "Hot tandoori naan studded with fresh julienne ginger and coriander.",
      prepTime: "8 mins"
    },
    {
      id: "pc-naan-garlic",
      category: "naan-roti",
      name: "Garlic Naan",
      nameUrdu: "گارلک نان",
      price: 100,
      badge: "Garlic Butter",
      image: "assets/images/karahi_special.jpg",
      description: "Crispy tandoori naan brushed with garlic butter and fresh cilantro.",
      prepTime: "8 mins"
    },
    {
      id: "pc-naan-kalwanji",
      category: "naan-roti",
      name: "Kalwanji Naan",
      nameUrdu: "کلونجی نان",
      price: 100,
      badge: "Nigella Seed",
      image: "assets/images/karahi_special.jpg",
      description: "Soft leavened bread sprinkled with aromatic nigella seeds.",
      prepTime: "8 mins"
    },
    {
      id: "pc-naan-zeera",
      category: "naan-roti",
      name: "Zeera Naan",
      nameUrdu: "زیرہ نان",
      price: 100,
      badge: "Cumin Seed",
      image: "assets/images/karahi_special.jpg",
      description: "Golden clay oven naan topped with toasted cumin seeds.",
      prepTime: "8 mins"
    },
    {
      id: "pc-naan-roghni",
      category: "naan-roti",
      name: "Roghni Naan",
      nameUrdu: "روغنی نان",
      price: 80,
      badge: "Soft & Fluffy",
      image: "assets/images/karahi_special.jpg",
      description: "Piping hot milk-kneaded naan brushed with pure ghee and sesame seeds.",
      prepTime: "8 mins"
    },
    {
      id: "pc-naan-pratha",
      category: "naan-roti",
      name: "Tandoori Paratha",
      nameUrdu: "پراٹھا",
      price: 100,
      badge: "Crispy Layered",
      image: "assets/images/karahi_special.jpg",
      description: "Flaky multilayered tandoori paratha with crisp edges and soft interior.",
      prepTime: "8 mins"
    },
    {
      id: "pc-naan-roti",
      category: "naan-roti",
      name: "Roti Per Head",
      nameUrdu: "روٹی پر ہیڈ",
      price: 70,
      badge: "Unlimited",
      image: "assets/images/karahi_special.jpg",
      description: "Fresh whole wheat thin rotis baked in clay tandoor, served hot per diner.",
      prepTime: "5 mins"
    },

    // --- SANDWICHES (From Menu Card) ---
    {
      id: "pc-snd-chicken",
      category: "sandwiches",
      name: "Chicken Sandwich",
      nameUrdu: "چکن سینڈوچ",
      price: 400,
      badge: "Snack",
      image: "assets/images/pizza_burger.jpg",
      description: "Shredded spiced chicken with creamy mayonnaise, lettuce, and cucumber on fresh toasted bread.",
      prepTime: "12 mins"
    },
    {
      id: "pc-snd-club",
      category: "sandwiches",
      name: "Club Sandwich",
      nameUrdu: "کلب سینڈوچ",
      price: 450,
      badge: "Classic Club",
      image: "assets/images/pizza_burger.jpg",
      description: "Triple-decker sandwich with chicken, fried egg, cheese slice, lettuce, tomatoes, and French fries.",
      prepTime: "15 mins"
    },
    {
      id: "pc-snd-grilled",
      category: "sandwiches",
      name: "Grilled Sandwich",
      nameUrdu: "گرلڈ سینڈوچ",
      price: 450,
      badge: "Hot Press",
      image: "assets/images/pizza_burger.jpg",
      description: "Panini-pressed golden crisp sandwich loaded with spicy chicken chunks, molten cheese, and jalapeños.",
      prepTime: "15 mins"
    },

    // --- DESSERTS & ICE CREAM (From Menu Card) ---
    {
      id: "pc-dst-gulab",
      category: "desserts",
      name: "Gulab Jamun (2 Pcs)",
      nameUrdu: "گلاب جامن",
      price: 160,
      badge: "Hot Sweet",
      image: "assets/images/dessert_drinks.jpg",
      description: "Warm khoya balls soaked in fragrant rose cardamom syrup, garnished with silver vark and pistachios.",
      prepTime: "5 mins"
    },
    {
      id: "pc-dst-ice2",
      category: "desserts",
      name: "Ice Cream (2 Scoops)",
      nameUrdu: "آئس کریم (2 سکوپ)",
      price: 180,
      badge: "Chilled",
      image: "assets/images/dessert_drinks.jpg",
      description: "Two scoops of rich premium ice cream (Vanilla, Chocolate, Strawberry, or Kulfa).",
      prepTime: "5 mins"
    },
    {
      id: "pc-dst-icespec",
      category: "desserts",
      name: "Special Ice Cream",
      nameUrdu: "اسپیشل آئس کریم",
      price: 220,
      badge: "Topped Sundae",
      image: "assets/images/dessert_drinks.jpg",
      description: "Gourmet sundae with mixed fruit chunks, nuts, wafer roll, and chocolate/caramel drizzle.",
      prepTime: "5 mins"
    },

    // --- SALADS & RAITA (From Menu Card) ---
    {
      id: "pc-sld-russian",
      category: "salads-raita",
      name: "Russian Salad",
      nameUrdu: "رشین سیلڈ",
      price: 250,
      badge: "Creamy Salad",
      image: "assets/images/dessert_drinks.jpg",
      description: "Diced pineapple, apple, boiled potatoes, and green peas folded in sweet fresh mayonnaise cream.",
      prepTime: "8 mins"
    },
    {
      id: "pc-sld-fruit",
      category: "salads-raita",
      name: "Fruit Salad (Full)",
      nameUrdu: "فروٹ سیلڈ (فل)",
      price: 600,
      badge: "Fresh Fruits",
      image: "assets/images/dessert_drinks.jpg",
      description: "Full bowl of crisp seasonal apples, bananas, grapes, and cocktail fruit in sweet cream and honey.",
      prepTime: "10 mins"
    },
    {
      id: "pc-sld-kachumber",
      category: "salads-raita",
      name: "Kachumber Salad",
      nameUrdu: "کچومبر سیلڈ",
      price: 100,
      badge: "Crunchy",
      image: "assets/images/dessert_drinks.jpg",
      description: "Finely diced cucumbers, tomatoes, and onions tossed with lemon juice, mint, and black pepper.",
      prepTime: "5 mins"
    },
    {
      id: "pc-sld-fresh",
      category: "salads-raita",
      name: "Fresh Salad",
      nameUrdu: "فریش سیلڈ",
      price: 80,
      badge: "Fresh Greens",
      image: "assets/images/dessert_drinks.jpg",
      description: "Sliced crisp cucumbers, ripe tomatoes, carrots, onion rings, and lemon wedges.",
      prepTime: "5 mins"
    },
    {
      id: "pc-rta-mint",
      category: "salads-raita",
      name: "Mint Raita",
      nameUrdu: "منٹ رائتہ",
      price: 90,
      badge: "Cooling",
      image: "assets/images/bbq_special.jpg",
      description: "Chilled whipped fresh yogurt blended with garden mint, green coriander, and roasted cumin.",
      prepTime: "3 mins"
    },
    {
      id: "pc-rta-zeera",
      category: "salads-raita",
      name: "Zeera Raita",
      nameUrdu: "زیرہ رائتہ",
      price: 90,
      badge: "Cumin Yogurt",
      image: "assets/images/bbq_special.jpg",
      description: "Smooth yogurt tempered with roasted ground cumin seeds and rock salt.",
      prepTime: "3 mins"
    },

    // --- SPECIAL DRINKS & SHAKES (From Menu Card) ---
    {
      id: "pc-drk-pina",
      category: "special-drinks",
      name: "Pina Colada",
      nameUrdu: "پینا کولاڈا",
      price: 240,
      badge: "Tropical",
      image: "assets/images/dessert_drinks.jpg",
      description: "Refreshing blend of pineapple juice, rich coconut cream, and crushed ice.",
      prepTime: "5 mins"
    },
    {
      id: "pc-drk-margarita",
      category: "special-drinks",
      name: "Mint Margarita",
      nameUrdu: "منٹ مارگریٹا",
      price: 150,
      badge: "Top Refresher",
      image: "assets/images/dessert_drinks.jpg",
      description: "Crushed fresh mint, lime juice, black salt, and sparkling soda over crushed ice.",
      prepTime: "5 mins"
    },
    {
      id: "pc-drk-coldcoffee",
      category: "special-drinks",
      name: "Cold Coffee",
      nameUrdu: "کولڈ کافی",
      price: 240,
      badge: "Chilled Caffeine",
      image: "assets/images/dessert_drinks.jpg",
      description: "Creamy blended espresso coffee with chilled milk, sugar, and chocolate drizzle.",
      prepTime: "5 mins"
    },
    {
      id: "pc-drk-vanilla-shk",
      category: "special-drinks",
      name: "Vanilla Shake",
      nameUrdu: "وینیلا شیک",
      price: 240,
      badge: "Classic Shake",
      image: "assets/images/dessert_drinks.jpg",
      description: "Thick creamy shake made with fresh whole milk and rich vanilla ice cream.",
      prepTime: "5 mins"
    },
    {
      id: "pc-drk-strw-shk",
      category: "special-drinks",
      name: "Strawberry Shake",
      nameUrdu: "سٹرابیری شیک",
      price: 240,
      badge: "Fruity",
      image: "assets/images/dessert_drinks.jpg",
      description: "Sweet strawberry crush blended with creamy chilled milk and strawberry scoop.",
      prepTime: "5 mins"
    },
    {
      id: "pc-drk-kitkat-shk",
      category: "special-drinks",
      name: "Kit Kat Shake",
      nameUrdu: "کٹ کیٹ شیک",
      price: 400,
      badge: "Chocolate Delight",
      image: "assets/images/dessert_drinks.jpg",
      description: "Blended crispy Kit Kat chocolate bars with milk, chocolate sauce, and ice cream.",
      prepTime: "6 mins"
    },
    {
      id: "pc-drk-seasonal",
      category: "special-drinks",
      name: "Seasonal Fresh Juices",
      nameUrdu: "سیزنل جوسز",
      price: 300,
      badge: "100% Pure",
      image: "assets/images/dessert_drinks.jpg",
      description: "Freshly squeezed seasonal fruit juice (Orange, Pomegranate, or Apple based on season).",
      prepTime: "6 mins"
    },
    {
      id: "pc-drk-all-icecream-shk",
      category: "special-drinks",
      name: "All Ice Cream Flavours Shake",
      nameUrdu: "آل آئس کریم فلیور شیکس",
      price: 300,
      badge: "Thick Shake",
      image: "assets/images/dessert_drinks.jpg",
      description: "Choose your favorite ice cream flavour blended into a rich gourmet thickshake.",
      prepTime: "5 mins"
    },

    // --- COLD BEVERAGES (From Menu Card) ---
    {
      id: "pc-cld-water",
      category: "cold-beverages",
      name: "Mineral Water (Nestle / Branded)",
      nameUrdu: "منرل واٹر (نیسلے/برانڈڈ)",
      price: 120,
      badge: "Pure",
      image: "assets/images/dessert_drinks.jpg",
      description: "Chilled purified mineral drinking water bottle.",
      prepTime: "1 min"
    },
    {
      id: "pc-cld-soda",
      category: "cold-beverages",
      name: "Cold Drink (Regular)",
      nameUrdu: "کولڈ ڈرنک ریگولر",
      price: 70,
      badge: "Chilled",
      image: "assets/images/dessert_drinks.jpg",
      description: "Pepsi, 7Up, Mirinda, or Mountain Dew regular chilled bottle.",
      prepTime: "1 min"
    },
    {
      id: "pc-cld-freshlime",
      category: "cold-beverages",
      name: "Fresh Lime Soda",
      nameUrdu: "فریش لائم",
      price: 100,
      badge: "Zesty",
      image: "assets/images/dessert_drinks.jpg",
      description: "Freshly squeezed lime juice with 7Up or soda water, salt, and crushed ice.",
      prepTime: "3 mins"
    },

    // --- HOT BEVERAGES & TEA (From Menu Card) ---
    {
      id: "pc-hot-cappuccino",
      category: "hot-beverages",
      name: "Cappuccino (Nescafe)",
      nameUrdu: "کیپوچینو (نیسکیفے)",
      price: 270,
      badge: "Frothy",
      image: "assets/images/dessert_drinks.jpg",
      description: "Hot rich frothy Nescafe espresso coffee dusted with cocoa powder.",
      prepTime: "5 mins"
    },
    {
      id: "pc-hot-latte",
      category: "hot-beverages",
      name: "Latte (Nescafe)",
      nameUrdu: "لاتے (نیسکیفے)",
      price: 280,
      badge: "Smooth",
      image: "assets/images/dessert_drinks.jpg",
      description: "Smooth steamed milk blended with Nescafe espresso roast.",
      prepTime: "5 mins"
    },
    {
      id: "pc-hot-mixtea",
      category: "hot-beverages",
      name: "Mix Tea (Nescafe)",
      nameUrdu: "مکس ٹی (نیسکیفے)",
      price: 150,
      badge: "Hot Sip",
      image: "assets/images/dessert_drinks.jpg",
      description: "Hot comforting Nescafe specialty blended tea.",
      prepTime: "5 mins"
    },
    {
      id: "pc-hot-karak",
      category: "hot-beverages",
      name: "Karak Tea (Nescafe)",
      nameUrdu: "کڑک ٹی (نیسکیفے)",
      price: 150,
      badge: "Strong",
      image: "assets/images/dessert_drinks.jpg",
      description: "Strong aromatic Karak chai brewed for a rich traditional pick-me-up.",
      prepTime: "5 mins"
    },
    {
      id: "pc-hot-masala",
      category: "hot-beverages",
      name: "Special Masala Tea",
      nameUrdu: "اسپیشل مصالحہ ٹی",
      price: 150,
      badge: "Herbal Spice",
      image: "assets/images/dessert_drinks.jpg",
      description: "Brewed black tea infused with cardamom, cinnamon, cloves, and ginger.",
      prepTime: "5 mins"
    },
    {
      id: "pc-hot-doodhpatti",
      category: "hot-beverages",
      name: "Special Doodh Patti",
      nameUrdu: "اسپیشل دودھ پتی",
      price: 110,
      badge: "Pure Milk Chai",
      image: "assets/images/dessert_drinks.jpg",
      description: "Slow-simmered pure milk tea without water, infused with green cardamoms.",
      prepTime: "5 mins"
    },
    {
      id: "pc-hot-greentea",
      category: "hot-beverages",
      name: "Green Tea / Kahwa",
      nameUrdu: "گرین ٹی (قہوہ)",
      price: 90,
      badge: "Digestive",
      image: "assets/images/dessert_drinks.jpg",
      description: "Traditional digestive green tea Kahwa with mint, lemon, and cardamom.",
      prepTime: "3 mins"
    },

    // --- PAKISTANI CUISINE & BIRYANI (Flagship Favorites) ---
    {
      id: "pc-desi-chicken-karahi",
      category: "pakistani",
      name: "Pearl Special Chicken Karahi (Full)",
      nameUrdu: "پی سی اسپیشل چکن کڑاہی",
      price: 1850,
      badge: "Signature",
      image: "assets/images/karahi_special.jpg",
      description: "Full chicken cooked in iron wok with ripe tomatoes, green chilies, pure butter, and julienne ginger.",
      prepTime: "30 mins",
      isSpecial: true
    },
    {
      id: "pc-desi-mutton-karahi",
      category: "pakistani",
      name: "Desi Mutton Shinwari Karahi (Full)",
      nameUrdu: "دیسی مٹن شنواری کڑاہی",
      price: 2850,
      badge: "Luxury",
      image: "assets/images/karahi_special.jpg",
      description: "Tender mountain mutton cuts prepared Peshawari Shinwari style with whole tomatoes, fat, and rock salt.",
      prepTime: "40 mins"
    },
    {
      id: "pc-biryani-dum",
      category: "biryani",
      name: "Royal Dum Chicken Biryani",
      nameUrdu: "رائل دم چکن بریانی",
      price: 690,
      badge: "Chef Signature",
      image: "assets/images/plate_3d_render.png",
      description: "Aged long-grain basmati rice steamed on slow embers with succulent chicken, saffron, fried onions, and dry plums.",
      prepTime: "15 mins",
      isSpecial: true
    },
    {
      id: "pc-pizza-crown",
      category: "pizza",
      name: "Pearl Crown Supreme Pizza (Large)",
      nameUrdu: "کراؤن سپریم پیزا",
      price: 1650,
      badge: "Cheese Burst",
      image: "assets/images/pizza_burger.jpg",
      description: "Hand-tossed dough with kabab stuffed crust, smoked chicken chunks, mozzarella, olives, and bell peppers.",
      prepTime: "25 mins"
    }
  ],

  // Special Deals Showcase Cards
  specialOffers: [
    {
      id: "offer-bbq2",
      title: "BBQ Platter Deal (2 Persons)",
      titleUrdu: "بی بی کیو پلیٹر ڈیل (2 پرسن)",
      desc: "Chicken Reshmi Kabab (2pcs) + Kalmi Tikka (2pcs) + Tikka Boti (4pcs) + Malai Boti (4pcs) + Achari Boti (4pcs) + Fried Rice / Biryani for 2.",
      originalPrice: 2600,
      discountPrice: 2250,
      discountTag: "Official Menu Deal",
      validity: "Available Daily for Dine-in & Delivery",
      image: "assets/images/bbq_special.jpg"
    },
    {
      id: "offer-bbq4",
      title: "BBQ Platter Deal (4 Persons)",
      titleUrdu: "بی بی کیو پلیٹر ڈیل (4 پرسن)",
      desc: "Reshmi/Chicken Kabab (4pcs) + Kalmi/Rajasthani Tikka (4pcs) + Tikka Boti (6pcs) + Malai Boti (6pcs) + Achari Boti (6pcs) + Rice/Biryani for 4.",
      originalPrice: 4400,
      discountPrice: 3750,
      discountTag: "Family Special",
      validity: "Save Rs. 650 Today",
      image: "assets/images/bbq_special.jpg"
    },
    {
      id: "offer-deal-2",
      title: "PC Special Deal 2 (Rs. 1000 Feast)",
      titleUrdu: "پی سی اسپیشل ڈیل 2",
      desc: "Chicken Karahi + Dum Biryani + 1pc Chicken Kabab + 2pcs Tikka Boti + 2 Rotti + Mint Raita + Fresh Crisp Salad.",
      originalPrice: 1350,
      discountPrice: 1000,
      discountTag: "Super Saver",
      validity: "Hot & Freshly Served",
      image: "assets/images/karahi_special.jpg"
    },
    {
      id: "offer-deal-1",
      title: "PC Special Deal 1 (Rs. 1000 Feast)",
      titleUrdu: "پی سی اسپیشل ڈیل 1",
      desc: "Chicken Ginger + Fried Rice + 4pcs Tikka Boti + 2 Rotti + Mint Raita + Crisp Salad.",
      originalPrice: 1350,
      discountPrice: 1000,
      discountTag: "Value Combo",
      validity: "Hot & Freshly Served",
      image: "assets/images/hero_luxury_dish.jpg"
    }
  ],

  // Authentic Google verified review summaries
  googleReviews: [
    {
      name: "Muhammad Tariq",
      rating: 5,
      date: "2 weeks ago",
      source: "Google Verified Review",
      avatarColor: "#D4AF37",
      text: "Outstanding restaurant right on Chichawatni bypass! The chicken karahi, BBQ Platter and seekh kababs were cooked to perfection. Ample parking outside and the family hall is very comfortable and private."
    },
    {
      name: "Dr. Shahbaz Ahmed",
      rating: 5,
      date: "1 month ago",
      source: "Google Verified Review",
      avatarColor: "#C5A059",
      text: "A truly modern restaurant in Chichawatni. Cleanliness is 10/10, service was prompt and the biryani aroma is authentic. The BBQ platter for 4 persons is great value!"
    },
    {
      name: "Fatima Noor",
      rating: 5,
      date: "3 weeks ago",
      source: "Google Verified Review",
      avatarColor: "#E6C875",
      text: "Pearl Cuisine exceeded our expectations. The ambiance feels like a top dining spot in Lahore or Multan. Beautiful chandeliers, polite staff, and the Malai Boti melts in your mouth."
    },
    {
      name: "Usman Ghani",
      rating: 4,
      date: "2 months ago",
      source: "Google Verified Review",
      avatarColor: "#B8860B",
      text: "Very good food taste and quality. Ordered Deal 2 and kit kat shake. Hot food served quickly. Drive-through service is also very convenient."
    },
    {
      name: "Kamran Ali Raza",
      rating: 5,
      date: "1 month ago",
      source: "Google Verified Review",
      avatarColor: "#D4AF37",
      text: "Best dining venue on Chichawatni Bypass. Taste is consistent and the staff is courteous. Good spacious hall for birthday events and family get-togethers."
    }
  ],

  gallery: [
    { category: "BBQ", title: "Malai & Seekh Kabab", image: "assets/images/bbq_special.jpg", subtitle: "Charcoal Grilled to Perfection" },
    { category: "Interior", title: "Grand Family Dining Hall", image: "assets/images/restaurant_interior.jpg", subtitle: "Chandelier Ambiance & Glass Partitions" },
    { category: "Food", title: "Desi Butter Chicken Karahi", image: "assets/images/karahi_special.jpg", subtitle: "Authentic Iron Kadai Cooking" },
    { category: "Restaurant", title: "Pearl Cuisine Entrance & Counter", image: "assets/images/restaurant_interior.jpg", subtitle: "Welcome Counter & Lounge" },
    { category: "Food", title: "Stone Oven Pizza & Burgers", image: "assets/images/pizza_burger.jpg", subtitle: "Crispy Crust & Molten Cheese" },
    { category: "Drinks", title: "Mint Margarita & Hot Beverages", image: "assets/images/dessert_drinks.jpg", subtitle: "Refreshing Gourmet Sips" },
    { category: "Family Dining", title: "Private Dining Section", image: "assets/images/restaurant_interior.jpg", subtitle: "Comfortable Seating for Large Families" },
    { category: "Food", title: "Royal Zafrani Dum Biryani", image: "assets/images/plate_3d_render.png", subtitle: "Saffron Fragrance & Tender Meat" }
  ],

  faqs: [
    {
      q: "Do you offer home delivery in Chichawatni?",
      a: "Yes! Pearl Cuisine provides swift food delivery across Chichawatni city and surrounding bypass areas. You can order online via our website or directly through WhatsApp at +92 322 7500800."
    },
    {
      q: "Is dine-in available for families?",
      a: "Absolutely. We have a dedicated, 100% family-friendly dining environment with private seating partitions, spacious luxury halls, comfortable seating, and attentive table service."
    },
    {
      q: "Is drive-through service available?",
      a: "Yes, for diners on the go traveling across the bypass, our drive-through and quick-pickup counter is available for prompt service without leaving your vehicle."
    },
    {
      q: "Can I book a table in advance?",
      a: "Yes, you can easily reserve a table online using the reservation form on this page or via WhatsApp to confirm immediate availability for your desired date and guest count."
    },
    {
      q: "Do you accept WhatsApp orders?",
      a: "Yes! WhatsApp ordering is our most popular and quickest ordering channel. Simply pick your dishes, hit 'Order on WhatsApp', and our team receives your formatted order right away."
    },
    {
      q: "Is car parking available at the restaurant?",
      a: "Yes, we feature dedicated, secure on-site parking on Chichawatni Bypass with ample space for family cars, SUVs, and group vans."
    },
    {
      q: "Where exactly is Pearl Cuisine located?",
      a: "We are prominently located right on Chichawatni Bypass, Chichawatni, Punjab 57200, Pakistan, easily accessible for city residents and travelers alike."
    },
    {
      q: "What are your restaurant opening hours?",
      a: "Pearl Cuisine is open daily from 12:00 PM in the afternoon until 01:30 AM midnight for Dine-in, Drive-through, and Fast Delivery."
    }
  ]
};

// Expose globally
window.PEARL_CONFIG = PEARL_CONFIG;
