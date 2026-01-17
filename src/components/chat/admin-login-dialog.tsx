'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { verifyAdmin, type VerifyAdminState } from '@/app/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const initialState: VerifyAdminState = {
  status: 'UNSET',
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Verifikasi
    </Button>
  );
}

export function AdminLoginDialog({ open, onOpenChange, onVerificationSuccess }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerificationSuccess: () => void;
}) {
  const [state, formAction] = useFormState(verifyAdmin, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'VERIFIED') {
      toast({
        title: 'Verifikasi Berhasil!',
        description: 'Anda sekarang masuk sebagai Admin Resmi.',
      });
      onVerificationSuccess();
      onOpenChange(false);
    } else if (state.status === 'UNVERIFIED' || state.status === 'ERROR') {
      toast({
        variant: 'destructive',
        title: 'Verifikasi Gagal',
        description: state.message,
      });
    }
  }, [state, toast, onVerificationSuccess, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login Sebagai Admin</DialogTitle>
          <DialogDescription>
            Masukkan nomor WhatsApp admin yang terverifikasi untuk mendapatkan akses admin di chat ini.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Contoh: 081234567890"
            required
            autoComplete="tel"
          />
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
