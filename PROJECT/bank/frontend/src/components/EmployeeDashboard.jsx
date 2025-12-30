import './employeedashbord.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';


/* ---------------- Customer Overview (profile + accounts + bills) --------------- */
function CustomerOverview({ customer, onClear }) {
  return (
    <section className="profile-grid">
      {/* LEFT: PROFILE (fills ~70% height) */}
      <div className="card profile-card">

        <dl className="fields">
          <dt>Full name</dt><dd>{customer.name || '-'}</dd>
          {customer.phone && (<><dt>Phone</dt><dd>{customer.phone}</dd></>)}
          {customer.email && (<><dt>Email</dt><dd>{customer.email}</dd></>)}
          {customer.id && (<><dt>Customer ID</dt><dd>#{customer.id}</dd></>)}
          {customer.address && (<><dt>Address</dt><dd>{customer.address}</dd></>)}
          {customer.city && (<><dt>City</dt><dd>{customer.city}</dd></>)}
          {customer.state && (<><dt>State</dt><dd>{customer.state}</dd></>)}
          {customer.zip_code && (<><dt>ZIP</dt><dd>{customer.zip_code}</dd></>)}
          {customer.dob && (<><dt>DOB</dt><dd>{customer.dob}</dd></>)}
          {customer.ssn && (<><dt>SSN</dt><dd>{customer.ssn}</dd></>)}
          {customer.created && (<><dt>Created</dt><dd>{customer.created}</dd></>)}
        </dl>
      </div>

      {/* RIGHT TOP: ACCOUNTS */}
      <div className="card account-card">


        <div className="card-body scroll">
          <ul className="accounts">
            {customer.accounts?.length ? customer.accounts.map((acc) => (
              <li key={acc.number}>
                <div className="acc-main">
                  <b>{acc.blocked ? 'Blocked account' : 'Active account'}</b>
                  <div className="muted">{acc.number}</div>
                  <div className="muted">Balance: {Number(acc.balance || 0).toLocaleString()} Birr</div>
                </div>
                <div className="acc-actions">
                  {acc.blocked
                    ? <button className="pill success">Unlock account</button>
                    : <button className="pill danger">Block Account</button>}
                </div>
              </li>
            )) : <li className="muted">No accounts</li>}
          </ul>
        </div>
      </div>

      {/* RIGHT BOTTOM: BILLS */}
      <div className="card bills-card">
        <div className="card-head tight">
        </div>


        <div className="card-body scroll">
          <ul className="bills">
            {(customer.bills || []).map((b, i) => (
              <li key={i}>
                <span className={`status-dot ${b.status === 'paid' ? 'green' : 'red'}`} />
                <span className="bill-title">{b.title}</span>
                <span className={`bill-badge ${b.status === 'paid' ? 'ok' : 'not'}`}>
                  {b.status === 'paid' ? 'Bill paid' : 'Not paid'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Page -------------------------------------- */
export default function EmployeeDashboard() {
  const location = useLocation();
  const storedEmp = JSON.parse(localStorage.getItem('employee') || 'null');
  const name = location.state?.name || storedEmp?.first_name || 'Employee';

  // search state
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // selected customer (persist)
  const [customer, setCustomer] = useState(() => {
    try { return JSON.parse(localStorage.getItem('currentCustomer') || 'null'); }
    catch { return null; }
  });
  useEffect(() => {
    if (customer) localStorage.setItem('currentCustomer', JSON.stringify(customer));
    else localStorage.removeItem('currentCustomer');
  }, [customer]);

  const timerRef = useRef();

  // --- API helpers ---
  async function fetchJSON(url) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const r = await fetch(`${baseUrl}${url}`);
    if (!r.ok) throw new Error(r.statusText);
    return r.json();
  }

  async function searchCustomers(term) {
    setLoading(true);
    try {
      const data = await fetchJSON(`/api/customers/search?q=${encodeURIComponent(term)}`);
      setResults(data);
    } catch {
      try {
        const list = await fetchJSON('/api/customers');
        const t = term.toLowerCase();
        const filtered = list
          .map(c => ({
            id: c.customer_id ?? c.id,
            name: `${c.first_name ?? ''} ${c.last_name ?? ''}`.trim() || c.name,
            phone: c.phone, email: c.email,
          }))
          .filter(x =>
            String(x.id).includes(t) ||
            (x.name || '').toLowerCase().includes(t) ||
            (x.email || '').toLowerCase().includes(t) ||
            (x.phone || '').toLowerCase().includes(t)
          );
        setResults(filtered.slice(0, 10));
      } catch {
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  }

  async function choose(row) {
    try {
      const detail = await fetchJSON(`/api/customers/${row.id}`);
      const c = Array.isArray(detail) ? detail[0] : detail;

      let accounts = [];
      try {
        const accs = await fetchJSON(`/api/accounts?customerId=${row.id}`);
        accounts = accs.map(a => ({
          number: a.account_number || a.accountNo || `#${a.account_id}`,
          balance: a.balance,
          blocked: Boolean(a.is_blocked),
        }));
      } catch { }

      setCustomer({
        id: c.customer_id ?? row.id,
        first_name: c.first_name,
        last_name: c.last_name,
        name: `${c.first_name || ''} ${c.last_name || ''}`.trim() || row.name,
        email: c.email,
        phone: c.phone,
        address: c.address,
        city: c.city,
        state: c.state,
        zip_code: c.zip_code,
        dob: c.dob,
        ssn: c.ssn,
        created: c.created,
        sms: true,
        accounts,
        bills: [
          { title: 'Phone bill', status: 'paid' },
          { title: 'Internet bill', status: 'not' },
        ],
      });
    } finally {
      setQ(''); setResults([]); setOpen(false);
    }
  }

  function onChange(e) {
    const value = e.target.value;
    setQ(value);
    setOpen(value.length >= 2);
    clearTimeout(timerRef.current);
    if (value.length >= 2) {
      timerRef.current = setTimeout(() => searchCustomers(value), 300);
    } else {
      setResults([]);
    }
  }

  function clearCustomer() {
    setCustomer(null);
    setQ('');
    setOpen(false);
  }

  return (
    <div className={`dash ${customer ? 'no-rail' : ''}`}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">∞</div><span>Xybery</span>
        </div>

        <nav className="nav">
          <p className="nav-title">Menu</p>

          {!customer ? (
            <>
              <Link to="/EmployeeDashboard" className="nav-link active">Dashboard</Link>
              <span className="nav-hint">Search a customer to unlock actions ↓</span>
            </>
          ) : (
            <>
              <div className="nav-customer">
                <span className="avatar sm">{customer.name?.[0] || 'U'}</span>
                <div><b>{customer.name}</b><div className="muted">#{customer.id}</div></div>
              </div>
              <Link to="/transfer" className="nav-link">💸 Transfer Money</Link>
              <Link to="/transactions" className="nav-link">📄 View Transactions</Link>
              <Link to="/add-account" className="nav-link">➕ Add Account</Link>
              <button className="nav-link as-button" onClick={clearCustomer}>🔁 Change Customer</button>
            </>
          )}

          <p className="nav-title mt">Support</p>
          <Link to="/settings" className="nav-link">Settings</Link>
          <Link to="/help" className="nav-link">Help</Link>
          <Link to="/" className="nav-link">Logout</Link>
        </nav>
      </aside>

      {/* TOPBAR (sticky, stable) */}
      <header className="topbar">
        <div className="hello">
          <h1>Hello {name}!</h1>
          <p>Welcome back. Have a good day.</p>
        </div>

        <div className="searchwrap centered">
          <input
            className="search"
            placeholder="Search customer by name or ID…"
            value={q}
            onChange={onChange}
            onFocus={() => setOpen(q.length >= 2)}
          />
          {open && (
            <div className="search-results">
              {loading && <div className="result-row muted">Searching…</div>}
              {!loading && results.length === 0 && (
                <div className="result-row muted">No results</div>
              )}
              {results.map((r) => (
                <button key={r.id} className="result-row" onClick={() => choose(r)}>
                  <span className="avatar sm">{(r.name || '?')[0]}</span>
                  <div className="r-meta">
                    <b>{r.name}</b>
                    <span className="muted">#{r.id}{r.phone ? ` · ${r.phone}` : ''}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="profile">
          <div className="avatar" title={name}>{name[0]}</div>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">
        {!customer ? (
          <section className="empty-state card">
            <h3>Find a customer to begin</h3>
            <p className="muted">Use the search bar above to look up by name or ID.</p>
          </section>
        ) : (
          <CustomerOverview customer={customer} onClear={clearCustomer} />
        )}

      </main>

      {/* RIGHT RAIL (only when no customer selected) */}
      <aside className="rail">
        <div className="rail-actions">
          <button className="chip"><span className="dot tiny" /> This Month</button>
          <button className="btn-soft">Download</button>
        </div>

        <section className="kpis kpis-sm">
          <div className="smcard"><p className="kpi-title">Present</p><p className="kpi-value">650</p></div>
          <div className="smcard"><p className="kpi-title">Leave</p><p className="kpi-value">35</p></div>
          <div className="smcard"><p className="kpi-title">Absent</p><p className="kpi-value">20</p></div>
        </section>

        <section className="card salary-card">
          <h4 className="card-title">Salary Overview</h4>
          <div className="sparkline" />
          <div className="legend tiny">
            <span><i className="dot" /> 2022</span>
            <span><i className="dot alt" /> 2021</span>
          </div>
        </section>
      </aside>
    </div>
  );
}
