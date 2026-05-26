import React, { useState } from "react";
import "./App.css";

const IAM_TOOLS = [
  "Any", "Okta", "SailPoint", "CyberArk", "Azure AD / Entra ID",
  "Ping Identity", "ForgeRock", "AWS IAM", "Active Directory", "BeyondTrust",
];
const CONTRACT_TYPES = ["Any", "Contract", "Contract-to-Hire", "W2", "1099", "C2C"];
const REMOTE_OPTIONS = ["Any", "Onsite", "Hybrid", "Remote"];
const CLEARANCE_OPTIONS = ["Any", "None", "Public Trust", "Secret", "Top Secret"];

const QUICK_PROMPTS = [
  "Find Okta architect roles paying $120+/hr",
  "SailPoint IGA contracts in Dallas",
  "CyberArk PAM projects, C2C ok",
  "Azure AD short-term contracts 3-6 months",
  "Entry level IAM analyst positions",
];

function SkillBadge({ skill }) {
  return <span className="skill-badge">{skill}</span>;
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const remoteLabel =
    project.remote === true ? "Remote" :
    project.remote === "Hybrid" ? "Hybrid" : "Onsite";
  const remoteClass =
    project.remote === true ? "tag-remote" :
    project.remote === "Hybrid" ? "tag-hybrid" : "tag-onsite";

  return (
    <div className="project-card" style={{ animationDelay: `${index * 0.07}s` }}>
      <div className="card-header">
        <div className="card-title-row">
          <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="card-title">{project.title}</h3>
            <p className="card-company">{project.company}</p>
          </div>
        </div>
        <div className="card-tags">
          <span className={`tag ${remoteClass}`}>{remoteLabel}</span>
          <span className="tag tag-type">{project.type}</span>
          {project.clearance && project.clearance !== "None" && project.clearance !== "N/A" && (
            <span className="tag tag-clearance">🔒 {project.clearance}</span>
          )}
        </div>
      </div>

      <div className="card-meta">
        <div className="meta-item">
          <span className="meta-label">PAY</span>
          <span className="meta-value pay-value">{project.payRate || "Negotiable"}</span>
        </div>
        <div className="meta-divider" />
        <div className="meta-item">
          <span className="meta-label">DURATION</span>
          <span className="meta-value">{project.duration || "TBD"}</span>
        </div>
        <div className="meta-divider" />
        <div className="meta-item">
          <span className="meta-label">LOCATION</span>
          <span className="meta-value">{project.location}</span>
        </div>
        <div className="meta-divider" />
        <div className="meta-item">
          <span className="meta-label">POSTED</span>
          <span className="meta-value">{project.postedDate || "Recently"}</span>
        </div>
      </div>

      <div className="card-skills">
        {(project.skills || []).map((s) => <SkillBadge key={s} skill={s} />)}
      </div>

      {expanded && (
        <div className="card-description">
          <p>{project.description}</p>
        </div>
      )}

      <div className="card-footer">
        <button className="btn-toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? "▲ Less" : "▼ Details"}
        </button>
        <a
          className="btn-apply"
          href={project.applyUrl && project.applyUrl.startsWith("http") ? project.applyUrl : "#"}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (!project.applyUrl || !project.applyUrl.startsWith("http")) {
              e.preventDefault();
              alert("Contact the recruiter or search for this position on LinkedIn / Dice.");
            }
          }}
        >
          Apply →
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    contractType: "Any",
    remote: "Any",
    clearance: "Any",
    tool: "Any",
    payMin: "",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (customQuery) => {
    const searchQuery = customQuery || query;
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    const activeFilters = {};
    if (filters.contractType !== "Any") activeFilters.contractType = filters.contractType;
    if (filters.remote !== "Any") activeFilters.remote = filters.remote;
    if (filters.clearance !== "Any") activeFilters.clearance = filters.clearance;
    if (filters.tool !== "Any") activeFilters.tool = filters.tool;
    if (filters.payMin) activeFilters.payMin = filters.payMin;

    try {
      const res = await fetch("/api/find-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery, filters: activeFilters }),
      });
      const json = await res.json();
      if (json.success) {
        setResults(json.data);
      } else {
        setError(json.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Cannot connect to backend. Make sure the server is running on port 3001.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-bracket">[</span>
            <span className="logo-text">IAM</span>
            <span className="logo-sub">DALLAS</span>
            <span className="logo-bracket">]</span>
          </div>
          <p className="header-tagline">Contractor Project Finder · Identity & Access Management</p>
        </div>
      </header>

      <main className="main">
        {/* Search Section */}
        <section className="search-section">
          <div className="search-box">
            <textarea
              className="search-input"
              placeholder="Describe the IAM project you're looking for...&#10;e.g. &quot;Okta admin contract, C2C ok, $100+/hr&quot;"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              rows={3}
            />
            <button
              className="search-btn"
              onClick={() => handleSearch()}
              disabled={loading || !query.trim()}
            >
              {loading ? <span className="spinner" /> : "FIND PROJECTS →"}
            </button>
          </div>

          {/* Quick prompts */}
          <div className="quick-prompts">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                className="quick-chip"
                onClick={() => { setQuery(p); handleSearch(p); }}
              >
                {p}
              </button>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">IAM TOOL</label>
              <select className="filter-select" value={filters.tool}
                onChange={(e) => setFilters({ ...filters, tool: e.target.value })}>
                {IAM_TOOLS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">CONTRACT TYPE</label>
              <select className="filter-select" value={filters.contractType}
                onChange={(e) => setFilters({ ...filters, contractType: e.target.value })}>
                {CONTRACT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">WORK STYLE</label>
              <select className="filter-select" value={filters.remote}
                onChange={(e) => setFilters({ ...filters, remote: e.target.value })}>
                {REMOTE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">CLEARANCE</label>
              <select className="filter-select" value={filters.clearance}
                onChange={(e) => setFilters({ ...filters, clearance: e.target.value })}>
                {CLEARANCE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">MIN PAY ($/HR)</label>
              <input type="number" className="filter-select" placeholder="e.g. 85"
                value={filters.payMin}
                onChange={(e) => setFilters({ ...filters, payMin: e.target.value })} />
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="loading-state">
            <div className="loading-bar">
              <div className="loading-bar-fill" />
            </div>
            <p className="loading-text">Searching Dallas IAM market with AI...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="error-box">
            <span className="error-icon">⚠</span>
            <p>{error}</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <section className="results-section">
            <div className="results-header">
              <div>
                <h2 className="results-title">
                  <span className="results-count">{results.totalFound || results.projects?.length || 0}</span>
                  {" "}Projects Found
                </h2>
                <p className="results-summary">{results.summary}</p>
              </div>
            </div>

            <div className="projects-grid">
              {(results.projects || []).map((project, i) => (
                <ProjectCard key={project.id || i} project={project} index={i} />
              ))}
            </div>

            {results.tips && (
              <div className="tips-box">
                <span className="tips-label">💡 PRO TIP</span>
                <p>{results.tips}</p>
              </div>
            )}
          </section>
        )}

        {/* Empty state */}
        {!loading && !results && !error && (
          <div className="empty-state">
            <div className="empty-icon">⬡</div>
            <h2>Find Your Next IAM Contract</h2>
            <p>Search for Identity & Access Management projects in the Dallas, TX area. Powered by Claude AI with live web search.</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Dallas IAM Contractor Finder · Powered by Claude AI · Data sourced live from the web</p>
      </footer>
    </div>
  );
}
