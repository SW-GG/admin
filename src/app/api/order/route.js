// app/api/order/route.js
import { supabase } from '@/lib/supabase'; // Supabase 클라이언트를 가져옵니다.
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req, res) {
  try {
    const data = await supabase.from('orders').select('*');
    // if (error) throw error;
    console.log(res,data);
    return NextResponse.json([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
