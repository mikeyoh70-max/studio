'use client';

import { useState, useEffect } from 'react';
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
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

const signUpSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid.' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter.' }),
});

const signInSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid.' }),
  password: z.string().min(1, { message: 'Password harus diisi.' }),
});

const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid.' }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;
type SignInFormValues = z.infer<typeof signInSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const getFriendlyErrorMessage = (error: any): string => {
  if (!error) return 'Terjadi kesalahan sistem.';
  
  // Jika error adalah string (pesan kustom)
  if (typeof error === 'string') return error;

  const code = error.code || error.message;

  switch (code) {
    case 'auth/email-already-in-use':
      return 'Email ini sudah terdaftar. Silakan masuk.';
    case 'auth/weak-password':
      return 'Password terlalu lemah (minimal 6 karakter).';
    case 'auth/invalid-email':
      return 'Format email salah atau tidak valid.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email atau password salah. Periksa kembali.';
    case 'auth/network-request-failed':
      return 'Koneksi internet bermasalah. Coba lagi.';
    case 'Firebase belum terkonfigurasi.':
      return 'ERROR: API Key Firebase belum dimasukkan di Settings Vercel.';
    case 'auth/popup-blocked':
      return 'Jendela login diblokir browser. Izinkan pop-up atau gunakan browser Chrome.';
    case 'auth/operation-not-allowed':
      return 'Metode login ini belum diaktifkan di Firebase Console.';
    default:
      return error.message || 'Gagal terhubung ke server. Pastikan kuota Firebase masih ada.';
  }
};

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetStatus, setResetStatus] = useState<{message: string; isError: boolean} | null>(null);
  const { signUp, signIn, signInWithGoogle, sendPasswordReset, user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !authLoading) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Diagnostik: Cek apakah env vars ada
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setError("PENTING: Kamu belum memasukkan Environment Variables di Vercel. Login tidak akan berfungsi.");
    }
  }, []);

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

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: errorsReset },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleSignUp: SubmitHandler<SignUpFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await signUp(data.email, data.password);
    } catch (e: any) {
      setError(getFriendlyErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn: SubmitHandler<SignInFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn(data.email, data.password);
    } catch (e: any) {
      setError(getFriendlyErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (e: any) {
      setError(getFriendlyErrorMessage(e));
      setIsLoading(false);
    }
  };

  const handlePasswordReset: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    setIsLoading(true);
    setResetStatus(null);
    try {
      await sendPasswordReset(data.email);
      setResetStatus({ message: 'Link reset password terkirim!', isError: false });
    } catch (e: any) {
      setResetStatus({ message: getFriendlyErrorMessage(e), isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">Rekber Nusantara</span>
          </Link>
          <p className="text-muted-foreground mt-2">
            Masuk untuk memulai transaksi aman.
          </p>
        </div>

        {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Gagal Akses</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'signin' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Masuk</TabsTrigger>
            <TabsTrigger value="signup">Daftar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Selamat Datang</CardTitle>
                <CardDescription>Gunakan akun Google untuk proses lebih cepat.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full h-12 text-base" onClick={handleGoogleSignIn} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 400.2 0 261.8S111.8 11.6 244 11.6c67.8 0 125.6 27.2 169.1 69.1l-64.3 62.4C319.3 118.5 284.2 99.8 244 99.8c-76.3 0-138.6 62.2-138.6 138.6s62.2 138.6 138.6 138.6c86.9 0 117.8-63.4 122.9-96.8H244v-75.9h244.1c2.6 13 4.1 26.6 4.1 40.8z"></path></svg>}
                  Lanjut dengan Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Atau dengan Email</span>
                  </div>
                </div>

                <form onSubmit={handleSubmitSignIn(handleSignIn)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signin">Email</Label>
                    <Input id="email-signin" type="email" placeholder="email@contoh.com" {...registerSignIn('email')} />
                    {errorsSignIn.email && <p className="text-sm text-destructive">{errorsSignIn.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password-signin">Password</Label>
                         <Dialog>
                            <DialogTrigger asChild>
                               <button type="button" className="text-xs text-muted-foreground hover:text-primary">Lupa Password?</button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                <DialogTitle>Reset Password</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmitReset(handlePasswordReset)} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email-reset">Email</Label>
                                        <Input id="email-reset" type="email" placeholder="email@contoh.com" {...registerReset('email')} />
                                        {errorsReset.email && <p className="text-sm text-destructive">{errorsReset.email.message}</p>}
                                    </div>
                                    {resetStatus && (
                                        <Alert variant={resetStatus.isError ? 'destructive' : 'success'}>
                                            <AlertDescription>{resetStatus.message}</AlertDescription>
                                        </Alert>
                                    )}
                                    <DialogFooter>
                                         <Button type="submit" disabled={isLoading}>
                                            {isLoading ? <Loader2 className="animate-spin" /> : 'Kirim Link'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Input id="password-signin" type="password" {...registerSignIn('password')} />
                    {errorsSignIn.password && <p className="text-sm text-destructive">{errorsSignIn.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Masuk'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Akun</CardTitle>
                <CardDescription>Isi detail di bawah untuk membuat akun Anda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full h-12 text-base" onClick={handleGoogleSignIn} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 400.2 0 261.8S111.8 11.6 244 11.6c67.8 0 125.6 27.2 169.1 69.1l-64.3 62.4C319.3 118.5 284.2 99.8 244 99.8c-76.3 0-138.6 62.2-138.6 138.6s62.2 138.6 138.6 138.6c86.9 0 117.8-63.4 122.9-96.8H244v-75.9h244.1c2.6 13 4.1 26.6 4.1 40.8z"></path></svg>}
                  Daftar dengan Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Atau dengan Email</span>
                  </div>
                </div>

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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
