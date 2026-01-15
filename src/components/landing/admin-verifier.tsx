'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle, Search, Loader2 } from 'lucide-react';
import { verifyAdmin, type VerifyAdminState } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const initialState: VerifyAdminState = {
  status: 'UNSET',
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto" size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Memverifikasi...
        </>
      ) : (
        <>
          <Search className="mr-2 h-4 w-4" />
          Cek Sekarang
        </>
      )}
    </Button>
  );
}

function VerificationResult({ state }: { state: VerifyAdminState }) {
  if (state.status === 'UNSET') {
    return null;
  }

  const isVerified = state.status === 'VERIFIED';
  const isError = state.status === 'ERROR';

  return (
    <div className="mt-8 text-center animate-scale-in">
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4 rounded-lg p-6',
          isVerified && 'bg-green-100 dark:bg-green-900/30',
          !isVerified && !isError && 'bg-red-100 dark:bg-red-900/30',
          isError && 'bg-yellow-100 dark:bg-yellow-900/30'
        )}
      >
        {isVerified && <CheckCircle2 className="h-16 w-16 text-green-500" />}
        {!isVerified && !isError && <XCircle className="h-16 w-16 text-red-500" />}
        <p
          className={cn(
            'text-lg font-semibold',
            isVerified && 'text-green-800 dark:text-green-300',
            !isVerified && !isError && 'text-red-800 dark:text-red-300',
            isError && 'text-yellow-800 dark:text-yellow-300'
          )}
        >
          {isVerified ? `TERVERIFIKASI` : isError ? 'Input Tidak Valid' : 'TIDAK TERVERIFIKASI'}
        </p>
        <p
          className={cn(
            'text-sm',
            isVerified && 'text-green-700 dark:text-green-400',
            !isVerified && !isError && 'text-red-700 dark:text-red-400',
            isError && 'text-yellow-700 dark:text-yellow-400'
          )}
        >
          {state.message}
        </p>
        {state.number && (
          <p className="font-mono text-sm text-muted-foreground">{state.number}</p>
        )}
      </div>
    </div>
  );
}

export function AdminVerifier() {
  const [state, formAction] = useFormState(verifyAdmin, initialState);
  const [displayState, setDisplayState] = useState<VerifyAdminState>(initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!pending) {
      setDisplayState(state);
      if (state.status !== 'ERROR') {
         formRef.current?.reset();
      }
    }
  }, [state, pending]);

  return (
    <section id="cek-admin" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Cek Nomor WhatsApp Admin</CardTitle>
            <CardDescription className="mt-4 text-lg leading-8 text-muted-foreground">
              Pastikan Anda hanya bertransaksi dengan Admin resmi kami. Masukkan nomor WhatsApp untuk verifikasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="mt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  name="phoneNumber"
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  required
                  className="flex-grow text-lg p-6"
                />
                <SubmitButton />
              </div>
            </form>
            <VerificationResult state={displayState} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
