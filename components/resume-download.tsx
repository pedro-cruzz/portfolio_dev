"use client";

import { useRef } from "react";
import { Download, FileUser, X } from "lucide-react";
import styles from "./resume-download.module.css";

export default function ResumeDownload({
  href,
  filename,
}: {
  href: string;
  filename: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  return (
    <>
      <a
        className="button secondary"
        href={href}
        download={filename}
        aria-haspopup="dialog"
        onClick={(event) => {
          event.preventDefault();
          dialog.current?.showModal();
          cancel.current?.focus();
        }}
      >
        <Download size={17} aria-hidden="true" /> Baixar PDF
      </a>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="resume-download-title"
        aria-describedby="resume-download-description"
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Fechar confirmação"
          onClick={() => dialog.current?.close()}
        >
          <X size={20} aria-hidden="true" />
        </button>
        <span className={styles.icon} aria-hidden="true">
          <FileUser size={26} strokeWidth={1.5} />
        </span>
        <p className={`mono ${styles.label}`}>CURRÍCULO / PDF</p>
        <h2 id="resume-download-title">Baixar currículo?</h2>
        <p id="resume-download-description" className={styles.description}>
          Salve uma cópia em PDF para consultar quando quiser.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className="button secondary"
            ref={cancel}
            autoFocus
            onClick={() => dialog.current?.close()}
          >
            Cancelar
          </button>
          <a
            className="button primary"
            href={href}
            download={filename}
            onClick={() => dialog.current?.close()}
          >
            <Download size={17} aria-hidden="true" /> Baixar currículo
          </a>
        </div>
      </dialog>
    </>
  );
}
