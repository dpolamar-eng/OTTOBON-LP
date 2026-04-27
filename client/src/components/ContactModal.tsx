import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2, User, Mail, Phone, MessageSquare } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// --- Configuration from .env ---
const GOOGLE_FORM_ACTION_URL = import.meta.env.VITE_GOOGLE_FORM_URL || "";
const ENTRY_NAME = import.meta.env.VITE_GOOGLE_FORM_ENTRY_NAME || "entry.xxxxxx";
const ENTRY_EMAIL = import.meta.env.VITE_GOOGLE_FORM_ENTRY_EMAIL || "entry.xxxxxx";
const ENTRY_PHONE = import.meta.env.VITE_GOOGLE_FORM_ENTRY_PHONE || "entry.xxxxxx";
const ENTRY_MESSAGE = import.meta.env.VITE_GOOGLE_FORM_ENTRY_MESSAGE || "entry.xxxxxx";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Please provide a little more detail." }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
}

export function ContactModal({ children, open: controlledOpen, onOpenChange: setControlledOpen, triggerClassName }: ContactModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled && setControlledOpen ? setControlledOpen : setInternalOpen;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    // We use a hidden iframe to submit. This is the most reliable method for Google Forms.
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const htmlForm = document.createElement('form');
    htmlForm.action = GOOGLE_FORM_ACTION_URL;
    htmlForm.method = 'POST';
    htmlForm.target = 'hidden_iframe';

    const fields = {
      [ENTRY_NAME]: values.name,
      [ENTRY_EMAIL]: values.email,
      [ENTRY_PHONE]: values.phone,
      [ENTRY_MESSAGE]: values.message,
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      htmlForm.appendChild(input);
    });

    document.body.appendChild(htmlForm);
    htmlForm.submit();

    // Small delay to simulate submission before showing success
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Cleanup
      document.body.removeChild(htmlForm);
      setTimeout(() => document.body.removeChild(iframe), 1000);

      // Auto close after success
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          setIsSuccess(false);
          form.reset();
        }, 500);
      }, 2500);
    }, 1000);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isSuccess) return;
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || <Button className={triggerClassName}>Talk to Us</Button>}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-[#0A0D14] border-white/10 text-white shadow-2xl rounded-3xl backdrop-blur-xl">
        <div className="relative p-8 md:p-10">
          {/* Subtle glow effect */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-[60px]" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-[60px]" />

          <DialogHeader className="mb-8 relative z-10">
            <DialogTitle className="text-3xl font-bold tracking-tight bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
              Get in touch
            </DialogTitle>
          </DialogHeader>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
                <CheckCircle2 className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We've received your message and will respond shortly.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 relative z-10">
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="group relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <Input 
                              placeholder="Full Name" 
                              className="pl-10 h-12 bg-white/[0.03] border-white/10 focus:border-blue-500/50 focus:bg-white/[0.05] transition-all rounded-2xl" 
                              {...field} 
                              disabled={isSubmitting} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-[10px] ml-2" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="group relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <Input 
                              placeholder="Email Address" 
                              type="email" 
                              className="pl-10 h-12 bg-white/[0.03] border-white/10 focus:border-blue-500/50 focus:bg-white/[0.05] transition-all rounded-2xl" 
                              {...field} 
                              disabled={isSubmitting} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-[10px] ml-2" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="group relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <Input 
                              placeholder="Phone Number" 
                              type="tel" 
                              className="pl-10 h-12 bg-white/[0.03] border-white/10 focus:border-blue-500/50 focus:bg-white/[0.05] transition-all rounded-2xl" 
                              {...field} 
                              disabled={isSubmitting} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-[10px] ml-2" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="group relative">
                            <MessageSquare className="absolute left-3.5 top-4 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                            <Textarea 
                              placeholder="How can we help?" 
                              className="pl-10 min-h-[120px] bg-white/[0.03] border-white/10 focus:border-blue-500/50 focus:bg-white/[0.05] transition-all rounded-2xl resize-none py-3" 
                              {...field} 
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-[10px] ml-2" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white h-13 text-lg font-bold mt-4 transition-all rounded-2xl shadow-lg active:scale-[0.98]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
