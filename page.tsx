'use client';
import { Turnstile } from '@marsidev/react-turnstile';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();

  const handleSuccess = () => {
    sessionStorage.setItem('pgv_ad_verified', 'true');
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl space-y-4">
        <h2 className="text-xl font-bold text-white">🔒 Ad-Wall Verification</h2>
        <p className="text-gray-400 text-sm">
          Please complete the security check below to unlock your script portal access.
        </p>
        
        <div className="flex justify-center pt-4">
          <Turnstile
            siteKey="1x00000000000000000000AA"
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}