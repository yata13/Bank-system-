// src/components/NewCustomer.jsx
import { useState } from "react";



  return (
    <>
      <h3 className="form-title">New customer</h3>

      {error && <div className="alert error">{error}</div>}

      <form className="form-grid" onSubmit={onSubmit}>
        <div className="grid-2">
          <label className="label">First name</label>
          <input className="input" name="first_name" required value={form.first_name} onChange={onChange} />

          <label className="label">Last name</label>
          <input className="input" name="last_name" required value={form.last_name} onChange={onChange} />

          <label className="label">Email</label>
          <input className="input" type="email" name="email" value={form.email} onChange={onChange} />

          <label className="label">Phone</label>
          <input className="input" name="phone" value={form.phone} onChange={onChange} />

          <label className="label">Address</label>
          <input className="input" name="address" value={form.address} onChange={onChange} />

          <label className="label">City</label>
          <input className="input" name="city" value={form.city} onChange={onChange} />

          <label className="label">State</label>
          <input className="input" name="state" value={form.state} onChange={onChange} />

          <label className="label">ZIP</label>
          <input className="input" name="zip_code" value={form.zip_code} onChange={onChange} />

          <label className="label">DOB</label>
          <input className="input" type="date" name="dob" value={form.dob} onChange={onChange} />

          <label className="label">SSN</label>
          <input className="input" name="ssn" value={form.ssn} onChange={onChange} />
        </div>

        <div className="form-actions">
          <button type="button" className="btn ghost" onClick={() => setForm(EMPTY)} disabled={saving}>Clear</button>
          <button type="button" className="btn" onClick={onCancel} disabled={saving}>Cancel</button>
          <button type="submit" className="btn primary" disabled={saving}>{saving ? "Saving…" : "Create customer"}</button>
        </div>
      </form>
    </>
  );

