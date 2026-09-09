"use client";

import {
  FaArrowRight,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden border-t border-[#dfe3ef] bg-white py-20 text-[#0b123b] sm:py-24"
      aria-labelledby="contacto-title"
    >
      <div className="mx-auto grid max-w-[1100px] gap-10 px-6 sm:px-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-16">
        <div>
          <h2
            id="contacto-title"
            className="max-w-xl text-4xl font-extrabold leading-[0.96] tracking-[-0.035em] sm:text-5xl"
          >
            Hablemos de tu próxima{" "}
            <span className="text-[#820CD0]">participación.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#4b5275] sm:text-base">
            Consultá por stands, rondas de negocios, acreditaciones o alianzas
            institucionales. Nuestro equipo recibe tu mensaje por el canal oficial.
          </p>

          <form
            action="mailto:camaradecomercioexterior@gmail.com"
            method="post"
            encType="text/plain"
            className="mt-9 space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-[#0b123b]">
                  Nombre y apellido <span className="text-[#820CD0]">*</span>
                </label>
                <input
                  id="contact-name"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Tu nombre"
                  className="h-12 w-full rounded-xl border border-[#d5dbea] bg-white px-4 text-sm text-[#0b123b] outline-none transition-[border-color,box-shadow] placeholder:text-[#858ca5] focus:border-[#820CD0] focus:ring-4 focus:ring-[#820CD0]/10"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-[#0b123b]">
                  Correo electrónico <span className="text-[#820CD0]">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="nombre@empresa.com"
                  className="h-12 w-full rounded-xl border border-[#d5dbea] bg-white px-4 text-sm text-[#0b123b] outline-none transition-[border-color,box-shadow] placeholder:text-[#858ca5] focus:border-[#820CD0] focus:ring-4 focus:ring-[#820CD0]/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-[#0b123b]">
                Mensaje <span className="text-[#820CD0]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="mensaje"
                rows={6}
                required
                placeholder="Contanos cómo podemos ayudarte."
                className="w-full resize-y rounded-xl border border-[#d5dbea] bg-white px-4 py-3 text-sm leading-relaxed text-[#0b123b] outline-none transition-[border-color,box-shadow] placeholder:text-[#858ca5] focus:border-[#820CD0] focus:ring-4 focus:ring-[#820CD0]/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b123b] px-6 text-sm font-bold text-white transition-colors hover:bg-[#820CD0] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25C0D4]/35"
              >
                Abrir correo para enviar
                <FaArrowRight className="size-3.5" aria-hidden />
              </button>
              <p className="text-xs leading-relaxed text-[#69718a]">
                Los campos marcados con <span className="text-[#820CD0]">*</span> son obligatorios.
              </p>
            </div>
          </form>
        </div>

        <aside className="self-start rounded-2xl bg-[#0b123b] p-7 text-white sm:p-8 lg:mt-2" aria-label="Datos de contacto">
          <h3 className="text-2xl font-semibold tracking-[-0.025em]">Contacto directo</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#c9d1ec]">
            Cámara de Comercio Exterior de Jujuy
          </p>

          <address className="mt-9 space-y-6 not-italic">
            <div className="flex gap-3">
              <FaLocationDot className="mt-0.5 size-4 shrink-0 text-[#25C0D4]" aria-hidden />
              <div>
                <h4 className="text-sm font-semibold">Dirección</h4>
                <p className="mt-1 text-sm leading-relaxed text-[#c9d1ec]">
                  Belgrano 860 · 2° Piso<br />
                  San Salvador de Jujuy
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaPhone className="mt-0.5 size-4 shrink-0 text-[#25C0D4]" aria-hidden />
              <div>
                <h4 className="text-sm font-semibold">Teléfonos</h4>
                <a href="tel:+543884233539" className="mt-1 block text-sm text-[#c9d1ec] transition-colors hover:text-white">
                  +54 388 423 3539
                </a>
                <a href="tel:+543884212955" className="mt-1 block text-sm text-[#c9d1ec] transition-colors hover:text-white">
                  +54 388 421 2955
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="mt-0.5 size-4 shrink-0 text-[#25C0D4]" aria-hidden />
              <div>
                <h4 className="text-sm font-semibold">Correo oficial</h4>
                <a
                  href="mailto:camaradecomercioexterior@gmail.com"
                  className="mt-1 block break-all text-sm leading-relaxed text-[#c9d1ec] transition-colors hover:text-white"
                >
                  camaradecomercioexterior@gmail.com
                </a>
              </div>
            </div>
          </address>

          <a
            href="#redes"
            className="mt-10 inline-flex items-center gap-2 border-t border-white/15 pt-5 text-sm font-semibold text-[#25C0D4] transition-colors hover:text-white"
          >
            Conocé nuestros canales oficiales
            <FaArrowRight className="size-3.5" aria-hidden />
          </a>
        </aside>
      </div>
    </section>
  );
}
