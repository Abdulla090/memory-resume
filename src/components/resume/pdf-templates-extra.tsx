import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";

// ─── NOIR ─── Dark bg, centered header, monochrome
const noirS = StyleSheet.create({
  page: { padding: 40, fontSize: 9, fontFamily: "Helvetica", backgroundColor: "#0a0a0a", color: "#a3a3a3" },
  header: { alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: "#262626", paddingBottom: 14, marginBottom: 14 },
  name: { fontSize: 22, fontWeight: 700, color: "#ffffff", letterSpacing: 2 },
  title: { fontSize: 9, color: "#737373", letterSpacing: 2, marginTop: 3 },
  contact: { fontSize: 7.5, color: "#525252", marginTop: 6, letterSpacing: 1 },
  sec: { fontSize: 7.5, fontWeight: 700, color: "#525252", letterSpacing: 3, marginTop: 14, marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: "#262626", paddingBottom: 3 },
  expRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  expTitle: { fontSize: 10, color: "#ffffff" },
  expMeta: { fontSize: 8, color: "#737373" },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#a3a3a3", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 1, paddingLeft: 8 },
  cols: { flexDirection: "row", gap: 20, marginTop: 14 , flex: 1 },
});
export function NoirPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={noirS.page}>
        <View style={noirS.header}>
          <Text style={noirS.name}>{c.name}</Text>
          <Text style={noirS.title}>{c.title.toUpperCase()}</Text>
          <Text style={noirS.contact}>{[c.location, c.email, c.phone].filter(Boolean).join("  |  ")}</Text>
        </View>
        {c.summary ? <Text style={noirS.body}>{c.summary}</Text> : null}
        {c.experience.length > 0 && (<><Text style={noirS.sec}>EXPERIENCE</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 8 }}><View style={noirS.expRow}><Text style={noirS.expTitle}>{e.title} · {e.company}</Text><Text style={noirS.expMeta}>{e.duration}</Text></View>{e.achievements.map((a, j) => <View key={j} style={noirS.bullet}><Text style={{ width: 8, color: "#525252" }}>›</Text><Text style={{ ...noirS.body, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View>)}</>)}
        <View style={noirS.cols}>
          {c.skills.length > 0 && (<View style={{ flex: 1 }}><Text style={noirS.sec}>SKILLS</Text>{c.skills.map((s, i) => <Text key={i} style={{ fontSize: 8, color: "#737373", marginBottom: 3 }}>{s}</Text>)}</View>)}
          {c.education.length > 0 && (<View style={{ flex: 1 }}><Text style={noirS.sec}>EDUCATION</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ fontSize: 9, color: "#ffffff", fontWeight: 700 }}>{e.degree}</Text><Text style={{ fontSize: 8, color: "#737373" }}>{e.institution} · {e.year}</Text></View>)}</View>)}
        </View>
      </Page>
    </Document>
  );
}

// ─── PRISM DARK ─── Dark #121212, indigo accents
const prismDarkS = StyleSheet.create({
  page: { padding: 40, fontSize: 9, fontFamily: "Helvetica", backgroundColor: "#121212", color: "#9ca3af" },
  header: { alignItems: "center", marginBottom: 24 },
  name: { fontSize: 24, fontWeight: 300, color: "#ffffff", letterSpacing: 2 },
  title: { fontSize: 9, fontWeight: 700, color: "#818cf8", letterSpacing: 2, marginTop: 4 },
  contact: { fontSize: 7.5, color: "#6b7280", marginTop: 6 },
  sec: { fontSize: 8, fontWeight: 700, color: "#ffffff", letterSpacing: 2, marginTop: 14, marginBottom: 8, flexDirection: "row", alignItems: "center" },
  secDot: { width: 6, height: 6, backgroundColor: "#818cf8", marginRight: 6 },
  secLine: { flex: 1, height: 0.5, backgroundColor: "#1f2937", marginLeft: 8 },
  expTitle: { fontSize: 10, fontWeight: 700, color: "#ffffff" },
  expMeta: { fontSize: 8, color: "#818cf8", marginTop: 1 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#9ca3af", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2 },
  cols: { flexDirection: "row", gap: 20 , flex: 1 },
});
export function PrismDarkPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={prismDarkS.page}>
        <View style={prismDarkS.header}>
          <Text style={prismDarkS.name}>{c.name}</Text>
          <Text style={prismDarkS.title}>{c.title.toUpperCase()}</Text>
          <Text style={prismDarkS.contact}>{[c.location, c.email, c.phone].filter(Boolean).join("  ·  ")}</Text>
        </View>
        {c.summary ? <Text style={{ ...prismDarkS.body, textAlign: "center", marginBottom: 16 }}>{c.summary}</Text> : null}
        <View style={prismDarkS.cols}>
          <View style={{ flex: 1.5 }}>
            {c.experience.length > 0 && (<><View style={prismDarkS.sec}><View style={prismDarkS.secDot} /><Text style={{ fontSize: 8, fontWeight: 700, color: "#ffffff", letterSpacing: 2 }}>EXPERIENCE</Text><View style={prismDarkS.secLine} /></View>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 10 }}><Text style={prismDarkS.expTitle}>{e.title}</Text><Text style={prismDarkS.expMeta}>{e.company} · {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={prismDarkS.bullet}><Text style={{ width: 10, color: "#818cf8" }}>◆</Text><Text style={{ ...prismDarkS.body, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View>)}</>)}
          </View>
          <View style={{ flex: 1 }}>
            {c.skills.length > 0 && (<><View style={prismDarkS.sec}><View style={prismDarkS.secDot} /><Text style={{ fontSize: 8, fontWeight: 700, color: "#ffffff", letterSpacing: 2 }}>SKILLS</Text><View style={prismDarkS.secLine} /></View>{c.skills.map((s, i) => <Text key={i} style={{ fontSize: 8, color: "#d1d5db", borderWidth: 0.5, borderColor: "#374151", padding: 4, marginBottom: 4 }}>{s}</Text>)}</>)}
            {c.education.length > 0 && (<><View style={{ ...prismDarkS.sec, marginTop: 12 }}><View style={prismDarkS.secDot} /><Text style={{ fontSize: 8, fontWeight: 700, color: "#ffffff", letterSpacing: 2 }}>EDUCATION</Text><View style={prismDarkS.secLine} /></View>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 8 }}><Text style={{ fontSize: 9, fontWeight: 700, color: "#ffffff" }}>{e.degree}</Text><Text style={{ fontSize: 8, color: "#6b7280", marginTop: 2 }}>{e.institution} · {e.year}</Text></View>)}</>)}
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─── PINNACLE ─── Indigo-950 header, left timeline
const pinnS = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", color: "#334155" },
  header: { backgroundColor: "#1e1b4b", padding: 32 },
  name: { fontSize: 26, fontWeight: 700, color: "#ffffff", letterSpacing: 1 },
  title: { fontSize: 10, color: "#a5b4fc", marginTop: 4 },
  contact: { fontSize: 8, color: "#818cf8", marginTop: 8 },
  body: { padding: 28 },
  sec: { fontSize: 8, fontWeight: 700, color: "#1e1b4b", letterSpacing: 2, marginTop: 16, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: "#e0e7ff", paddingBottom: 3 },
  expTitle: { fontSize: 11, fontWeight: 700, color: "#0f172a" },
  expCo: { fontSize: 9, color: "#6366f1", marginTop: 1, marginBottom: 4 },
  textBody: { fontSize: 8.5, lineHeight: 1.5, color: "#475569", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2 },
  cols: { flexDirection: "row", gap: 20 , flex: 1 },
  skill: { fontSize: 8, color: "#475569", borderWidth: 0.5, borderColor: "#c7d2fe", backgroundColor: "#eef2ff", padding: 4, marginBottom: 4, marginRight: 4 },
});
export function PinnaclePDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={pinnS.page}>
        <View style={pinnS.header}>
          <Text style={pinnS.name}>{c.name}</Text>
          <Text style={pinnS.title}>{c.title}</Text>
          <Text style={pinnS.contact}>{[c.location, c.email, c.phone].filter(Boolean).join("  ·  ")}</Text>
        </View>
        <View style={pinnS.body}>
          {c.summary ? <Text style={pinnS.textBody}>{c.summary}</Text> : null}
          <View style={pinnS.cols}>
            <View style={{ flex: 1.8 }}>
              {c.experience.length > 0 && (<><Text style={pinnS.sec}>PROFESSIONAL EXPERIENCE</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 12, borderLeftWidth: 2, borderLeftColor: "#e0e7ff", paddingLeft: 10 }}><Text style={pinnS.expTitle}>{e.title}</Text><Text style={pinnS.expCo}>{e.company} · {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={pinnS.bullet}><Text style={{ width: 10, color: "#6366f1" }}>›</Text><Text style={{ ...pinnS.textBody, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View>)}</>)}
            </View>
            <View style={{ flex: 1 }}>
              {c.skills.length > 0 && (<><Text style={pinnS.sec}>KEY SKILLS</Text><View style={{ flexDirection: "row", flexWrap: "wrap" }}>{c.skills.map((s, i) => <Text key={i} style={pinnS.skill}>{s}</Text>)}</View></>)}
              {c.education.length > 0 && (<><Text style={{ ...pinnS.sec, marginTop: 14 }}>EDUCATION</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 8 }}><Text style={{ fontSize: 9, fontWeight: 700, color: "#0f172a" }}>{e.degree}</Text><Text style={{ fontSize: 8, color: "#6366f1", marginTop: 1 }}>{e.institution}</Text><Text style={{ fontSize: 7.5, color: "#94a3b8", marginTop: 1 }}>{e.year}</Text></View>)}</>)}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─── CIPHER ─── Terminal green on near-black
const cipS = StyleSheet.create({
  page: { padding: 36, fontSize: 9, fontFamily: "Courier", backgroundColor: "#050505", color: "#00ff41" },
  name: { fontSize: 20, fontWeight: 700, color: "#00ff41" },
  title: { fontSize: 9, color: "#008f11", marginTop: 3 },
  contact: { fontSize: 7.5, color: "#008f11", marginTop: 6 },
  div: { borderBottomWidth: 0.5, borderBottomColor: "#00ff4130", marginTop: 10, marginBottom: 10 },
  sec: { fontSize: 10, fontWeight: 700, color: "#008f11", marginTop: 14, marginBottom: 6 },
  expTitle: { fontSize: 10, fontWeight: 700, color: "#00ff41" },
  expMeta: { fontSize: 8, color: "#008f11", marginTop: 1 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#00ff4199", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2 },
  cols: { flexDirection: "row", gap: 20 , flex: 1 },
});
export function CipherPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={cipS.page}>
        <Text style={cipS.name}>&gt; {c.name}_</Text>
        <Text style={cipS.title}>{c.title}</Text>
        <Text style={cipS.contact}>{[c.location && `[loc: ${c.location}]`, c.email && `[mail: ${c.email}]`, c.phone && `[tel: ${c.phone}]`].filter(Boolean).join("  ")}</Text>
        <View style={cipS.div} />
        {c.summary ? <Text style={cipS.body}>{c.summary}</Text> : null}
        <View style={cipS.cols}>
          <View style={{ flex: 1.8 }}>
            {c.experience.length > 0 && (<><Text style={cipS.sec}>~/experience $</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 10 }}><View style={{ flexDirection: "row"}}><Text style={cipS.expTitle}>{e.title}</Text><Text style={cipS.expMeta}>{e.duration}</Text></View><Text style={cipS.expMeta}>@ {e.company}</Text>{e.achievements.map((a, j) => <View key={j} style={cipS.bullet}><Text style={{ width: 10, color: "#008f11" }}>&gt;</Text><Text style={{ ...cipS.body, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View>)}</>)}
          </View>
          <View style={{ flex: 1 }}>
            {c.skills.length > 0 && (<><Text style={cipS.sec}>~/skills $</Text>{c.skills.map((s, i) => <Text key={i} style={{ fontSize: 8, color: "#00ff41", marginBottom: 3 }}>[{s}]</Text>)}</>)}
            {c.education.length > 0 && (<><Text style={cipS.sec}>~/education $</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ fontSize: 9, fontWeight: 700, color: "#00ff41" }}>{e.degree}</Text><Text style={{ fontSize: 8, color: "#008f11", marginTop: 1 }}>{e.institution} · {e.year}</Text></View>)}</>)}
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─── VANGUARD ─── Large display type, right sidebar
const vgS = StyleSheet.create({
  page: { padding: 40, fontSize: 9, fontFamily: "Helvetica", color: "#171717" },
  name: { fontSize: 32, fontWeight: 700, letterSpacing: -1 },
  title: { fontSize: 14, color: "#737373", marginTop: 4 },
  contact: { fontSize: 8, color: "#525252", marginTop: 8, flexDirection: "row", gap: 12 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#f5f5f5", marginTop: 12, marginBottom: 20 },
  cols: { flexDirection: "row", gap: 24 , flex: 1 },
  sec: { fontSize: 8, fontWeight: 700, color: "#737373", letterSpacing: 3, marginTop: 16, marginBottom: 8 },
  expTitle: { fontSize: 16, fontWeight: 700 },
  expMeta: { fontSize: 10, color: "#737373", marginTop: 2, marginBottom: 6 },
  body: { fontSize: 9, lineHeight: 1.6, color: "#404040", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2 },
  skill: { fontSize: 8.5, fontWeight: 700, color: "#ffffff", backgroundColor: "#171717", padding: 5, marginBottom: 4, marginRight: 4 },
});
export function VanguardPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={vgS.page}>
        <Text style={vgS.name}>{c.name}</Text>
        <Text style={vgS.title}>{c.title.toUpperCase()}</Text>
        <View style={vgS.contact}>{[c.location, c.email, c.phone].filter(Boolean).map((x, i) => <Text key={i}>{x}</Text>)}</View>
        <View style={vgS.divider} />
        {c.summary ? <Text style={{ ...vgS.body, fontSize: 11, marginBottom: 20 }}>{c.summary}</Text> : null}
        <View style={vgS.cols}>
          <View style={{ flex: 1.8 }}>
            {c.experience.length > 0 && (<><Text style={vgS.sec}>EXPERIENCE</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 14 }}><Text style={vgS.expTitle}>{e.title}</Text><Text style={vgS.expMeta}>{e.company} · {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={vgS.bullet}><Text style={{ width: 12, color: "#d4d4d4" }}>—</Text><Text style={{ ...vgS.body, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View>)}</>)}
          </View>
          <View style={{ flex: 1 }}>
            {c.skills.length > 0 && (<><Text style={vgS.sec}>EXPERTISE</Text><View style={{ flexDirection: "row", flexWrap: "wrap" }}>{c.skills.map((s, i) => <Text key={i} style={vgS.skill}>{s}</Text>)}</View></>)}
            {c.education.length > 0 && (<><Text style={{ ...vgS.sec, marginTop: 14 }}>EDUCATION</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 8 }}><Text style={{ fontSize: 10, fontWeight: 700 }}>{e.degree}</Text><Text style={{ fontSize: 8.5, color: "#737373", marginTop: 2 }}>{e.institution}</Text><Text style={{ fontSize: 8, color: "#a3a3a3", marginTop: 2 }}>{e.year}</Text></View>)}</>)}
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─── SLATE ─── Clean minimal, light slate bg
const slateS = StyleSheet.create({
  page: { padding: 40, fontSize: 9, fontFamily: "Helvetica", color: "#0f172a", backgroundColor: "#f8fafc" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", borderBottomWidth: 1, borderBottomColor: "#cbd5e1", paddingBottom: 12, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 700, color: "#0f172a" },
  title: { fontSize: 10, color: "#64748b", marginTop: 3 },
  contactText: { fontSize: 8, color: "#94a3b8", marginBottom: 2, textAlign: "right" },
  sec: { fontSize: 8, fontWeight: 700, color: "#0f172a", letterSpacing: 1, marginTop: 14, marginBottom: 6, borderBottomWidth: 1, borderBottomColor: "#e2e8f0", paddingBottom: 2 },
  expTitle: { fontSize: 11, fontWeight: 700, color: "#0f172a" },
  expMeta: { fontSize: 8.5, color: "#64748b", marginTop: 1, marginBottom: 4 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#334155", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2 },
  cols: { flexDirection: "row", gap: 20 , flex: 1 },
});
export function SlatePDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={slateS.page}>
        <View style={slateS.headerRow}>
          <View><Text style={slateS.name}>{c.name}</Text><Text style={slateS.title}>{c.title}</Text></View>
          <View>{[c.location, c.email, c.phone].filter(Boolean).map((x, i) => <Text key={i} style={slateS.contactText}>{x}</Text>)}</View>
        </View>
        {c.summary ? <Text style={slateS.body}>{c.summary}</Text> : null}
        {c.experience.length > 0 && (<><Text style={slateS.sec}>PROFESSIONAL EXPERIENCE</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 10 }}><Text style={slateS.expTitle}>{e.title}</Text><Text style={slateS.expMeta}>{e.company} · {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={slateS.bullet}><Text style={{ width: 10, color: "#94a3b8" }}>•</Text><Text style={{ ...slateS.body, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View>)}</>)}
        <View style={slateS.cols}>
          {c.skills.length > 0 && (<View style={{ flex: 1 }}><Text style={slateS.sec}>SKILLS</Text><Text style={slateS.body}>{c.skills.join(" • ")}</Text></View>)}
          {c.education.length > 0 && (<View style={{ flex: 1 }}><Text style={slateS.sec}>EDUCATION</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ fontSize: 9, fontWeight: 700 }}>{e.degree}</Text><Text style={{ fontSize: 8, color: "#64748b", marginTop: 1 }}>{e.institution} · {e.year}</Text></View>)}</View>)}
        </View>
      </Page>
    </Document>
  );
}

// ─── AVANT ─── Serif, brutalist, bold header rule
const avantS = StyleSheet.create({
  page: { padding: 36, fontSize: 9, fontFamily: "Times-Roman", color: "#000000" },
  header: { borderBottomWidth: 3, borderBottomColor: "#000", paddingBottom: 10, marginBottom: 14, alignItems: "center" },
  name: { fontSize: 28, fontWeight: 700, letterSpacing: -0.5 },
  title: { fontSize: 11, fontWeight: 700, marginTop: 4, letterSpacing: 2 },
  contact: { fontSize: 8, marginTop: 6, letterSpacing: 1 },
  secTitle: { fontSize: 14, fontWeight: 700, borderBottomWidth: 1.5, borderBottomColor: "#000", paddingBottom: 3, marginTop: 16, marginBottom: 8 },
  expRow: { flexDirection: "row", marginBottom: 10 },
  expDate: { width: 60, fontSize: 8.5, fontWeight: 700 },
  expContent: { flex: 1, borderLeftWidth: 1.5, borderLeftColor: "#000", paddingLeft: 10 },
  expTitle: { fontSize: 13, fontWeight: 700 },
  expCo: { fontSize: 10, fontWeight: 700, marginTop: 2, marginBottom: 4 },
  body: { fontSize: 9, lineHeight: 1.5, color: "#111" },
  bullet: { flexDirection: "row", marginTop: 1 },
  cols: { flexDirection: "row", gap: 20 , flex: 1 },
});
export function AvantPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={avantS.page}>
        <View style={avantS.header}>
          <Text style={avantS.name}>{c.name.toUpperCase()}</Text>
          <Text style={avantS.title}>{c.title.toUpperCase()}</Text>
          <Text style={avantS.contact}>{[c.location, c.email, c.phone].filter(Boolean).join(" | ")}</Text>
        </View>
        {c.summary ? <Text style={{ ...avantS.body, textAlign: "center", marginBottom: 14 }}>{c.summary}</Text> : null}
        {c.experience.length > 0 && (<><Text style={avantS.secTitle}>EXPERIENCE</Text>{c.experience.map((e, i) => <View key={i} style={avantS.expRow}><Text style={avantS.expDate}>{e.duration}</Text><View style={avantS.expContent}><Text style={avantS.expTitle}>{e.title.toUpperCase()}</Text><Text style={avantS.expCo}>{e.company}</Text>{e.achievements.map((a, j) => <View key={j} style={avantS.bullet}><Text style={{ width: 10 }}>•</Text><Text style={{ ...avantS.body, flex: 1 }}>{a}</Text></View>)}</View></View>)}</>)}
        <View style={avantS.cols}>
          {c.skills.length > 0 && (<View style={{ flex: 1 }}><Text style={avantS.secTitle}>SKILLS</Text>{c.skills.map((s, i) => <Text key={i} style={{ fontSize: 9, fontWeight: 700, marginBottom: 3 }}>{s.toUpperCase()}</Text>)}</View>)}
          {c.education.length > 0 && (<View style={{ flex: 1 }}><Text style={avantS.secTitle}>EDUCATION</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 8 }}><Text style={{ fontSize: 11, fontWeight: 700 }}>{e.degree.toUpperCase()}</Text><Text style={{ fontSize: 9, fontWeight: 700, marginTop: 2 }}>{e.institution}</Text><Text style={{ fontSize: 8.5, marginTop: 2 }}>{e.year}</Text></View>)}</View>)}
        </View>
      </Page>
    </Document>
  );
}
