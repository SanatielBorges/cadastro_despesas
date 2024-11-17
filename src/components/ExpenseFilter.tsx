import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px auto;
  max-width: 700px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  &.active {
    background-color: #0056b3;
  }
`;

const ExpenseFilter: React.FC<{ setFilter: (filter: string) => void; currentFilter: string }> = ({ setFilter, currentFilter }) => {
  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  return (
    <FilterContainer>
      <Button onClick={() => handleFilterChange('Todas')} className={currentFilter === 'Todas' ? 'active' : ''} aria-label="Mostrar todas as despesas">Todas</Button>
      <Button onClick={() => handleFilterChange('A Vencer')} className={currentFilter === 'A Vencer' ? 'active' : ''} aria-label="Mostrar despesas a vencer">A Vencer</Button>
      <Button onClick={() => handleFilterChange('Vencidas')} className={currentFilter === 'Vencidas' ? 'active' : ''} aria-label="Mostrar despesas vencidas">Vencidas</Button>
      <Button onClick={() => handleFilterChange('Pagas')} className={currentFilter === 'Pagas' ? 'active' : ''} aria-label="Mostrar despesas pagas">Pagas</Button>
    </FilterContainer>
  );
};

export default ExpenseFilter;
