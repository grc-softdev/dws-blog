import React from "react";
import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  iconLeft?: React.ReactNode;
  fullWidth?: boolean;
};

const baseStyles = css<{ $full?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  /* Body/Large/600 approximation */
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;

  border-radius: 9999px; /* pill */
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease,
    box-shadow 120ms ease, opacity 120ms ease;

  width: ${({ $full }) => ($full ? "100%" : "auto")};
  user-select: none;
  outline: none;
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const primaryStyles = css`
  background: var(--pink-medium);
  color: #fff;

  &:hover:not(:disabled) {
    background: var(--pink-dark);
  }
`;

const secondaryStyles = css`
  background: transparent;
  color: var(--pink-medium);
  border: 1px solid var(--pink-medium);

  &:hover:not(:disabled) {
    color: var(--pink-dark);
    border-color: var(--pink-dark);
  }
`;

const StyledButton = styled.button<{ $variant: ButtonVariant; $full?: boolean }>`
  ${baseStyles}
  ${({ $variant }) => ($variant === "primary" ? primaryStyles : secondaryStyles)}
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", iconLeft, fullWidth, className, children, ...rest }, ref) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $full={!!fullWidth}
        className={className}
        {...rest}
      >
        {iconLeft ? <span aria-hidden>{iconLeft}</span> : null}
        <span>{children}</span>
      </StyledButton>
    );
  }
);
Button.displayName = "Button";