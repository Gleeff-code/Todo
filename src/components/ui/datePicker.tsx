import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  error?: boolean;
  disabled?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, error, onDateChange, disabled }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant='outline'
        disabled={disabled}
        className={cn(
          `w-[240px] justify-start text-left font-normal ${error ? '!border-red-500' : ''}`,
          !date && 'text-muted-foreground'
        )}>
        <CalendarIcon />
        {date ? format(date, 'PPP') : <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className='w-auto p-0' align='start'>
      <Calendar mode='single' selected={date} onSelect={onDateChange} initialFocus />
    </PopoverContent>
  </Popover>
);
