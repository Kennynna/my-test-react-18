import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  AuthLogoIcon,
  CloseIcon,
  PersonIcon,
} from "../assets/icons/auth-icons.tsx";
import { Text } from "../ui/Text.tsx";
import { Button } from "../ui/Button.tsx";
import { useLoginMutation } from "../entities/user/api/queries.ts";
import { useAuthStore } from "../entities/user/model/store.ts";
import {
  validateLoginForm,
  type LoginFormErrors,
} from "../entities/user/model/validation.ts";
import { resolveAuthError } from "../shared/lib/errors.ts";

export const Auth = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [fieldErrors, setFieldErrors] = useState<LoginFormErrors>({});
  const navigate = useNavigate();
  const { mutate: login, isPending, error: apiError } = useLoginMutation();
  const { rememberMe, setRememberMe } = useAuthStore();

  function clearUsername() {
    if (usernameRef.current) usernameRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPending) return;

    const username = usernameRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";

    const errors = validateLoginForm({ username, password });
    setFieldErrors(errors ?? {});
    if (errors) return;

    login({ username, password }, { onSuccess: () => navigate("/") });
  }

  return (
    <div className="container container--auth">
      <div className="auth-layer">
        <div className="container__auth">
          <div className="auth-logo-wrap">
            <AuthLogoIcon />
          </div>

          <Text className="auth-title" align="center">
            Добро пожаловать!
          </Text>
          <p className="auth-subtitle">Пожалуйста, авторизируйтесь</p>

          {apiError && (
            <p className="auth-error">{resolveAuthError(apiError)}</p>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="username">
                <Text className="form-block__label">Логин</Text>
              </label>
              <div className={`input-block input-block--auth${fieldErrors.username ? " input-block--error" : ""}`}>
                <PersonIcon size={24} />
                <input
                  ref={usernameRef}
                  type="text"
                  placeholder="Username"
                  maxLength={22}
                  name="username"
                  id="username"
                />
                <CloseIcon size={20} onClick={clearUsername} />
              </div>
              {fieldErrors.username && (
                <p className="field-error">{fieldErrors.username}</p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="password">
                <Text className="form-block__label">Пароль</Text>
              </label>
              <div className={`input-block input-block--auth${fieldErrors.password ? " input-block--error" : ""}`}>
                <PersonIcon size={24} />
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                  maxLength={22}
                  name="password"
                  id="password"
                />
              </div>
              {fieldErrors.password && (
                <p className="field-error">{fieldErrors.password}</p>
              )}
            </div>

            <div className="remember-block remember-block--auth">
              <input
                id="remember"
                type="checkbox"
                className="remember-block__input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="remember-block__label">
                Запомнить данные
              </label>
            </div>

            <div>
              <Button
                type="submit"
                fullWidth
                style={{ backgroundColor: "#242EDB" }}
                size="lg"
                loading={isPending}
              >
                Войти
              </Button>
            </div>
          </form>

          <div className="divider">
            <span className="divider__line" />
            <span className="divider__text">или</span>
            <span className="divider__line" />
          </div>

          <p className="auth-footer">
            Нет аккаунта?{" "}
            <a
              href="#"
              className="auth-footer__link"
              onClick={(e) => e.preventDefault()}
            >
              Создать
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
