import React, { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { EyeOff, Eye} from 'lucide-react';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const router = useRouter();

  if(!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
        return;
    }

    try {
        await signUp.create({
            emailAddress,
            password
        });

        await signUp.prepareEmailAddressVerification({
            strategy: "email_code"
        });
        setPendingVerification(true)
    } catch (error: any) {
        console.log(JSON.stringify(error, null, 2));
        setError(error.errors[0].message)
    }
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
        return
    }

    try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({code})

        if (completeSignUp.status !== "complete") {
            console.log(JSON.stringify(completeSignUp, null, 2));
        }

        if (completeSignUp.status === "complete") {
            await setActive({ session: completeSignUp.createdSessionId})
            router.push("/dashboard");
        }
    } catch (err: any) {
        console.log(JSON.stringify(err, null, 2));
        setError(err.errors[0].message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Sign Up for Git Master
                </CardTitle>
            </CardHeader>
            <CardContent>
                
            </CardContent>
        </Card>
    </div>
  )
}

export default SignUp