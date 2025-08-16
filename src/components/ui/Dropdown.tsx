import React, { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { FiChevronDown } from "react-icons/fi";

type DropdownProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right";
};

type WithOnCloseDropdown = { onCloseDropdown?: () => void };

const Wrap = styled.div`
  position: relative;
  display: inline-block;
`;

const Panel = styled.div<{ $align: "left" | "right" }>`
  position: absolute;
  top: calc(100% + 8px);
  ${({ $align }) => ($align === "right" ? "right: 0;" : "left: 0;")}
  z-index: 50;
  min-width: 240px;
  max-width: 92vw;
  max-height: 60vh;
  overflow: auto;
  padding: 8px;
  background: #fff;
  border: 1px solid var(--neutral-extra-light, #e0e2e6);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;

export function Dropdown({ label, children, className, align = "left" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <Wrap ref={ref} className={className}>
      <Button
        variant="secondary"
        px="16px"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        iconRight={<FiChevronDown size={16} />}   // ⬅️ aqui
      >
        {label}
      </Button>

      {open && (
        <Panel id={id} role="menu" aria-modal={false} $align={align}>
          {React.isValidElement<WithOnCloseDropdown>(children)
            ? React.cloneElement(children, { onCloseDropdown: () => setOpen(false) })
            : children}
        </Panel>
      )}
    </Wrap>
  );
}