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
  name1: string;
  name2: string;
  name: string;
  startDate: string;
  cityName: string;
  stateName: string;
  city: string;
  photo?: string;
  selectedTheme: string;
}

export interface CustomerData {
  name: string;
  whatsapp: string;
  email: string;
  utm: any;
  userAgent: string;
  ip?: string;
  fbc?: string | null;
  fbp?: string | null;
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
  currentStep: 2,
  selectedProduct: null,
  selectedExtras: [],
  people: [
    {
      name1: '',
      name2: '',
      name: '',
      startDate: '',
      cityName: '',
      stateName: '',
      city: '',
      selectedTheme: ''
    }
  ],
  customerData: {
    name: '',
    whatsapp: '',
    email: '',
  },
  totalAmount: 0,
  paymentStatus: 'pending',
  pixCode: '',
  pixQrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example"
};

export const checkoutStore = writable<CheckoutState>(initialState);

export const setCurrentStep = (step: number) => {
  checkoutStore.update(state => ({
    ...state,
    currentStep: step
  }));
};

export const selectProduct = (product: Product) => {
  checkoutStore.update(state => {
    const people = Array.from({ length: product.quantity }, () => ({
      name1: '',
      name2: '',
      name: '',
      startDate: '',
      cityName: '',
      stateName: '',
      city: '',
      selectedTheme: ''
    }));

    const extrasTotal = state.selectedExtras.reduce((sum, extra) => sum + (extra.selected ? extra.price : 0), 0);

    return {
      ...state,
      selectedProduct: product,
      people,
      totalAmount: product.price + extrasTotal
    };
  });
};

export const toggleExtra = (extraId: string) => {
  checkoutStore.update(state => {
    let updatedExtras = state.selectedExtras.map(extra => {
      if (extra.id === extraId) {
        return { ...extra, selected: !extra.selected };
      }

      if (extraId === 'collection' && extra.id === 'with_photo') {
        return { ...extra, selected: false };
      }

      return extra;
    });

    const extrasTotal = updatedExtras.reduce(
      (sum, extra) => sum + (extra.selected ? extra.price : 0),
      0
    );

    const productPrice = state.selectedProduct?.price || 0;

    return {
      ...state,
      selectedExtras: updatedExtras,
      totalAmount: productPrice + extrasTotal
    };
  });
};


export const updatePersonData = (index: number, personData: Partial<PersonData>) => {
  checkoutStore.update(state => ({
    ...state,
    people: state.people.map((person, i) =>
      i === index ? { ...person, ...personData } : person
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

export const products: Product[] = [
  {
    id: '1 pareja',
    name: '',
    description: 'Un certificado de amor personalizado',
    price: 3.90,
    oldPrice: 12.90,
    quantity: 1
  }
];

export const extras: Extra[] = [
  {
    id: 'fast_delivery',
    name: 'Entrega exprés',
    description: 'Recíbelo en solo 10 segundos',
    price: 1.99,
    selected: false
  },
  {
    id: 'with_photo',
    name: 'Certificado de Amor Premium (2 en 1)',
    description: 'Recibe dos versiones de tu certificado: una con la foto de la pareja y otra sin foto.',
    price: 2.99,
    selected: false
  },
  {
    id: 'collection',
    name: 'Colección completa (Todos los diseños)',
    description: 'Recibe la colección completa en dos estilos, Minimalista y Clásico, cada uno con y sin foto. En total, tendrás 4 certificados para elegir tu favorito.',
    price: 4.90,
    selected: false
  }
];

checkoutStore.update(state => ({
  ...state,
  selectedExtras: [...extras]
}));