'use client';
    import { useEffect, useState } from 'react';
    import { getServices, createBooking } from '@/lib/data';

    export default function Page(){
      const [services,setServices]=useState<any[]>([]);
      const [msg,setMsg]=useState('');
      useEffect(()=>{ getServices().then(setServices).catch(e=>setMsg(e.message)); },[]);
      return (
        <div style={{padding:16}}>
          <h2>Supabase Test</h2>
          <p>{msg || 'OK'}</p>
          <pre>{JSON.stringify(services,null,2)}</pre>
          <button onClick={async()=>{
            try{
              const now = new Date(Date.now()+3600e3).toISOString();
              const s = services[0]?.id || 1;
              const r = await createBooking({
                customer_name:'Test User', phone:'9999999999',
                service_id:s, appt_at:now, notes:'windsurf test'
              });
              alert('Booking: '+JSON.stringify(r));
            }catch(e:any){ alert('ERR: '+e.message); }
          }}>Create Test Booking</button>
        </div>
      );
    }
