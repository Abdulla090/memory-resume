import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import type { ResumeData, TemplateId } from "@/lib/types";

const minimal = StyleSheet.create({
  page: { padding: 48, fontSize: 10, fontFamily: "Helvetica", color: "#111" },
  name: { fontSize: 22, fontWeight: 700 },
  title: { fontSize: 11, color: "#444", marginTop: 2 },
  contact: { fontSize: 9, color: "#777", marginTop: 4 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#ccc", marginTop: 8 },
  sectionTitle: {
    fontSize: 9,
    color: "#777",
    marginTop: 14,
    marginBottom: 6,
    letterSpacing: 2,
    fontWeight: 700,
  },
  itemHeader: { flexDirection: "row", justifyContent: "space-between" },
  itemTitle: { fontSize: 10, fontWeight: 700 },
  itemMeta: { fontSize: 9, color: "#777" },
  bullet: { flexDirection: "row", marginTop: 2, paddingLeft: 8 },
  bulletDot: { width: 8 },
  body: { fontSize: 10, lineHeight: 1.5, color: "#222", marginTop: 2 },
});

function MinimalPDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={minimal.page}>
        <Text style={minimal.name}>{data.name}</Text>
        <Text style={minimal.title}>{data.title}</Text>
        <Text style={minimal.contact}>
          {[data.location, data.email, data.phone].filter(Boolean).join(" · ")}
        </Text>
        <View style={minimal.divider} />

        <Text style={minimal.sectionTitle}>SUMMARY</Text>
        <Text style={minimal.body}>{data.summary}</Text>

        {data.experience.length > 0 && (
          <>
            <Text style={minimal.sectionTitle}>EXPERIENCE</Text>
            {data.experience.map((e, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <View style={minimal.itemHeader}>
                  <Text style={minimal.itemTitle}>
                    {e.title} · {e.company}
                  </Text>
                  <Text style={minimal.itemMeta}>{e.duration}</Text>
                </View>
                {e.description ? (
                  <Text style={minimal.body}>{e.description}</Text>
                ) : null}
                {e.achievements.map((a, j) => (
                  <View key={j} style={minimal.bullet}>
                    <Text style={minimal.bulletDot}>•</Text>
                    <Text style={{ ...minimal.body, flex: 1, marginTop: 0 }}>{a}</Text>
                  </View>
                ))}
              </View>
            ))}
          </>
        )}

        {data.projects.length > 0 && (
          <>
            <Text style={minimal.sectionTitle}>PROJECTS</Text>
            {data.projects.map((p, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={minimal.itemTitle}>{p.name}</Text>
                <Text style={minimal.body}>{p.description}</Text>
                {p.tech.length > 0 && (
                  <Text style={minimal.itemMeta}>{p.tech.join(" · ")}</Text>
                )}
              </View>
            ))}
          </>
        )}

        {data.skills.length > 0 && (
          <>
            <Text style={minimal.sectionTitle}>SKILLS</Text>
            <Text style={minimal.body}>{data.skills.join(" · ")}</Text>
          </>
        )}

        {data.education.length > 0 && (
          <>
            <Text style={minimal.sectionTitle}>EDUCATION</Text>
            {data.education.map((e, i) => (
              <View key={i} style={minimal.itemHeader}>
                <Text style={minimal.body}>
                  {e.degree} · {e.institution}
                </Text>
                <Text style={minimal.itemMeta}>{e.year}</Text>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}

const exec = StyleSheet.create({
  page: { fontSize: 10, fontFamily: "Times-Roman", color: "#111", flexDirection: "row" },
  side: { width: "33%", backgroundColor: "#111", color: "#fff", padding: 24 },
  main: { width: "67%", padding: 28 },
  name: { fontSize: 18, fontWeight: 700, color: "#fff" },
  role: { fontSize: 10, fontStyle: "italic", color: "#bbb", marginTop: 2 },
  sideContact: { fontSize: 9, color: "#ccc", marginTop: 12 },
  sideHeader: {
    fontSize: 8,
    color: "#888",
    marginTop: 18,
    marginBottom: 6,
    letterSpacing: 2,
    fontWeight: 700,
  },
  sideItem: { fontSize: 9, color: "#eee", marginBottom: 3 },
  mainHeader: {
    fontSize: 9,
    color: "#444",
    letterSpacing: 2,
    fontWeight: 700,
    marginTop: 12,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 3,
  },
  expTitle: { fontSize: 11, fontWeight: 700 },
  expMeta: { fontSize: 9, fontStyle: "italic", color: "#666", marginTop: 1 },
  body: { fontSize: 10, lineHeight: 1.5, marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2, paddingLeft: 8 },
});

function ExecutivePDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={exec.page}>
        <View style={exec.side}>
          <Text style={exec.name}>{data.name}</Text>
          <Text style={exec.role}>{data.title}</Text>
          {data.location ? <Text style={exec.sideContact}>{data.location}</Text> : null}
          {data.email ? <Text style={exec.sideContact}>{data.email}</Text> : null}
          {data.phone ? <Text style={exec.sideContact}>{data.phone}</Text> : null}

          {data.skills.length > 0 && (
            <>
              <Text style={exec.sideHeader}>EXPERTISE</Text>
              {data.skills.map((s, i) => (
                <Text key={i} style={exec.sideItem}>
                  {s}
                </Text>
              ))}
            </>
          )}

          {data.education.length > 0 && (
            <>
              <Text style={exec.sideHeader}>EDUCATION</Text>
              {data.education.map((e, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ ...exec.sideItem, fontWeight: 700 }}>{e.degree}</Text>
                  <Text style={exec.sideItem}>
                    {e.institution}, {e.year}
                  </Text>
                </View>
              ))}
            </>
          )}

          {data.certifications.length > 0 && (
            <>
              <Text style={exec.sideHeader}>CERTIFICATIONS</Text>
              {data.certifications.map((c, i) => (
                <Text key={i} style={exec.sideItem}>
                  {c}
                </Text>
              ))}
            </>
          )}
        </View>

        <View style={exec.main}>
          <Text style={exec.mainHeader}>PROFILE</Text>
          <Text style={exec.body}>{data.summary}</Text>

          {data.experience.length > 0 && (
            <>
              <Text style={exec.mainHeader}>EXPERIENCE</Text>
              {data.experience.map((e, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={exec.expTitle}>{e.title}</Text>
                  <Text style={exec.expMeta}>
                    {e.company} · {e.duration}
                  </Text>
                  {e.description ? <Text style={exec.body}>{e.description}</Text> : null}
                  {e.achievements.map((a, j) => (
                    <View key={j} style={exec.bullet}>
                      <Text style={{ width: 8 }}>•</Text>
                      <Text style={{ ...exec.body, flex: 1, marginTop: 0 }}>{a}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </>
          )}

          {data.projects.length > 0 && (
            <>
              <Text style={exec.mainHeader}>SELECTED PROJECTS</Text>
              {data.projects.map((p, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ ...exec.expTitle, fontSize: 10 }}>{p.name}</Text>
                  <Text style={exec.body}>{p.description}</Text>
                  {p.impact ? (
                    <Text style={{ ...exec.expMeta, fontSize: 9 }}>Impact: {p.impact}</Text>
                  ) : null}
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
}

export async function exportResumePDF(data: ResumeData, template: TemplateId, filename: string) {
  const doc = template === "executive" ? <ExecutivePDF data={data} /> : <MinimalPDF data={data} />;
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
