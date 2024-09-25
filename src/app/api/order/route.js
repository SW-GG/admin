// app/api/order/route.js
import { supabase } from '@/lib/supabase'; // Supabase 클라이언트를 가져옵니다.
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req, res) {
  try {
    const {data,error,status,statusText} = await supabase.from('order').select('*');
    if(error) {
      return NextResponse.json({status,msg:statusText})
    }
    return NextResponse.json(data)
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function POST(request) {
  // JSON 형식의 바디 데이터 파싱
  const body = await request.json();
  const {
    phoneNumber,
    basicWaffleCount,
    chocoWaffleCount,
    memo,
    totalPrice,
    status,
  } = body;

  // 데이터베이스에 새 주문 추가
  const { data, error } = await supabase.from('order').insert([
    {
      phoneNumber,
      basicWaffleCount,
      chocoWaffleCount,
      memo,
      totalPrice,
      status,
    },
  ]);

  // 오류 처리
  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // 성공적으로 데이터가 추가되면 결과 반환
  return new NextResponse(JSON.stringify(data), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}