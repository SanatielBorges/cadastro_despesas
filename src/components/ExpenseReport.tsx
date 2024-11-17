import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';  // Correto
import { Expense } from '../store/expensesSlice';  // Correto
import styled from 'styled-components';

const ReportContainer = styled.div`
  margin-top: 20px;
`;

const ReportSection = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 5px;
`;

const ExpenseReport: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  const today = new Date().toISOString().split('T')[0];

  const allExpenses = expenses;
  const dueExpenses = expenses.filter((expense: Expense) => (
    new Date(expense.dueDate) >= new Date(today) && !expense.paid
  ));
  const overdueExpenses = expenses.filter((expense: Expense) => (
    new Date(expense.dueDate) < new Date(today) && !expense.paid
  ));

  return (
    <ReportContainer>
      <h2>Relatórios de Despesas</h2>
      <ReportSection>
        <h3>Todas as Despesas</h3>
        <List>
          {allExpenses.map((expense: Expense) => (
            <ListItem key={expense.id}>
              {expense.name} - {expense.amount} - {expense.dueDate} - {expense.status}
            </ListItem>
          ))}
        </List>
      </ReportSection>
      <ReportSection>
        <h3>Despesas a Vencer</h3>
        <List>
          {dueExpenses.map((expense: Expense) => (
            <ListItem key={expense.id}>
              {expense.name} - {expense.amount} - {expense.dueDate}
            </ListItem>
          ))}
        </List>
      </ReportSection>
      <ReportSection>
        <h3>Despesas Vencidas</h3>
        <List>
          {overdueExpenses.map((expense: Expense) => (
            <ListItem key={expense.id}>
              {expense.name} - {expense.amount} - {expense.dueDate}
            </ListItem>
          ))}
        </List>
      </ReportSection>
    </ReportContainer>
  );
};

export default ExpenseReport;
