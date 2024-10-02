// app/api/order/route.js
import { supabase } from '@/lib/supabase'; // Supabase 클라이언트를 가져옵니다.
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // 쿼리에서 status 가져오기
    const date = searchParams.get('date'); // 쿼리에서 date 가져오기

    // supabase 쿼리 빌드
    let query = supabase.from('order').select('*');

    // status 필터링 적용
    if (status) {
      query = query.eq('status', status);
    }

    // 날짜 필터링 적용 (created_at 날짜가 쿼리의 날짜와 같은지 확인)
    if (date) {
      query = query
        .gte('created_at', `${date} 00:00:00`)
        .lte('created_at', `${date} 23:59:59`);
    }

    // 주문 번호(id)를 기준으로 오름차순 정렬 추가
    query = query.order('id', { ascending: true });

    // 데이터 가져오기
    const { data, error, status: dbStatus, statusText } = await query;

    if (error) {
      return NextResponse.json({ statusCode: dbStatus, msg: statusText });
    }

    // Convert the created_at field to KST (Korean Standard Time)
    const updatedData = data.map((order) => {
      const utcDate = new Date(order.created_at);
      const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000); // UTC -> KST 변환
      order.created_at = kstDate
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19); // 'YYYY-MM-DD HH:MM:SS' 형식으로 변환
      return order;
    });

    // 총 가격 계산
    const totalPrice = updatedData.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    const totalCount = updatedData.length;

    // 요청된 형태로 응답 반환
    return NextResponse.json({
      datas: updatedData,
      statusCode: dbStatus,
      totalCount: totalCount,
      totalPrice: totalPrice,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
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