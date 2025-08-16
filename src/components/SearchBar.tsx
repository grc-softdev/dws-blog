import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearchTerm } from "../store/filtersSlice";

/** hook simples p/ detectar mobile (<= 767px) */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return isMobile;
}

const SearchContainer = styled.div<{ $open?: boolean }>`
  display: flex;
  align-items: center;
  background-color: #f5f5f7;
  border-radius: 50px;
  padding: 8px 12px;
  width: 500px;
  border: 1px solid #e0e0e0;
  margin-bottom: 4px;
  transition: border-color 160ms ease, background-color 160ms ease, padding 160ms ease;

  &:hover {
    border-color: var(--cyan-medium);
  }

  /* ---- Mobile: mostrar só o botão; quando $open=true, vira um chip com input abrindo à esquerda ---- */
  @media (max-width: 639px) {
    /* layout compacto; o input expandirá à esquerda do botão */
    width: auto;
    gap: 8px;
    overflow: hidden; /* evita “vazar” durante a animação */

    ${({ $open }) =>
      $open
        ? `
      background-color: #f5f5f7;
      border: 1px solid #e0e0e0;
      padding: 8px 12px;
    `
        : `
      /* fechado: só o botão aparece */
      background: transparent;
      border-color: transparent;
      padding: 0;
    `}
  }
`;

const SearchInput = styled.input<{ $open?: boolean }>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #333;
  min-width: 0;

  &::placeholder {
    color: #777;
  }

  /* Mobile: animar largura p/ abrir à esquerda */
  @media (max-width: 639px) {
    /* tira o flex para controlar width manualmente */
    flex: 0 0 auto;
    width: ${({ $open }) => ($open ? "180px" : "0px")};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: width 200ms ease, opacity 140ms ease;
  }
`;

const SearchButton = styled.button`
  background-color: #0b0b1a;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: white;
    font-size: 14px;
  }
`;

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.filters.searchTerm);
  const [localTerm, setLocalTerm] = useState(searchTerm);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);

  const debounced = useDebounce(localTerm, 500);

  useEffect(() => {
    dispatch(setSearchTerm(debounced));
  }, [debounced, dispatch]);

  // Fecha no blur quando vazio (mobile), e no ESC
  useEffect(() => {
    if (!isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // no mobile: se estiver fechado, primeiro abre; se já aberto, envia
    if (isMobile && !isOpen) {
      setIsOpen(true);
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    dispatch(setSearchTerm(localTerm));
  };

  const handleBlur = () => {
    // só colapsa no mobile se estiver vazio
    if (isMobile && !localTerm.trim()) {
      setIsOpen(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <SearchContainer $open={isMobile ? isOpen : true}>
        {/* ordem: input à esquerda, botão à direita.
            Quando fechado no mobile, o input tem width:0, então só o botão aparece */}
        <SearchInput
          ref={inputRef}
          $open={isMobile ? isOpen : true}
          type="text"
          placeholder="Search"
          value={localTerm}
          onChange={(e) => setLocalTerm(e.target.value)}
          onBlur={handleBlur}
        />
        <SearchButton type="submit" aria-label="Search">
          <FaSearch />
        </SearchButton>
      </SearchContainer>
    </form>
  );
}