'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, AuthError } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const signUpSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid.' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter.' }),
});

const signInSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid.' }),
  password: z.string().min(1, { message: 'Password harus diisi.' }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;
type SignInFormValues = z.infer<typeof signInSchema>;

const getFriendlyErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.';
    case 'auth/weak-password':
      return 'Password terlalu lemah. Gunakan minimal 6 karakter.';
    case 'auth/invalid-email':
      return 'Format email tidak valid. Mohon periksa kembali.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email atau password salah. Silakan coba lagi.';
    case 'auth/network-request-failed':
        return 'Koneksi internet bermasalah. Silakan coba lagi.';
    default:
      return 'Terjadi kesalahan yang tidak diketahui. Silakan coba beberapa saat lagi.';
  }
};


export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const handleSignUp: SubmitHandler<SignUpFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await signUp(data.email, data.password);
      router.push('/');
    } catch (e) {
      const authError = e as AuthError;
      setError(getFriendlyErrorMessage(authError.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn: SubmitHandler<SignInFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn(data.email, data.password);
      router.push('/');
    } catch (e) {
      const authError = e as AuthError;
      setError(getFriendlyErrorMessage(authError.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (e) {
      const authError = e as AuthError;
      setError(getFriendlyErrorMessage(authError.code));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">Rekber Nusantara</span>
          </Link>
          <p className="text-muted-foreground mt-2">
            Masuk atau buat akun untuk melanjutkan.
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Masuk</TabsTrigger>
            <TabsTrigger value="signup">Daftar</TabsTrigger>
          </TabsList>
          
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Selamat Datang Kembali</CardTitle>
                <CardDescription>Masukkan detail akun Anda untuk masuk.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmitSignIn(handleSignIn)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signin">Email</Label>
                    <Input id="email-signin" type="email" placeholder="email@contoh.com" {...registerSignIn('email')} />
                    {errorsSignIn.email && <p className="text-sm text-destructive">{errorsSignIn.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signin">Password</Label>
                    <Input id="password-signin" type="password" {...registerSignIn('password')} />
                    {errorsSignIn.password && <p className="text-sm text-destructive">{errorsSignIn.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Masuk'}
                  </Button>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Atau lanjut dengan</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 400.2 0 261.8S111.8 11.6 244 11.6c67.8 0 125.6 27.2 169.1 69.1l-64.3 62.4C319.3 118.5 284.2 99.8 244 99.8c-76.3 0-138.6 62.2-138.6 138.6s62.2 138.6 138.6 138.6c86.9 0 117.8-63.4 122.9-96.8H244v-75.9h244.1c2.6 13 4.1 26.6 4.1 40.8z"></path></svg>}
                  Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Buat Akun Baru</CardTitle>
                <CardDescription>Isi detail di bawah untuk membuat akun Anda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmitSignUp(handleSignUp)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" type="email" placeholder="email@contoh.com" {...registerSignUp('email')} />
                     {errorsSignUp.email && <p className="text-sm text-destructive">{errorsSignUp.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input id="password-signup" type="password" {...registerSignUp('password')} />
                     {errorsSignUp.password && <p className="text-sm text-destructive">{errorsSignUp.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Buat Akun'}
                  </Button>
                </form>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Atau lanjut dengan</span>
                  </div>
                </div>
                 <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 400.2 0 261.8S111.8 11.6 244 11.6c67.8 0 125.6 27.2 169.1 69.1l-64.3 62.4C319.3 118.5 284.2 99.8 244 99.8c-76.3 0-138.6 62.2-138.6 138.6s62.2 138.6 138.6 138.6c86.9 0 117.8-63.4 122.9-96.8H244v-75.9h244.1c2.6 13 4.1 26.6 4.1 40.8z"></path></svg>}
                  Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
