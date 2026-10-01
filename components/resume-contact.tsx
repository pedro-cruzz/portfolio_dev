import {
  ArrowUpRight,
  Download,
  FileUser,
  Camera,
  Link,
  Mail,
  MessageCircle,
} from "lucide-react";
import { contactChannels, profile } from "@/lib/portfolio";
import { withBasePath } from "@/lib/site-path";

const contactIcons = {
  linkedin: Link,
  whatsapp: MessageCircle,
  email: Mail,
  instagram: Camera,
};

export default function ResumeContact() {
  const resumeReady = Boolean(profile.resume.url);
  return (
    <>
      <section
        className="resume section wrap"
        id="curriculo"
        aria-labelledby="resume-title"
      >
        <div className="resume-intro">
          <p className="eyebrow">
            <span>//</span> CURRÍCULO
          </p>
          <h2 id="resume-title">
            Além dos projetos<span className="blue">.</span>
          </h2>
          <p className="muted">
            Experiências, formação e habilidades reunidas em um documento.
          </p>
        </div>
        <div className="resume-document">
          <div className="resume-file-heading">
            <span className="resume-file-icon" aria-hidden="true">
              <FileUser size={28} strokeWidth={1.5} />
            </span>
            <div>
              <span className="mono">CURRÍCULO PROFISSIONAL</span>
              <h3>{profile.name}</h3>
              <p>{profile.role}</p>
            </div>
            <span className="resume-format mono">PDF</span>
          </div>
          <p className="resume-status" id="resume-status">
            {resumeReady
              ? "Abra no navegador ou salve uma cópia para consultar depois."
              : "Uma nova versão do meu currículo estará disponível em breve."}
          </p>
          <div className="resume-actions">
            {resumeReady ? (
              <>
                <a
                  className="button primary"
                  href={withBasePath(profile.resume.url)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir currículo em nova aba"
                >
                  Abrir currículo <ArrowUpRight size={17} />
                </a>
                <a
                  className="button secondary"
                  href={withBasePath(profile.resume.url)}
                  download={profile.resume.filename}
                >
                  <Download size={17} /> Baixar PDF
                </a>
              </>
            ) : (
              <>
                <button
                  className="button primary"
                  disabled
                  aria-describedby="resume-status"
                >
                  Abrir currículo <ArrowUpRight size={17} />
                </button>
                <button
                  className="button secondary"
                  disabled
                  aria-describedby="resume-status"
                >
                  <Download size={17} /> Baixar PDF
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      <section
        className="contact section wrap"
        id="contato"
        aria-labelledby="contact-title"
      >
        <div className="contact-intro">
          <p className="eyebrow">
            <span>//</span> CONTATO
          </p>
          <h2 id="contact-title">
            Vamos conversar<span className="blue">?</span>
          </h2>
          <p className="muted">
            Tem um projeto em mente ou uma oportunidade de trabalho? Escolha o
            melhor canal para falar comigo.
          </p>
        </div>
        <ul className="contact-channels" aria-label="Canais de contato">
          {contactChannels.map((channel) => {
            const Icon = contactIcons[channel.id as keyof typeof contactIcons];
            const content = (
              <>
                <Icon
                  className="contact-channel-icon"
                  size={21}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="contact-channel-copy">
                  <strong>{channel.label}</strong>
                  <span>{channel.description}</span>
                </span>
                {channel.href ? (
                  <ArrowUpRight
                    className="contact-channel-arrow"
                    size={19}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="contact-pending mono">EM BREVE</span>
                )}
              </>
            );
            return (
              <li key={channel.id}>
                {channel.href ? (
                  <a
                    className="contact-channel"
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    aria-label={channel.label}
                  >
                    {content}
                  </a>
                ) : (
                  <div className="contact-channel contact-channel-pending">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
