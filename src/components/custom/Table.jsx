import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

import UpdateStatusConfirm from './UpdateStatusConfirm';
import axios from 'axios';

export function CustomTable({tableBody,activeStatus}) {
  const [open, setOpen] = useState(false);
  const [selectRow,setSelecteRow] = useState();

  const handleOpenDialog = (data) => {
    setOpen(true); // 다이얼로그 열기
    setSelecteRow(data);
  };

  const handleCloseDialog = () => {
    setOpen(false); // 다이얼로그 닫기
  };

  const updateStatus = async () => {
    // activeStatus 변수에 의해서 status값을 자동으로 치환한다.
    const vaildStatus = activeStatus === '주문요청' ? 'pending' : activeStatus === '주문대기중' ? 'complete' : 'place';
    const payload = {
      id: selectRow.id,
      status: vaildStatus,
    };
    console.log(selectRow);
    
    const res = await axios.put('/api/order',payload)
    console.log(res);
    
  }
  return (
    <Table>
      <TableCaption>와플 {activeStatus} 내역입니다.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">주문번호</TableHead>
          <TableHead>기본 와플</TableHead>
          <TableHead>초코 와플</TableHead>
          <TableHead>전화번호</TableHead>
          <TableHead>요청사항</TableHead>
          <TableHead>주문날짜</TableHead>
          <TableHead className="text-right">지불 금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableBody?.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => {
              if (activeStatus !== '주문완료') {
                handleOpenDialog(row);
              } 
            }}
            className={activeStatus !== '주문완료' && 'cursor-pointer'}
          >
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell>{row.basicWaffleCount}개</TableCell>
            <TableCell>{row.chocoWaffleCount}개</TableCell>
            <TableCell>{row.phoneNumber}</TableCell>
            <TableCell>{row.memo ? row.memo : '요청사항없음'}</TableCell>
            <TableCell>{row.created_at}</TableCell>
            <TableCell className="text-right">{row.totalPrice}원</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
      {open && (
        <UpdateStatusConfirm
          open={open}
          setOpen={setOpen}
          handleCloseDialog={handleCloseDialog}
          handleSubmit={updateStatus}
        />
      )}
    </Table>
  );
}