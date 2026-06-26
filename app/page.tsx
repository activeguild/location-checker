"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "ok" | "ng";

export default function Home() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("ng");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => setStatus("ok"),
      () => setStatus("ng")
    );
  }, []);

  const label = {
    loading: "位置情報を確認中...",
    ok: "位置情報OK",
    ng: "位置情報NG",
  }[status];

  return (
    <main className="container">
      {status === "loading" && <div className="spinner" />}
      <div className={`status ${status}`}>{label}</div>
    </main>
  );
}
