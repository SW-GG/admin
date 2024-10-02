// app/api/order/route.js
import { supabase } from '@/lib/supabase'; // Supabase 클라이언트를 가져옵니다.
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // 쿼리에서 status 가져오기
    const date = searchParams.get('date'); // 쿼리에서 date 가져오기
    const page = parseInt(searchParams.get('page')) || 1; // 페이지 번호, 기본값 1
    const itemsPerPage = 10; // 한 페이지당 보여줄 데이터 수

    // 1. 전체 총 가격과 총 데이터 수를 계산하는 쿼리 (날짜와 상태로 필터링)
    let totalQuery = supabase
      .from('order')
      .select('totalPrice', { count: 'exact' });

    // status 필터링 적용
    if (status) {
      totalQuery = totalQuery.eq('status', status);
    }

    // 날짜 필터링 적용
    if (date) {
      totalQuery = totalQuery
        .gte('created_at', `${date} 00:00:00`)
        .lte('created_at', `${date} 23:59:59`);
    }

    // 총 가격과 데이터 개수 가져오기
    const { data: totalData, count, error: totalError } = await totalQuery;
    if (totalError) {
      return NextResponse.json({ statusCode: 500, msg: totalError.message });
    }

    // 총 가격 계산
    const totalPrice = totalData.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    // 2. 페이지네이션을 적용한 쿼리
    let query = supabase.from('order').select('*');

    // status 필터링 적용
    if (status) {
      query = query.eq('status', status);
    }

    // 날짜 필터링 적용
    if (date) {
      query = query
        .gte('created_at', `${date} 00:00:00`)
        .lte('created_at', `${date} 23:59:59`);
    }

    // 주문 번호(id)를 기준으로 오름차순 정렬 추가
    query = query.order('id', { ascending: true });

    // 페이지네이션 적용 (limit과 range를 사용하여 필요한 범위의 데이터만 가져오기)
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    query = query.range(from, to);

    // 데이터 가져오기 (현재 페이지 데이터)
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

    // 요청된 형태로 응답 반환
    return NextResponse.json({
      datas: updatedData, // 현재 페이지 데이터
      statusCode: dbStatus,
      totalCount: count, // 전체 데이터 개수
      totalPrice: totalPrice, // 해당 날짜의 총 가격
      currentPage: page, // 현재 페이지
      itemsPerPage: itemsPerPage, // 페이지당 아이템 수
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