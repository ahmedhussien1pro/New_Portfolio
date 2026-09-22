'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Send,
  Mail,
  MapPin,
  CheckCircle,
  FileDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mb-8'>
        <Link href='/'>
          <Button
            variant='ghost'
            size='sm'
            className='gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'>
            <ArrowLeft className='h-4 w-4' /> Back to Overview
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-10'>
        <div className='md:col-span-5 space-y-6'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50'>
              Get in Touch
            </h1>
            <p className='text-sm text-zinc-600 dark:text-zinc-400'>
              Have a project, enterprise consulting inquiry, or looking to
              discuss full-stack software architecture?
            </p>
          </div>

          <div className='space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800'>
            <div className='flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900'>
                <Mail className='h-4 w-4 text-emerald-500' />
              </div>
              <div>
                <div className='text-xs text-zinc-400'>Direct Inquiries</div>
                <a
                  href='mailto:ahmedHussien1352@gmail.com'
                  className='font-medium text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 transition-colors'>
                  ahmedHussien1352@gmail.com
                </a>
              </div>
            </div>

            <div className='flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900'>
                <MapPin className='h-4 w-4 text-emerald-500' />
              </div>
              <div>
                <div className='text-xs text-zinc-400'>
                  Location & Availability
                </div>
                <div className='font-medium text-zinc-900 dark:text-zinc-100'>
                  Menofia, Egypt &bull; Remote Worldwide
                </div>
              </div>
            </div>
          </div>

          <div className='pt-2'>
            <a href='/Ahmed_Hussien_CV.pdf' download='Ahmed_Hussien_CV.pdf'>
              <Button
                variant='outline'
                size='sm'
                className='w-full gap-2 border-zinc-300 dark:border-zinc-700'>
                <FileDown className='h-4 w-4 text-emerald-500' /> Download
                Ahmed&apos;s CV
              </Button>
            </a>
          </div>
        </div>

        {/* Form */}
        <div className='md:col-span-7'>
          <div className='rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-xl'>
            {submitted ? (
              <div className='py-12 text-center space-y-3'>
                <div className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'>
                  <CheckCircle className='h-6 w-6' />
                </div>
                <h3 className='text-lg font-bold text-zinc-900 dark:text-zinc-100'>
                  Message Transmitted
                </h3>
                <p className='text-xs text-zinc-500 max-w-xs mx-auto'>
                  Thank you! Your message has been recorded. Ahmed will get back
                  to you shortly.
                </p>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className='mt-4'>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label className='block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5'>
                    Your Name
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder='e.g. Alex Vance'
                    className='w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                  />
                </div>

                <div>
                  <label className='block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder='alex@company.com'
                    className='w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                  />
                </div>

                <div>
                  <label className='block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5'>
                    Message / Architecture Requirements
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder='Tell Ahmed about your project or inquiry...'
                    className='w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none'
                  />
                </div>

                <Button
                  type='submit'
                  variant='accent'
                  className='w-full gap-2 mt-2'>
                  <Send className='h-4 w-4' /> Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
