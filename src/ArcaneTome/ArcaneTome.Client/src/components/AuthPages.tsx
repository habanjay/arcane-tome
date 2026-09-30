import { useState, type FormEvent } from 'react';
import '../styles/auth.css';
import { authService } from '../services/authService';

type AuthPageProps = { mode: 'login' | 'create'; onNavigate: (path: '/login' | '/create-account' | '/expenses') => void; onToast: (message: string) => void };

function LoginPage({ onNavigate, onToast }: Omit<AuthPageProps, 'mode'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSigningIn(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    try {
      const user = await authService.signIn({
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
      });
      onNavigate('/expenses');
      onToast(`Sign-in successful. Welcome back, ${user.name}.`);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return <main className="login-page-shell">
    <section className="login-brand-panel" aria-label="Arc expense tracker introduction">
      <div className="login-brand"><span className="login-brand-mark">A</span><span>Arc</span></div>
      <div className="login-brand-copy"><p className="login-eyebrow">Your money, in focus</p><h1>Make every expense count.</h1><p>Track the everyday spending that matters, keep your plans visible, and build a calmer financial routine.</p></div>
      <div className="login-balance-note"><span>YOUR MONTHLY SNAPSHOT</span><strong>70.5% saved this month</strong></div>
    </section>
    <section className="login-form-panel" aria-labelledby="login-title">
      <form className="login-card" onSubmit={handleSubmit}>
        <header><h2 id="login-title">Welcome back</h2><p>Sign in to continue to your account.</p></header>
        <div className="login-form-field"><label htmlFor="login-email">EMAIL ADDRESS</label><input id="login-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></div>
        <div className="login-form-field"><label htmlFor="login-password">PASSWORD</label><div className="login-input-wrap"><input className="login-password-input" id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" minLength={6} required /><button className="login-toggle-password" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'HIDE' : 'SHOW'}</button></div></div>
        <div className="login-form-options"><label className="login-remember"><input type="checkbox" name="remember" />Remember me</label><button type="button" className="login-text-link" onClick={() => onToast('Password reset instructions are on the way.')}>Forgot password?</button></div>
        {errorMessage && <p className="login-error" role="alert">{errorMessage}</p>}
        <button className="login-submit" type="submit" disabled={isSigningIn}>{isSigningIn ? 'SIGNING IN...' : 'SIGN IN'}</button>
        <div className="login-divider"><span>OR CONTINUE WITH</span></div>
        <div className="login-social"><button type="button" onClick={() => onToast('Google sign-in selected.')}>Google</button><button type="button" onClick={() => onToast('Apple sign-in selected.')}>Apple</button></div>
        <p className="login-signup">New to Arc?<button type="button" className="login-text-link" onClick={() => onNavigate('/create-account')}>Create an account</button></p>
      </form>
    </section>
  </main>;
}

function CreateAccountPage({ onNavigate, onToast }: Omit<AuthPageProps, 'mode'>) {
  const [showPassword, setShowPassword] = useState(false);

  return <main className="auth-shell"><section className="auth-brand"><div className="auth-logo">A<span>✦</span>T</div><p className="eyebrow">THE ARCANE SUITE</p><h1>Make room<br />for magic.</h1><p>One quiet place to keep track of the gold, plans, and small rituals that make a life.</p><span className="auth-orbit">✧</span></section><section className="auth-form-wrap"><div className="auth-form"><p className="eyebrow">WELCOME TO ARC</p><h2>Begin your tome</h2><p className="auth-subtitle">A few details, then you are ready to begin.</p><form onSubmit={(event) => { event.preventDefault(); onNavigate('/expenses'); onToast('Your account has been created.'); }}><div className="auth-name-fields"><label>FIRST NAME<input required placeholder="Mira" /></label><label>LAST NAME<input required placeholder="Vale" /></label></div><label>EMAIL<input required type="email" placeholder="you@example.com" /></label><label>PASSWORD<div className="password-field"><input required type={showPassword ? 'text' : 'password'} placeholder="Enter your password" minLength={6} /><button type="button" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? 'Hide' : 'Show'}</button></div></label><label className="terms"><input required type="checkbox" /> I agree to the terms of the Arcane Tome.</label><button className="auth-submit" type="submit">CREATE ACCOUNT <span>↗</span></button></form><div className="auth-switch">Already have a tome? <button type="button" onClick={() => onNavigate('/login')}>Sign in</button></div></div></section></main>;
}

function AuthPages({ mode, onNavigate, onToast }: AuthPageProps) {
  return mode === 'login' ? <LoginPage onNavigate={onNavigate} onToast={onToast} /> : <CreateAccountPage onNavigate={onNavigate} onToast={onToast} />;
}

export default AuthPages;
