'use client';
import { DatePickerDemo } from '@/components/custom/DatePicker';
import CustomDialog from '@/components/custom/Dialog';
import { PaginationDemo } from '@/components/custom/Pagination';
import { CustomTable } from '@/components/custom/Table';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

export default function Home() {
  const [activeButton, setActiveButton] = useState('주문요청');
  const [tableData, setTableData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date()
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/. /g, '-')
      .replace('.', '') // YYYY-MM-DD 형식
  );

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 페이지 번호 상태 추가

  // fetchOrders 함수 수정: 페이지 번호를 파라미터로 전달
  const fetchOrders = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/order', {
        params: {
          status:
            activeButton === '주문요청'
              ? 'place'
              : activeButton === '주문대기중'
              ? 'pending'
              : activeButton === '주문완료'
              ? 'complete'
              : 'place',
          date: selectedDate,
          page: page, // 페이지 번호 전달
        },
      });
      if (res) {
        setTableData(res.data); // API에서 받은 데이터를 테이블에 설정
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 번호나 버튼, 날짜가 바뀌면 데이터를 다시 가져옴
  useEffect(() => {
    fetchOrders(currentPage); // 페이지 번호가 변경될 때마다 호출
  }, [activeButton, selectedDate, currentPage]);

  // 버튼 클릭 시 페이지 번호를 1로 리셋
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setCurrentPage(1); // 버튼 클릭 시 페이지를 첫 페이지로 설정
  };

  // 날짜 변경 핸들러
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // 날짜가 바뀌면 상태 업데이트
    setCurrentPage(1); // 날짜 변경 시 첫 페이지로 이동
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page); // 페이지가 변경될 때 상태 업데이트
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Dialog */}
      <div className="flex justify-center">
        <CustomDialog fetchOrders={fetchOrders} />
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

      {/* DatePicker */}
      <div className="pt-16">
        <DatePickerDemo
          initialDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>

      {/* Table */}
      {isLoading && (
        <div className="flex justify-center h-screen">
          <div className="text-center">
            <PulseLoader />
          </div>
        </div>
      )}
      {!isLoading && tableData?.totalCount > 0 && (
        <div className="pt-8">
          <CustomTable
            tableBody={tableData}
            activeStatus={activeButton}
            fetchOrders={fetchOrders}
          />
          {/* PaginationDemo에 페이지 변경 핸들러 전달 */}
          <PaginationDemo
            totalItems={tableData?.totalCount}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={handlePageChange} // 페이지 변경 핸들러
          />
        </div>
      )}
      {/* 데이터가 없을 경우 */}
      {tableData?.totalCount === 0 && (
        <div className="flex justify-center h-screen pt-8">
          <div className="text-center">
            <Image
              src="https://sw-gg.github.io/static-image/no-waffle.webp"
              alt="waffle"
              width={360}
              height={360}
            />
            <p className="mt-6 text-2xl font-bold text-gray-800">
              {activeButton} 와플 내역이 없어요
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
