'use client';
import { DatePickerDemo } from '@/components/custom/DatePicker';
import CustomDialog from '@/components/custom/Dialog';
import { CustomTable } from '@/components/custom/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activeButton, setActiveButton] = useState('주문요청');
  const [tableData, setTableData] = useState();

  // 한국 시간 기준의 today 값 설정
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 포맷

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/order');
      if (res) {
        setTableData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Dialog */}
      <div className="flex justify-center">
        <CustomDialog />
      </div>

      {/* Flexbox section */}
      <div className="flex items-center justify-between mt-8 space-x-4">
        <button
          className={`${
            activeButton === '주문요청'
              ? 'bg-emerald-400 text-white'
              : 'bg-emerald-100 text-emerald-600'
          } w-48 h-24 flex items-center justify-center rounded-lg shadow-md text-lg font-medium transition-all`}
          onClick={() => handleButtonClick('주문요청')}
        >
          주문요청
        </button>
        <button
          className={`${
            activeButton === '주문대기중'
              ? 'bg-emerald-400 text-white'
              : 'bg-emerald-100 text-emerald-600'
          } w-48 h-24 flex items-center justify-center rounded-lg shadow-md text-lg font-medium transition-all`}
          onClick={() => handleButtonClick('주문대기중')}
        >
          주문대기중
        </button>
        <button
          className={`${
            activeButton === '주문완료'
              ? 'bg-emerald-400 text-white'
              : 'bg-emerald-100 text-emerald-600'
          } w-48 h-24 flex items-center justify-center rounded-lg shadow-md text-lg font-medium transition-all`}
          onClick={() => handleButtonClick('주문완료')}
        >
          주문완료
        </button>
      </div>
      <div className="pt-16">
        {/* today 값을 DatePickerDemo에 전달 */}
        <DatePickerDemo initialDate={today} />
      </div>
      <div className="pt-8">
        <CustomTable tableBody={tableData} activeStatus={activeButton} />
      </div>
    </div>
  );
}
