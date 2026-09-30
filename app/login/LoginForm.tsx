'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n/client'
import { createClient } from '@/lib/supabase/client'

type Step = 'email' | 'code'

export default function LoginForm() {
    const { messages } = useI18n()
    const t = messages.auth
    const router = useRouter()

    const [step, setStep] = useState<Step>('email')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    // ---------- Google OAuth ----------
    async function handleGoogle() {
        setLoading(true)
        setError('')
        const supabase = createClient()
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        if (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    // ---------- 发送验证码 ----------
    async function handleSendCode(e: React.FormEvent) {
        e.preventDefault()
        if (!email) return

        setLoading(true)
        setError('')
        setMessage('')

        const supabase = createClient()
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true,  // 如果用户不存在，自动注册
                // 不要 emailRedirectTo，因为我们用 OTP 码验证
            },
        })

        if (error) {
            setError(error.message)
        } else {
            setStep('code')
            setMessage(t.codeSentTo.replace('{email}', email))
        }
        setLoading(false)
    }

    // ---------- 校验验证码 ----------
    async function handleVerifyCode(e: React.FormEvent) {
        e.preventDefault()
        if (!code) return

        setLoading(true)
        setError('')

        const supabase = createClient()
        const { error } = await supabase.auth.verifyOtp({
            email,
            token: code,
            type: 'email',
        })

        if (error) {
            setError(error.message)
        } else {
            // 登录成功，跳回首页
            router.push('/')
            router.refresh()
        }
        setLoading(false)
    }

    // ---------- 返回重填邮箱 ----------
    function backToEmail() {
        setStep('email')
        setCode('')
        setMessage('')
        setError('')
    }

    // ---------- UI ----------
    return (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#14141a] p-8">
            <h1 className="mb-2 text-center text-3xl font-bold text-white">
                {t.welcomeBack}
            </h1>
            <p className="mb-8 text-center text-sm text-white/50">
                {t.welcomeDesc}
            </p>

            {/* Google 按钮 - 只在第一步显示 */}
            {step === 'email' && (
                <>
                    <button
                        type="button"
                        onClick={handleGoogle}
                        disabled={loading}
                        className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#1c1c24] py-3 text-white hover:bg-[#23232d] disabled:opacity-50"
                    >
                        {t.loginWithGoogle}
                    </button>

                    <div className="my-6 flex items-center gap-3 text-xs text-white/30">
                        <div className="h-px flex-1 bg-white/10" />
                        <span>{t.or}</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>
                </>
            )}

            {/* 第 1 步：输入邮箱 */}
            {step === 'email' && (
                <form onSubmit={handleSendCode} className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-white/70">
                            {t.email}
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.emailPlaceholder}
                            required
                            disabled={loading}
                            className="w-full rounded-xl border border-white/10 bg-[#1c1c24] px-4 py-3 text-white placeholder-white/30 outline-none focus:border-purple-500 disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !email}
                        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 font-semibold text-white shadow-lg shadow-purple-600/30 hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? t.sending : t.sendCode}
                    </button>
                </form>
            )}

            {/* 第 2 步：输入验证码 */}
            {step === 'code' && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-white/70">
                            {t.code}
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                            placeholder={t.codePlaceholder}
                            required
                            disabled={loading}
                            className="w-full rounded-xl border border-white/10 bg-[#1c1c24] px-4 py-3 text-center text-2xl tracking-widest text-white placeholder-white/30 outline-none focus:border-purple-500 disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || code.length < 6}
                        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 font-semibold text-white shadow-lg shadow-purple-600/30 hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? t.verifying : t.completeLogin}
                    </button>

                    <button
                        type="button"
                        onClick={backToEmail}
                        disabled={loading}
                        className="w-full text-center text-sm text-white/50 hover:text-white/70 disabled:opacity-50"
                    >
                        {t.backToEmail}
                    </button>
                </form>
            )}

            {/* 提示 / 报错 */}
            {message && (
                <p className="mt-4 text-center text-sm text-green-400">{message}</p>
            )}
            {error && (
                <p className="mt-4 text-center text-sm text-red-400">{error}</p>
            )}
        </div>
    )
}