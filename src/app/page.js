"use client"
import CustomDialog from '@/components/custom/Dialog';
import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/order')
      console.log(res);
      
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Dialog */}
      <div className="flex justify-center">
        <CustomDialog />
      </div>

      {/* Flexbox section */}
      <div className="flex items-center justify-between mt-8">
        <div className="bg-muted w-48 h-24 flex items-center justify-center rounded-lg shadow-md">
          <span className="text-lg font-medium text-muted-foreground">
            주문요청
          </span>
        </div>
        <div className="bg-muted w-48 h-24 flex items-center justify-center rounded-lg shadow-md">
          <span className="text-lg font-medium text-muted-foreground">
            주문대기중
          </span>
        </div>
        <div className="bg-muted w-48 h-24 flex items-center justify-center rounded-lg shadow-md">
          <span className="text-lg font-medium text-muted-foreground">
            주문완료
          </span>
        </div>
      </div>
    </div>
  );
}
