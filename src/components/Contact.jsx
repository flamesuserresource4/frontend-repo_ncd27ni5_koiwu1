import React from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="relative bg-[#0b0c0f] py-24 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-white/90 sm:text-3xl">Let’s build without limits</h2>
          <p className="mt-3 text-white/70">Tell us a bit about your project and we’ll get back within 24 hours.</p>
        </div>

        <form className="mx-auto mt-10 grid max-w-2xl gap-4">
          <input className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-sky-400" placeholder="Name" required />
          <input type="email" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-sky-400" placeholder="Email" required />
          <textarea rows="5" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-sky-400" placeholder="Project details" />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-full border border-sky-500/30 bg-gradient-to-r from-sky-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25"
            onClick={(e) => e.preventDefault()}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span>Send message</span>
          </motion.button>
        </form>
      </div>
    </section>
  )
}
