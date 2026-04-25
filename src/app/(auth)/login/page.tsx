"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DentaFlowLogo from "@/components/dental/DentaFlowLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate auth check
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#13151f] p-4">
      <Card className="w-full max-w-md border-white/10 bg-[#0f1117] shadow-2xl">
        <CardHeader className="space-y-4 items-center text-center">
          <div className="h-12 w-auto">
            <DentaFlowLogo variant="icon" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl tracking-tight text-white">DentaFlow'a Giriş Yap</CardTitle>
            <CardDescription className="text-slate-400">
              Klinik yönetim sistemine erişmek için bilgilerinizi girin.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">E-posta Adresi</Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@klinik.com"
                className="bg-[#08090d] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-brand-500"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-[13px] text-red-400">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">Şifre</Label>
                <a href="#" className="text-[13px] text-brand-400 hover:text-brand-300 hover:underline">
                  Şifremi unuttum
                </a>
              </div>
              <Input
                id="password"
                type="password"
                className="bg-[#08090d] border-white/10 text-white focus-visible:ring-brand-500"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-[13px] text-red-400">{errors.password.message}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-500 hover:bg-brand-600 text-white border-0"
              disabled={isLoading}
            >
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
