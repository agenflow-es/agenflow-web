export const siteConfig = {
  name: "Agenflow",
  // CON `www`, y no es cosmético. El dominio que SIRVE el sitio es
  // www.agenflow.es: el apex devuelve un 308 hacia él. Con el apex aquí, todas
  // las canónicas, el sitemap, el `host` de robots.txt y el JSON-LD apuntaban a
  // una URL que redirige, en vez de a la que responde 200.
  //
  // Y pesa más de lo que parece por `/bot`: este valor compone la cadena de
  // User-Agent del rastreador (src/app/bot/page.tsx), que queda escrita en los
  // registros de miles de servidores ajenos y no se puede reescribir después.
  // Ahí interesa que la URL publicada sea la definitiva y responda directa, sin
  // un salto de por medio que algún lector de logs automático no vaya a seguir.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.agenflow.es",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@agenflow.es",
  linkedin: "https://www.linkedin.com/company/agenflow",
} as const;
