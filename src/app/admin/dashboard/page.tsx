import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { logoutAdmin } from '@/app/actions';

export default function AdminDashboard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Selamat Datang, Admin!</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <p className="text-muted-foreground text-center">
          Anda telah berhasil masuk ke dasbor admin.
        </p>
        <form action={logoutAdmin}>
          <Button type="submit" variant="destructive">
            Logout
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}