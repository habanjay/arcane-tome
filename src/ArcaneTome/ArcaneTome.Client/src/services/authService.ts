export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  monthlySavingsRate: number;
};

export interface AuthService {
  signIn(credentials: LoginCredentials): Promise<AuthUser>;
  signOut(): void;
}

type MockUser = AuthUser & { password: string };

type ApiAuthServiceOptions = {
  baseUrl: string;
};

async function readResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error('Unable to sign in.');
  }

  return response.json() as Promise<T>;
}

const mockAuthService: AuthService = {
  async signIn(credentials) {
    const response = await fetch('/mockuser.json');
    const user = await readResponse<MockUser>(response);

    if (user.email.toLowerCase() !== credentials.email.trim().toLowerCase() || user.password !== credentials.password) {
      throw new Error('Invalid email or password.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      monthlySavingsRate: user.monthlySavingsRate,
    };
  },
  signOut() {
    window.sessionStorage.removeItem('arcane.auth.user');
  },
};

export function createApiAuthService({ baseUrl }: ApiAuthServiceOptions): AuthService {
  return {
    async signIn(credentials) {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      return readResponse<AuthUser>(response);
    },
    signOut() {
      window.sessionStorage.removeItem('arcane.auth.user');
    },
  };
}

const apiBaseUrl = import.meta.env.VITE_AUTH_API_URL as string | undefined;

export const authService: AuthService = apiBaseUrl
  ? createApiAuthService({ baseUrl: apiBaseUrl })
  : mockAuthService;
