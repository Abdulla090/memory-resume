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
  itemHeader: { flexDirection: "row", justifyContent: "space-between" },
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
  side: { width: "33%", backgroundColor: "#111", color: "#fff", padding: 20 },
  main: { width: "67%", padding: 22 },
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
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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

export async function exportResumePDF(data: ResumeData, template: TemplateId, filename: string) {
  let doc = <MinimalPDF data={data} />;
  if (template === 'executive') doc = <ExecutivePDF data={data} />;
  if (template === 'noir') doc = <ExecutivePDF data={data} />;
  if (template === 'apex') doc = <ExecutivePDF data={data} />;
  if (template === 'slate') doc = <MinimalPDF data={data} />;
  if (template === 'cipher') doc = <ExecutivePDF data={data} />;
  if (template === 'monolith') doc = <MinimalPDF data={data} />;
  if (template === 'pinnacle') doc = <MinimalPDF data={data} />;
  if (template === 'avant') doc = <MinimalPDF data={data} />;
  if (template === 'vanguard') doc = <MinimalPDF data={data} />;
  if (template === 'nexus') doc = <NexusPDF data={data} />;
  if (template === 'orbit') doc = <OrbitPDF data={data} />;
  if (template === 'metric') doc = <MetricPDF data={data} />;
  if (template === 'prism') doc = <PrismPDF data={data} />;

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
