'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);


  const handleAuthAction = async (action: 'signIn' | 'signUp', e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!auth) {
      setError('Authentication service is currently unavailable. Please contact support.');
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
      if (action === 'signUp') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: name });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/');
    } catch (err: any) {
      let friendlyMessage = 'Terjadi kesalahan. Silakan coba lagi.';
      switch (err.code) {
        case 'auth/email-already-in-use':
          friendlyMessage = 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.';
          break;
        case 'auth/invalid-email':
          friendlyMessage = 'Format email tidak valid. Mohon periksa kembali.';
          break;
        case 'auth/weak-password':
          friendlyMessage = 'Password terlalu lemah. Gunakan minimal 6 karakter.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          friendlyMessage = 'Email atau password salah. Mohon periksa kembali.';
          break;
        default:
          friendlyMessage = err.message || 'Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.';
          break;
      }
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage(null);
    
    if (!auth) {
      setResetMessage({ type: 'error', text: 'Authentication service is unavailable.' });
      setResetLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage({ type: 'success', text: 'Password reset link has been sent to your email!' });
    } catch (err: any) {
      let friendlyMessage = 'Failed to send reset link. Please check the email address.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
        friendlyMessage = 'No user found with this email address.';
      }
      setResetMessage({ type: 'error', text: friendlyMessage });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background p-4 relative">
       <div className="absolute top-8 text-center">
        <Link href="/" className="inline-flex items-center space-x-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline">Rekber Nusantara</span>
        </Link>
      </div>
      <div className="w-full max-w-sm">
        <Tabs defaultValue="sign-in">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sign-in">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to your account to continue.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleAuthAction('signIn', e)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-signin">Email</Label>
                    <Input id="email-signin" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password-signin">Password</Label>
                        <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto font-normal text-xs text-muted-foreground hover:underline"
                          onClick={() => {
                            setResetDialogOpen(true);
                            setResetMessage(null);
                            setResetEmail('');
                          }}
                        >
                          Forgot Password?
                        </Button>
                    </div>
                    <Input id="password-signin" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sign-up">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Enter your details to create a new account.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleAuthAction('signUp', e)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-signup">Name</Label>
                    <Input id="name-signup" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input id="email-signup" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input id="password-signup" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {error && (
            <div className="mt-4 animate-scale-in">
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Authentication Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
      </div>

       <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Forgot Password</DialogTitle>
            <DialogDescription>
              No problem. Enter your email and we'll send you a link to reset it.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordReset} className="pt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={resetLoading}>
              {resetLoading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
            </Button>
          </form>
          {resetMessage && (
            <div className="mt-4">
              <Alert variant={resetMessage.type === 'error' ? 'destructive' : 'success'}>
                {resetMessage.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                <AlertTitle>{resetMessage.type === 'success' ? 'Link Sent!' : 'Error'}</AlertTitle>
                <AlertDescription>{resetMessage.text}</AlertDescription>
              </Alert>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
