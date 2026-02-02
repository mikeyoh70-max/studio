'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginAdmin, AuthState } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

const initialState: AuthState = {
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
          Mencoba Masuk...
        </>
      ) : (
        'Login'
      )}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAdmin, initialState);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background p-4">
       <div className="absolute top-8 text-center">
        <Link href="/" className="inline-flex items-center space-x-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline">Rekber Nusantara</span>
        </Link>
      </div>
      <Card className="w-full max-w-sm bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-center font-headline text-2xl">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Masukkan nomor admin untuk melanjutkan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Input
                name="phoneNumber"
                placeholder="Nomor WhatsApp Admin"
                required
                className="text-center text-lg"
                type="tel"
              />
            </div>
            <SubmitButton />
          </form>

          {state.status === 'ERROR' && (
            <div className="mt-6 animate-scale-in">
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="font-bold">Login Gagal</AlertTitle>
                <AlertDescription>
                  {state.message}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}