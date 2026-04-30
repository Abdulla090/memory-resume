import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
  pdf, Svg, Path, Circle, Polygon, Rect,
} from "@react-pdf/renderer";
import type { ResumeData, TemplateId } from "@/lib/types";
import { optimizeResumeForOnePage } from "@/lib/resume-utils";
import { NoirPDF, PrismDarkPDF, PinnaclePDF, CipherPDF, VanguardPDF, SlatePDF, AvantPDF } from "./pdf-templates-extra";

const minimal = StyleSheet.create({
  page: { padding: 34, fontSize: 9, fontFamily: "Helvetica", color: "#111" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  headerMain: { flex: 1, paddingRight: 16 },
  photo: { width: 58, height: 58, borderRadius: 12, objectFit: "cover" },
  name: { fontSize: 19, fontWeight: 700 },
  title: { fontSize: 10, color: "#444", marginTop: 2 },
  contact: { fontSize: 8, color: "#777", marginTop: 4 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#ccc", marginTop: 8 },
  sectionTitle: {
    fontSize: 8,
    color: "#777",
    marginTop: 11,
    marginBottom: 5,
    letterSpacing: 2,
    fontWeight: 700,
  },
  itemHeader: { flexDirection: "row"},
  itemTitle: { fontSize: 9, fontWeight: 700 },
  itemMeta: { fontSize: 8, color: "#777" },
  bullet: { flexDirection: "row", marginTop: 1, paddingLeft: 8 },
  bulletDot: { width: 8 },
  body: { fontSize: 9, lineHeight: 1.35, color: "#222", marginTop: 2 },
});

function MinimalPDF({ data }: { data: ResumeData }) {
  const compact = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={minimal.page}>
        <View style={minimal.header}>
          <View style={minimal.headerMain}>
            <Text style={minimal.name}>{compact.name}</Text>
            <Text style={minimal.title}>{compact.title}</Text>
            <Text style={minimal.contact}>
              {[compact.location, compact.email, compact.phone].filter(Boolean).join(" · ")}
            </Text>
          </View>
          {compact.photoUrl ? <Image src={compact.photoUrl} style={minimal.photo} /> : null}
        </View>
        <View style={minimal.divider} />

        <Text style={minimal.sectionTitle}>SUMMARY</Text>
        <Text style={minimal.body}>{compact.summary}</Text>

        {compact.experience.length > 0 && (
          <>
            <Text style={minimal.sectionTitle}>EXPERIENCE</Text>
            {compact.experience.map((e, i) => (
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

        {compact.projects.length > 0 && (
          <>
            <Text style={minimal.sectionTitle}>PROJECTS</Text>
            {compact.projects.map((p, i) => (
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

        {compact.skills.length > 0 && (
          <>
            <Text style={minimal.sectionTitle}>SKILLS</Text>
            <Text style={minimal.body}>{compact.skills.join(" · ")}</Text>
          </>
        )}

        {compact.education.length > 0 && (
          <>
            <Text style={minimal.sectionTitle}>EDUCATION</Text>
            {compact.education.map((e, i) => (
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
  page: { fontSize: 9, fontFamily: "Times-Roman", color: "#111", flexDirection: "row" },
  side: { width: "33%", backgroundColor: "#111", color: "#fff", padding: 20, height: "100%" },
  main: { width: "67%", padding: 22, height: "100%" },
  photo: { width: 58, height: 58, borderRadius: 12, marginBottom: 14, objectFit: "cover" },
  name: { fontSize: 18, fontWeight: 700, color: "#fff" },
  role: { fontSize: 9, fontStyle: "italic", color: "#bbb", marginTop: 2 },
  sideContact: { fontSize: 8, color: "#ccc", marginTop: 8 },
  sideHeader: {
    fontSize: 8,
    color: "#888",
    marginTop: 14,
    marginBottom: 5,
    letterSpacing: 2,
    fontWeight: 700,
  },
  sideItem: { fontSize: 8, color: "#eee", marginBottom: 3 },
  mainHeader: {
    fontSize: 8,
    color: "#444",
    letterSpacing: 2,
    fontWeight: 700,
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 3,
  },
  expTitle: { fontSize: 10, fontWeight: 700 },
  expMeta: { fontSize: 8, fontStyle: "italic", color: "#666", marginTop: 1 },
  body: { fontSize: 9, lineHeight: 1.35, marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 1, paddingLeft: 8 },
});

function ExecutivePDF({ data }: { data: ResumeData }) {
  const compact = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={exec.page}>
        <View style={exec.side}>
          {compact.photoUrl ? <Image src={compact.photoUrl} style={exec.photo} /> : null}
          <Text style={exec.name}>{compact.name}</Text>
          <Text style={exec.role}>{compact.title}</Text>
          {compact.location ? <Text style={exec.sideContact}>{compact.location}</Text> : null}
          {compact.email ? <Text style={exec.sideContact}>{compact.email}</Text> : null}
          {compact.phone ? <Text style={exec.sideContact}>{compact.phone}</Text> : null}

          {compact.skills.length > 0 && (
            <>
              <Text style={exec.sideHeader}>EXPERTISE</Text>
              {compact.skills.map((s, i) => (
                <Text key={i} style={exec.sideItem}>
                  {s}
                </Text>
              ))}
            </>
          )}

          {compact.education.length > 0 && (
            <>
              <Text style={exec.sideHeader}>EDUCATION</Text>
              {compact.education.map((e, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ ...exec.sideItem, fontWeight: 700 }}>{e.degree}</Text>
                  <Text style={exec.sideItem}>
                    {e.institution}, {e.year}
                  </Text>
                </View>
              ))}
            </>
          )}

          {compact.certifications.length > 0 && (
            <>
              <Text style={exec.sideHeader}>CERTIFICATIONS</Text>
              {compact.certifications.map((c, i) => (
                <Text key={i} style={exec.sideItem}>
                  {c}
                </Text>
              ))}
            </>
          )}
        </View>

        <View style={exec.main}>
          <Text style={exec.mainHeader}>PROFILE</Text>
          <Text style={exec.body}>{compact.summary}</Text>

          {compact.experience.length > 0 && (
            <>
              <Text style={exec.mainHeader}>EXPERIENCE</Text>
              {compact.experience.map((e, i) => (
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

          {compact.projects.length > 0 && (
            <>
              <Text style={exec.mainHeader}>SELECTED PROJECTS</Text>
              {compact.projects.map((p, i) => (
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

const nexus = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#111" },
  header: { marginBottom: 30 },
  name: { fontSize: 28, fontWeight: 700, marginBottom: 4 },
  title: { fontSize: 12, color: "#666", marginBottom: 16 },
  contact: { fontSize: 9, color: "#777", flexDirection: "row", justifyContent: "flex-end" },
  sectionTitle: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 },
  timelineItem: { paddingLeft: 16, marginBottom: 20 },
  expTitle: { fontSize: 12, fontWeight: 700 },
  expCompany: { fontSize: 10, color: "#555", marginBottom: 4 },
  expMeta: { fontSize: 9, color: "#888", marginBottom: 4 },
  body: { fontSize: 9, lineHeight: 1.5, color: "#444" },
  bullet: { flexDirection: "row", marginBottom: 2, paddingLeft: 4 }
});

function NexusPDF({ data }: { data: ResumeData }) {
  const compact = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={nexus.page}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <View>
            <Text style={nexus.name}>{compact.name}</Text>
            <Text style={nexus.title}>{compact.title}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            {[compact.location, compact.email, compact.phone].filter(Boolean).map((c, i) => (
              <Text key={i} style={{ ...nexus.contact, marginBottom: 2 }}>{c}</Text>
            ))}
          </View>
        </View>
        
        {compact.summary ? (
          <View style={{ marginBottom: 24 }}>
            <Text style={nexus.body}>{compact.summary}</Text>
          </View>
        ) : null}

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, paddingRight: 20 }}>
            {compact.experience.length > 0 && (
              <View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                  <Text style={nexus.sectionTitle}>Experience</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: "#eaeaea", marginLeft: 8 }} />
                </View>
                <View style={{ borderLeftWidth: 1, borderLeftColor: "#ccc", marginLeft: 4 }}>
                  {compact.experience.map((e, i) => (
                    <View key={i} style={nexus.timelineItem}>
                      <Svg width="8" height="8" viewBox="0 0 12 12" style={{ position: "absolute", left: -4, top: 4 }}>
                        <Circle cx="6" cy="6" r="4" fill="#fff" stroke="#111" strokeWidth="2" />
                      </Svg>
                      <View style={{ flexDirection: "row"}}>
                        <Text style={nexus.expTitle}>{e.title}</Text>
                        <Text style={nexus.expMeta}>{e.duration}</Text>
                      </View>
                      <Text style={nexus.expCompany}>{e.company}</Text>
                      {e.achievements.map((a, j) => (
                        <View key={j} style={nexus.bullet}>
                          <Text style={{ width: 8 }}>•</Text>
                          <Text style={{ ...nexus.body, flex: 1 }}>{a}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          <View style={{ width: 180, paddingLeft: 20 }}>
            {compact.skills.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                  <Text style={nexus.sectionTitle}>Skills</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: "#eaeaea", marginLeft: 8 }} />
                </View>
                {compact.skills.map((s, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 9, fontWeight: 700, marginBottom: 2 }}>{s}</Text>
                    <Svg width="100%" height="3">
                      <Rect width="100%" height="3" fill="#eee" />
                      <Rect width={`${(compact.skillItems![i].level * 20)}%`} height="3" fill="#111" />
                    </Svg>
                  </View>
                ))}
              </View>
            )}

            {compact.education.length > 0 && (
              <View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                  <Text style={nexus.sectionTitle}>Education</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: "#eaeaea", marginLeft: 8 }} />
                </View>
                {compact.education.map((e, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, fontWeight: 700 }}>{e.degree}</Text>
                    <Text style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{e.institution}</Text>
                    <Text style={{ fontSize: 8, color: "#999", marginTop: 2 }}>{e.year}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const orbit = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#222" },
  header: { textAlign: "center", marginBottom: 30 },
  name: { fontSize: 24, fontWeight: 300, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" },
  title: { fontSize: 11, fontWeight: 700, color: "#555", marginBottom: 12 },
  contact: { flexDirection: "row", justifyContent: "center" },
  sectionTitle: { fontSize: 11, fontWeight: 300, textTransform: "uppercase", letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: "#111", paddingBottom: 4, marginBottom: 16 },
  expTitle: { fontSize: 11, fontWeight: 700 },
  expCompany: { fontSize: 10, color: "#666", marginBottom: 4 },
  body: { fontSize: 9, lineHeight: 1.5, color: "#444" },
  bullet: { flexDirection: "row", marginBottom: 2, paddingLeft: 4 }
});

function OrbitPDF({ data }: { data: ResumeData }) {
  const compact = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={orbit.page}>
        <View style={orbit.header}>
          <Text style={orbit.name}>{compact.name}</Text>
          <Text style={orbit.title}>{compact.title}</Text>
          <View style={orbit.contact}>
            {[compact.location, compact.email, compact.phone].filter(Boolean).map((c, i) => (
              <View key={i} style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 8 }}>
                <Svg width="8" height="8" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
                  <Circle cx="12" cy="12" r="10" fill="none" stroke="#222" strokeWidth="2" />
                </Svg>
                <Text style={{ fontSize: 8, color: "#777" }}>{c}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, paddingRight: 20 }}>
            {compact.experience.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <Text style={orbit.sectionTitle}>Experience</Text>
                {compact.experience.map((e, i) => (
                  <View key={i} style={{ marginBottom: 16 }}>
                    <Text style={orbit.expTitle}>{e.title}</Text>
                    <Text style={orbit.expCompany}>{e.company} | {e.duration}</Text>
                    {e.achievements.map((a, j) => (
                      <View key={j} style={orbit.bullet}>
                        <Text style={{ width: 6, fontSize: 8 }}>•</Text>
                        <Text style={{ ...orbit.body, flex: 1 }}>{a}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={{ flex: 1, paddingLeft: 20 }}>
            {compact.summary ? (
              <View style={{ marginBottom: 24 }}>
                <Text style={orbit.sectionTitle}>Profile</Text>
                <Text style={orbit.body}>{compact.summary}</Text>
              </View>
            ) : null}

            {compact.skills.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <Text style={orbit.sectionTitle}>Expertise</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {compact.skills.map((s, i) => {
                    const rating = (s.length % 3) + 3;
                    return (
                      <View key={i} style={{ width: "50%", marginBottom: 8 }}>
                        <Text style={{ fontSize: 9, fontWeight: 700, marginBottom: 2 }}>{s}</Text>
                        <View style={{ flexDirection: "row" }}>
                          {[1,2,3,4,5].map(star => (
                            <Svg key={star} width="8" height="8" viewBox="0 0 24 24" style={{ marginRight: 1 }}>
                              <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={star <= rating ? "#222" : "#eee"} />
                            </Svg>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {compact.education.length > 0 && (
              <View>
                <Text style={orbit.sectionTitle}>Education</Text>
                {compact.education.map((e, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, fontWeight: 700 }}>{e.degree}</Text>
                    <Text style={{ fontSize: 9, color: "#555" }}>{e.institution}</Text>
                    <Text style={{ fontSize: 8, color: "#888" }}>{e.year}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const metric = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: "Helvetica", color: "#000" },
  header: { borderWidth: 2, borderColor: "#000", padding: 20, marginBottom: 24 },
  name: { fontSize: 28, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 },
  title: { fontSize: 12, fontWeight: 700, color: "#444" },
  sectionTitle: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, borderBottomWidth: 2, borderBottomColor: "#000", paddingBottom: 4, marginBottom: 16 },
  body: { fontSize: 9, lineHeight: 1.5, color: "#222" },
});

function MetricPDF({ data }: { data: ResumeData }) {
  const compact = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={metric.page}>
        <View style={metric.header}>
          <Text style={metric.name}>{compact.name}</Text>
          <View style={{ flexDirection: "row"}}>
            <Text style={metric.title}>{compact.title}</Text>
            <Text style={{ fontSize: 9, color: "#555" }}>
              {[compact.location, compact.email, compact.phone].filter(Boolean).join("  //  ")}
            </Text>
          </View>
        </View>
        
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 180, paddingRight: 20 }}>
            {compact.skills.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <Text style={metric.sectionTitle}>Metrics</Text>
                {compact.skills.map((s, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                      <Text style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase" }}>{s}</Text>
                      <Text style={{ fontSize: 8, fontWeight: 700 }}>{(compact.skillItems![i].level * 20)}%</Text>
                    </View>
                    <Svg width="100%" height="6" style={{ borderWidth: 1, borderColor: "#000" }}>
                      <Rect width={`${(compact.skillItems![i].level * 20)}%`} height="6" fill="#000" />
                    </Svg>
                  </View>
                ))}
              </View>
            )}
            {compact.education.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <Text style={metric.sectionTitle}>Education</Text>
                {compact.education.map((e, i) => (
                  <View key={i} style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase" }}>{e.degree}</Text>
                    <Text style={{ fontSize: 8, color: "#444", marginTop: 2 }}>{e.institution}</Text>
                    <Text style={{ fontSize: 8, color: "#888", marginTop: 2 }}>{e.year}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={{ flex: 1, paddingLeft: 20 }}>
            {compact.summary ? (
              <View style={{ marginBottom: 24 }}>
                <Text style={metric.sectionTitle}>Executive Summary</Text>
                <Text style={metric.body}>{compact.summary}</Text>
              </View>
            ) : null}

            {compact.experience.length > 0 && (
              <View>
                <Text style={metric.sectionTitle}>Professional Experience</Text>
                {compact.experience.map((e, i) => (
                  <View key={i} style={{ marginBottom: 16, borderLeftWidth: 3, borderLeftColor: "#000", paddingLeft: 12 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 2 }}>
                      <Text style={{ fontSize: 12, fontWeight: 700 }}>{e.title}</Text>
                      <View style={{ backgroundColor: "#000", paddingHorizontal: 4, paddingVertical: 2 }}>
                        <Text style={{ fontSize: 8, fontWeight: 700, color: "#fff" }}>{e.duration}</Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 10, fontWeight: 700, color: "#555", marginBottom: 6 }}>{e.company}</Text>
                    {e.achievements.map((a, j) => (
                      <View key={j} style={{ flexDirection: "row", marginBottom: 2, paddingLeft: 4 }}>
                        <Text style={{ width: 6, fontSize: 8 }}>•</Text>
                        <Text style={{ ...metric.body, flex: 1 }}>{a}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const prism = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1a1a1a" },
  header: { marginBottom: 30, textAlign: "center" },
  name: { fontSize: 26, fontWeight: 300, letterSpacing: -1, marginBottom: 4 },
  title: { fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 8 },
  sectionTitle: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 },
  body: { fontSize: 9, lineHeight: 1.5, color: "#444" },
});

function PrismPDF({ data }: { data: ResumeData }) {
  const compact = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={prism.page}>
        <View style={prism.header}>
          <View style={{ alignItems: "center", marginBottom: 12 }}>
            <Svg width="24" height="24" viewBox="0 0 24 24">
              <Polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="none" stroke="#111" strokeWidth="1.5" />
            </Svg>
          </View>
          <Text style={prism.name}>{compact.name}</Text>
          <Text style={prism.title}>{compact.title}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 4 }}>
            {[compact.location, compact.email, compact.phone].filter(Boolean).map((c, i) => (
              <View key={i} style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 6 }}>
                {i > 0 && (
                  <Svg width="4" height="4" style={{ marginRight: 6 }}>
                    <Rect width="4" height="4" fill="#ccc" />
                  </Svg>
                )}
                <Text style={{ fontSize: 8, color: "#888" }}>{c}</Text>
              </View>
            ))}
          </View>
        </View>

        {compact.summary ? (
          <View style={{ marginBottom: 30, paddingHorizontal: 30, textAlign: "center" }}>
            <Text style={prism.body}>{compact.summary}</Text>
          </View>
        ) : null}

        {compact.experience.length > 0 && (
          <View style={{ marginBottom: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <Svg width="8" height="8" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
                <Polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="none" stroke="#111" strokeWidth="2" />
              </Svg>
              <Text style={prism.sectionTitle}>Experience</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: "#eee", marginLeft: 8 }} />
            </View>
            {compact.experience.map((e, i) => (
              <View key={i} style={{ marginBottom: 16 }}>
                <View style={{ flexDirection: "row"}}>
                  <Text style={{ fontSize: 11, fontWeight: 700 }}>{e.title}</Text>
                  <Text style={{ fontSize: 9, color: "#999" }}>{e.duration}</Text>
                </View>
                <Text style={{ fontSize: 10, color: "#555", marginBottom: 6 }}>{e.company}</Text>
                {e.achievements.map((a, j) => (
                  <View key={j} style={{ flexDirection: "row", marginBottom: 3 }}>
                    <Svg width="4" height="4" viewBox="0 0 6 6" style={{ marginTop: 2, marginRight: 6 }}>
                      <Polygon points="3 0 6 3 3 6 0 3" fill="#111" />
                    </Svg>
                    <Text style={{ ...prism.body, flex: 1 }}>{a}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, paddingRight: 20 }}>
            {compact.skills.length > 0 && (
              <View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                  <Svg width="8" height="8" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
                    <Polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="none" stroke="#111" strokeWidth="2" />
                  </Svg>
                  <Text style={prism.sectionTitle}>Skills</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: "#eee", marginLeft: 8 }} />
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {compact.skills.map((s, i) => (
                    <Text key={i} style={{ fontSize: 9, color: "#333", borderWidth: 1, borderColor: "#ddd", paddingHorizontal: 6, paddingVertical: 3, marginRight: 6, marginBottom: 6 }}>
                      {s}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
          
          <View style={{ flex: 1, paddingLeft: 20 }}>
            {compact.education.length > 0 && (
              <View>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                  <Svg width="8" height="8" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
                    <Polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="none" stroke="#111" strokeWidth="2" />
                  </Svg>
                  <Text style={prism.sectionTitle}>Education</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: "#eee", marginLeft: 8 }} />
                </View>
                {compact.education.map((e, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 10, fontWeight: 700 }}>{e.degree}</Text>
                    <Text style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{e.institution}</Text>
                    <Text style={{ fontSize: 8, color: "#aaa", marginTop: 2 }}>{e.year}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}


// ─── CARBON ─── Dark charcoal accent bar, stark white body, heavy type weight
const carbon = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", color: "#111", flexDirection: "row" },
  bar: { width: 6, backgroundColor: "#1a1a1a", height: "100%" },
  side: { width: "30%", backgroundColor: "#f4f4f4", padding: 20, height: "100%" },
  main: { width: "64%", padding: 22, height: "100%" },
  photo: { width: 64, height: 64, borderRadius: 6, marginBottom: 12, objectFit: "cover" },
  name: { fontSize: 20, fontWeight: 700, letterSpacing: 1 },
  title: { fontSize: 9, color: "#555", marginTop: 2, marginBottom: 14, letterSpacing: 2 },
  sideSection: { fontSize: 7, fontWeight: 700, color: "#999", letterSpacing: 2, marginTop: 14, marginBottom: 5 },
  sideText: { fontSize: 8, color: "#333", marginBottom: 3, lineHeight: 1.4 },
  mainSection: { fontSize: 8, fontWeight: 700, color: "#1a1a1a", letterSpacing: 2, marginTop: 14, marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: "#1a1a1a", paddingBottom: 3 },
  expTitle: { fontSize: 10, fontWeight: 700 },
  expMeta: { fontSize: 8, color: "#777", marginTop: 1, marginBottom: 3 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#333" },
  bullet: { flexDirection: "row", marginTop: 2, paddingLeft: 8 },
});

function CarbonPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={carbon.page}>
        <View style={carbon.bar} />
        <View style={carbon.side}>
          {c.photoUrl ? <Image src={c.photoUrl} style={carbon.photo} /> : null}
          <Text style={carbon.name}>{c.name}</Text>
          <Text style={carbon.title}>{c.title.toUpperCase()}</Text>
          {c.location ? <Text style={carbon.sideText}>{c.location}</Text> : null}
          {c.email ? <Text style={carbon.sideText}>{c.email}</Text> : null}
          {c.phone ? <Text style={carbon.sideText}>{c.phone}</Text> : null}
          {c.skills.length > 0 && (<><Text style={carbon.sideSection}>SKILLS</Text>{c.skills.map((s, i) => <Text key={i} style={carbon.sideText}>— {s}</Text>)}</>)}
          {c.education.length > 0 && (<><Text style={carbon.sideSection}>EDUCATION</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...carbon.sideText, fontWeight: 700 }}>{e.degree}</Text><Text style={carbon.sideText}>{e.institution}</Text><Text style={{ ...carbon.sideText, color: "#999" }}>{e.year}</Text></View>)}</>)}
          {c.certifications.length > 0 && (<><Text style={carbon.sideSection}>CERTS</Text>{c.certifications.map((cert, i) => <Text key={i} style={carbon.sideText}>{cert}</Text>)}</>)}
        </View>
        <View style={carbon.main}>
          <Text style={carbon.mainSection}>PROFILE</Text>
          <Text style={carbon.body}>{c.summary}</Text>
          {c.experience.length > 0 && (<><Text style={carbon.mainSection}>EXPERIENCE</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 10 }}><Text style={carbon.expTitle}>{e.title}</Text><Text style={carbon.expMeta}>{e.company} · {e.duration}</Text>{e.description ? <Text style={carbon.body}>{e.description}</Text> : null}{e.achievements.map((a, j) => <View key={j} style={carbon.bullet}><Text style={{ width: 8 }}>▪</Text><Text style={{ ...carbon.body, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View>)}</>)}
          {c.projects.length > 0 && (<><Text style={carbon.mainSection}>PROJECTS</Text>{c.projects.map((p, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...carbon.expTitle, fontSize: 9 }}>{p.name}</Text><Text style={carbon.body}>{p.description}</Text>{p.impact ? <Text style={carbon.expMeta}>Impact: {p.impact}</Text> : null}</View>)}</>)}
        </View>
      </Page>
    </Document>
  );
}

// ─── ATLAS ─── Wide top header band, clean grid below, corporate authority
const atlas = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", color: "#111" },
  header: { backgroundColor: "#0f1923", padding: 28, flexDirection: "row", alignItems: "flex-start" },
  photo: { width: 64, height: 64, borderRadius: 4, marginRight: 20, objectFit: "cover" },
  headerText: { flex: 1 },
  name: { fontSize: 24, fontWeight: 700, color: "#fff", letterSpacing: 1 },
  title: { fontSize: 10, color: "#aaa", marginTop: 3, letterSpacing: 1 },
  contacts: { fontSize: 8, color: "#888", marginTop: 8, flexDirection: "row", flexWrap: "wrap", gap: 12 },
  body: { padding: 24 },
  cols: { flexDirection: "row", gap: 20 , flex: 1 },
  mainCol: { flex: 2 },
  sideCol: { flex: 1 },
  section: { fontSize: 8, fontWeight: 700, color: "#0f1923", letterSpacing: 2, marginTop: 16, marginBottom: 6, borderBottomWidth: 1, borderBottomColor: "#ddd", paddingBottom: 3 },
  expTitle: { fontSize: 10, fontWeight: 700 },
  expMeta: { fontSize: 8, color: "#666", marginTop: 1 },
  textBody: { fontSize: 8.5, lineHeight: 1.5, color: "#333", marginTop: 3 },
  bullet: { flexDirection: "row", marginTop: 2 },
  sideText: { fontSize: 8, color: "#444", marginBottom: 3, lineHeight: 1.4 },
});

function AtlasPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={atlas.page}>
        <View style={atlas.header}>
          {c.photoUrl ? <Image src={c.photoUrl} style={atlas.photo} /> : null}
          <View style={atlas.headerText}>
            <Text style={atlas.name}>{c.name}</Text>
            <Text style={atlas.title}>{c.title.toUpperCase()}</Text>
            <View style={atlas.contacts}>
              {c.location ? <Text>{c.location}</Text> : null}
              {c.email ? <Text>{c.email}</Text> : null}
              {c.phone ? <Text>{c.phone}</Text> : null}
            </View>
          </View>
        </View>
        <View style={atlas.body}>
          <Text style={atlas.textBody}>{c.summary}</Text>
          <View style={atlas.cols}>
            <View style={atlas.mainCol}>
              {c.experience.length > 0 && (<><Text style={atlas.section}>EXPERIENCE</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 10 }}><Text style={atlas.expTitle}>{e.title}</Text><Text style={atlas.expMeta}>{e.company} · {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={atlas.bullet}><Text style={{ width: 10, color: "#0f1923" }}>›</Text><Text style={{ ...atlas.textBody, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View>)}</>)}
              {c.projects.length > 0 && (<><Text style={atlas.section}>PROJECTS</Text>{c.projects.map((p, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...atlas.expTitle, fontSize: 9 }}>{p.name}</Text><Text style={atlas.textBody}>{p.description}</Text></View>)}</>)}
            </View>
            <View style={atlas.sideCol}>
              {c.skills.length > 0 && (<><Text style={atlas.section}>SKILLS</Text>{c.skills.map((s, i) => <Text key={i} style={atlas.sideText}>· {s}</Text>)}</>)}
              {c.education.length > 0 && (<><Text style={atlas.section}>EDUCATION</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...atlas.sideText, fontWeight: 700 }}>{e.degree}</Text><Text style={atlas.sideText}>{e.institution}, {e.year}</Text></View>)}</>)}
              {c.certifications.length > 0 && (<><Text style={atlas.section}>CERTS</Text>{c.certifications.map((cert, i) => <Text key={i} style={atlas.sideText}>{cert}</Text>)}</>)}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─── FORGE ─── Industrial left-border accent, monospaced role labels, brutalist precision
const forge = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", color: "#111", padding: 36 },
  photo: { width: 56, height: 56, borderRadius: 3, objectFit: "cover", marginBottom: 10 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", borderBottomWidth: 2, borderBottomColor: "#111", paddingBottom: 10, marginBottom: 14 },
  name: { fontSize: 26, fontWeight: 700, letterSpacing: -0.5 },
  title: { fontSize: 9, color: "#555", letterSpacing: 2, marginTop: 3 },
  contactBlock: { alignItems: "flex-end" },
  contactText: { fontSize: 7.5, color: "#555", marginBottom: 2 },
  section: { fontSize: 7.5, fontWeight: 700, letterSpacing: 3, color: "#111", marginTop: 16, marginBottom: 6 },
  expRow: { flexDirection: "row", marginBottom: 10 },
  expBar: { width: 2, backgroundColor: "#111", marginRight: 10, marginTop: 3 },
  expContent: { flex: 1 },
  expTitle: { fontSize: 10, fontWeight: 700 },
  expMeta: { fontSize: 8, color: "#666", fontFamily: "Courier", marginTop: 1, marginBottom: 3 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#333" },
  bullet: { flexDirection: "row", marginTop: 1 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
  skillPill: { borderWidth: 0.5, borderColor: "#333", paddingHorizontal: 6, paddingVertical: 2, fontSize: 7.5 },
});

function ForgePDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={forge.page}>
        <View style={forge.headerRow}>
          <View>
            {c.photoUrl ? <Image src={c.photoUrl} style={forge.photo} /> : null}
            <Text style={forge.name}>{c.name}</Text>
            <Text style={forge.title}>{c.title.toUpperCase()}</Text>
          </View>
          <View style={forge.contactBlock}>
            {c.location ? <Text style={forge.contactText}>{c.location}</Text> : null}
            {c.email ? <Text style={forge.contactText}>{c.email}</Text> : null}
            {c.phone ? <Text style={forge.contactText}>{c.phone}</Text> : null}
          </View>
        </View>
        <Text style={forge.body}>{c.summary}</Text>
        {c.experience.length > 0 && (<><Text style={forge.section}>EXPERIENCE</Text>{c.experience.map((e, i) => <View key={i} style={forge.expRow}><View style={forge.expBar} /><View style={forge.expContent}><Text style={forge.expTitle}>{e.title}</Text><Text style={forge.expMeta}>{e.company} / {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={forge.bullet}><Text style={{ width: 10 }}>—</Text><Text style={{ ...forge.body, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View></View>)}</>)}
        {c.skills.length > 0 && (<><Text style={forge.section}>SKILLS</Text><View style={forge.skillsRow}>{c.skills.map((s, i) => <Text key={i} style={forge.skillPill}>{s}</Text>)}</View></>)}
        {c.education.length > 0 && (<><Text style={forge.section}>EDUCATION</Text>{c.education.map((e, i) => <Text key={i} style={forge.body}>{e.degree} · {e.institution} · {e.year}</Text>)}</>)}
      </Page>
    </Document>
  );
}

// ─── ZENITH ─── Ultra-premium: photo circle, gold accent rules, wide whitespace
const zenith = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", color: "#111", padding: 40 },
  top: { alignItems: "center", marginBottom: 24 },
  photo: { width: 72, height: 72, borderRadius: 36, objectFit: "cover", marginBottom: 10 },
  name: { fontSize: 28, fontWeight: 700, letterSpacing: 2, textAlign: "center" },
  title: { fontSize: 9, color: "#888", letterSpacing: 3, marginTop: 4, textAlign: "center" },
  rule: { height: 0.5, backgroundColor: "#c9a84c", marginTop: 6, width: "30%" },
  contacts: { flexDirection: "row", justifyContent: "center", gap: 18, marginTop: 6 },
  contactText: { fontSize: 7.5, color: "#666" },
  section: { fontSize: 7.5, fontWeight: 700, letterSpacing: 3, color: "#c9a84c", marginTop: 18, marginBottom: 8, textAlign: "center" },
  divider: { height: 0.5, backgroundColor: "#e5e5e5", marginBottom: 10 },
  expTitle: { fontSize: 10, fontWeight: 700 },
  expMeta: { fontSize: 8, color: "#888", marginTop: 1, marginBottom: 4 },
  body: { fontSize: 8.5, lineHeight: 1.6, color: "#333" },
  bullet: { flexDirection: "row", marginTop: 2 },
  cols: { flexDirection: "row", gap: 24 , flex: 1 },
  mainCol: { flex: 1.6 },
  sideCol: { flex: 1 },
  sideText: { fontSize: 8, color: "#444", marginBottom: 4, lineHeight: 1.4 },
});

function ZenithPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={zenith.page}>
        <View style={zenith.top}>
          {c.photoUrl ? <Image src={c.photoUrl} style={zenith.photo} /> : null}
          <Text style={zenith.name}>{c.name}</Text>
          <Text style={zenith.title}>{c.title.toUpperCase()}</Text>
          <View style={zenith.rule} />
          <View style={zenith.contacts}>
            {c.location ? <Text style={zenith.contactText}>{c.location}</Text> : null}
            {c.email ? <Text style={zenith.contactText}>{c.email}</Text> : null}
            {c.phone ? <Text style={zenith.contactText}>{c.phone}</Text> : null}
          </View>
        </View>
        <Text style={zenith.body}>{c.summary}</Text>
        <View style={zenith.cols}>
          <View style={zenith.mainCol}>
            {c.experience.length > 0 && (<><Text style={zenith.section}>EXPERIENCE</Text><View style={zenith.divider} />{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 12 }}><Text style={zenith.expTitle}>{e.title}</Text><Text style={zenith.expMeta}>{e.company} · {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={zenith.bullet}><Text style={{ width: 10, color: "#c9a84c" }}>›</Text><Text style={{ ...zenith.body, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View>)}</>)}
          </View>
          <View style={zenith.sideCol}>
            {c.skills.length > 0 && (<><Text style={zenith.section}>SKILLS</Text><View style={zenith.divider} />{c.skills.map((s, i) => <Text key={i} style={zenith.sideText}>{s}</Text>)}</>)}
            {c.education.length > 0 && (<><Text style={zenith.section}>EDUCATION</Text><View style={zenith.divider} />{c.education.map((e, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...zenith.sideText, fontWeight: 700 }}>{e.degree}</Text><Text style={zenith.sideText}>{e.institution} · {e.year}</Text></View>)}</>)}
            {c.certifications.length > 0 && (<><Text style={zenith.section}>CERTS</Text><View style={zenith.divider} />{c.certifications.map((cert, i) => <Text key={i} style={zenith.sideText}>{cert}</Text>)}</>)}
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─── VECTOR ─── Dark mode, neon-blue accent, tech/engineering aesthetic
const vector = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Courier", color: "#e2e8f0", backgroundColor: "#0d1117" },
  header: { backgroundColor: "#161b22", padding: 24, borderBottomWidth: 1, borderBottomColor: "#30363d" },
  photo: { width: 56, height: 56, borderRadius: 4, objectFit: "cover", marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 700, color: "#58a6ff", letterSpacing: 1 },
  title: { fontSize: 9, color: "#8b949e", marginTop: 3, letterSpacing: 1 },
  contacts: { flexDirection: "row", gap: 16, marginTop: 8 },
  contactText: { fontSize: 7.5, color: "#8b949e" },
  body: { padding: 22 },
  section: { fontSize: 7.5, fontWeight: 700, letterSpacing: 3, color: "#58a6ff", marginTop: 16, marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: "#30363d", paddingBottom: 3 },
  expTitle: { fontSize: 10, fontWeight: 700, color: "#f0f6fc" },
  expMeta: { fontSize: 8, color: "#8b949e", marginTop: 1, marginBottom: 3 },
  textBody: { fontSize: 8.5, lineHeight: 1.5, color: "#c9d1d9" },
  bullet: { flexDirection: "row", marginTop: 2 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginTop: 4 },
  skillPill: { backgroundColor: "#21262d", borderWidth: 0.5, borderColor: "#58a6ff", paddingHorizontal: 7, paddingVertical: 2, fontSize: 7.5, color: "#58a6ff" },
  cols: { flexDirection: "row", gap: 18 , flex: 1 },
});

function VectorPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  return (
    <Document>
      <Page size="A4" style={vector.page}>
        <View style={vector.header}>
          {c.photoUrl ? <Image src={c.photoUrl} style={vector.photo} /> : null}
          <Text style={vector.name}>{c.name}</Text>
          <Text style={vector.title}>{c.title}</Text>
          <View style={vector.contacts}>
            {c.location ? <Text style={vector.contactText}>{c.location}</Text> : null}
            {c.email ? <Text style={vector.contactText}>{c.email}</Text> : null}
            {c.phone ? <Text style={vector.contactText}>{c.phone}</Text> : null}
          </View>
        </View>
        <View style={vector.body}>
          <Text style={vector.textBody}>{c.summary}</Text>
          <View style={vector.cols}>
            <View style={{ flex: 1.7 }}>
              {c.experience.length > 0 && (<><Text style={vector.section}>// EXPERIENCE</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 10 }}><Text style={vector.expTitle}>{e.title}</Text><Text style={vector.expMeta}>{e.company} · {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={vector.bullet}><Text style={{ width: 12, color: "#58a6ff" }}>→</Text><Text style={{ ...vector.textBody, flex: 1, marginTop: 0 }}>{a}</Text></View>)}</View>)}</>)}
              {c.projects.length > 0 && (<><Text style={vector.section}>// PROJECTS</Text>{c.projects.map((p, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...vector.expTitle, fontSize: 9 }}>{p.name}</Text><Text style={vector.textBody}>{p.description}</Text></View>)}</>)}
            </View>
            <View style={{ flex: 1 }}>
              {c.skills.length > 0 && (<><Text style={vector.section}>// STACK</Text><View style={vector.skillsRow}>{c.skills.map((s, i) => <Text key={i} style={vector.skillPill}>{s}</Text>)}</View></>)}
              {c.education.length > 0 && (<><Text style={vector.section}>// EDUCATION</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...vector.textBody, fontWeight: 700, color: "#f0f6fc" }}>{e.degree}</Text><Text style={vector.expMeta}>{e.institution} · {e.year}</Text></View>)}</>)}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const rtlTextPattern = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;

function pdfIsRTL(data: ResumeData) {
  return rtlTextPattern.test([
    data.name,
    data.title,
    data.location,
    data.summary,
    ...data.skills,
    ...data.certifications,
    ...data.experience.flatMap((item) => [item.title, item.company, item.description, ...item.achievements]),
    ...data.projects.flatMap((item) => [item.name, item.description, item.impact, ...item.tech]),
    ...data.education.flatMap((item) => [item.degree, item.institution]),
  ].filter(Boolean).join(" "));
}

function pdfLabels(rtl: boolean) {
  return rtl
    ? { profile: "PROFILE", experience: "EXPERIENCE", projects: "PROJECTS", skills: "SKILLS", education: "EDUCATION", certifications: "CERTIFICATIONS", contact: "CONTACT" }
    : { profile: "PROFILE", experience: "EXPERIENCE", projects: "PROJECTS", skills: "SKILLS", education: "EDUCATION", certifications: "CERTIFICATIONS", contact: "CONTACT" };
}

const newSleek = StyleSheet.create({
  page: { padding: 34, fontSize: 9, fontFamily: "Helvetica", color: "#0f172a", backgroundColor: "#ffffff" },
  header: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#d8dee8", paddingBottom: 22 },
  headerRTL: { flexDirection: "row-reverse" },
  accent: { width: 70, height: 4, backgroundColor: "#0f172a", borderRadius: 4, marginBottom: 14 },
  name: { fontSize: 28, fontWeight: 700, lineHeight: 0.95 },
  title: { fontSize: 8, color: "#64748b", letterSpacing: 2, marginTop: 10 },
  photo: { width: 76, height: 76, borderRadius: 14, objectFit: "cover", marginBottom: 10 },
  contact: { fontSize: 7.5, color: "#64748b", marginBottom: 3 },
  bodyGrid: { flexDirection: "row", gap: 24, paddingTop: 20 },
  bodyGridRTL: { flexDirection: "row-reverse" },
  main: { flex: 1 },
  side: { width: 150, borderLeftWidth: 1, borderLeftColor: "#e2e8f0", paddingLeft: 16 },
  sideRTL: { borderLeftWidth: 0, borderRightWidth: 1, borderRightColor: "#e2e8f0", paddingLeft: 0, paddingRight: 16 },
  section: { fontSize: 7.5, fontWeight: 700, letterSpacing: 2, borderBottomWidth: 0.7, borderBottomColor: "#0f172a", paddingBottom: 4, marginBottom: 8, marginTop: 12 },
  body: { fontSize: 8.3, lineHeight: 1.45, color: "#334155" },
  itemTitle: { fontSize: 9.5, fontWeight: 700, color: "#0f172a" },
  itemMeta: { fontSize: 7.3, color: "#64748b", marginTop: 2, marginBottom: 3 },
  bullet: { flexDirection: "row", marginTop: 2 },
  chip: { fontSize: 7.2, borderWidth: 0.6, borderColor: "#d8dee8", paddingHorizontal: 5, paddingVertical: 2, marginRight: 4, marginBottom: 4, borderRadius: 8 },
});

function NewSleekPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = pdfIsRTL(c);
  const l = pdfLabels(rtl);
  const align = rtl ? "right" : "left";
  return (
    <Document>
      <Page size="A4" style={newSleek.page}>
        <View style={[newSleek.header, rtl && newSleek.headerRTL]}>
          <View style={{ flex: 1 }}>
            <View style={newSleek.accent} />
            <Text style={{ ...newSleek.name, textAlign: align }}>{c.name}</Text>
            <Text style={{ ...newSleek.title, textAlign: align }}>{c.title.toUpperCase()}</Text>
          </View>
          <View style={{ alignItems: rtl ? "flex-start" : "flex-end", width: 130 }}>
            {c.photoUrl ? <Image src={c.photoUrl} style={newSleek.photo} /> : <View style={{ ...newSleek.photo, backgroundColor: "#e2e8f0" }} />}
            {[c.location, c.email, c.phone].filter(Boolean).map((item) => <Text key={item} style={{ ...newSleek.contact, textAlign: align }}>{item}</Text>)}
          </View>
        </View>
        <View style={[newSleek.bodyGrid, rtl && newSleek.bodyGridRTL]}>
          <View style={newSleek.main}>
            <Text style={{ ...newSleek.section, textAlign: align }}>{l.profile}</Text>
            <Text style={{ ...newSleek.body, textAlign: align }}>{c.summary}</Text>
            {c.experience.length > 0 ? <><Text style={{ ...newSleek.section, textAlign: align }}>{l.experience}</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 9 }}><Text style={{ ...newSleek.itemTitle, textAlign: align }}>{e.title}</Text><Text style={{ ...newSleek.itemMeta, textAlign: align }}>{e.company} / {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={{ ...newSleek.bullet, flexDirection: rtl ? "row-reverse" : "row" }}><Text style={{ width: 10, color: "#0f172a" }}>-</Text><Text style={{ ...newSleek.body, flex: 1, textAlign: align }}>{a}</Text></View>)}</View>)}</> : null}
            {c.projects.length > 0 ? <><Text style={{ ...newSleek.section, textAlign: align }}>{l.projects}</Text>{c.projects.map((p, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...newSleek.itemTitle, textAlign: align }}>{p.name}</Text><Text style={{ ...newSleek.body, textAlign: align }}>{p.description}</Text></View>)}</> : null}
          </View>
          <View style={[newSleek.side, rtl && newSleek.sideRTL]}>
            {c.skills.length > 0 ? <><Text style={{ ...newSleek.section, textAlign: align }}>{l.skills}</Text><View style={{ flexDirection: rtl ? "row-reverse" : "row", flexWrap: "wrap" }}>{c.skills.map((skill) => <Text key={skill} style={newSleek.chip}>{skill}</Text>)}</View></> : null}
            {c.education.length > 0 ? <><Text style={{ ...newSleek.section, textAlign: align }}>{l.education}</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 7 }}><Text style={{ ...newSleek.itemTitle, fontSize: 8.5, textAlign: align }}>{e.degree}</Text><Text style={{ ...newSleek.body, textAlign: align }}>{e.institution} / {e.year}</Text></View>)}</> : null}
            {c.certifications.length > 0 ? <><Text style={{ ...newSleek.section, textAlign: align }}>{l.certifications}</Text>{c.certifications.map((cert) => <Text key={cert} style={{ ...newSleek.body, marginBottom: 4, textAlign: align }}>{cert}</Text>)}</> : null}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const newProfessional = StyleSheet.create({
  page: { padding: 24, fontSize: 9, fontFamily: "Helvetica", color: "#0f172a", backgroundColor: "#f8fafc" },
  shell: { flexDirection: "row", minHeight: 794, borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 18, overflow: "hidden", backgroundColor: "#ffffff" },
  shellRTL: { flexDirection: "row-reverse" },
  side: { width: 165, backgroundColor: "#0f172a", color: "#ffffff", padding: 20 },
  photo: { width: 74, height: 74, borderRadius: 37, objectFit: "cover", marginBottom: 18 },
  sideName: { fontSize: 19, fontWeight: 700, lineHeight: 1.05, color: "#ffffff" },
  sideRole: { fontSize: 7.5, letterSpacing: 1.5, color: "#a5f3fc", marginTop: 8 },
  sideHeading: { fontSize: 7.5, letterSpacing: 1.8, color: "#94a3b8", marginTop: 18, marginBottom: 7 },
  sideText: { fontSize: 7.8, color: "#e2e8f0", lineHeight: 1.35, marginBottom: 5 },
  main: { flex: 1, padding: 24 },
  profileBox: { backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 16, padding: 14, marginBottom: 14 },
  heading: { fontSize: 7.5, fontWeight: 700, letterSpacing: 2, color: "#0e7490", borderBottomWidth: 0.7, borderBottomColor: "#0e7490", paddingBottom: 4, marginTop: 12, marginBottom: 8 },
  body: { fontSize: 8.3, lineHeight: 1.45, color: "#334155" },
  title: { fontSize: 9.5, fontWeight: 700 },
  meta: { fontSize: 7.5, color: "#64748b", marginTop: 2, marginBottom: 3 },
  bullet: { flexDirection: "row", marginTop: 2 },
});

function NewProfessionalPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = pdfIsRTL(c);
  const l = pdfLabels(rtl);
  const align = rtl ? "right" : "left";
  return (
    <Document>
      <Page size="A4" style={newProfessional.page}>
        <View style={[newProfessional.shell, rtl && newProfessional.shellRTL]}>
          <View style={newProfessional.side}>
            {c.photoUrl ? <Image src={c.photoUrl} style={newProfessional.photo} /> : <View style={{ ...newProfessional.photo, backgroundColor: "#334155" }} />}
            <Text style={{ ...newProfessional.sideName, textAlign: align }}>{c.name}</Text>
            <Text style={{ ...newProfessional.sideRole, textAlign: align }}>{c.title.toUpperCase()}</Text>
            <Text style={{ ...newProfessional.sideHeading, textAlign: align }}>{l.contact}</Text>
            {[c.location, c.email, c.phone].filter(Boolean).map((item) => <Text key={item} style={{ ...newProfessional.sideText, textAlign: align }}>{item}</Text>)}
            {c.skills.length > 0 ? <><Text style={{ ...newProfessional.sideHeading, textAlign: align }}>{l.skills}</Text>{c.skills.map((skill) => <Text key={skill} style={{ ...newProfessional.sideText, textAlign: align }}>{skill}</Text>)}</> : null}
          </View>
          <View style={newProfessional.main}>
            <View style={newProfessional.profileBox}>
              <Text style={{ ...newProfessional.heading, marginTop: 0, textAlign: align }}>{l.profile}</Text>
              <Text style={{ ...newProfessional.body, textAlign: align }}>{c.summary}</Text>
            </View>
            {c.experience.length > 0 ? <><Text style={{ ...newProfessional.heading, textAlign: align }}>{l.experience}</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 9, borderLeftWidth: rtl ? 0 : 1.5, borderRightWidth: rtl ? 1.5 : 0, borderColor: "#cbd5e1", paddingLeft: rtl ? 0 : 10, paddingRight: rtl ? 10 : 0 }}><Text style={{ ...newProfessional.title, textAlign: align }}>{e.title}</Text><Text style={{ ...newProfessional.meta, textAlign: align }}>{e.company} / {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={{ ...newProfessional.bullet, flexDirection: rtl ? "row-reverse" : "row" }}><Text style={{ width: 10 }}>-</Text><Text style={{ ...newProfessional.body, flex: 1, textAlign: align }}>{a}</Text></View>)}</View>)}</> : null}
            <View style={{ flexDirection: rtl ? "row-reverse" : "row", gap: 16 }}>
              <View style={{ flex: 1 }}>{c.projects.length > 0 ? <><Text style={{ ...newProfessional.heading, textAlign: align }}>{l.projects}</Text>{c.projects.map((p, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...newProfessional.title, fontSize: 8.8, textAlign: align }}>{p.name}</Text><Text style={{ ...newProfessional.body, textAlign: align }}>{p.description}</Text></View>)}</> : null}</View>
              <View style={{ flex: 1 }}>{c.education.length > 0 ? <><Text style={{ ...newProfessional.heading, textAlign: align }}>{l.education}</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...newProfessional.title, fontSize: 8.8, textAlign: align }}>{e.degree}</Text><Text style={{ ...newProfessional.body, textAlign: align }}>{e.institution} / {e.year}</Text></View>)}</> : null}</View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const newAcademic = StyleSheet.create({
  page: { padding: 38, fontSize: 9, fontFamily: "Times-Roman", color: "#111827", backgroundColor: "#ffffff" },
  header: { flexDirection: "row", gap: 22, borderBottomWidth: 1.6, borderBottomColor: "#111827", paddingBottom: 18 },
  headerRTL: { flexDirection: "row-reverse" },
  photo: { width: 72, height: 88, borderTopLeftRadius: 36, borderTopRightRadius: 36, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, objectFit: "cover" },
  kicker: { fontSize: 7.5, letterSpacing: 2.2, color: "#64748b", marginBottom: 8 },
  name: { fontSize: 26, fontWeight: 700 },
  role: { fontSize: 11, color: "#334155", marginTop: 4 },
  contacts: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 9 },
  contact: { fontSize: 7.5, color: "#64748b" },
  grid: { flexDirection: "row", gap: 24, paddingTop: 18 },
  gridRTL: { flexDirection: "row-reverse" },
  main: { flex: 1 },
  side: { width: 150 },
  heading: { fontSize: 7.8, fontWeight: 700, letterSpacing: 2, borderBottomWidth: 0.7, borderBottomColor: "#111827", paddingBottom: 4, marginTop: 12, marginBottom: 8 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#334155" },
  itemTitle: { fontSize: 9.5, fontWeight: 700 },
  itemMeta: { fontSize: 7.8, color: "#64748b", marginTop: 2, marginBottom: 3 },
  bullet: { flexDirection: "row", marginTop: 2 },
});

function NewAcademicPDF({ data }: { data: ResumeData }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = pdfIsRTL(c);
  const l = pdfLabels(rtl);
  const align = rtl ? "right" : "left";
  return (
    <Document>
      <Page size="A4" style={newAcademic.page}>
        <View style={[newAcademic.header, rtl && newAcademic.headerRTL]}>
          {c.photoUrl ? <Image src={c.photoUrl} style={newAcademic.photo} /> : <View style={{ ...newAcademic.photo, backgroundColor: "#e2e8f0" }} />}
          <View style={{ flex: 1 }}>
            <Text style={{ ...newAcademic.kicker, textAlign: align }}>SELECTED CURRICULUM VITAE</Text>
            <Text style={{ ...newAcademic.name, textAlign: align }}>{c.name}</Text>
            <Text style={{ ...newAcademic.role, textAlign: align }}>{c.title}</Text>
            <View style={{ ...newAcademic.contacts, flexDirection: rtl ? "row-reverse" : "row" }}>{[c.location, c.email, c.phone].filter(Boolean).map((item) => <Text key={item} style={newAcademic.contact}>{item}</Text>)}</View>
          </View>
        </View>
        <View style={[newAcademic.grid, rtl && newAcademic.gridRTL]}>
          <View style={newAcademic.main}>
            <Text style={{ ...newAcademic.heading, textAlign: align }}>{l.profile}</Text>
            <Text style={{ ...newAcademic.body, textAlign: align }}>{c.summary}</Text>
            {c.experience.length > 0 ? <><Text style={{ ...newAcademic.heading, textAlign: align }}>{l.experience}</Text>{c.experience.map((e, i) => <View key={i} style={{ marginBottom: 9 }}><Text style={{ ...newAcademic.itemTitle, textAlign: align }}>{e.title}</Text><Text style={{ ...newAcademic.itemMeta, textAlign: align }}>{e.company} / {e.duration}</Text>{e.achievements.map((a, j) => <View key={j} style={{ ...newAcademic.bullet, flexDirection: rtl ? "row-reverse" : "row" }}><Text style={{ width: 10 }}>-</Text><Text style={{ ...newAcademic.body, flex: 1, textAlign: align }}>{a}</Text></View>)}</View>)}</> : null}
            {c.projects.length > 0 ? <><Text style={{ ...newAcademic.heading, textAlign: align }}>{l.projects}</Text>{c.projects.map((p, i) => <View key={i} style={{ marginBottom: 6 }}><Text style={{ ...newAcademic.itemTitle, textAlign: align }}>{p.name}</Text><Text style={{ ...newAcademic.body, textAlign: align }}>{p.description}</Text>{p.impact ? <Text style={{ ...newAcademic.itemMeta, textAlign: align }}>{p.impact}</Text> : null}</View>)}</> : null}
          </View>
          <View style={newAcademic.side}>
            {c.education.length > 0 ? <><Text style={{ ...newAcademic.heading, textAlign: align }}>{l.education}</Text>{c.education.map((e, i) => <View key={i} style={{ marginBottom: 7 }}><Text style={{ ...newAcademic.itemTitle, fontSize: 8.8, textAlign: align }}>{e.degree}</Text><Text style={{ ...newAcademic.body, textAlign: align }}>{e.institution}</Text><Text style={{ ...newAcademic.itemMeta, textAlign: align }}>{e.year}</Text></View>)}</> : null}
            {c.skills.length > 0 ? <><Text style={{ ...newAcademic.heading, textAlign: align }}>{l.skills}</Text><Text style={{ ...newAcademic.body, textAlign: align }}>{c.skills.join(" / ")}</Text></> : null}
            {c.certifications.length > 0 ? <><Text style={{ ...newAcademic.heading, textAlign: align }}>{l.certifications}</Text>{c.certifications.map((cert) => <Text key={cert} style={{ ...newAcademic.body, marginBottom: 4, textAlign: align }}>{cert}</Text>)}</> : null}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export function GetPDFDocument({ data, template }: { data: ResumeData; template: TemplateId }) {
  switch (template) {
    case 'executive': return <ExecutivePDF data={data} />;
    case 'nexus': return <NexusPDF data={data} />;
    case 'orbit': return <OrbitPDF data={data} />;
    case 'metric': return <MetricPDF data={data} />;
    case 'prism': return <PrismDarkPDF data={data} />;
    case 'carbon': return <CarbonPDF data={data} />;
    case 'atlas': return <AtlasPDF data={data} />;
    case 'forge': return <ForgePDF data={data} />;
    case 'zenith': return <ZenithPDF data={data} />;
    case 'vector': return <VectorPDF data={data} />;
    case 'new-sleek': return <NewSleekPDF data={data} />;
    case 'new-professional': return <NewProfessionalPDF data={data} />;
    case 'new-academic': return <NewAcademicPDF data={data} />;
    case 'ref-torres': return <AtlasPDF data={data} />;
    case 'ref-silva': return <ExecutivePDF data={data} />;
    case 'ref-schumacher': return <ForgePDF data={data} />;
    case 'ref-palmerston': return <AtlasPDF data={data} />;
    case 'ref-sanchez': return <CarbonPDF data={data} />;
    // Dedicated renderers matching live preview designs
    case 'noir': return <NoirPDF data={data} />;
    case 'apex': return <AtlasPDF data={data} />;
    case 'slate': return <SlatePDF data={data} />;
    case 'cipher': return <CipherPDF data={data} />;
    case 'monolith': return <CarbonPDF data={data} />;
    case 'pinnacle': return <PinnaclePDF data={data} />;
    case 'avant': return <AvantPDF data={data} />;
    case 'vanguard': return <VanguardPDF data={data} />;
    default: return <MinimalPDF data={data} />;
  }
}

export async function exportResumePDF(data: ResumeData, template: TemplateId, filename: string) {
  const doc = <GetPDFDocument data={data} template={template} />;
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
