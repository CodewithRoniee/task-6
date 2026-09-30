// icons.js — small inline-SVG illustrations so the catalog doesn't
// depend on any external image host. Each function returns markup
// sized to fill its container; color comes from currentColor.

const ICONS = {
  "leaf-split": `<svg viewBox="0 0 120 120"><path d="M60 100 V45" class="stem"/>
    <path d="M60 45 C30 40 20 15 28 5 C45 10 58 28 60 45Z" class="leaf-a"/>
    <path d="M60 45 C90 40 100 15 92 5 C75 10 62 28 60 45Z" class="leaf-b"/>
    <path d="M60 60 C40 58 28 40 32 30 C48 33 58 46 60 60Z" class="leaf-a"/>
    <path d="M60 60 C80 58 92 40 88 30 C72 33 62 46 60 60Z" class="leaf-b"/>
  </svg>`,
  "leaf-spear": `<svg viewBox="0 0 120 120"><path d="M60 105 V70" class="stem"/>
    <path d="M46 105 C40 70 46 30 58 8 C64 30 62 70 60 105Z" class="leaf-a"/>
    <path d="M74 105 C80 70 74 30 62 12 C58 32 60 72 62 105Z" class="leaf-b"/>
    <path d="M35 105 C32 78 38 48 48 25 C50 45 46 78 46 105Z" class="leaf-a"/>
  </svg>`,
  "leaf-vine": `<svg viewBox="0 0 120 120"><path d="M15 20 C40 30 30 55 55 60 C80 65 70 90 100 100" class="stem-thin"/>
    <ellipse cx="18" cy="18" rx="12" ry="8" class="leaf-a" transform="rotate(-20 18 18)"/>
    <ellipse cx="48" cy="52" rx="13" ry="9" class="leaf-b" transform="rotate(15 48 52)"/>
    <ellipse cx="78" cy="80" rx="12" ry="8" class="leaf-a" transform="rotate(-10 78 80)"/>
    <ellipse cx="100" cy="102" rx="11" ry="7" class="leaf-b" transform="rotate(20 100 102)"/>
  </svg>`,
  "leaf-fiddle": `<svg viewBox="0 0 120 120"><path d="M60 108 V70" class="stem"/>
    <path d="M60 70 C25 65 20 35 35 12 C45 30 45 45 60 50 C75 45 75 30 85 12 C100 35 95 65 60 70Z" class="leaf-a"/>
  </svg>`,
  "pot-round": `<svg viewBox="0 0 120 120"><path d="M35 45 L85 45 L78 100 L42 100 Z" class="pot"/>
    <rect x="30" y="35" width="60" height="14" rx="3" class="pot-rim"/>
    <path d="M50 35 C50 20 70 20 70 35" class="leaf-b" fill="none" stroke-width="6"/>
  </svg>`,
  "pot-basket": `<svg viewBox="0 0 120 120"><path d="M30 50 L90 50 L82 100 L38 100 Z" class="pot"/>
    <path d="M32 55 L88 55 M35 68 L85 68 M38 81 L82 81 M41 94 L79 94" class="weave" fill="none" stroke-width="3"/>
    <rect x="26" y="40" width="68" height="12" rx="3" class="pot-rim"/>
  </svg>`,
  "pot-floor": `<svg viewBox="0 0 120 120"><path d="M25 35 L95 35 L82 108 L38 108 Z" class="pot"/>
    <rect x="20" y="24" width="80" height="14" rx="3" class="pot-rim"/>
  </svg>`,
  "tool-can": `<svg viewBox="0 0 120 120"><path d="M35 55 L85 55 L80 100 L40 100 Z" class="pot"/>
    <path d="M85 55 L108 40 M104 36 L112 44" class="stem-thin" fill="none" stroke-width="5"/>
    <rect x="45" y="40" width="30" height="15" rx="3" class="pot-rim"/>
  </svg>`,
  "tool-snips": `<svg viewBox="0 0 120 120"><path d="M25 30 L70 65 M95 30 L50 65" class="stem" stroke-width="6"/>
    <circle cx="60" cy="65" r="6" class="pot-rim"/>
    <path d="M50 65 L30 100 M70 65 L90 100" class="stem-thin" stroke-width="5"/>
  </svg>`,
  "tool-bottle": `<svg viewBox="0 0 120 120"><path d="M48 40 L72 40 L76 55 L80 100 L40 100 L44 55Z" class="pot"/>
    <rect x="50" y="25" width="20" height="18" rx="2" class="pot-rim"/>
  </svg>`,
  "gift-macrame": `<svg viewBox="0 0 120 120"><path d="M60 10 V30 M30 30 C30 55 45 55 45 75 M90 30 C90 55 75 55 75 75 M45 75 L75 75" class="stem-thin" fill="none" stroke-width="4"/>
    <circle cx="60" cy="90" r="16" class="pot" fill-opacity="0.5"/>
  </svg>`,
  "gift-card": `<svg viewBox="0 0 120 120"><rect x="20" y="35" width="80" height="55" rx="6" class="pot-rim"/>
    <path d="M35 55 H85 M35 68 H70" class="stem-thin" stroke-width="4"/>
  </svg>`,
  "gift-card2": `<svg viewBox="0 0 120 120"><rect x="15" y="42" width="90" height="45" rx="6" class="pot-rim"/>
    <circle cx="60" cy="64" r="14" class="leaf-b"/>
    <path d="M15 55 H105" class="stem-thin" stroke-width="3"/>
  </svg>`
};

function productIcon(key) {
  return ICONS[key] || ICONS["leaf-vine"];
}
