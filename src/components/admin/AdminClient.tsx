"use client";

import { useState, useCallback } from "react";
import { Save, RefreshCw, Plus, Trash2, Lock, LogOut } from "lucide-react";
import type {
  AboutData,
  StatusConfig,
  JourneyData,
  SiteContent,
  LegalContent,
} from "@/types";

type Tab = "about" | "journey" | "site" | "legal" | "status" | "github";

// ─── Composant principal ──────────────────────────────────────────────────────

export default function AdminClient() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [statusConfig, setStatusConfig] = useState<StatusConfig | null>(null);
  const [journeyData, setJourneyData] = useState<JourneyData | null>(null);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [legalContent, setLegalContent] = useState<LegalContent | null>(null);

  // Charge toutes les données après authentification
  const loadData = useCallback(async () => {
    const [aboutRes, statusRes, journeyRes, siteRes, legalRes] =
      await Promise.all([
        fetch("/api/admin/about"),
        fetch("/api/admin/status-config"),
        fetch("/api/admin/journey"),
        fetch("/api/admin/site-content"),
        fetch("/api/admin/legal"),
      ]);
    if (aboutRes.ok) setAboutData(await aboutRes.json());
    if (statusRes.ok) setStatusConfig(await statusRes.json());
    if (journeyRes.ok) setJourneyData(await journeyRes.json());
    if (siteRes.ok) setSiteContent(await siteRes.json());
    if (legalRes.ok) setLegalContent(await legalRes.json());
  }, []);

  const handleAuth = async () => {
    const res = await fetch("/api/github/revalidate", {
      method: "POST",
      headers: { "x-admin-secret": secret },
    });
    if (res.ok) {
      setAuthenticated(true);
      setAuthError("");
      loadData();
    } else {
      setAuthError("Secret incorrect");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setSecret("");
    setAboutData(null);
    setStatusConfig(null);
    setJourneyData(null);
    setSiteContent(null);
    setLegalContent(null);
    setMessage("");
  };

  const getSecret = () => secret;

  // Sauvegarde générique via PUT
  const save = async (endpoint: string, data: unknown) => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": getSecret(),
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage("success:Sauvegardé avec succès");
      } else {
        const err = await res
          .json()
          .catch(() => ({ error: "Erreur inconnue" }));
        setMessage(`error:Erreur : ${err.error ?? res.status}`);
      }
    } catch {
      setMessage("error:Erreur réseau");
    } finally {
      setSaving(false);
    }
  };

  const purgeGithubCache = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/github/revalidate", {
        method: "POST",
        headers: { "x-admin-secret": getSecret() },
      });
      setMessage(
        res.ok ? "success:Cache GitHub purgé" : "error:Erreur de purge",
      );
    } catch {
      setMessage("error:Erreur réseau");
    } finally {
      setSaving(false);
    }
  };

  // ─── Écran de connexion ────────────────────────────────────────────────────

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4 p-8 rounded-2xl border border-white/10 bg-zinc-900/50">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={20} className="text-white" />
            <h1 className="text-white font-bold text-xl uppercase tracking-tight">
              Admin
            </h1>
          </div>
          <input
            type="password"
            placeholder="Secret admin"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30"
            autoFocus
          />
          {authError && <p className="text-red-400 text-xs">{authError}</p>}
          <button
            onClick={handleAuth}
            className="w-full bg-white text-black font-bold text-sm uppercase py-3 rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Connexion
          </button>
        </div>
      </div>
    );
  }

  // ─── Tableau de bord ──────────────────────────────────────────────────────

  const tabs: { id: Tab; label: string }[] = [
    { id: "about", label: "About" },
    { id: "journey", label: "Parcours" },
    { id: "site", label: "Site" },
    { id: "legal", label: "Legal" },
    { id: "status", label: "Status" },
    { id: "github", label: "GitHub" },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold uppercase italic tracking-tight mb-8">
          Administration
        </h1>

        {/* Barre onglets + bouton déconnexion */}
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4 gap-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMessage("");
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors shrink-0"
          >
            <LogOut size={14} /> Déconnexion
          </button>
        </div>

        {/* Feedback sauvegarde */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm border ${
              message.startsWith("success:")
                ? "bg-emerald-950/40 border-emerald-500/20 text-emerald-400"
                : "bg-red-950/40 border-red-500/20 text-red-400"
            }`}
          >
            {message.replace(/^(success|error):/, "")}
          </div>
        )}

        {/* ─── ONGLET ABOUT ─────────────────────────────────────────────── */}
        {activeTab === "about" &&
          (aboutData ? (
            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-bold uppercase mb-4">Tech Stack</h2>
                <div className="space-y-3">
                  {aboutData.techStack.map((tech, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <input
                        value={tech.name}
                        onChange={(e) => {
                          const n = [...aboutData.techStack];
                          n[i] = { ...n[i], name: e.target.value };
                          setAboutData({ ...aboutData, techStack: n });
                        }}
                        className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="Nom"
                      />
                      <input
                        value={tech.icon}
                        onChange={(e) => {
                          const n = [...aboutData.techStack];
                          n[i] = { ...n[i], icon: e.target.value };
                          setAboutData({ ...aboutData, techStack: n });
                        }}
                        className="flex-[3] bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
                        placeholder="URL icône"
                      />
                      <button
                        onClick={() =>
                          setAboutData({
                            ...aboutData,
                            techStack: aboutData.techStack.filter(
                              (_, j) => j !== i,
                            ),
                          })
                        }
                        className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setAboutData({
                      ...aboutData,
                      techStack: [
                        ...aboutData.techStack,
                        { name: "", icon: "" },
                      ],
                    })
                  }
                  className="mt-3 flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <Plus size={14} /> Ajouter une techno
                </button>
              </section>

              <section>
                <h2 className="text-lg font-bold uppercase mb-4">Roadmap</h2>
                <div className="space-y-3">
                  {aboutData.roadmapSteps.map((step, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <input
                        value={step.title}
                        onChange={(e) => {
                          const n = [...aboutData.roadmapSteps];
                          n[i] = { ...n[i], title: e.target.value };
                          setAboutData({ ...aboutData, roadmapSteps: n });
                        }}
                        className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="Titre"
                      />
                      <input
                        value={step.date}
                        onChange={(e) => {
                          const n = [...aboutData.roadmapSteps];
                          n[i] = { ...n[i], date: e.target.value };
                          setAboutData({ ...aboutData, roadmapSteps: n });
                        }}
                        className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="Date / lieu"
                      />
                      <label className="flex items-center gap-2 text-xs text-zinc-400 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={step.active}
                          onChange={(e) => {
                            const n = [...aboutData.roadmapSteps];
                            n[i] = { ...n[i], active: e.target.checked };
                            setAboutData({ ...aboutData, roadmapSteps: n });
                          }}
                        />
                        Actif
                      </label>
                      <button
                        onClick={() =>
                          setAboutData({
                            ...aboutData,
                            roadmapSteps: aboutData.roadmapSteps.filter(
                              (_, j) => j !== i,
                            ),
                          })
                        }
                        className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <button
                onClick={() => save("/api/admin/about", aboutData)}
                disabled={saving}
                className="flex items-center gap-2 bg-white text-black font-bold text-sm uppercase px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                <Save size={16} />{" "}
                {saving ? "Sauvegarde..." : "Sauvegarder About"}
              </button>
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">Chargement...</p>
          ))}

        {/* ─── ONGLET PARCOURS ──────────────────────────────────────────── */}
        {activeTab === "journey" &&
          (journeyData ? (
            <div className="space-y-10">
              <section>
                <h2 className="text-lg font-bold uppercase mb-4">
                  Entrées Timeline
                </h2>
                <div className="space-y-4">
                  {journeyData.journey.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 bg-zinc-900/50 border border-white/10 rounded-xl space-y-3"
                    >
                      <div className="flex gap-3">
                        <input
                          value={item.title}
                          onChange={(e) => {
                            const n = [...journeyData.journey];
                            n[i] = { ...n[i], title: e.target.value };
                            setJourneyData({ ...journeyData, journey: n });
                          }}
                          className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                          placeholder="Titre"
                        />
                        <select
                          value={item.type}
                          onChange={(e) => {
                            const n = [...journeyData.journey];
                            n[i] = {
                              ...n[i],
                              type: e.target.value as "work" | "edu",
                            };
                            setJourneyData({ ...journeyData, journey: n });
                          }}
                          className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        >
                          <option value="work">Travail</option>
                          <option value="edu">Formation</option>
                        </select>
                        <button
                          onClick={() =>
                            setJourneyData({
                              ...journeyData,
                              journey: journeyData.journey.filter(
                                (_, j) => j !== i,
                              ),
                            })
                          }
                          className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex gap-3">
                        <input
                          value={item.date}
                          onChange={(e) => {
                            const n = [...journeyData.journey];
                            n[i] = { ...n[i], date: e.target.value };
                            setJourneyData({ ...journeyData, journey: n });
                          }}
                          className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                          placeholder="Date"
                        />
                        <input
                          value={item.location}
                          onChange={(e) => {
                            const n = [...journeyData.journey];
                            n[i] = { ...n[i], location: e.target.value };
                            setJourneyData({ ...journeyData, journey: n });
                          }}
                          className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                          placeholder="Lieu"
                        />
                      </div>
                      <textarea
                        value={item.description}
                        onChange={(e) => {
                          const n = [...journeyData.journey];
                          n[i] = { ...n[i], description: e.target.value };
                          setJourneyData({ ...journeyData, journey: n });
                        }}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none"
                        rows={2}
                        placeholder="Description"
                      />
                      <input
                        value={item.skills.join(", ")}
                        onChange={(e) => {
                          const n = [...journeyData.journey];
                          n[i] = {
                            ...n[i],
                            skills: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          };
                          setJourneyData({ ...journeyData, journey: n });
                        }}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="Skills (séparés par virgules)"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setJourneyData({
                      ...journeyData,
                      journey: [
                        ...journeyData.journey,
                        {
                          date: "",
                          title: "",
                          location: "",
                          description: "",
                          type: "work",
                          skills: [],
                        },
                      ],
                    })
                  }
                  className="mt-3 flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <Plus size={14} /> Ajouter une entrée
                </button>
              </section>

              <section>
                <h2 className="text-lg font-bold uppercase mb-4">
                  Archives & Bulletins
                </h2>
                {journeyData.archives.map((folder, fi) => (
                  <div
                    key={fi}
                    className="mb-6 p-4 bg-zinc-900/30 border border-white/10 rounded-xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        value={folder.category}
                        onChange={(e) => {
                          const n = [...journeyData.archives];
                          n[fi] = { ...n[fi], category: e.target.value };
                          setJourneyData({ ...journeyData, archives: n });
                        }}
                        className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-bold"
                        placeholder="Catégorie"
                      />
                      <button
                        onClick={() =>
                          setJourneyData({
                            ...journeyData,
                            archives: journeyData.archives.filter(
                              (_, j) => j !== fi,
                            ),
                          })
                        }
                        className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="space-y-2 ml-4">
                      {folder.items.map((doc, di) => (
                        <div key={di} className="flex gap-3 items-center">
                          <input
                            value={doc.name}
                            onChange={(e) => {
                              const n = [...journeyData.archives];
                              n[fi].items[di] = {
                                ...n[fi].items[di],
                                name: e.target.value,
                              };
                              setJourneyData({ ...journeyData, archives: n });
                            }}
                            className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                            placeholder="Nom du document"
                          />
                          <input
                            value={doc.file}
                            onChange={(e) => {
                              const n = [...journeyData.archives];
                              n[fi].items[di] = {
                                ...n[fi].items[di],
                                file: e.target.value,
                              };
                              setJourneyData({ ...journeyData, archives: n });
                            }}
                            className="flex-[2] bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
                            placeholder="/Bulletins/fichier.pdf"
                          />
                          <button
                            onClick={() => {
                              const n = [...journeyData.archives];
                              n[fi].items = n[fi].items.filter(
                                (_, j) => j !== di,
                              );
                              setJourneyData({ ...journeyData, archives: n });
                            }}
                            className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}

                      {/* Ajout manuel d'un doc */}
                      <button
                        onClick={() => {
                          const n = [...journeyData.archives];
                          n[fi].items = [
                            ...n[fi].items,
                            { name: "", file: "" },
                          ];
                          setJourneyData({ ...journeyData, archives: n });
                        }}
                        className="mt-2 flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors"
                      >
                        <Plus size={12} /> Ajouter un document manuellement
                      </button>

                      {/* Upload PDF direct */}
                      <BulletinUploader
                        adminSecret={getSecret()}
                        onUploaded={(filePath, displayName) => {
                          const n = [...journeyData.archives];
                          n[fi].items = [
                            ...n[fi].items,
                            { name: displayName, file: filePath },
                          ];
                          setJourneyData({ ...journeyData, archives: n });
                        }}
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={() =>
                    setJourneyData({
                      ...journeyData,
                      archives: [
                        ...journeyData.archives,
                        { category: "Nouvelle catégorie", items: [] },
                      ],
                    })
                  }
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <Plus size={14} /> Ajouter une catégorie
                </button>
              </section>

              <button
                onClick={() => save("/api/admin/journey", journeyData)}
                disabled={saving}
                className="flex items-center gap-2 bg-white text-black font-bold text-sm uppercase px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                <Save size={16} />{" "}
                {saving ? "Sauvegarde..." : "Sauvegarder Parcours"}
              </button>
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">Chargement...</p>
          ))}

        {/* ─── ONGLET SITE ──────────────────────────────────────────────── */}
        {activeTab === "site" &&
          (siteContent ? (
            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-bold uppercase mb-4">Hero</h2>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      value={siteContent.hero.name}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          hero: { ...siteContent.hero, name: e.target.value },
                        })
                      }
                      className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      placeholder="Prénom"
                    />
                    <input
                      value={siteContent.hero.lastname}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          hero: {
                            ...siteContent.hero,
                            lastname: e.target.value,
                          },
                        })
                      }
                      className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      placeholder="Nom"
                    />
                  </div>
                  <textarea
                    value={siteContent.hero.subtitle}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        hero: { ...siteContent.hero, subtitle: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none"
                    rows={2}
                    placeholder="Sous-titre"
                  />
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold uppercase mb-4">
                  Citations (Hero)
                </h2>
                {siteContent.quotes.map((q, i) => (
                  <div
                    key={i}
                    className="mb-3 p-4 bg-zinc-900/50 border border-white/10 rounded-xl space-y-3"
                  >
                    <div className="flex gap-3">
                      <textarea
                        value={q.text}
                        onChange={(e) => {
                          const n = [...siteContent.quotes];
                          n[i] = { ...n[i], text: e.target.value };
                          setSiteContent({ ...siteContent, quotes: n });
                        }}
                        className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none"
                        rows={2}
                        placeholder="Citation"
                      />
                      <button
                        onClick={() =>
                          setSiteContent({
                            ...siteContent,
                            quotes: siteContent.quotes.filter(
                              (_, j) => j !== i,
                            ),
                          })
                        }
                        className="p-2 text-zinc-500 hover:text-red-400 self-start transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex gap-3">
                      <input
                        value={q.author}
                        onChange={(e) => {
                          const n = [...siteContent.quotes];
                          n[i] = { ...n[i], author: e.target.value };
                          setSiteContent({ ...siteContent, quotes: n });
                        }}
                        className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="Auteur"
                      />
                      <input
                        value={q.rotation}
                        onChange={(e) => {
                          const n = [...siteContent.quotes];
                          n[i] = { ...n[i], rotation: e.target.value };
                          setSiteContent({ ...siteContent, quotes: n });
                        }}
                        className="w-24 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
                        placeholder="-4deg"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setSiteContent({
                      ...siteContent,
                      quotes: [
                        ...siteContent.quotes,
                        { text: "", author: "", rotation: "0deg" },
                      ],
                    })
                  }
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <Plus size={14} /> Ajouter une citation
                </button>
              </section>

              <section>
                <h2 className="text-lg font-bold uppercase mb-4">
                  Expertise Grid
                </h2>
                {siteContent.expertise.map((item, i) => (
                  <div key={i} className="mb-3 flex gap-3 items-center">
                    <input
                      value={item.title}
                      onChange={(e) => {
                        const n = [...siteContent.expertise];
                        n[i] = { ...n[i], title: e.target.value };
                        setSiteContent({ ...siteContent, expertise: n });
                      }}
                      className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      placeholder="Titre"
                    />
                    <input
                      value={item.description}
                      onChange={(e) => {
                        const n = [...siteContent.expertise];
                        n[i] = { ...n[i], description: e.target.value };
                        setSiteContent({ ...siteContent, expertise: n });
                      }}
                      className="flex-[2] bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      placeholder="Description"
                    />
                    <select
                      value={item.icon}
                      onChange={(e) => {
                        const n = [...siteContent.expertise];
                        n[i] = { ...n[i], icon: e.target.value };
                        setSiteContent({ ...siteContent, expertise: n });
                      }}
                      className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                    >
                      {["Code2", "Gamepad2", "Layers", "Cpu"].map((ic) => (
                        <option key={ic} value={ic}>
                          {ic}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        setSiteContent({
                          ...siteContent,
                          expertise: siteContent.expertise.filter(
                            (_, j) => j !== i,
                          ),
                        })
                      }
                      className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </section>

              <section>
                <h2 className="text-lg font-bold uppercase mb-4">
                  Bio (page About)
                </h2>
                {siteContent.about.bio.map((para, i) => (
                  <div key={i} className="mb-3 flex gap-3">
                    <textarea
                      value={para}
                      onChange={(e) => {
                        const n = [...siteContent.about.bio];
                        n[i] = e.target.value;
                        setSiteContent({
                          ...siteContent,
                          about: { ...siteContent.about, bio: n },
                        });
                      }}
                      className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none"
                      rows={3}
                      placeholder={`Paragraphe ${i + 1}`}
                    />
                    <button
                      onClick={() =>
                        setSiteContent({
                          ...siteContent,
                          about: {
                            ...siteContent.about,
                            bio: siteContent.about.bio.filter(
                              (_, j) => j !== i,
                            ),
                          },
                        })
                      }
                      className="p-2 text-zinc-500 hover:text-red-400 self-start transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setSiteContent({
                      ...siteContent,
                      about: {
                        ...siteContent.about,
                        bio: [...siteContent.about.bio, ""],
                      },
                    })
                  }
                  className="mb-4 flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <Plus size={14} /> Ajouter un paragraphe
                </button>
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                  Discipline
                </label>
                <textarea
                  value={siteContent.about.discipline}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      about: {
                        ...siteContent.about,
                        discipline: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none mb-3"
                  rows={2}
                  placeholder="Texte Discipline"
                />
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                  Description projets
                </label>
                <textarea
                  value={siteContent.about.projects_description}
                  onChange={(e) =>
                    setSiteContent({
                      ...siteContent,
                      about: {
                        ...siteContent.about,
                        projects_description: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none"
                  rows={2}
                  placeholder="Description projets (About)"
                />
              </section>

              <button
                onClick={() => save("/api/admin/site-content", siteContent)}
                disabled={saving}
                className="flex items-center gap-2 bg-white text-black font-bold text-sm uppercase px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                <Save size={16} />{" "}
                {saving ? "Sauvegarde..." : "Sauvegarder Site Content"}
              </button>
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">Chargement...</p>
          ))}

        {/* ─── ONGLET LEGAL ─────────────────────────────────────────────── */}
        {activeTab === "legal" &&
          (legalContent ? (
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-bold uppercase mb-4">
                  Informations générales
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                      Dernière mise à jour
                    </label>
                    <input
                      value={legalContent.lastUpdate}
                      onChange={(e) =>
                        setLegalContent({
                          ...legalContent,
                          lastUpdate: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      placeholder="17 Mars 2026"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                        Nom éditeur
                      </label>
                      <input
                        value={legalContent.editor.name}
                        onChange={(e) =>
                          setLegalContent({
                            ...legalContent,
                            editor: {
                              ...legalContent.editor,
                              name: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="Emilien Olivarez"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                        Email éditeur
                      </label>
                      <input
                        value={legalContent.editor.email}
                        onChange={(e) =>
                          setLegalContent({
                            ...legalContent,
                            editor: {
                              ...legalContent.editor,
                              email: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="email@exemple.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                      Type de projet
                    </label>
                    <input
                      value={legalContent.editor.type}
                      onChange={(e) =>
                        setLegalContent({
                          ...legalContent,
                          editor: {
                            ...legalContent.editor,
                            type: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      placeholder="Projet personnel de portfolio"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold uppercase mb-4">
                  Hébergement
                </h2>
                <div className="space-y-3">
                  {(["type", "details", "proxy", "location"] as const).map(
                    (field) => (
                      <div key={field}>
                        <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                          {field}
                        </label>
                        <input
                          value={legalContent.hosting[field]}
                          onChange={(e) =>
                            setLegalContent({
                              ...legalContent,
                              hosting: {
                                ...legalContent.hosting,
                                [field]: e.target.value,
                              },
                            })
                          }
                          className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        />
                      </div>
                    ),
                  )}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold uppercase mb-4">
                  Confidentialité
                </h2>
                <div className="space-y-4">
                  {(
                    ["contact_form", "analytics", "logs", "rights"] as const
                  ).map((field) => (
                    <div key={field}>
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                        {field.replace("_", " ")}
                      </label>
                      <textarea
                        value={legalContent.privacy[field]}
                        onChange={(e) =>
                          setLegalContent({
                            ...legalContent,
                            privacy: {
                              ...legalContent.privacy,
                              [field]: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none"
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold uppercase mb-4">
                  Propriété & Sécurité
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                      Propriété intellectuelle
                    </label>
                    <textarea
                      value={legalContent.intellectual_property}
                      onChange={(e) =>
                        setLegalContent({
                          ...legalContent,
                          intellectual_property: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                      Avertissement sécurité
                    </label>
                    <textarea
                      value={legalContent.security_warning}
                      onChange={(e) =>
                        setLegalContent({
                          ...legalContent,
                          security_warning: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                      Politique cookies
                    </label>
                    <textarea
                      value={legalContent.cookies}
                      onChange={(e) =>
                        setLegalContent({
                          ...legalContent,
                          cookies: e.target.value,
                        })
                      }
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              </section>

              <button
                onClick={() => save("/api/admin/legal", legalContent)}
                disabled={saving}
                className="flex items-center gap-2 bg-white text-black font-bold text-sm uppercase px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                <Save size={16} />{" "}
                {saving ? "Sauvegarde..." : "Sauvegarder Legal"}
              </button>
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">Chargement...</p>
          ))}

        {/* ─── ONGLET STATUS ────────────────────────────────────────────── */}
        {activeTab === "status" &&
          (statusConfig ? (
            <div className="space-y-6">
              <h2 className="text-lg font-bold uppercase mb-4">
                Mapping IDs Uptime Kuma
              </h2>
              <div className="space-y-3">
                {Object.entries(statusConfig.idMap).map(([id, name]) => (
                  <div key={id} className="flex gap-3 items-center">
                    <input
                      value={id}
                      readOnly
                      className="w-16 bg-zinc-800/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-zinc-500 font-mono"
                    />
                    <input
                      value={name}
                      onChange={(e) =>
                        setStatusConfig({
                          idMap: {
                            ...statusConfig.idMap,
                            [id]: e.target.value,
                          },
                        })
                      }
                      className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      placeholder="Nom du service"
                    />
                    <button
                      onClick={() => {
                        const next = Object.fromEntries(
                          Object.entries(statusConfig.idMap).filter(
                            ([k]) => k !== id,
                          ),
                        );
                        setStatusConfig({ idMap: next });
                      }}
                      className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <AddIdRow
                onAdd={(id, name) =>
                  setStatusConfig({
                    idMap: { ...statusConfig.idMap, [id]: name },
                  })
                }
              />
              <button
                onClick={() => save("/api/admin/status-config", statusConfig)}
                disabled={saving}
                className="flex items-center gap-2 bg-white text-black font-bold text-sm uppercase px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                <Save size={16} />{" "}
                {saving ? "Sauvegarde..." : "Sauvegarder Status Config"}
              </button>
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">Chargement...</p>
          ))}

        {/* ─── ONGLET GITHUB ────────────────────────────────────────────── */}
        {activeTab === "github" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold uppercase mb-2">
              Synchronisation GitHub
            </h2>
            <p className="text-zinc-400 text-sm">
              Force la purge du cache Next.js pour la page Projects. À utiliser
              après avoir supprimé un repo sur GitHub.
            </p>
            <button
              onClick={purgeGithubCache}
              disabled={saving}
              className="flex items-center gap-2 bg-white text-black font-bold text-sm uppercase px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={saving ? "animate-spin" : ""} />
              {saving ? "Purge en cours..." : "Purger le cache GitHub"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

// Ajout d'un nouvel ID Uptime Kuma
function AddIdRow({ onAdd }: { onAdd: (id: string, name: string) => void }) {
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");

  return (
    <div className="flex gap-3 items-center pt-2 border-t border-white/10">
      <input
        value={newId}
        onChange={(e) => setNewId(e.target.value)}
        className="w-16 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
        placeholder="ID"
      />
      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
        placeholder="Nom du service"
      />
      <button
        onClick={() => {
          if (newId && newName) {
            onAdd(newId, newName);
            setNewId("");
            setNewName("");
          }
        }}
        className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors px-3 py-2"
      >
        <Plus size={14} /> Ajouter
      </button>
    </div>
  );
}

// Upload PDF bulletin
function BulletinUploader({
  adminSecret,
  onUploaded,
}: {
  adminSecret: string;
  onUploaded: (filePath: string, displayName: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".pdf")) {
      setError("Seuls les fichiers PDF sont acceptés");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "Bulletins");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-admin-secret": adminSecret },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const displayName = file.name
          .replace(/\.pdf$/i, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        onUploaded(data.path, displayName);
      } else {
        setError("Erreur lors de l'upload");
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="mt-3 p-3 border border-dashed border-white/15 rounded-xl">
      <label className="flex items-center gap-3 cursor-pointer group">
        <span className="text-xs text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">
          {uploading ? "⏳ Upload en cours..." : "📄 Uploader un PDF"}
        </span>
        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
        {!uploading && (
          <span className="px-3 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-xs text-white hover:bg-zinc-700 transition-colors">
            Choisir
          </span>
        )}
      </label>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
