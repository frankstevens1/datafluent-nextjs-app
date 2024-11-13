"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter, 
  DialogTitle, 
  DialogDescription, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, X } from 'lucide-react';
import SendEmailButton from './SendEmailButton';

interface PreviewEmailButtonProps {
  triggerText?: string;
  title: string;
  description?: string;
  content: string;
  row: {
    name: string;
    email: string;
  };
  selectedTemplate: string;
  disabled?: boolean;
}

const PreviewEmailButton: React.FC<PreviewEmailButtonProps> = ({
  triggerText,
  title,
  description,
  content,
  row,
  selectedTemplate,
  disabled
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Dialog Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="text-xs p-2"
          disabled={disabled}
        >
          <Eye className="cursor-pointer text-gray-500 hover:text-blue-500" size={16} />
          <p>{triggerText ? triggerText : ''}</p>
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {/* Dialog Content (HTML or any other content) */}
        <div className="text-xs border border-gray-200 p-3 rounded overflow-auto" style={{ maxHeight: '450px' }}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <DialogFooter>
          {/* Pass row and selectedTemplate to SendEmailButton */}
          <SendEmailButton
            buttonText="Send"
            row={row} 
            selectedTemplate={selectedTemplate}
          />
          <Button
            variant={"outline"}
            className="text-xs p-2"
            onClick={() => setOpen(false)}
          >
            <X className="cursor-pointer text-gray-500 hover:text-red-500" size={16} />
            <p>Close</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewEmailButton;
