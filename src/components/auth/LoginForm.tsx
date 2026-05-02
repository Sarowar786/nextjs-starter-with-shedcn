"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, LockKeyhole, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FieldGroup, FieldSet, FieldSeparator } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { FormInput } from "../form/FormInput";
import { Separator } from "../ui/separator";
import { loginSchema } from "@/validation/auth.validation";

import Link from "next/link";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect");

  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await loginUser(data).unwrap();

      dispatch(setUser({ user: res?.data }));

      toast.success("Login successful 🎉");
      router.replace(redirect || "/");
    } catch (error: any) {
      const apiError = error?.data;

      if (apiError?.error) {
        Object.values(apiError.error).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(msg));
          }
        });
        return;
      }

      // ✅ fallback
      toast.error(apiError?.message || "Login failed ❌");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FieldSet>
          <FieldGroup>
            {/* Email */}
            <FormInput
              name="identifier"
              label="Email"
              type="email"
              placeholder="you@example.com"
              startIcon={{ icon: Mail }}
            />

            {/* Password */}
            <FormInput
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              startIcon={{ icon: LockKeyhole }}
              endIcon={{
                icon: showPassword ? EyeOff : Eye,
                onClick: () => setShowPassword((prev) => !prev),
              }}
            />
          </FieldGroup>

          <FieldSeparator />
        </FieldSet>

        {/* Forgot password */}
        <div className="flex justify-end -mt-2">
          <Link
            href="/forgot-password"
            className="text-sm text-[#d4537e] hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full h-12" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"} <ArrowRight />
        </Button>

        {/* Divider */}
        {/* <div className="flex items-center gap-3 my-2">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Or Continue with
          </span>
          <Separator className="flex-1" />
        </div> */}

        {/* Google */}
        {/* <Button type="button" variant="outline" className="w-full h-12">
          <svg width="18" height="18" viewBox="0 0 21 21">
            <rect width="10" height="10" fill="#f25022" />
            <rect x="11" width="10" height="10" fill="#7fba00" />
            <rect y="11" width="10" height="10" fill="#00a4ef" />
            <rect x="11" y="11" width="10" height="10" fill="#ffb900" />
          </svg>
          Sign in with Google
        </Button> */}

        {/* Signup */}
        <p className="text-center text-sm text-muted-foreground pt-1">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-[#d4537e] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
