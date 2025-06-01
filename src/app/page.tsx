import styles from "./page.module.css";
import { Metadata } from "next";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.wave}>
          &#128075;
        </div>
        <h1 className={styles.heading}>
          You found me
        </h1>
        <p>
          {'I am a designer and software engineer from Grand Rapids, Michigan (EST). I am currently working on '}
          <a
            href="https://payloadcms.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Payload
          </a>
          {' and formerly '}
          <a
            href="https://trbl.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            TRBL
          </a>
          {'. I am the creator and maintainer of '}
          <a
            href="https://facelessui.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Faceless UI
          </a>
          {' and other OSS. I have worked on projects and teams from small to enterprise. Here is my '}
          <a
            href="https://github.com/jacobsfletch"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {' and my '}
          <a
            href="mailto:jacobsfletch@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            email
          </a>
          {'.'}
        </p>
      </div>
      <a
        href="https://github.com/sponsors/jacobsfletch"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.sponsor}
      >
        Sponsor my work
      </a>
    </div>
  );
}

export const metadata: Metadata = {
    title: "Jacob Fletcher",
    description:
      "Grand Rapids based designer and software engineer.",
    keywords:
      "ui, ux, javascript,typescript, front-end, developer, designer, react, trouble, trbl, payload, software, saas, product, branding, web design, graphic design",
    icons: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>"
}