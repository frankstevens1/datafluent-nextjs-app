"use client";

import { generateEmailHtml, getEmailTemplate } from '@/utils/email/selector';
import { EmailTemplateDetails } from '@/utils/email/templates';
import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eraser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PreviewEmailButton from './PreviewEmailButton';
import SendEmailButton from './SendEmailButton';

function EmailSelector({ row }: { row: { name: string, email: string } }) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [emailHtml, setEmailHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Get the first email template to display in the dropdown
  const firstEmailTemplate = getEmailTemplate('first-email');
  const availableTemplates: EmailTemplateDetails[] = firstEmailTemplate ? [firstEmailTemplate] : [];

  // Fetch the email HTML whenever the selected template changes or on mount
  useEffect(() => {
    const fetchEmailHtml = async () => {
      if (!selectedTemplate) return;
      
      const templateDetails = getEmailTemplate(selectedTemplate);
      if (!templateDetails) return;

      setLoading(true);
      
      try {
        const data = templateDetails.dataMapper(row);
        const html = await generateEmailHtml({ templateName: selectedTemplate, data });
        setEmailHtml(html);
      } catch (error) {
        console.error('Error generating email preview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailHtml();
  }, [selectedTemplate, row]);

  const handleTemplateChange = (templateName: string) => {
    setSelectedTemplate(templateName);
  };

  // Clear the selected template and email HTML
  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening
    setSelectedTemplate('');
    setEmailHtml(null);
  };

  return (
    <div className="flex w-full items-center justify-between flex-row gap-2">
      <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
        <SelectTrigger className="w-[200px] text-xs flex items-center gap-2">
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-xs">Email Templates:</SelectLabel>
            {availableTemplates.map((template) => (
              <SelectItem key={template.value} value={template.value} className="cursor-pointer text-xs">
                {template.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Show loading indicator */}
      {loading && <span>Loading...</span>}
      
      <Button
        variant={"outline"}
        className="text-xs p-2"
        disabled={!emailHtml}
        onClick={clearSelection}
      >
        <Eraser
          size={16}
          className="text-gray-500 hover:text-red-500"
        />
        <p>
          Clear
        </p>
      </Button>

      <PreviewEmailButton
        title="Email Preview"
        triggerText='Preview'
        description="This is a preview of the selected email template."
        content={emailHtml || ''}
        row={row}
        selectedTemplate={selectedTemplate}
        disabled={!emailHtml}
      />

      <SendEmailButton
        buttonText="Send"
        row={row} 
        selectedTemplate={selectedTemplate}
      />
    </div>
  );
}

export default EmailSelector;
