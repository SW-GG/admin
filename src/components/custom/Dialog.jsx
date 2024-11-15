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
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { title } from 'process';

const CustomDialog = ({ fetchOrders }) => {
  const {toast} = useToast()
  const [open, setOpen] = useState(false); // Manage dialog open state
  const [waffleCount, setWaffleCount] = useState({
    basic: 0,
    choco: 0,
  });

  const [orderDetails, setOrderDetails] = useState({
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
    try {
      const orderData = {
        phoneNumber: orderDetails.customerPhoneNumber,
        basicWaffleCount: waffleCount.basic,
        chocoWaffleCount: waffleCount.choco,
        memo: orderDetails.memo || '', // Optional
        totalPrice,
        status: 'place',
      };

      // Send orderData to the server
      console.log('Sending order data:', orderData);
      const res = await axios.post('/api/order', orderData);
      console.log(res);
      if (res) {
        setOpen(false);
        toast({
          title: '주문요청이 접수되었습니다.'
        });
        fetchOrders();
      }
      // Close the dialog after successful submission
    } catch (error) {
      console.log(error);
    }
  };

  // Check if at least one waffle is selected
  const isButtonActive = waffleCount.basic > 0 || waffleCount.choco > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">주문요청작성하기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[486px]">
        <DialogHeader>
          <DialogTitle>주문요청</DialogTitle>
          <DialogDescription>
            주문 번호와 주문자 전화번호를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
          placeholder="요청사항(선택)"
          value={orderDetails.memo}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, memo: e.target.value })
          }
        />
        <DialogFooter className="flex justify-between items-center mt-6">
          <div className="text-lg font-semibold">
            총 금액: {totalPrice.toLocaleString()} 원
          </div>
          <CustomConfirm
            title={'주문요청전송'}
            handleSubmit={handleSubmit}
            isDisabled={!isButtonActive} // Disable button if no waffle is selected
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
