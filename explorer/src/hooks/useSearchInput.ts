import { ChangeEvent, useState } from 'react';
import getBlockDetail from '@/utils/getBlockDetail';
import { useNavigate } from 'react-router-dom';
import getTransactionDetail from '@/utils/getTransactionDetail';

const useSearchInput = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSearchBtnClick = async () => {
    if (!inputValue) {
      alert('값을 입력해주세요.');
      return;
    }
    try {
      await getTransactionDetail(inputValue);
      navigate('/transactions/' + inputValue);
      return;
    } catch (e) {
      console.error(e);
    }
    try {
      await getBlockDetail(isNaN(Number(inputValue)) ? inputValue : Number(inputValue));
      navigate('/blocks/' + inputValue);
      return;
    } catch (e) {
      console.error(e);
    }

    alert('유효한 값이 아닙니다.');
  };

  const handleInputChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value.trim());
  };

  return {
    inputValue,
    handleSearchBtnClick,
    handleInputChange,
  };
};

export default useSearchInput;
