// DatePicker.js
'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale'; // 한국어 포맷 적용
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

export function DatePickerDemo({ initialDate, onDateChange }) {
  const [date, setDate] = useState(new Date(initialDate));

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = selectedDate
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/. /g, '-')
      .replace('.', ''); // YYYY-MM-DD 형식
    onDateChange(formattedDate); // 부모 컴포넌트로 전달
  };


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP', { locale: ko })
          ) : (
            <span>날짜를 선택하세요</span>
          )}{' '}
          {/* 한국어 날짜 포맷 */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          locale={ko} // 달력에 한국어 로케일 적용
        />
      </PopoverContent>
    </Popover>
  );
}
