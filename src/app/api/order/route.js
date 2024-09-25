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
