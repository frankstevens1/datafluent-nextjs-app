"use client";

import React, { useState } from 'react';
import { Hourglass, Send } from 'lucide-react';
import { generateEmailHtml, getEmailTemplate } from '@/utils/email/selector';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface SendEmailButtonProps {
  row: {
    name: string;
    email: string;
  };
  selectedTemplate: string;
  buttonText?: string;              // Optional prop to change the button text
  onEmailSent?: () => void;         // Optional callback to be triggered after a successful email send
}

const SendEmailButton: React.FC<SendEmailButtonProps> = ({ 
  row, 
  selectedTemplate, 
  buttonText,
  onEmailSent 
}) => {
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (!selectedTemplate) {
      console.error('No template selected.');
      return;
    }

    const templateDetails = getEmailTemplate(selectedTemplate);
    if (!templateDetails) {
      console.error('Invalid template.');
      return;
    }

    setLoading(true);

    try {
      const data = templateDetails.dataMapper(row);
      const html = await generateEmailHtml({ templateName: selectedTemplate, data });

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: row.email,
          subject: templateDetails.subject,
          html,
        }),
      });

      if (response.ok) {
        // Call optional onEmailSent callback if provided
        if (onEmailSent) {
          onEmailSent();
        }

        // Display success message
        toast({
          title: 'Email sent',
          description: 'The email was sent successfully.',
        });

      } else {
        toast({
          title: 'Error sending email',
          description: 'There was an issue sending the email.',
        });
        console.error('Error sending email:', await response.json());
      }
    } catch (error) {
      toast({
        title: 'Error sending email',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      console.error('Error sending email:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={"outline"}
      className="text-xs p-2"
      onClick={handleSendEmail} 
      disabled={loading || !selectedTemplate}
    >
      {loading ? <Hourglass className="text-gray-500" size={16}/> : <Send className="cursor-pointer text-gray-500 hover:text-green-500" size={16}/>}
      <p>{buttonText ? buttonText : ''}</p>
    </Button>
  );
};

export default SendEmailButton;
