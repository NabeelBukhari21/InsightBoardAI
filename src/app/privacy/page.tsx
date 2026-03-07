import PrivacyByDesignCard from "@/components/privacy/PrivacyByDesignCard";
import DataFlowCard from "@/components/privacy/DataFlowCard";
import RetentionPolicyCard from "@/components/privacy/RetentionPolicyCard";
import SolanaAuditCard from "@/components/privacy/SolanaAuditCard";
import ConsentArchitectureCard from "@/components/privacy/ConsentArchitectureCard";
import EncryptionStorageCard from "@/components/privacy/EncryptionStorageCard";
import TamperEvidentLogCard from "@/components/privacy/TamperEvidentLogCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function PrivacyPage() {
    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* ── Header ──────────────────────────────── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                            Privacy &amp; <span className="gradient-text">Audit</span>
                        </h1>
                    </div>
                    <p className="text-muted">
                        Full transparency on how we handle data, protect students, and verify every access
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button href="/teacher" variant="secondary" size="sm">
                        ← Teacher Dashboard
                    </Button>
                    <Button href="/student" variant="ghost" size="sm">
                        Student View →
                    </Button>
                </div>
            </div>

            {/* ── Compliance Badges ───────────────────── */}
            <div className="glass-card p-5 mb-8 animate-fade-in-up">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-foreground mr-1">Alignment:</span>
                    <Badge variant="success" size="md">🔒 FERPA Aligned</Badge>
                    <Badge variant="success" size="md">🇪🇺 GDPR Ready</Badge>
                    <Badge variant="success" size="md">🛡️ COPPA Aware</Badge>
                    <Badge variant="info" size="md">⛓️ Solana Audit Proofs</Badge>
                    <Badge variant="success" size="md">🛡️ Privacy by Design</Badge>
                    <Badge variant="default" size="md">🔐 AES-256 Encrypted</Badge>
                </div>
                <p className="text-[10px] text-muted mt-2">
                    These indicate our design alignment with industry frameworks. Full legal compliance is subject to institutional deployment and review.
                </p>
            </div>

            {/* ── Trust Summary Stats ─────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 animate-fade-in-up">
                {[
                    { label: "Data Types Tracked", value: "6", sublabel: "All with retention limits", icon: "📊", color: "text-accent-light" },
                    { label: "Raw Media Retained", value: "0s", sublabel: "Deleted immediately", icon: "🗑️", color: "text-success" },
                    { label: "Consent Layers", value: "5", sublabel: "Granular opt-in", icon: "✅", color: "text-blue-400" },
                    { label: "Audit Proofs", value: "100%", sublabel: "All verified on Solana", icon: "⛓️", color: "text-emerald-400" },
                ].map((stat, i) => (
                    <Card key={i} className="text-center py-4" hover>
                        <span className="text-xl mb-1 block">{stat.icon}</span>
                        <div className={`text-2xl font-extrabold ${stat.color} mb-0.5`}>{stat.value}</div>
                        <div className="text-[10px] text-foreground/60 font-semibold">{stat.label}</div>
                        <div className="text-[9px] text-muted mt-0.5">{stat.sublabel}</div>
                    </Card>
                ))}
            </div>

            {/* ── Section 1: Privacy-First Design ────── */}
            <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 rounded-full bg-success" />
                <h2 className="text-xl font-bold text-foreground">Privacy-First Design</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <PrivacyByDesignCard />
                <DataFlowCard />
            </div>

            {/* ── Section 2: Data Retention ──────────── */}
            <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 rounded-full bg-warning" />
                <h2 className="text-xl font-bold text-foreground">Data Retention &amp; Consent</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <RetentionPolicyCard />
                <ConsentArchitectureCard />
            </div>

            {/* ── Section 3: Encryption & Storage ────── */}
            <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 rounded-full bg-accent" />
                <h2 className="text-xl font-bold text-foreground">Encryption &amp; Storage</h2>
            </div>
            <div className="mb-8">
                <EncryptionStorageCard />
            </div>

            {/* ── Section 4: Solana Audit Proofs ────── */}
            <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 rounded-full bg-emerald-400" />
                <h2 className="text-xl font-bold text-foreground">On-Chain Audit Verification</h2>
                <Badge variant="success" size="sm">⛓️ Solana</Badge>
            </div>
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <SolanaAuditCard />
                <TamperEvidentLogCard />
            </div>

            {/* ── Bottom Trust Statement ──────────────── */}
            <div className="mt-2 glass-card p-6 border-success/15">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-success/10 ring-1 ring-success/20 flex items-center justify-center text-2xl flex-shrink-0">
                        🤝
                    </div>
                    <div>
                        <p className="text-base font-bold text-foreground mb-2">Our Commitment</p>
                        <p className="text-sm text-muted leading-relaxed mb-3">
                            InsightBoard AI is a <strong className="text-foreground">learning support tool</strong>. We believe that understanding how students engage with content can help teachers teach better and help students learn more effectively — but only if that data is handled with care, transparency, and respect.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { title: "Students own their data", detail: "View, export, or delete at any time" },
                                { title: "Teachers see class patterns", detail: "Never individual student data" },
                                { title: "Every access is logged", detail: "Tamper-evident and verifiable" },
                            ].map((item, i) => (
                                <div key={i} className="glass-card p-3 bg-success/5 border-success/10">
                                    <p className="text-xs font-semibold text-foreground mb-0.5">{item.title}</p>
                                    <p className="text-[10px] text-muted">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
