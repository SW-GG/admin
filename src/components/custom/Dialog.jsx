'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CustomConfirm from './Confirm';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const CustomDialog = () => {
  const [waffleCount, setWaffleCount] = useState({
    basic: 0,
    choco: 0,
  });

  const [orderDetails, setOrderDetails] = useState({
    orderNumber: '',
    customerPhoneNumber: '',
    memo: '',
  });

  // 와플 가격 (기본: 3000원, 초코: 3500원)
  const WAFFLE_PRICES = {
    basic: 3000,
    choco: 3500,
  };

  // 수량 증가 및 감소 함수
  const updateCount = (type, operation) => {
    setWaffleCount((prev) => {
      const newCount =
        operation === 'increase' ? prev[type] + 1 : Math.max(prev[type] - 1, 0);
      return {
        ...prev,
        [type]: newCount,
      };
    });
  };

  // 총 금액 계산
  const totalPrice =
    waffleCount.basic * WAFFLE_PRICES.basic +
    waffleCount.choco * WAFFLE_PRICES.choco;

  // 주문 데이터 전송 함수
  const handleSubmit = async () => {
    const orderData = {
      orderNumber: orderDetails.orderNumber,
      customerPhoneNumber: orderDetails.customerPhoneNumber,
      basicWaffleCount: waffleCount.basic,
      chocoWaffleCount: waffleCount.choco,
      memo: orderDetails.memo || '', // Optional
      totalPrice,
    };

    // Send orderData to the server
    console.log('Sending order data:', orderData);

    // Here you can use fetch or axios to send the data to your server
    // Example:
    // await fetch('/api/order', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(orderData),
    // });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">주문요청작성하기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader>
          <DialogTitle>주문요청</DialogTitle>
          <DialogDescription>
            주문 번호와 주문자 전화번호를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              주문번호
            </Label>
            <Input
              id="name"
              placeholder="1"
              className="col-span-3"
              value={orderDetails.orderNumber}
              onChange={(e) =>
                setOrderDetails({
                  ...orderDetails,
                  orderNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              주문자 전화번호
            </Label>
            <Input
              id="username"
              placeholder="010-1234-5678"
              className="col-span-3"
              value={orderDetails.customerPhoneNumber}
              onChange={(e) =>
                setOrderDetails({
                  ...orderDetails,
                  customerPhoneNumber: e.target.value,
                })
              }
            />
          </div>
          {/* 기본맛 와플 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="basic-waffle" className="text-right">
              기본맛 와플 (3000원)
            </Label>
            <div className="col-span-2 flex items-center space-x-2">
              <Button
                onClick={() => updateCount('basic', 'decrease')}
                disabled={waffleCount.basic === 0}
              >
                -
              </Button>
              <span className="transition-transform transform">
                {waffleCount.basic}
              </span>
              <Button onClick={() => updateCount('basic', 'increase')}>
                +
              </Button>
            </div>
          </div>

          {/* 초코맛 와플 */}
          <div className="grid grid-cols-4 items-center gap-4 mt-4">
            <Label htmlFor="choco-waffle" className="text-right">
              초코맛 와플 (3500원)
            </Label>
            <div className="col-span-2 flex items-center space-x-2">
              <Button
                onClick={() => updateCount('choco', 'decrease')}
                disabled={waffleCount.choco === 0}
              >
                -
              </Button>
              <span className="transition-transform transform">
                {waffleCount.choco}
              </span>
              <Button onClick={() => updateCount('choco', 'increase')}>
                +
              </Button>
            </div>
          </div>
        </div>
        <Textarea
          placeholder="요청사항이 있다면 작성해주세요."
          value={orderDetails.memo}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, memo: e.target.value })
          }
        />
        <DialogFooter className="flex justify-between items-center mt-6">
          <div className="text-lg font-semibold">
            총 금액: {totalPrice.toLocaleString()} 원
          </div>
          <Button onClick={handleSubmit}>주문 요청 전송</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
