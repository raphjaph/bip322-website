import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { BaseButton } from "@/components/ui/base-button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"));
  }, []);

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  const modal = (
    <div className="fixed inset-0 z-[100] overflow-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className="relative z-[101] w-[95%] lg:w-[40vw] mx-auto px-4"
      >
        <Card className="bg-[hsl(240,10%,10%)] border-border/40 shadow-none w-full">
          {title && (
            <CardHeader className="relative py-[calc(var(--size)*0.06)]">
              <div className="flex items-center justify-center relative">
                <BaseButton
                  variant="iconControl"
                  onClick={onClose}
                  className="absolute left-0 p-0 text-[length:var(--font-sm)]"
                >
                  <ChevronLeft className="opacity-90" />
                </BaseButton>
                <CardTitle className="font-mono font-normal text-[length:var(--font-sm)] opacity-90 tracking-wider [text-shadow:var(--glow)]">
                  {title}
                </CardTitle>
              </div>
            </CardHeader>
          )}
          <CardContent
            className={cn(
              "pt-[calc(var(--size)*0.02)]",
              "pb-[calc(var(--size)*0.08)]",
              className
            )}
          >
            <div className="modal-text">{children}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return createPortal(modal, modalRoot);
};

export default Modal;
