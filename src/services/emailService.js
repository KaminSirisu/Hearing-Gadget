import emailjs from '@emailjs/browser';

const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendContactMessage({ title, name, email, message }) {
    await emailjs.send(serviceId, templateId, { title, name, email, message }, publicKey);
}