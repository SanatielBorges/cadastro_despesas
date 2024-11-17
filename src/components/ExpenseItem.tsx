import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editExpense, deleteExpense, markAsPaid } from '../store/expensesSlice';
import styled from 'styled-components';

interface ExpenseItemProps {
  id: number;
  name: string;
  amount: number;
  type: string;
  dueDate: string;
  paid: boolean;
  status: 'Paga' | 'Vencida' | 'A Vencer';
}

const ListItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
`;

interface InfoItemProps {
  paid: boolean;
}

const InfoItem = styled.div<InfoItemProps>`
  flex: 1;
  text-align: center;
  padding: 10px;
  ${({ paid }) => paid && 'text-decoration: line-through; color: #aaa;'}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex: 1;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: 10px;
  flex: 1;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  width: 100%;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const ModalButton = styled.button`
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
`;

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset());
  return adjustedDate.toLocaleDateString('pt-BR', options);
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ id, name, amount, type, dueDate, paid, status }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedAmount, setEditedAmount] = useState(amount.toString());
  const [editedType, setEditedType] = useState(type);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    if (parseFloat(editedAmount) <= 0) {
      setError('O valor da despesa deve ser positivo.');
      return;
    }
    const dueDateISO = new Date(editedDueDate).toISOString().split('T')[0];
    dispatch(editExpense({
      id,
      name: editedName,
      amount: parseFloat(editedAmount),
      type: editedType,
      dueDate: dueDateISO,
      paid,
      status,
    }));
    setIsEditing(false);
    setError('');
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteExpense(id));
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleTogglePaid = () => {
    if (paid) {
      dispatch(editExpense({
        id,
        name,
        amount,
        type,
        dueDate,
        paid: false,
        status: 'A Vencer'
      }));
    } else {
      dispatch(markAsPaid(id));
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const isVencida = new Date(dueDate) < new Date(today) && !paid;

  return (
    <ListItem className={isVencida ? 'vencida' : ''}>
      {showModal && (
        <Modal>
          <ModalContent>
            <p>Você tem certeza que deseja excluir esta despesa?</p>
            <div>
              <ModalButton onClick={confirmDelete}>Sim</ModalButton>
              <ModalButton onClick={cancelDelete}>Não</ModalButton>
            </div>
          </ModalContent>
        </Modal>
      )}
      {isEditing ? (
        <InfoContainer>
          <Input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            aria-label="Nome da Despesa"
          />
          <Input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
            aria-label="Valor da Despesa"
          />
          <Input
            type="text"
            value={editedType}
            onChange={(e) => setEditedType(e.target.value)}
            aria-label="Tipo da Despesa"
          />
          <Input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            aria-label="Data de Vencimento"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonContainer>
            <Button onClick={handleSave} disabled={paid}>Salvar</Button>
          </ButtonContainer>
        </InfoContainer>
      ) : (
        <InfoContainer>
          <InfoItem paid={paid}>{name}</InfoItem>
          <InfoItem paid={paid}>{formatCurrency(parseFloat(editedAmount))}</InfoItem>
          <InfoItem paid={paid}>{formatDate(dueDate)}</InfoItem>
          <ButtonContainer>
            <Button onClick={() => setIsEditing(true)} disabled={paid}>Editar</Button>
            <Button onClick={handleDelete}>Excluir</Button>
            <Button onClick={handleTogglePaid}>{paid ? 'A Pagar' : 'Paga'}</Button>
          </ButtonContainer>
        </InfoContainer>
      )}
    </ListItem>
  );
};

export default ExpenseItem;
