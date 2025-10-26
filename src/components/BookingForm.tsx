import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getServices, createBooking } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const bookingSchema = z.object({
  appt_at: z.string().min(1, 'Date is required'),
  service_id: z.number().min(1, 'Service is required'),
  pet_name: z.string().min(1, 'Pet name is required'),
  customer_name: z.string().min(1, 'Your name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  });

  const [date, setDate] = useState<Date | undefined>();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    getServices().then(setServices).catch(console.error);
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const booking = await createBooking(data);
      alert(`Booking successful! Your booking ID is ${booking.id}`);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Select appointment date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                if (newDate) {
                  setValue('appt_at', format(newDate, 'yyyy-MM-dd'));
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.appt_at && <span className="text-red-500 text-sm">{errors.appt_at.message}</span>}

        <Input {...register('pet_name')} placeholder="Pet's Name" className="w-full" />
        {errors.pet_name && <span className="text-red-500 text-sm">{errors.pet_name.message}</span>}

        <Input {...register('customer_name')} placeholder="Your Name" className="w-full" />
        {errors.customer_name && <span className="text-red-500 text-sm">{errors.customer_name.message}</span>}

        <Input {...register('phone')} placeholder="Phone Number" className="w-full" />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}

        <Select onValueChange={(value) => setValue('service_id', parseInt(value, 10))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.id} value={service.id.toString()}>
                {service.name} - {service.price} ({service.duration_min} mins)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service_id && <span className="text-red-500 text-sm">{errors.service_id.message}</span>}

        <Input {...register('notes')} placeholder="Notes (optional)" className="w-full" />

        <Button type="submit" className="w-full rounded-xl bg-gradient-to-r from-pawpaw-purple to-pawpaw-pink text-white hover:shadow-lg hover:shadow-pawpaw-pink/50 transition-shadow">
          Book Appointment
        </Button>
      </form>
  );
}
