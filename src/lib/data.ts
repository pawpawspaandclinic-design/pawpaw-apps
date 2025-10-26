import { supabase } from './supabaseClient';

  export async function getServices() {
    const { data, error } = await supabase
      .from('services')
      .select('id,name,price,duration_min')
      .eq('active', true)
      .order('id');
    if (error) throw error;
    return data;
  }

  export async function createBooking(p:{
    customer_name:string; phone:string; service_id:number;
    appt_at:string; pet_name?:string; notes?:string;
  }) {
    const { data, error } = await supabase.from('bookings')
      .insert(p).select('id,status').single();
    if (error) throw error;
    return data;
  }
