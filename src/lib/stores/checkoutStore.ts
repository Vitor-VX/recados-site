import { writable } from 'svelte/store';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  quantity: number;
}

export interface Extra {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

export interface PersonData {
  name: string;
  startDate: string;
  city: string;
  photo?: string;
}

export interface CustomerData {
  name: string;
  whatsapp: string;
  email: string;
  cpf: string;
}

export interface CheckoutState {
  currentStep: number;
  selectedProduct: Product | null;
  selectedExtras: Extra[];
  people: PersonData[];
  customerData: CustomerData;
  totalAmount: number;
  paymentStatus: 'pending' | 'generating' | 'waiting' | 'paid' | 'error';
  pixCode: string;
  pixQrCode: string;
}

const initialState: CheckoutState = {
  currentStep: 0,
  selectedProduct: null,
  selectedExtras: [],
  people: [],
  customerData: {
    name: '',
    whatsapp: '',
    email: '',
    cpf: ''
  },
  totalAmount: 0,
  paymentStatus: 'pending',
  pixCode: '',
  pixQrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example"
};

export const checkoutStore = writable<CheckoutState>(initialState);

// Actions
export const setCurrentStep = (step: number) => {
  checkoutStore.update(state => ({
    ...state,
    currentStep: step
  }));
};

export const selectProduct = (product: Product) => {
  checkoutStore.update(state => {
    const people = Array.from({ length: product.quantity }, () => ({ name: '', startDate: '', city: '' }));
    return {
      ...state,
      selectedProduct: product,
      people,
      totalAmount: product.price + state.selectedExtras.reduce((sum, extra) => sum + (extra.selected ? extra.price : 0), 0)
    };
  });
};

export const toggleExtra = (extraId: string) => {
  checkoutStore.update(state => {
    const updatedExtras = state.selectedExtras.map(extra =>
      extra.id === extraId ? { ...extra, selected: !extra.selected } : extra
    );

    const extrasTotal = updatedExtras.reduce((sum, extra) => sum + (extra.selected ? extra.price : 0), 0);
    const productPrice = state.selectedProduct?.price || 0;

    return {
      ...state,
      selectedExtras: updatedExtras,
      totalAmount: productPrice + extrasTotal
    };
  });
};

export const updatePersonData = (index: number, personData: PersonData) => {
  checkoutStore.update(state => ({
    ...state,
    people: state.people.map((person, i) =>
      i === index ? personData : person
    )
  }));
};

export const updateCustomerData = (customerData: CustomerData) => {
  checkoutStore.update(state => ({
    ...state,
    customerData
  }));
};

export const setPaymentStatus = (status: CheckoutState['paymentStatus']) => {
  checkoutStore.update(state => ({
    ...state,
    paymentStatus: status
  }));
};

export const setPixData = (pixCode: string, pixQrCode: string) => {
  checkoutStore.update(state => ({
    ...state,
    pixCode,
    pixQrCode
  }));
};

export const resetCheckout = () => {
  checkoutStore.set(initialState);
};

// Mock products and extras
export const products: Product[] = [
  {
    id: '1',
    name: '1 pessoa',
    description: '1 certidão do amor personalizada',
    price: 9.90,
    oldPrice: 14.90,
    quantity: 1
  },
  // {
  //   id: '2',
  //   name: '2 pessoas',
  //   description: '2 certidões personalizadas (podem ser para casais diferentes)',
  //   price: 24.90,
  //   oldPrice: 49.90,
  //   quantity: 2
  // },
  // {
  //   id: '3',
  //   name: '3 pessoas',
  //   description: '3 certidões personalizadas (podem ser para casais diferentes)',
  //   price: 34.90,
  //   oldPrice: 69.90,
  //   quantity: 3
  // }
];

export const extras: Extra[] = [
  {
    id: 'fast_delivery',
    name: 'Entrega super rápida',
    description: 'Receba em até 2 minutos',
    price: 2.90,
    selected: false
  },
  {
    id: 'with_photo',
    name: 'Certificado do Amor Premium (2 em 1)',
    description: 'Receba o certificado com foto do casal e também a versão sem foto.',
    price: 4.90,
    selected: false
  }
];

checkoutStore.update(state => ({
  ...state,
  selectedExtras: [...extras]
}));