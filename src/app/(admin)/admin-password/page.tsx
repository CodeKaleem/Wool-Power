/**
 * This legacy route is replaced by the secure JWT-based auth at /auth.
 * We simply redirect to avoid exposing an insecure bypass.
 */
import { redirect } from 'next/navigation';

export default function AdminPasswordPage() {
  redirect('/auth');
}
