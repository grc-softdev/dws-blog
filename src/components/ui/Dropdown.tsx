import React, { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { FiChevronDown, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { usePosts } from "../../hooks/usePosts";
import { setAuthors, setCategories } from "../../store/filtersSlice";

type DropdownProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right";
  isMobile: boolean
};

type PoolItem = {
  id: string;
  name?: string;
  title?: string;
};


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

export function Dropdown({
  label,
  children,
  className,
  align = "left",
  isMobile,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { data } = usePosts();

  const { selectedCategories, selectedAuthors } = useAppSelector(
    (s) => s.filters
  );

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isAuthorDropdown = label === "Author";

  const selectedIds = isAuthorDropdown ? selectedAuthors : selectedCategories;

  const shouldShowLabels = isMobile && selectedIds.length > 0;

  const renderSelectedLabels = () => {
    if (!data || !data.length || !selectedIds.length) return "";


    
    const pool: PoolItem[] = [];

    if (isAuthorDropdown) {
      for (let i = 0; i < data.length; i++) {
        const a = data[i].author;
        if (a && a.id && !pool.some((x) => x.id === a.id)) pool.push(a);
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const cats = data[i].categories || [];
        for (let j = 0; j < cats.length; j++) {
          const c = cats[j];
          if (c && c.id && !pool.some((x) => x.id === c.id)) pool.push(c);
        }
      }
    }

    const titles: string[] = [];
    for (let i = 0; i < selectedIds.length; i++) {
      const id = selectedIds[i];
      const item = pool.find((x) => x.id === id);

      if (item) {
        const label = item.name ?? item.title;
        if (label) titles.push(label);
      }
    }

    if (titles.length <= 2) return titles.join(", ");
    return titles.slice(0, 2).join(", ") + ", ...";
  };

  return (
    <Wrap ref={ref} className={className}>
      <Button
        variant="secondary"
        px="16px"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        iconRight={
          isMobile && selectedIds.length > 0 ? (
            <FiX
              size={16}
              onClick={() => {
                const set = isAuthorDropdown ? setAuthors : setCategories
                dispatch(set([]))
              }}
            />
          ) : (
            <FiChevronDown size={16} />
          )
        }
      >
        {shouldShowLabels ? renderSelectedLabels() : label}
      </Button>

      {open && (
        <Panel id={id} role="menu" aria-modal={false} $align={align}>
          {React.isValidElement(children)
            ? React.cloneElement(children)
            : children}
        </Panel>
      )}
    </Wrap>
  );
}
