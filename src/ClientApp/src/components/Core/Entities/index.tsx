export interface Item {
  name: string;
  id: number;
  price: number;
  user: number; // a user-id
}

export interface User {
  firstName: string;
  lastName: string;
  id: number;
}
