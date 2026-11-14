// Simulated payment options. No card details are ever collected.
export const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Cash on delivery',
    description: 'Pay the rider in cash when your order arrives.',
  },
  {
    id: 'mock-card',
    label: 'Mock card payment (simulated)',
    description: 'Demonstration only. No card details are asked for and no money moves.',
  },
];