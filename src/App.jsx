import React, { useMemo, useState, useEffect, useCallback } from "react";
import { CalendarDays, MapPin, Ticket, Search, Filter, ChevronLeft, ChevronRight, Cloud, CloudOff, RefreshCw, Plus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ─── JSONBin config ──────────────────────────────────────────────────────────
const JSONBIN_BIN_ID = "6a0b6224ee5a733b12de2088";
const JSONBIN_API_KEY = "$2a$10$IpC4Ap7QUoONlsnak2Vmyuk.ppIRLjiVYEjaUq6R1s3W5cJzLnJ.2";
// ─────────────────────────────────────────────────────────────────────────────

const initialEvents = [
  {
    date: "2026-05-24",
    labelDate: "24 mei",
    title: "Suzan & Freek",
    location: "GelreDome",
    city: "Arnhem",
    price: "€62,50",
    ingeStatus: "Definitief",
    ingeTicket: "Ja",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Nog in te vullen",
    present: "n.t.b.",
    note: "🤪",
    category: "Concert",
  },
  {
    date: "2026-06-06",
    labelDate: "6 juni",
    title: "The Crave",
    location: "Zuiderpark",
    city: "Den Haag",
    price: "ca. €49–€73,50",
    ingeStatus: "Definitief",
    ingeTicket: "Ja",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Nog in te vullen",
    present: "n.t.b.",
    note: "",
    category: "Festival",
  },
  {
    date: "2026-06-13",
    labelDate: "13 juni",
    title: "Best Kept Secret",
    location: "Beekse Bergen",
    city: "Hilvarenbeek",
    price: "€130 + €10 fee",
    ingeStatus: "Twijfel",
    ingeTicket: "Nee",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Mies",
    present: "n.t.b.",
    note: "Mies had gevraagd; grote twijfel; heel duur; waarschijnlijk niet",
    category: "Festival",
  },
  {
    date: "2026-06-20",
    labelDate: "20 juni",
    title: "Echo's of Amsterdam",
    location: "Sloterpark",
    city: "Amsterdam",
    price: "vanaf €49,50 + fee",
    ingeStatus: "Twijfel",
    ingeTicket: "Nee",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Frank",
    present: "n.t.b.",
    note: "Frank had gevraagd; moeder viert verjaardag in de middag",
    category: "Festival",
  },
  {
    date: "2026-06-26",
    labelDate: "26 juni",
    title: "Bruiloft Frank & Floor",
    location: "Kasteel De Hooge Vuursche",
    city: "Baarn",
    price: "n.v.t.",
    ingeStatus: "Definitief",
    ingeTicket: "Nee",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Frank & Floor",
    present: "n.t.b.",
    note: "Net gevraagd of er wordt gesnoept",
    category: "Bruiloft",
  },
  {
    date: "2026-07-24",
    labelDate: "24 juli",
    title: "Liquicity",
    location: "Geestmerambacht",
    city: "Noord-Scharwoude / Oudkarspel",
    price: "ca. €184,99",
    ingeStatus: "Definitief",
    ingeTicket: "Ja",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Nog in te vullen",
    present: "n.t.b.",
    note: "Weekendfestival 24–26 juli; camping inbegrepen bij entry tickets",
    category: "Festival",
  },
  {
    date: "2026-08-08",
    labelDate: "8 augustus",
    title: "Blijdorp Festival",
    location: "Roel Langerakpark",
    city: "Rotterdam",
    price: "ca. €54,99–€59,99",
    ingeStatus: "Twijfel",
    ingeTicket: "Nee",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Nog in te vullen",
    present: "n.t.b.",
    note: "",
    category: "Festival",
  },
  {
    date: "2026-09-04",
    labelDate: "4 september",
    title: "Draaimolen",
    location: "MOB Complex",
    city: "Tilburg",
    price: "ca. €77,90–€87,90",
    ingeStatus: "Definitief",
    ingeTicket: "Ja",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Nog in te vullen",
    present: "n.t.b.",
    note: "Vrijdag",
    category: "Festival",
  },
  {
    date: "2026-09-05",
    labelDate: "5 september",
    title: "Draaimolen",
    location: "MOB Complex",
    city: "Tilburg",
    price: "ca. €82,90–€92,90",
    ingeStatus: "Wil gaan",
    ingeTicket: "Nee",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Nog in te vullen",
    present: "n.t.b.",
    note: "Nog geen kaartje, maar wil nog wel",
    category: "Festival",
  },
  {
    date: "2026-09-12",
    labelDate: "12 september",
    title: "A Day at the Park RDAM",
    location: "Kralingse Bos",
    city: "Rotterdam",
    price: "€54,95–€69,95",
    ingeStatus: "Twijfel",
    ingeTicket: "Nee",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Floor",
    present: "n.t.b.",
    note: "Floor had gevraagd",
    category: "Festival",
  },
  {
    date: "2026-10-23",
    labelDate: "23 oktober",
    title: "ADE KI/KI",
    location: "Ziggo Dome",
    city: "Amsterdam",
    price: "ca. €69,56",
    ingeStatus: "Twijfel",
    ingeTicket: "Ja",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Nog in te vullen",
    present: "n.t.b.",
    note: "Skip wellicht nog, maar heeft wel kaartje",
    category: "ADE",
  },
  {
    date: "2026-11-22",
    labelDate: "22 november",
    title: "Jack Shore",
    location: "Melkweg",
    city: "Amsterdam",
    price: "ca. €28,75",
    ingeStatus: "Twijfel",
    ingeTicket: "Nee",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "Nog in te vullen",
    present: "n.t.b.",
    note: "Kaartje wordt misschien verkocht; afhankelijk van operatie en andere feestjes",
    category: "Clubnacht",
  },
];

const monthNames = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december"
];

const weekdayNames = ["ma", "di", "wo", "do", "vr", "za", "zo"];
const calendarGridColumns = "grid-cols-[0.8fr_0.8fr_0.8fr_0.8fr_1.35fr_1.35fr_1.35fr]";

// ─── JSONBin helpers ─────────────────────────────────────────────────────────
const isJsonBinConfigured = JSONBIN_BIN_ID !== "JOUW_BIN_ID_HIER" && JSONBIN_API_KEY !== "JOUW_API_KEY_HIER";

async function loadFromJsonBin() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
    headers: { "X-Master-Key": JSONBIN_API_KEY },
  });
  if (!res.ok) throw new Error("JSONBin load failed");
  const data = await res.json();
  return data.record.events;
}

async function saveToJsonBin(events) {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": JSONBIN_API_KEY,
    },
    body: JSON.stringify({ events }),
  });
  if (!res.ok) throw new Error("JSONBin save failed");
}
// ─────────────────────────────────────────────────────────────────────────────

function statusMeta(status) {
  const lower = String(status || "").toLowerCase();
  if (lower.includes("definitief") || lower.includes("gekocht") || lower === "ja") {
    return { label: "Definitief", dot: "bg-emerald-800 text-white", pill: "bg-emerald-100 text-emerald-900 border-emerald-200" };
  }
  if (lower.includes("wil") || lower.includes("waarschijnlijk")) {
    return { label: "Wil gaan", dot: "bg-emerald-300 text-emerald-950", pill: "bg-emerald-50 text-emerald-800 border-emerald-200" };
  }
  if (lower.includes("twijfel") || lower.includes("misschien")) {
    return { label: "Twijfel", dot: "bg-amber-400 text-amber-950", pill: "bg-amber-100 text-amber-900 border-amber-200" };
  }
  if (lower.includes("verkopen") || lower.includes("skip")) {
    return { label: "Ticket verkopen / mogelijk skippen", dot: "bg-purple-500 text-white", pill: "bg-purple-100 text-purple-900 border-purple-200" };
  }
  if (lower.includes("nee") || lower.includes("sla over") || lower.includes("gaat niet")) {
    return { label: "Gaat niet", dot: "bg-rose-500 text-white", pill: "bg-rose-100 text-rose-900 border-rose-200" };
  }
  return { label: "Onbekend", dot: "bg-slate-300 text-slate-700", pill: "bg-slate-100 text-slate-700 border-slate-200" };
}

function ticketBorderClass(ticket) {
  return String(ticket || "").toLowerCase() === "ja" ? "border-emerald-800" : "border-slate-300";
}

function PersonBadge({ person, status, ticket }) {
  const meta = statusMeta(status);
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold shadow-sm ${meta.dot} ${ticketBorderClass(ticket)}`}
      title={`${person}: ${status} | ticket: ${ticket || "Nee"}`}
    >
      {person}
    </span>
  );
}

function StatusLegend() {
  const items = [
    { status: "Definitief", label: "Definitief" },
    { status: "Wil gaan", label: "Wil gaan" },
    { status: "Twijfel", label: "Twijfel" },
    { status: "Nog in te vullen", label: "Onbekend" },
    { status: "Gaat niet", label: "Gaat niet" },
  ];
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {items.map((item) => {
        const meta = statusMeta(item.status);
        return (
          <div key={item.label} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1">
            <span className={`h-3 w-3 rounded-full ${meta.dot.split(" ")[0]}`} />
            <span className="text-slate-600">{item.label}</span>
          </div>
        );
      })}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-600">
        Donkergroene rand = ticket ja · grijze rand = ticket nee
      </div>
    </div>
  );
}

function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  const startOffset = (firstDay.getDay() + 6) % 7;
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let day = 1; day <= lastDay.getDate(); day++) days.push(new Date(year, month, day));
  return days;
}

export default function FestivalCalendarApp() {
  const [events, setEvents] = useState(initialEvents);
  const [syncStatus, setSyncStatus] = useState(isJsonBinConfigured ? "loading" : "local");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [monthIndex, setMonthIndex] = useState(4);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load from JSONBin on mount; seed with initialEvents if bin is empty
  useEffect(() => {
    if (!isJsonBinConfigured) return;
    loadFromJsonBin()
      .then((remoteEvents) => {
        if (!remoteEvents || remoteEvents.length === 0) {
          setEvents(initialEvents);
          return saveToJsonBin(initialEvents).then(() => setSyncStatus("synced"));
        }
        setEvents(remoteEvents);
        setSyncStatus("synced");
      })
      .catch(() => setSyncStatus("error"));
  }, []);

  // Debounced save to JSONBin
  const saveDebounced = useCallback(
    (() => {
      let timer;
      return (evts) => {
        clearTimeout(timer);
        setSyncStatus("saving");
        timer = setTimeout(() => {
          saveToJsonBin(evts)
            .then(() => setSyncStatus("synced"))
            .catch(() => setSyncStatus("error"));
        }, 1000);
      };
    })(),
    []
  );

  function updateEvent(date, title, field, value) {
    setEvents((current) => {
      const updated = current.map((e) =>
        e.date === date && e.title === title ? { ...e, [field]: value } : e
      );
      const updatedSelected = updated.find((e) => e.date === date && e.title === title);
      if (updatedSelected) setSelectedEvent(updatedSelected);
      if (isJsonBinConfigured) saveDebounced(updated);
      return updated;
    });
  }

  function addEvent(newEvent) {
    setEvents((current) => {
      const updated = [...current, newEvent].sort((a, b) => a.date.localeCompare(b.date));
      if (isJsonBinConfigured) saveDebounced(updated);
      return updated;
    });
    setShowAddModal(false);
    setMonthIndex(parseInt(newEvent.date.split("-")[1]) - 1);
  }

  function manualRefresh() {
    if (!isJsonBinConfigured) return;
    setSyncStatus("loading");
    loadFromJsonBin()
      .then((remoteEvents) => { setEvents(remoteEvents); setSyncStatus("synced"); })
      .catch(() => setSyncStatus("error"));
  }

  const filteredEvents = useMemo(() => events.filter((event) => {
    const text = `${event.title} ${event.location} ${event.city} ${event.ingeStatus} ${event.roanStatus} ${event.withWhom} ${event.note}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesStatus = statusFilter === "Alle" ||
      event.ingeStatus.toLowerCase().includes(statusFilter.toLowerCase()) ||
      event.roanStatus.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesQuery && matchesStatus;
  }), [events, query, statusFilter]);

  const monthEvents = useMemo(() =>
    filteredEvents.filter((e) => parseDate(e.date).getMonth() === monthIndex),
    [filteredEvents, monthIndex]
  );

  const stats = useMemo(() => ({
    total: events.length,
    ingeDefinitive: events.filter((e) => statusMeta(e.ingeStatus).label === "Definitief").length,
    roanDefinitive: events.filter((e) => statusMeta(e.roanStatus).label === "Definitief").length,
    bothDefinitive: events.filter((e) => statusMeta(e.ingeStatus).label === "Definitief" && statusMeta(e.roanStatus).label === "Definitief").length,
  }), [events]);

  const calendarDays = buildCalendarDays(2026, monthIndex);

  function eventsForDay(day) {
    if (!day) return [];
    return filteredEvents.filter((e) => {
      const d = parseDate(e.date);
      return d.getFullYear() === day.getFullYear() && d.getMonth() === day.getMonth() && d.getDate() === day.getDate();
    });
  }

  const syncIcon = {
    loading: <RefreshCw className="h-3.5 w-3.5 animate-spin" />,
    saving: <RefreshCw className="h-3.5 w-3.5 animate-spin" />,
    synced: <Cloud className="h-3.5 w-3.5" />,
    error: <CloudOff className="h-3.5 w-3.5 text-rose-400" />,
    local: <CloudOff className="h-3.5 w-3.5 text-slate-400" />,
  };

  const syncLabel = {
    loading: "Laden...",
    saving: "Opslaan...",
    synced: "Gesynchroniseerd",
    error: "Sync mislukt",
    local: "Lokaal (geen sync)",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <header className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200 ring-1 ring-white/15">
                <CalendarDays className="h-4 w-4" />
                Inge x Roan planning 2026
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Festival & event kalender</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Kalender met persoonlijke I/R-badges: de vulling toont de aanwezigheidsstatus; de rand toont ticket ja/nee.
              </p>
              <button
                onClick={manualRefresh}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/15 transition hover:bg-white/20"
              >
                {syncIcon[syncStatus]}
                {syncLabel[syncStatus]}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
              <Stat label="Events" value={stats.total} />
              <Stat label="Inge def." value={stats.ingeDefinitive} />
              <Stat label="Roan def." value={stats.roanDefinitive} />
              <Stat label="Samen def." value={stats.bothDefinitive} />
            </div>
          </div>
        </header>

        <section className="mb-6 flex gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Nieuw event
          </button>
        </section>
        <section className="mb-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek op festival, plaats, persoon, status of opmerking..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 shadow-sm">
            <Filter className="h-4 w-4 text-slate-500" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-12 bg-transparent pr-8 outline-none">
              <option>Alle</option>
              <option>Definitief</option>
              <option>Twijfel</option>
              <option>Wil gaan</option>
              <option>Nog in te vullen</option>
              <option>Gaat niet</option>
            </select>
          </div>
        </section>

        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <StatusLegend />
        </section>

        <main className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardContent className="p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold capitalize">{monthNames[monthIndex]} 2026</h2>
                  <p className="text-sm text-slate-500">{monthEvents.length} event(s) zichtbaar in deze maand</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-2xl" disabled={monthIndex === 4} onClick={() => setMonthIndex((m) => Math.max(4, m - 1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-2xl" disabled={monthIndex === 10} onClick={() => setMonthIndex((m) => Math.min(10, m + 1))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className={`grid ${calendarGridColumns} gap-2 text-center text-xs font-medium uppercase tracking-wide text-slate-500`}>
                {weekdayNames.map((day) => <div key={day}>{day}</div>)}
              </div>
              <div className={`mt-2 grid ${calendarGridColumns} gap-2`}>
                {calendarDays.map((day, index) => {
                  const dayEvents = eventsForDay(day);
                  return (
                    <div key={index} className={`min-h-32 rounded-2xl border p-2 ${day ? "bg-white border-slate-200" : "border-transparent bg-transparent"}`}>
                      {day && <div className="mb-2 text-right text-sm font-medium text-slate-500">{day.getDate()}</div>}
                      <div className="space-y-2">
                        {dayEvents.map((event) => (
                          <button key={event.date + event.title} onClick={() => setSelectedEvent(event)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-left shadow-sm transition hover:scale-[1.02] hover:bg-white hover:shadow-md">
                            <div className="mb-1 text-[11px] font-semibold leading-tight text-slate-900">{event.title}</div>
                            <div className="flex items-center justify-between gap-1">
                              <div className="flex items-center gap-1.5">
                                <PersonBadge person="I" status={event.ingeStatus} ticket={event.ingeTicket} />
                                <PersonBadge person="R" status={event.roanStatus} ticket={event.roanTicket} />
                              </div>
                              <span className="text-[10px] text-slate-400">{event.city}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardContent className="p-5 md:p-6">
                <h2 className="mb-4 text-2xl font-semibold">Event details</h2>
                {selectedEvent ? (
                  <EventDetail event={selectedEvent} updateEvent={updateEvent} />
                ) : (
                  <div className="rounded-2xl bg-slate-100 p-5 text-slate-600">Klik op een event in de kalender om details te bekijken.</div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardContent className="p-5 md:p-6">
                <h2 className="mb-4 text-2xl font-semibold">Alle opties</h2>
                <div className="max-h-[560px] space-y-3 overflow-auto pr-1">
                  {filteredEvents.map((event) => (
                    <button key={event.date + event.title}
                      onClick={() => { setMonthIndex(parseDate(event.date).getMonth()); setSelectedEvent(event); }}
                      className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-slate-300 hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium text-slate-500">{event.labelDate}</div>
                          <div className="text-lg font-semibold">{event.title}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <PersonBadge person="I" status={event.ingeStatus} ticket={event.ingeTicket} />
                          <PersonBadge person="R" status={event.roanStatus} ticket={event.roanTicket} />
                        </div>
                      </div>
                      <div className="mt-3 grid gap-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {event.location}, {event.city}</div>
                        <div className="flex items-center gap-2"><Ticket className="h-4 w-4" /> {event.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {showAddModal && (
        <AddEventModal onClose={() => setShowAddModal(false)} onAdd={addEvent} />
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-slate-300">{label}</div>
    </div>
  );
}

function EventDetail({ event, updateEvent }) {
  const identity = { date: event.date, title: event.title };
  const people = [
    { person: "I", name: "Inge", status: event.ingeStatus, ticket: event.ingeTicket, statusField: "ingeStatus", ticketField: "ingeTicket" },
    { person: "R", name: "Roan", status: event.roanStatus, ticket: event.roanTicket, statusField: "roanStatus", ticketField: "roanTicket" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-medium text-slate-500">{event.labelDate} 2026</div>
        <h3 className="text-3xl font-semibold tracking-tight">{event.title}</h3>
      </div>
      <div className="flex items-center gap-2 rounded-2xl bg-slate-100 p-3">
        <PersonBadge person="I" status={event.ingeStatus} ticket={event.ingeTicket} />
        <PersonBadge person="R" status={event.roanStatus} ticket={event.roanTicket} />
        <span className="ml-2 text-sm text-slate-600">Status in één oogopslag</span>
      </div>
      <div className="grid gap-3 text-sm text-slate-700">
        <Info icon={<MapPin className="h-4 w-4" />} label="Locatie" value={`${event.location}, ${event.city}`} />
        <Info icon={<Ticket className="h-4 w-4" />} label="Ticket prijs" value={event.price} />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Wie gaat er?</div>
        <div className="space-y-3">
          {people.map((item) => {
            const meta = statusMeta(item.status);
            return (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <PersonBadge person={item.person} status={item.status} ticket={item.ticket} />
                    <div className="font-semibold text-slate-900">{item.name}</div>
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${meta.pill}`}>{item.status}</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <EditableField label="Status" value={item.status}
                    options={["Nog in te vullen", "Definitief", "Wil gaan", "Twijfel", "Gaat niet"]}
                    onChange={(v) => updateEvent(identity.date, identity.title, item.statusField, v)} />
                  <EditableField label="Ticket" value={item.ticket || "Nog in te vullen"}
                    options={["Nee", "Ja"]}
                    onChange={(v) => updateEvent(identity.date, identity.title, item.ticketField, v)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <TagInputField
        label="Met wie"
        value={event.withWhom || ""}
        onChange={(v) => updateEvent(identity.date, identity.title, "withWhom", v)}
      />
      <div className="rounded-2xl bg-slate-100 p-4">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Opmerking</div>
        <textarea
          value={event.note || ""}
          onChange={(e) => updateEvent(identity.date, identity.title, "note", e.target.value)}
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
          placeholder="Voeg een opmerking toe..."
        />
      </div>
    </div>
  );
}

function TagInputField({ label, value, onChange }) {
  const [inputValue, setInputValue] = React.useState("");
  const tags = value ? value.split(",").map(t => t.trim()).filter(Boolean) : [];

  function addTag(e) {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newTags = [...tags, inputValue.trim()];
      onChange(newTags.join(", "));
      setInputValue("");
    }
  }

  function removeTag(index) {
    const newTags = tags.filter((_, i) => i !== index);
    onChange(newTags.join(", "));
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700">
            {tag}
            <button onClick={() => removeTag(i)} className="ml-1 text-slate-400 hover:text-rose-500 transition text-base leading-none">&times;</button>
          </span>
        ))}
      </div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={addTag}
        placeholder="Typ een naam en druk Enter..."
        className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      />
    </div>
  );
}

function EditableField({ label, value, options, onChange }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 font-medium text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">{icon}</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
        <div className="font-medium text-slate-800">{value}</div>
      </div>
    </div>
  );
}

function AddEventModal({ onClose, onAdd }) {
  const [form, setForm] = React.useState({
    date: "",
    title: "",
    location: "",
    city: "",
    price: "",
    category: "Festival",
    ingeStatus: "Nog in te vullen",
    ingeTicket: "Nee",
    roanStatus: "Nog in te vullen",
    roanTicket: "Nee",
    withWhom: "",
    note: "",
  });

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit() {
    if (!form.date || !form.title) return;
    const [year, month, day] = form.date.split("-").map(Number);
    const labelDate = `${day} ${["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"][month-1]}`;
    onAdd({ ...form, labelDate, present: "n.t.b." });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <h2 className="text-2xl font-semibold">Nieuw event toevoegen</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100 transition">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>
        <div className="space-y-4 p-6">
          <Field label="Datum *">
            <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100" />
          </Field>
          <Field label="Naam *">
            <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)}
              placeholder="bijv. Suzan & Freek"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Locatie">
              <input type="text" value={form.location} onChange={(e) => set("location", e.target.value)}
                placeholder="bijv. GelreDome"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100" />
            </Field>
            <Field label="Stad">
              <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)}
                placeholder="bijv. Arnhem"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Prijs">
              <input type="text" value={form.price} onChange={(e) => set("price", e.target.value)}
                placeholder="bijv. €49,50"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100" />
            </Field>
            <Field label="Categorie">
              <select value={form.category} onChange={(e) => set("category", e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100">
                {["Festival","Concert","Clubnacht","Bruiloft","ADE","Anders"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Status Inge">
              <select value={form.ingeStatus} onChange={(e) => set("ingeStatus", e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100">
                {["Nog in te vullen","Definitief","Wil gaan","Twijfel","Gaat niet"].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Ticket Inge">
              <select value={form.ingeTicket} onChange={(e) => set("ingeTicket", e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100">
                {["Nee","Ja"].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Status Roan">
              <select value={form.roanStatus} onChange={(e) => set("roanStatus", e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100">
                {["Nog in te vullen","Definitief","Wil gaan","Twijfel","Gaat niet"].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Ticket Roan">
              <select value={form.roanTicket} onChange={(e) => set("roanTicket", e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100">
                {["Nee","Ja"].map(o => <option key={o}>{o}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Opmerking">
            <textarea value={form.note} onChange={(e) => set("note", e.target.value)}
              rows={3} placeholder="Optionele opmerking..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100" />
          </Field>
        </div>
        <div className="flex gap-3 border-t border-slate-200 p-6">
          <button onClick={onClose}
            className="flex-1 rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Annuleren
          </button>
          <button onClick={handleSubmit} disabled={!form.date || !form.title}
            className="flex-1 rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed">
            Event toevoegen
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      {children}
    </div>
  );
}
