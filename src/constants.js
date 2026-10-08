export const PIN = '1234';
export const STORAGE_KEY = 'bill_items';
export const UNLOCK_KEY = 'bill_generator_unlocked';
export const SIGNATURE_KEY = 'bill_show_signature';
export const BILL_SETTINGS_KEY = 'bill_settings';

// Body font choices for the printed bill. Brand name and small caps labels keep
// their own fonts; this changes customer details, table values and totals.
export const BILL_FONTS = [
  { id: 'classic', label: 'Classic', stack: "Georgia, 'Times New Roman', serif" },
  { id: 'elegant', label: 'Elegant', stack: "'Playfair Display', Georgia, serif" },
  { id: 'soft', label: 'Soft Serif', stack: "'Lora', Georgia, serif" },
  { id: 'slab', label: 'Bold Slab', stack: "'Roboto Slab', Georgia, serif" },
  { id: 'modern', label: 'Modern', stack: "'Poppins', 'Segoe UI', sans-serif" },
  { id: 'rounded', label: 'Rounded', stack: "'Nunito', 'Segoe UI', sans-serif" },
];

export const DEFAULT_BILL_SETTINGS = {
  showSignature: true,
  watermarkOpacity: 20, // percent
  fontId: 'classic',
};

export const ITEM_TYPES = [
  'Handloom',
  'Powerloom (Double Peti)',
  'Powerloom (Pick n Pick)',
  'Powerloom (Rapier)',
  'Handloom & Powerloom',
];

export const ITEM_PARTS = ['Anchal', 'Border', 'Patti', 'Pot'];

export const BUSINESS = {
  name: 'Waseem Designer',
  tagline: 'IIHT, Computer Jacquard Textile Designer',
  address: 'A 39/336-5-s Saraiya Haji Katra Varanasi 221001',
  contact: '9140896374',
  upiId: 'wa9605122@axl',
  upiName: 'Waseem Ahmad',
};

export const EMPTY_FORM = {
  item: '',
  itemPart: '',
  chaok: '',
  khewa: '',
  graphX: '',
  graphY: '',
  rate: '',
  amount: '',
  itemType: '',
};

export const CUSTOMER_STORAGE_KEY = 'bill_customer';

export const EMPTY_CUSTOMER = {
  name: '',
  address: '',
  phone: '',
  date: '',
};
