// data.js — seed catalog. On first load this seeds localStorage;
// after that, the admin panel's edits are the source of truth.

const SEED_PRODUCTS = [
  {
    id: "p001",
    name: "Monstera Deliciosa",
    category: "Plants",
    price: 42.00,
    stock: 14,
    icon: "leaf-split",
    blurb: "Full, glossy leaves that fenestrate with age. Bright, indirect light.",
    description: "A mature Monstera deliciosa with three to four fully split leaves. Ships in its nursery pot, ready to move into something nicer. Likes bright, indirect light and a weekly drink once the top inch of soil is dry."
  },
  {
    id: "p002",
    name: "Snake Plant",
    category: "Plants",
    price: 28.00,
    stock: 22,
    icon: "leaf-spear",
    blurb: "Nearly indestructible. Thrives on neglect and low light.",
    description: "Sansevieria trifasciata — stiff, upright leaves in deep green with faint banding. Tolerates low light and infrequent watering, making it the plant we recommend to people who've killed everything else."
  },
  {
    id: "p003",
    name: "Golden Pothos",
    category: "Plants",
    price: 18.00,
    stock: 30,
    icon: "leaf-vine",
    blurb: "Fast-trailing vine, splashed with gold. Easiest plant we sell.",
    description: "A trailing pothos with marbled green-and-gold leaves. Grows quickly in almost any light, and roots easily in water if you want to propagate more for friends."
  },
  {
    id: "p004",
    name: "Fiddle Leaf Fig",
    category: "Plants",
    price: 65.00,
    stock: 8,
    icon: "leaf-fiddle",
    blurb: "The statement plant. Broad, violin-shaped leaves.",
    description: "A well-branched Ficus lyrata, about 90cm tall. Wants a consistent spot near a bright window — this one holds a grudge against being moved."
  },
  {
    id: "p101",
    name: "Stoneware Planter, Small",
    category: "Pots & Planters",
    price: 24.00,
    stock: 40,
    icon: "pot-round",
    blurb: "Hand-thrown stoneware with a drainage hole and matching saucer.",
    description: "12cm diameter, glazed in a soft speckled white. Each one is thrown by hand, so expect small variations in shape and glaze — that's the point."
  },
  {
    id: "p102",
    name: "Woven Basket Planter",
    category: "Pots & Planters",
    price: 32.00,
    stock: 25,
    icon: "pot-basket",
    blurb: "Seagrass basket with a hidden plastic liner. Fits most 6\" nursery pots.",
    description: "Handwoven seagrass, lined so it holds a standard nursery pot without needing repotting. Brings texture to a plant that's otherwise just sitting in black plastic."
  },
  {
    id: "p103",
    name: "Terracotta Floor Pot",
    category: "Pots & Planters",
    price: 48.00,
    stock: 12,
    icon: "pot-floor",
    blurb: "Tall, unglazed terracotta for your biggest plant. 30cm.",
    description: "Classic unglazed terracotta, 30cm tall with a wide base for stability. Porous walls help excess moisture evaporate — good for anyone prone to overwatering."
  },
  {
    id: "p201",
    name: "Copper Watering Can",
    category: "Tools & Care",
    price: 36.00,
    stock: 18,
    icon: "tool-can",
    blurb: "1L capacity, long spout for reaching under leaves.",
    description: "Solid copper with a brass handle, holds one litre. The long, narrow spout gets water to the soil without wetting the leaves — useful for plants prone to fungal spotting."
  },
  {
    id: "p202",
    name: "Precision Pruning Snips",
    category: "Tools & Care",
    price: 16.00,
    stock: 35,
    icon: "tool-snips",
    blurb: "Sharp, small-bladed snips for deadheading and light pruning.",
    description: "Carbon-steel blades sharp enough for clean cuts that heal fast, sized for houseplants rather than hedges. Comes with a leather blade guard."
  },
  {
    id: "p203",
    name: "Liquid Plant Food, 250ml",
    category: "Tools & Care",
    price: 14.00,
    stock: 50,
    icon: "tool-bottle",
    blurb: "Balanced feed for foliage plants. A few drops per watering.",
    description: "A gentle, balanced fertiliser for general foliage houseplants. Add a few drops to your watering can every other week during the growing season."
  },
  {
    id: "p301",
    name: "Macrame Hanger",
    category: "Gifts",
    price: 22.00,
    stock: 20,
    icon: "gift-macrame",
    blurb: "Hand-knotted cotton cord, fits pots up to 15cm.",
    description: "Natural undyed cotton cord, hand-knotted with a simple diamond pattern. Holds pots up to 15cm across — a good pairing with the trailing pothos."
  },
  {
    id: "p302",
    name: "\"New Plant Parent\" Card Set",
    category: "Gifts",
    price: 12.00,
    stock: 45,
    icon: "gift-card",
    blurb: "Set of 6 letterpress care-tip cards. A nice add-on gift.",
    description: "Six letterpress-printed cards, each covering one care basics — light, water, humidity, feeding, repotting, and pests. Printed on 100% cotton stock."
  },
  {
    id: "p303",
    name: "Gift Card",
    category: "Gifts",
    price: 25.00,
    stock: 999,
    icon: "gift-card2",
    blurb: "Let them choose. Delivered as a code at checkout.",
    description: "Available in $25, $50, and $100 denominations at checkout. Never expires, redeemable on anything in the shop."
  }
];

function seedProductsIfNeeded() {
  if (!localStorage.getItem("bb_products")) {
    localStorage.setItem("bb_products", JSON.stringify(SEED_PRODUCTS));
  }
}

function getProducts() {
  seedProductsIfNeeded();
  try {
    return JSON.parse(localStorage.getItem("bb_products")) || [];
  } catch (e) {
    return SEED_PRODUCTS;
  }
}

function saveProducts(products) {
  localStorage.setItem("bb_products", JSON.stringify(products));
}
