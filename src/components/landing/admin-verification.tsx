'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { verifyAdmin, VerifyAdminState } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

const initialState: VerifyAdminState = {
  status: 'UNSET',
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Memverifikasi...
        </>
      ) : (
        'Cek Nomor Admin'
      )}
    </Button>
  );
}

export function AdminVerification() {
  const [state, formAction] = useFormState(verifyAdmin, initialState);

  return (
    <section id="verify-admin" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
            Verifikasi Admin Resmi
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Hati-hati penipuan! Pastikan nomor yang Anda hubungi adalah admin resmi kami dengan memverifikasinya di bawah ini.
          </p>
        </div>
        <Card className="max-w-xl mx-auto mt-12 bg-background border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-center font-headline text-2xl">Cek Keaslian Nomor Admin</CardTitle>
            <CardDescription className="text-center">
              Masukkan nomor WhatsApp yang mengaku sebagai admin untuk diperiksa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <Input
                name="phoneNumber"
                placeholder="Contoh: 0895323091263"
                required
                className="text-center text-lg"
              />
              <SubmitButton />
            </form>

            {state.status !== 'UNSET' && (
              <div className="mt-6 animate-scale-in">
                {state.status === 'VERIFIED' && (
                  <Alert variant="success">
                    <CheckCircle className="h-5 w-5" />
                    <AlertTitle className="font-bold">Nomor Terverifikasi!</AlertTitle>
                    <AlertDescription>
                      {state.message}
                    </AlertDescription>
                  </Alert>
                )}
                {state.status === 'UNVERIFIED' && (
                   <Alert variant="destructive">
                    <XCircle className="h-5 w-5" />
                    <AlertTitle className="font-bold">BUKAN ADMIN RESMI!</AlertTitle>
                    <AlertDescription>
                       {state.message}
                    </AlertDescription>
                  </Alert>
                )}
                 {state.status === 'ERROR' && (
                   <Alert variant="destructive">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle className="font-bold">Input Tidak Valid</AlertTitle>
                    <AlertDescription>
                       {state.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
