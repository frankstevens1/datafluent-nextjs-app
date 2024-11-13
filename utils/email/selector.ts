import { 
    EmailTemplateDetails, 
    emailTemplates 
} from './templates';
  
// Function to get template details by value
export const getEmailTemplate = (value: string): EmailTemplateDetails | undefined => {
return emailTemplates.find((template) => template.value === value);
};

export interface EmailProps {
templateName: string;
data: any; // Specific types should be used based on the template
}

export async function generateEmailHtml({ templateName, data }: EmailProps): Promise<string> {
  switch (templateName) {
    // ticket
    case 'first-email': {
      const { generateFirstEmail } = await import('@/utils/email/email-templates/first-email');
      return generateFirstEmail(data);
    }
    // add cases for other templates here

    // default
    default:
      throw new Error(`Unknown email template: ${templateName}`);
  }
}