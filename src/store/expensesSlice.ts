import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Expense {
  id: number;
  name: string;
  amount: number;
  type: string;
  dueDate: string;
  paid: boolean;
  status: 'Paga' | 'Vencida' | 'A Vencer';
}

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
    },
    editExpense(state, action: PayloadAction<Expense>) {
      const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
      if (index >= 0) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense(state, action: PayloadAction<number>) {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
    markAsPaid(state, action: PayloadAction<number>) {
      const index = state.expenses.findIndex(expense => expense.id === action.payload);
      if (index !== -1) {
        state.expenses[index].paid = true;
        state.expenses[index].status = 'Paga';
      }
    },
    updateExpenseStatus(state) {
      const today = new Date().toISOString().split('T')[0];
      state.expenses.forEach(expense => {
        if (expense.paid) {
          expense.status = 'Paga';
        } else if (expense.dueDate < today) {
          expense.status = 'Vencida';
        } else {
          expense.status = 'A Vencer';
        }
      });
    },
  },
});

export const { addExpense, editExpense, deleteExpense, markAsPaid, updateExpenseStatus } = expensesSlice.actions;

export default expensesSlice.reducer;
