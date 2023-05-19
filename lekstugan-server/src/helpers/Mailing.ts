import {IMail} from '../models/types/IMail';
import {IMailParams} from '../models/types/IMailParams';
/**
 * Sends a mail to the user with the booking information
 * or if the mailData has a key it sends a mail with the key including
 * information about the booking.
 *
 * @param {IBookingMailParams} mailData - The mail data
 */
export async function sendBookingMail(
    mailData: IMailParams,
): Promise<Response> {
  const api = process.env.EmailJS_API;
  let template = process.env.EmailJS_BOOKING_TEMPLATE_ID;
  if (mailData.key) {
    template = process.env.EmailJS_KEY_TEMPLATE_ID;
  }
  const mail = {
    user_id: process.env.EmailJS_PUBLIC_KEY,
    template_id: template,
    service_id: process.env.EmailJS_SERVICE_ID,
    accessToken: process.env.EmailJS_PRIVATE_KEY,
    template_params: {
      ...(mailData as IMailParams),
    },
  } as IMail;
  if (!api) {
    throw new Error('EmailJS_API not set');
  }
  return fetch(api, {
    method: 'POST',
    body: JSON.stringify(mail),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
