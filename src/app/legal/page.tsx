"use client";

import { motion } from "framer-motion";
import { Scale, ShieldCheck, FileText } from "lucide-react";

export default function LegalPage() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-4xl mx-auto text-white selection:bg-white selection:text-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic uppercase mb-4">
          Legal<span className="text-zinc-700">_</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
          Dernière mise à jour : 26 Février 2026
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* SECTION 1 : MENTIONS LÉGALES */}
        <section
          id="mentions"
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 scroll-mt-32"
        >
          <div className="flex items-center gap-3 mb-8">
            <Scale size={20} className="text-zinc-500" />
            <h2 className="text-2xl font-bold italic uppercase tracking-tighter">
              1. Mentions Légales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-zinc-400 leading-relaxed">
            <div>
              <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">
                Éditeur du site
              </h3>
              <p>Emilien Olivarez</p>
              <p>Projet personnel de portfolio.</p>
              <p>Contact : eolivarez2008@gmail.com</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">
                Hébergement
              </h3>
              <p>Infrastructure Privée (Serveur Linux Dédié)</p>
              <p>Environnement : Containers Docker via Dockge</p>
              <p>Localisation : France</p>
            </div>
          </div>
        </section>

        {/* SECTION 2 : CONFIDENTIALITÉ (Inspiration RealBus) */}
        <section
          id="privacy"
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 scroll-mt-32"
        >
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck size={20} className="text-zinc-500" />
            <h2 className="text-2xl font-bold italic uppercase tracking-tighter">
              2. Politique de confidentialité
            </h2>
          </div>

          <div className="space-y-8 text-sm text-zinc-400 leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">
                Collecte des données
              </h3>
              <p>
                Le site collecte uniquement les informations nécessaires à son
                bon fonctionnement :
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-zinc-700">
                <li>
                  <strong className="text-zinc-300">
                    Formulaire de contact :
                  </strong>{" "}
                  Les informations saisies (nom, e-mail, message) sont
                  transmises via un Webhook chiffré vers un serveur privé
                  Discord. Aucune copie n&apos;est conservée en base de données
                  sur le serveur web.
                </li>
                <li>
                  <strong className="text-zinc-300">
                    Statistiques anonymes :
                  </strong>{" "}
                  Utilisation d&apos;Umami, un outil de mesure d&apos;audience
                  auto-hébergé, sans cookie ni identifiant personnel,
                  respectueux du RGPD.
                </li>
                <li>
                  <strong className="text-zinc-300">Monitoring :</strong> Les
                  outils Portainer et Uptime Kuma surveillent la disponibilité
                  technique sans collecter de données utilisateurs.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">
                Utilisation & Conservation
              </h3>
              <p>
                Les données servent uniquement à répondre à vos messages et à
                analyser anonymement la fréquentation du site. Les messages
                Discord sont supprimés après traitement.
              </p>
              <p>
                Le site ne vend, ne partage et ne transmet aucune donnée à des
                tiers à des fins commerciales.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">
                Logs Serveur & Sécurité
              </h3>
              <p>
                Conformément à la législation, l&apos;infrastructure de
                monitoring enregistre les adresses IP dans des fichiers de logs
                techniques. Ces données sont utilisées exclusivement à des fins
                de sécurité (prévention des intrusions) et sont automatiquement
                supprimées.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">
                Droits des utilisateurs
              </h3>
              <p>
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès
                et de suppression de vos données personnelles transmises via le
                formulaire de contact en écrivant à :{" "}
                <span className="text-white">eolivarez2008@gmail.com</span>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3 : CGU & OPEN SOURCE */}
        <section
          id="terms"
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 scroll-mt-32"
        >
          <div className="flex items-center gap-3 mb-8">
            <FileText size={20} className="text-zinc-500" />
            <h2 className="text-2xl font-bold italic uppercase tracking-tighter">
              3. CGU & Open Source
            </h2>
          </div>
          <div className="space-y-6 text-sm text-zinc-400 leading-relaxed">
            <p>
              Le code source de ce site est{" "}
              <span className="text-white">Open Source</span> et disponible sur
              GitHub. Son utilisation à des fins pédagogiques est encouragée
              (Licence MIT).
            </p>
            <p>
              Toute tentative d&apos;intrusion ou de dégradation (DDoS,
              injection) sur l&apos;infrastructure d&apos;hébergement est
              strictement interdite et peut faire l&apos;objet d&apos;un
              bannissement d&apos;IP automatique par le pare-feu du serveur.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
