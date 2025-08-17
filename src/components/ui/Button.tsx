import React from "react";
import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  h?: number | string;
  px?: number | string;
  py?: number | string;
};

const toUnit = (v: number | string | undefined, fallback: string) =>
  v === undefined ? fallback : typeof v === "number" ? `${v}px` : v;

const baseStyles = css<{ $full?: boolean; $h?: number | string; $px?: number | string; $py?: number | string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;

  /* 🔽 Somente height e padding são dinâmicos */
  height: ${({ $h }) => toUnit($h, "40px")};
  padding: ${({ $py, $px }) => `${toUnit($py, "0")} ${toUnit($px, "16px")}`};

  font-size: 16px;
  line-height: 24px;
  font-weight: 600;

  border-radius: 9999px;
  cursor: pointer;
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    color 120ms ease,
    box-shadow 120ms ease,
    opacity 120ms ease;

  width: ${({ $full }) => ($full ? "100%" : "auto")};
  user-select: none;
  white-space: nowrap;
  outline: none;
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const primaryStyles = css`
  background: var(--secondary-medium);
  color: var(--neutral-lightest, #fff);

  &:hover:not(:disabled) {
    background: var(--secondary-dark);
  }
`;

const secondaryStyles = css`
  background: transparent;
  color: var(--secondary-medium);
  border: 1px solid var(--secondary-medium);

  &:hover:not(:disabled) {
    color: var(--secondary-dark);
    border-color: var(--secondary-dark);
  }
`;

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $full?: boolean;
  $h?: number | string;
  $px?: number | string;
  $py?: number | string;
}>`
  ${baseStyles}
  ${({ $variant }) => ($variant === "primary" ? primaryStyles : secondaryStyles)}

  .btn-right {
    display: inline-flex;
    transition: transform 160ms ease;
  }
  &[aria-expanded="true"] .btn-right {
    transform: rotate(180deg);
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", iconLeft, iconRight, fullWidth, className, children, h, px, py, ...rest },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $full={!!fullWidth}
        $h={h}
        $px={px}
        $py={py}
        className={className}
        {...rest}
      >
        {iconLeft ? <span className="btn-left" aria-hidden>{iconLeft}</span> : null}
        <span className="btn-label">{children}</span>
        {iconRight ? <span className="btn-right" aria-hidden>{iconRight}</span> : null}
      </StyledButton>
    );
  }
);
Button.displayName = "Button";