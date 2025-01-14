import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: string;
  amount: number;
  description: string | undefined;
  user: string;
  name: string;
  type: string;
  date: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  createdAt: string;
  type: string;
  amount: number;
}

interface TransactionsState {
  transactions: Transaction[];
  categories: Category[];
}

const transactions = [
  {
    name: "milk",
    amount: 1205,
    description: "daily milk",
    type: "credit",
    date: new Date("12-2-2024").toString(),
    category: "milk",
    id: "1",
    user: "efe68dc5-9e52-4e10-8f5d-876d386ced19",
  },
  {
    name: "milk",
    amount: 1205,
    description: "daily milk",
    type: "credit",
    date: new Date("12-23-2024").toString(),
    category: "farm",
    id: "5",
    user: "efe68dc5-9e52-4e10-8f5d-876d386ced19",
  },
  {
    name: "farm",
    amount: 3525,
    description: "daily milk",
    type: "credit",
    date: new Date("12-11-2024").toString(),
    category: "college",
    id: "2",
    user: "efe68dc5-9e52-4e10-8f5d-876d386ced19",
  },
  {
    name: "college",
    amount: 1205,
    description: "daily milk",
    type: "debit",
    date: new Date("12-16-2023").toString(),
    category: "farm",
    id: "3",
    user: "efe68dc5-9e52-4e10-8f5d-876d386ced19",
  },
  {
    name: "store",
    amount: 1205,
    description: "daily milk",
    type: "debit",
    date: new Date("11-11-2024").toString(),
    category: "milk",
    id: "4",
    user: "efe68dc5-9e52-4e10-8f5d-876d386ced19",
  },
];

const initialState: TransactionsState = {
  transactions: transactions,
  categories: [],
};

const transSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
    allTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    allCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  allTransactions,
  allCategories,
} = transSlice.actions;
export type { Transaction, Category };

export default transSlice.reducer;
