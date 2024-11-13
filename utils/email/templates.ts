export interface EmailTemplateDetails {
    label: string;
    value: string;
    subject: string;
    dataMapper: (row: any) => Record<string, any>;
  }
  
  export const emailTemplates: EmailTemplateDetails[] = [
    {
      label: 'First Email',
      value: 'first-email',
      subject: 'Your first email',
      dataMapper: (data) => ({
        name: data.name,
        email: data.email,
      }),
    },
  ];