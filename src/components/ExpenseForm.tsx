import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../store/expensesSlice';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 700px;  // Ajustar a largura do formulário para combinar com os filtros
  margin: 20px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const formatCurrency = (value: string) => {
  const num = parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const ExpenseForm: React.FC = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(value) / 100);
    setAmount(formattedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name === '' || amount === '' || type === '' || dueDate === '') {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    const numericAmount = parseFloat(amount.replace(/[^\d.-]/g, '')) / 100;
    if (numericAmount <= 0) {
      setError('O valor da despesa deve ser positivo.');
      return;
    }
    dispatch(addExpense({
      id: Date.now(),
      name,
      amount: numericAmount,
      type,
      dueDate: parseDate(dueDate).toISOString().split('T')[0],
      paid: false,
      status: 'A Vencer',
    }));
    setName('');
    setAmount('');
    setType('');
    setDueDate('');
    setError('');
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome da Despesa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Valor"
          value={amount}
          onChange={handleAmountChange}
        />
        <Input
          type="text"
          placeholder="Tipo"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Adicionar Despesa</Button>
      </Form>
    </FormContainer>
  );
};

export default ExpenseForm;
