import { ChangeEvent, useState } from 'react';
import getBlockDetail from '@/utils/getBlockDetail';
import getTransactionDetail from '@/utils/getTransactionDetail';
import getAccountDetail from '@/utils/getAccountDetail';

const useSearchInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSearchBtnClick = async () => {
    if (!inputValue) {
      alert('값을 입력해주세요.');
      return;
    }
    try {
      await getTransactionDetail(inputValue);
      location.href = '/transactions/' + inputValue;
      return;
    } catch (e) {
      console.error(e);
    }
    try {
      await getBlockDetail(isNaN(Number(inputValue)) ? inputValue : Number(inputValue));
      location.href = '/blocks/' + inputValue;
      return;
    } catch (e) {
      console.error(e);
    }
    try {
      await getAccountDetail(inputValue);
      location.href = '/account?id=' + inputValue;
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
