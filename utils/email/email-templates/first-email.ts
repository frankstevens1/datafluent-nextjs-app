// components/email-templates/first-email.ts
import { capitalizeFirstLetter } from '@/lib/utils';

export interface FirstEmailProps {
  name: string;
  email: string;
}

export function generateFirstEmail({
  name,
  email
}: FirstEmailProps): string {
  const logo = 'https://nbnfqxzmnnluqcenoqkm.supabase.co/storage/v1/object/public/assets/email-logo.png';
  
  return `
    <div style="text-align: center; padding: 40px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
      <img src="${logo}" alt="Event Logo" style="max-width: 150px; margin: 0 auto 30px auto; display: block;" />

      <h1 style="font-size: 28px; font-weight: bold; color: #333; margin-bottom: 24px;">
        Hey ${capitalizeFirstLetter(name)}!
      </h1>
      
      <p style="font-size: 16px; color: #666; margin-bottom: 24px;">
        You've got mail. 📬
      </p>

      <p style="font-size: 12px; color: #666; margin-bottom: 24px;">
        Sent to ${email}.
      </p>
      
      <p style="font-size: 16px; color: #666;">Sensei</p>
    </div>
  `;
}
