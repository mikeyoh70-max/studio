'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthAction = async (action: 'signIn' | 'signUp', e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string; // For sign up

    try {
      if (action === 'signUp') {
        if (password.length < 6) {
            throw new Error("Password should be at least 6 characters");
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: name });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/'); // Redirect to home after login/signup
    } catch (err: any) {
      let friendlyMessage = 'An unknown error occurred. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        friendlyMessage = 'This email is already in use. Please sign in or use a different email.';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        friendlyMessage = 'Invalid email or password. Please check your credentials.';
      } else if (err.message) {
        friendlyMessage = err.message;
      }
      setError(friendlyMessage);
    } finally {
      setLoading(false);
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
      <Tabs defaultValue="sign-in" className="w-full max-w-sm">
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
                  <Label htmlFor="password-signin">Password</Label>
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
         {error && (
            <div className="mt-4 animate-scale-in">
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Authentication Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
      </Tabs>
    </div>
  );
}
