import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseFilter from '../components/ExpenseFilter';
import { updateExpenseStatus } from '../store/expensesSlice';

const Container = styled.div`
  padding: 20px;
`;

const Heading = styled.h1`
  text-align: center;
  color: #333;
`;

const ListContainer = styled.div`
  max-width: 850px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
`;

const ListHeaderItem = styled.div`
  flex: 1;
  text-align: center;
  &:nth-child(1) {
    flex: 1.5;
  }
  &:nth-child(4) {
    flex: 1.2;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const HomePage: React.FC = () => {
  const [filter, setFilter] = useState('Todas');
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateExpenseStatus());
  }, [dispatch]);

  const filteredExpenses = expenses.filter(expense => {
    const today = new Date().toISOString().split('T')[0];
    if (filter === 'Vencidas') return new Date(expense.dueDate) < new Date(today) && !expense.paid;
    if (filter === 'A Vencer') return new Date(expense.dueDate) >= new Date(today) && !expense.paid;
    if (filter === 'Pagas') return expense.status === 'Paga';
    return true;
  });

  return (
    <Container>
      <Heading>Cadastro de Despesas</Heading>
      <ExpenseForm />
      <ExpenseFilter setFilter={setFilter} currentFilter={filter} />
      <ListContainer>
        <ListHeader>
          <ListHeaderItem>Despesa</ListHeaderItem>
          <ListHeaderItem>Valor</ListHeaderItem>
          <ListHeaderItem>Data Vencimento</ListHeaderItem>
          <ListHeaderItem>Ações</ListHeaderItem>
        </ListHeader>
        <List>
          {filteredExpenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              id={expense.id}
              name={expense.name}
              amount={expense.amount}
              type={expense.type}
              dueDate={expense.dueDate}
              paid={expense.paid}
              status={expense.status}
            />
          ))}
        </List>
      </ListContainer>
    </Container>
  );
};

export default HomePage;
