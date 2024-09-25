// app/api/order/route.js
import { supabase } from '@/lib/supabase'; // Supabase 클라이언트를 가져옵니다.
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req, res) {
  try {
    const { data, error, status, statusText } = await supabase
      .from('order')
      .select('*');
    if (error) {
      return NextResponse.json({ status, msg: statusText });
    }
    console.log(data);

    // Convert the created_at field to KST (Korean Standard Time)
    const updatedData = data.map((order) => {
      const date = new Date(order.created_at);
      const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // Convert UTC to KST
      order.created_at = kstDate
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19); // Format to 'YYYY-MM-DD HH:MM:SS'
      return order;
    });

    return NextResponse.json(updatedData);
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


export async function PUT(request) {
  // JSON 형식의 바디 데이터 파싱
  const body = await request.json();
  const { id, status } = body;

  // id와 status가 모두 제공되었는지 확인
  if (!id || !status) {
    return new NextResponse(
      JSON.stringify({ error: 'id와 status 값이 필요합니다.' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // 데이터베이스에서 id에 해당하는 주문의 status 업데이트
  const { data, error } = await supabase
    .from('order')
    .update({ status })
    .eq('id', id);

  // 오류 처리
  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // 성공적으로 업데이트된 경우 결과 반환
  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}