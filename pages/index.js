import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const contentDir = path.join(process.cwd(), "content");
  const home = JSON.parse(fs.readFileSync(path.join(contentDir, "home.json"), "utf8"));
  const fotosFile = JSON.parse(fs.readFileSync(path.join(contentDir, "fotos.json"), "utf8"));
  return { props: { home, fotos: fotosFile.fotos } };
}

export default function Home({ home, fotos }) {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px", fontFamily: "system-ui, sans-serif" }}>
      <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888" }}>
        Plantilla HeviaWerk — Next.js + Decap CMS
      </p>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>{home.titulo}</h1>
      <p style={{ fontSize: 18, color: "#555", marginBottom: 24 }}>{home.subtitulo}</p>
      <p style={{ lineHeight: 1.6, marginBottom: 48 }}>{home.cuerpo}</p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>Fotos</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {fotos.map((foto, i) => (
          <figure key={i} style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={foto.imagen}
              alt={foto.titulo}
              style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8, background: "#eee" }}
            />
            <figcaption style={{ fontSize: 13, color: "#666", marginTop: 6 }}>
              <strong>{foto.titulo}</strong> — {foto.descripcion}
            </figcaption>
          </figure>
        ))}
      </div>

      <p style={{ marginTop: 64, fontSize: 13, color: "#999" }}>
        Edita este contenido en <code>/admin</code> — sin tocar este código.
      </p>
    </main>
  );
}
