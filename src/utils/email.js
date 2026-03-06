import emailjs from "@emailjs/browser";

export const sendContactEmail = ({ name, email, message }) => {
  return emailjs.send(
    import.meta.env.VITE_CONTACT_SERVICE_ID,
    import.meta.env.VITE_CONTACT_TEMPLATE_ID,
    { name, email, message },
    import.meta.env.VITE_CONTACT_PUBLIC_KEY
  );
};
